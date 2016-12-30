webpackJsonp([0,3],{

/***/ 241:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_profile_service__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_models_user_data__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(237);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileComponent = (function () {
    function ProfileComponent(profileService, route) {
        this.profileService = profileService;
        this.route = route;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = new __WEBPACK_IMPORTED_MODULE_2__shared_models_user_data__["a" /* UserData */](0, "--", "--", "--", "http://www.mytreedb.com/uploads/mytreedb/loader/ajax_loader_blue_350.gif");
        this.sub = this.route.params.subscribe(function (params) {
            var id = +params['profileId'];
            _this.profileService.getProfileInfo(id).subscribe(function (userData) {
                if (userData == null) { }
                else {
                    _this.user = userData;
                }
            });
        });
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    ProfileComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-profile',
            template: __webpack_require__(714),
            styles: [__webpack_require__(709)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_profile_service__["a" /* ProfileService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_services_profile_service__["a" /* ProfileService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/profile.component.js.map

/***/ },

/***/ 242:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_http_service__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_config__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProfileService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProfileService = (function () {
    function ProfileService(apiHttpService) {
        this.apiHttpService = apiHttpService;
    }
    ProfileService.prototype.getProfileInfo = function (id) {
        var _this = this;
        return this.apiHttpService.get(__WEBPACK_IMPORTED_MODULE_2__api_config__["a" /* BaseUrl */] + "/api/profile/" + id.toString()).map(function (x) { return x.json(); }).map(function (x) {
            if (x != null) {
                x.avatarSrc = _this.resolveAvatarPath(x.avatarSrc);
            }
            return x;
        });
    };
    ProfileService.prototype.resolveAvatarPath = function (path) {
        if (path == null) {
            return "http://test.dev/avatar/testaccountXD/larger/15f544106f8a4f7389f9e46ff312794c.jpeg";
        }
        return __WEBPACK_IMPORTED_MODULE_2__api_config__["a" /* BaseUrl */] + "/" + path;
    };
    ProfileService.prototype.getProfileFriends = function (id) {
        var _this = this;
        return this.apiHttpService.get(__WEBPACK_IMPORTED_MODULE_2__api_config__["a" /* BaseUrl */] + "/api/profile/" + id.toString() + "/friends").map(function (x) { return x.json(); }).map(function (x) {
            for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
                var friend = x_1[_i];
                friend.avatarSrc = _this.resolveAvatarPath(friend.avatarSrc);
            }
            return x;
        });
    };
    ProfileService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__api_http_service__["a" /* ApiHttpService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__api_http_service__["a" /* ApiHttpService */]) === 'function' && _a) || Object])
    ], ProfileService);
    return ProfileService;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/profile.service.js.map

/***/ },

/***/ 359:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_profile_service__ = __webpack_require__(242);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FriendListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var FriendListComponent = (function () {
    function FriendListComponent(profileService, route) {
        this.profileService = profileService;
        this.route = route;
    }
    FriendListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.params.subscribe(function (params) {
            _this.profileId = +params["profileId"];
            _this.profileService.getProfileFriends(_this.profileId).subscribe(function (friends) {
                if (friends != null) {
                    _this.friends = friends;
                }
                else {
                    _this.friends = [];
                }
            });
        });
    };
    FriendListComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-friend-list',
            template: __webpack_require__(713),
            styles: [__webpack_require__(708)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_profile_service__["a" /* ProfileService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_services_profile_service__["a" /* ProfileService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], FriendListComponent);
    return FriendListComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/friend-list.component.js.map

/***/ },

/***/ 360:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserData; });
var UserData = (function () {
    function UserData(profileId, firstName, lastName, university, avatarSrc) {
        this.profileId = profileId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.university = university;
        this.avatarSrc = avatarSrc;
    }
    return UserData;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/user-data.js.map

/***/ },

/***/ 361:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token_service__ = __webpack_require__(362);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ApiHttpService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApiHttpService = (function () {
    function ApiHttpService(http, tokenService) {
        this.http = http;
        this.tokenService = tokenService;
    }
    ApiHttpService.prototype.post = function (url, body) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer ' + this.tokenService.getToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ headers: headers });
        return this.http.post(url, body, options);
    };
    ApiHttpService.prototype.get = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer ' + this.tokenService.getToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ headers: headers });
        return this.http.get(url, options);
    };
    ApiHttpService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Http */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__token_service__["a" /* TokenService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__token_service__["a" /* TokenService */]) === 'function' && _b) || Object])
    ], ApiHttpService);
    return ApiHttpService;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/api-http.service.js.map

/***/ },

/***/ 362:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TokenService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TokenService = (function () {
    function TokenService() {
    }
    TokenService.prototype.getToken = function () {
        return token;
        //return localStorage.getItem("access_token");
    };
    TokenService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], TokenService);
    return TokenService;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/token.service.js.map

