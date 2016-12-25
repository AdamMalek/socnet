using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using socnet.Config;
using socnet.Data;
using socnet.Infrastructure.Middleware;
using socnet.Infrastructure.Repository;
using socnet.Infrastructure.Repository.Interfaces;
using socnet.Infrastructure.Service;
using socnet.Infrastructure.Service.Interfaces;
using socnet.Models;
using socnet.Services;

namespace socnet
{
    public class Startup
    {
        private readonly LifetimeValidator _myTimeValidator =
            (DateTime? notBefore, DateTime? expires, SecurityToken securityToken,
                    TokenValidationParameters validationParameters) =>
                {
                    var now = DateTime.UtcNow;
                    if (notBefore.HasValue && notBefore.Value > now) return false;
                    return !expires.HasValue || expires.Value >= now;
                };

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true);

            if (env.IsDevelopment())
            {
                // For more details on using the user secret store see http://go.microsoft.com/fwlink/?LinkID=532709
                builder.AddUserSecrets();

                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }

            builder.AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //services.AddIdentity<ApplicationUser, IdentityRole>()
            //    .AddEntityFrameworkStores<ApplicationDbContext>()
            //    .AddDefaultTokenProviders();

            services.AddMvc();

            // Add application services.
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();

            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IUserService, UserService>();

            services.AddTransient<IGroupRepository, GroupRepository>();
            services.AddTransient<IGroupService, GroupService>();

            services.AddTransient<IProfileRepository, ProfileRepository>();
            services.AddTransient<IProfileService, ProfileService>();

            services.AddTransient<IMemberRepository, MemberRepository>();
            services.AddTransient<IMemberService, MemberService>();

            services.AddTransient<ICommentRepository, CommentRepository>();
            services.AddTransient<IPostRepository, PostRepository>();
            services.AddTransient<IPostService, PostService>();

            services.AddTransient<IInviteRepository, InviteRepository>();

            services.Configure<ConfigClass>(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseApplicationInsightsRequestTelemetry();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseDatabaseErrorPage();
                app.UseBrowserLink();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseApplicationInsightsExceptionTelemetry();

            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("tajnehaslo112123!@#"));

            TokenProviderOptions options = new TokenProviderOptions
            {
                Audience = "users",
                Issuer = "me",
                Expiration = TimeSpan.FromDays(3),
                Path = "/login",
                SigningCredentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256),
                //IdentityResolver = GetIdentity
            };

            app.UseMiddleware<TokenProviderMiddleware>(Options.Create(options));

            TokenValidationParameters param = new TokenValidationParameters()
            {
                ValidAudience = "users",
                IssuerSigningKey = signingKey,
                ValidateAudience = true,
                ValidIssuer = "me",
                ValidateIssuer = true,
                //LifetimeValidator = _myTimeValidator,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
            };
            app.UseJwtBearerAuthentication(new JwtBearerOptions()
            {
                TokenValidationParameters = param,
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
            });

            app.UseMiddleware<MemberMiddleware>();

            app.UseStaticFiles();

            // Add external authentication middleware below. To configure them please see http://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