/***/ },

/***/ 427:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 427;


/***/ },

/***/ 428:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(545);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_40" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/main.js.map

/***/ },

/***/ 544:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(710),
            styles: [__webpack_require__(705)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/app.component.js.map

/***/ },

/***/ 545:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__header_header_component__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(237);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routes__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__profile_profile_component__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_services_profile_service__ = __webpack_require__(242);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_services_api_http_service__ = __webpack_require__(361);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_services_token_service__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__profile_friend_list_friend_list_component__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__profile_friend_list_friend_item_friend_item_component__ = __webpack_require__(548);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_8__profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_12__profile_friend_list_friend_list_component__["a" /* FriendListComponent */],
                __WEBPACK_IMPORTED_MODULE_13__profile_friend_list_friend_item_friend_item_component__["a" /* FriendItemComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["d" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_router__["b" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_routes__["a" /* appRoutes */])
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_9__shared_services_profile_service__["a" /* ProfileService */], __WEBPACK_IMPORTED_MODULE_10__shared_services_api_http_service__["a" /* ApiHttpService */], __WEBPACK_IMPORTED_MODULE_11__shared_services_token_service__["a" /* TokenService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/app.module.js.map

/***/ },

/***/ 546:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_profile_component__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_profile_routes__ = __webpack_require__(549);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return appRoutes; });


var appRoutes = [
    { path: 'profile/:profileId', component: __WEBPACK_IMPORTED_MODULE_0__profile_profile_component__["a" /* ProfileComponent */], children: __WEBPACK_IMPORTED_MODULE_1__profile_profile_routes__["a" /* profileRoutes */] },
];
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/app.routes.js.map

/***/ },

/***/ 547:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-header',
            template: __webpack_require__(711),
            styles: [__webpack_require__(706)]
        }), 
        __metadata('design:paramtypes', [])
    ], HeaderComponent);
    return HeaderComponent;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/header.component.js.map

/***/ },

/***/ 548:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_models_user_data__ = __webpack_require__(360);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FriendItemComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FriendItemComponent = (function () {
    function FriendItemComponent() {
    }
    FriendItemComponent.prototype.ngOnInit = function () {
        this.fullName = this.friend.firstName + " " + this.friend.lastName;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_models_user_data__["a" /* UserData */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_models_user_data__["a" /* UserData */]) === 'function' && _a) || Object)
    ], FriendItemComponent.prototype, "friend", void 0);
    FriendItemComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-friend-item',
            template: __webpack_require__(712),
            styles: [__webpack_require__(707)]
        }), 
        __metadata('design:paramtypes', [])
    ], FriendItemComponent);
    return FriendItemComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/friend-item.component.js.map

/***/ },

/***/ 549:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_component__ = __webpack_require__(241);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__friend_list_friend_list_component__ = __webpack_require__(359);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return profileRoutes; });


var profileRoutes = [
    { path: "friends", component: __WEBPACK_IMPORTED_MODULE_1__friend_list_friend_list_component__["a" /* FriendListComponent */] },
    { path: ":profileId", component: __WEBPACK_IMPORTED_MODULE_0__profile_component__["a" /* ProfileComponent */] },
];
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/profile.routes.js.map

/***/ },

/***/ 550:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export BaseProtocol */
/* unused harmony export BasePort */
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return BaseUrl; });
var BaseProtocol = "http";
var BasePort = "41940";
var BaseUrl = BaseProtocol + "://localhost:" + BasePort;
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/api-config.js.map

/***/ },

/***/ 551:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/environment.js.map

/***/ },

/***/ 552:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(980);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/polyfills.js.map

/***/ },

/***/ 705:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 706:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 707:
/***/ function(module, exports) {

module.exports = ".friend{\r\n    border: 1px solid black;\r\n    background: #888;\r\n    padding: 2px;\r\n}\r\n\r\n.friend-avatar{\r\n    height: 100px;\r\n}\r\n\r\n.friend-info{\r\n    text-align: left;\r\n}\r\n"

/***/ },

/***/ 708:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 709:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 710:
/***/ function(module, exports) {

module.exports = "<socnet-header></socnet-header>\n<nav>\n    <a routerLink=\"/profile/1/friends\" routerLinkActive=\"active\">User</a>\n    <a routerLink=\"/profile/2/friends\" routerLinkActive=\"active\">Admin</a>\n    <a routerLink=\"/profile/3/friends\" routerLinkActive=\"active\">Test</a>\n</nav>\n<div class=\"container\">\n    <router-outlet></router-outlet>\n</div>\n"

/***/ },

/***/ 711:
/***/ function(module, exports) {

module.exports = "<div class=\"topbar\">\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-2 left-side left\">\n                <div class=\"topbar-menu-left\">\n                    <li id=\"sidebar-toggle\" data-toggle=\"0\">\n                        <a role=\"button\" data-target=\"#\"> <i class=\"fa fa-th-list\"></i></a>\n                    </li>\n                </div>\n            </div>\n            <div class=\"col-md-7 site-name text-center hidden-xs hidden-sm\">\n                <span><a href=\"http://test.dev/\">socnet</a></span>\n            </div>\n            <div class=\"col-md-3 text-right right-side\">\n                <div class=\"topbar-menu-right\">\n                    <li class=\"ossn-topbar-dropdown-menu\">\n                        <div class=\"dropdown\">\n                            <a role=\"button\" data-toggle=\"dropdown\" data-target=\"#\"><i class=\"fa fa-sort-desc\"></i></a>\n                            <ul class=\"dropdown-menu multi-level\" role=\"menu\" aria-labelledby=\"dropdownMenu\">\n                                <li><a class=\"menu-topbar-dropdown-account_settings\"\n                                       href=\"http://test.dev/u/testaccountXD/edit\">Account Settings</a></li>\n                                <li><a class=\"menu-topbar-dropdown-logout\"\n                                       href=\"http://test.dev/action/user/logout?ossn_ts=1483038027&amp;ossn_token=49d507df3e7384589b9f17d68e117475\">Log\n                                    out</a></li>\n                            </ul>\n                        </div>\n                    </li>\n                    <li id=\"ossn-notif-friends\">\n                        <a onclick=\"Ossn.NotificationFriendsShow(this);\" class=\"ossn-notifications-friends\"\n                           href=\"javascript:void(0);\">\n                       <span>\n                                                <span class=\"ossn-notification-container hidden\"></span>\n                          <div class=\"ossn-icon ossn-icons-topbar-friends\"><i class=\"fa fa-users\"></i></div>\n                                             </span>\n                        </a>\n                    </li>\n                    <li id=\"ossn-notif-messages\">\n                        <a onclick=\"Ossn.NotificationMessagesShow(this)\" href=\"javascript:void(0);\"\n                           class=\"ossn-notifications-messages\" role=\"button\" data-toggle=\"dropdown\">\n\n                       <span>\n                                                    <span class=\"ossn-notification-container hidden\"></span>\n                            <div class=\"ossn-icon ossn-icons-topbar-messages\"><i class=\"fa fa-envelope\"></i></div>\n                                               </span>\n                        </a></li>\n\n                    <li id=\"ossn-notif-notification\">\n                        <a href=\"javascript:void(0);\" onclick=\"Ossn.NotificationShow(this)\"\n                           class=\"ossn-notifications-notification\" role=\"button\" data-toggle=\"dropdown\">\n                       <span>\n                                                  <span class=\"ossn-notification-container hidden\"></span>\n                           <div class=\"ossn-icon ossn-icons-topbar-notification\"><i class=\"fa fa-globe\"></i></div>\n                                              </span>\n                        </a>\n\n                    </li>\n                    <div class=\"dropdown\">\n                        <div class=\"dropdown-menu multi-level dropmenu-topbar-icons ossn-notifications-box\">\n                            <div class=\"selected\"></div>\n                            <div class=\"type-name\"> Notifications</div>\n                            <div class=\"metadata\">\n                                <div style=\"height: 66px;\">\n                                    <div class=\"ossn-loading ossn-notification-box-loading\"></div>\n                                </div>\n                                <div class=\"bottom-all\">\n                                    <a href=\"#\">See All</a>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ },

/***/ 712:
/***/ function(module, exports) {

module.exports = "<div class=\"friend row\">\n    <div class=\"col-xs-4\">\n        <img class=\"friend-avatar\" [src]=\"friend.avatarSrc\"/>\n    </div>\n    <div class=\"friend-info col-xs-8\">\n        <h3><a [routerLink]=\"'/profile/'+friend.profileId + '/friends'\">{{ fullName }}</a></h3>\n        <h5>{{ friend.university }}</h5>\n    </div>\n</div>\n"

/***/ },

/***/ 713:
/***/ function(module, exports) {

module.exports = "<h1>Friends</h1>\n<ul>\n    <li *ngFor=\"let friend of friends\">\n        <socnet-friend-item [friend]=\"friend\"></socnet-friend-item>\n    </li>\n</ul>\n"

/***/ },

/***/ 714:
/***/ function(module, exports) {

module.exports = "<img style=\"max-height: 150px;\" [src]=\"user.avatarSrc\"/>\n<h1>{{ user.firstName + \" \" + user.lastName }}</h1>\n<h3>{{ user.university }}</h3>\n\n<router-outlet></router-outlet>\n"

/***/ },

/***/ 981:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(428);


/***/ }

},[981]);
//# sourceMappingURL=main.bundle.map