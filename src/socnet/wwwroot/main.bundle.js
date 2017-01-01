webpackJsonp([0,3],{

/***/ 102:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token_service__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__api_config__ = __webpack_require__(465);
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
            'Authorization': 'Bearer ' + this.tokenService.getAccessToken(),
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ headers: headers });
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__api_config__["a" /* BaseUrl */] + url, body, options);
    };
    ApiHttpService.prototype.get = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer ' + this.tokenService.getAccessToken(),
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ headers: headers });
        return this.http.get(__WEBPACK_IMPORTED_MODULE_3__api_config__["a" /* BaseUrl */] + url, options);
    };
    ApiHttpService.prototype.delete = function (url) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Authorization': 'Bearer ' + this.tokenService.getAccessToken(),
        });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* RequestOptions */]({ headers: headers });
        return this.http.delete(__WEBPACK_IMPORTED_MODULE_3__api_config__["a" /* BaseUrl */] + url, options);
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

/***/ 1165:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(546);


/***/ },

/***/ 281:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__api_config__ = __webpack_require__(465);
/* harmony export (immutable) */ exports["a"] = resolveAvatarPath;

function resolveAvatarPath(path) {
    if (path == null) {
        return "assets/images/default-avatar.jpg";
    }
    return __WEBPACK_IMPORTED_MODULE_0__api_config__["a" /* BaseUrl */] + "/" + path;
}
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/helpers.js.map

/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_http_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__helpers__ = __webpack_require__(281);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return InviteService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InviteService = (function () {
    function InviteService(apiHttpService) {
        this.apiHttpService = apiHttpService;
    }
    InviteService.prototype.getProfileInvites = function (profileId) {
        var url = "/api/profile/" + profileId.toString() + "/invites";
        console.log(url);
        return this.apiHttpService.get(url).map(function (x) { return x.json(); }).map(function (x) {
            for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
                var invite = x_1[_i];
                invite.friend.avatarSrc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__helpers__["a" /* resolveAvatarPath */])(invite.friend.avatarSrc);
            }
            return x;
        });
    };
    InviteService.prototype.acceptInvite = function (profileId, inviteId) {
        return this.apiHttpService.post("/api/profile/" + profileId.toString() + "/invites/" + inviteId, null)
            .map(function (res) { return res.status == 200; });
    };
    InviteService.prototype.declineInvite = function (profileId, inviteId) {
        return this.apiHttpService.delete("/api/profile/" + profileId.toString() + "/invites/" + inviteId)
            .map(function (res) { return res.status == 200; });
    };
    InviteService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__api_http_service__["a" /* ApiHttpService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__api_http_service__["a" /* ApiHttpService */]) === 'function' && _a) || Object])
    ], InviteService);
    return InviteService;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/invite.service.js.map

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_http_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers__ = __webpack_require__(281);
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
        return this.apiHttpService.get("/api/profile/" + id.toString()).map(function (x) { return x.json(); }).map(function (x) {
            if (x != null) {
                x.avatarSrc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers__["a" /* resolveAvatarPath */])(x.avatarSrc);
            }
            return x;
        });
    };
    ProfileService.prototype.getProfileFriends = function (id) {
        return this.apiHttpService.get("/api/profile/" + id.toString() + "/friends").map(function (x) { return x.json(); }).map(function (x) {
            for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
                var friend = x_1[_i];
                friend.avatarSrc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers__["a" /* resolveAvatarPath */])(friend.avatarSrc);
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

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    TokenService.prototype.getAccessToken = function () {
        return localStorage.getItem("access_token");
    };
    TokenService.prototype.setAccessToken = function (access_token) {
        if (access_token) {
            localStorage.setItem("access_token", access_token);
            var claims = access_token.split('.')[1];
            claims = atob(claims);
            if (claims != null) {
                localStorage.setItem("claims", claims);
            }
        }
    };
    TokenService.prototype.getRefreshToken = function () {
        return localStorage.getItem("refresh_token");
    };
    TokenService.prototype.setRefreshToken = function (refresh_token) {
        localStorage.setItem("refresh_token", refresh_token);
    };
    TokenService.prototype.setTokens = function (tokens) {
        this.setAccessToken(tokens.access_token);
        this.setRefreshToken(tokens.refresh_token);
    };
    TokenService.prototype.deleteTokenData = function () {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("claims");
    };
    TokenService.prototype.getClaim = function (claim) {
        return JSON.parse(localStorage.getItem("claims"))[claim];
    };
    TokenService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], TokenService);
    return TokenService;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/token.service.js.map

/***/ },

/***/ 456:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__service_group_admin_service__ = __webpack_require__(708);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupAdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GroupAdminComponent = (function () {
    function GroupAdminComponent(groupAdmin) {
        this.groupAdmin = groupAdmin;
    }
    GroupAdminComponent.prototype.ngOnInit = function () {
    };
    GroupAdminComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-group-admin',
            template: __webpack_require__(894),
            styles: [__webpack_require__(877)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__service_group_admin_service__["a" /* GroupAdminService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__service_group_admin_service__["a" /* GroupAdminService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__service_group_admin_service__["a" /* GroupAdminService */]) === 'function' && _a) || Object])
    ], GroupAdminComponent);
    return GroupAdminComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-admin.component.js.map

/***/ },

/***/ 457:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_group_service__ = __webpack_require__(85);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupMembersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GroupMembersComponent = (function () {
    function GroupMembersComponent(route, groupService) {
        this.route = route;
        this.groupService = groupService;
    }
    GroupMembersComponent.prototype.ngOnInit = function () {
    };
    GroupMembersComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-group-members',
            template: __webpack_require__(896),
            styles: [__webpack_require__(879)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_group_service__["a" /* GroupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_services_group_service__["a" /* GroupService */]) === 'function' && _b) || Object])
    ], GroupMembersComponent);
    return GroupMembersComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-members.component.js.map

/***/ },

/***/ 458:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_group_service__ = __webpack_require__(85);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupPostsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GroupPostsComponent = (function () {
    function GroupPostsComponent(route, groupService) {
        this.route = route;
        this.groupService = groupService;
        this.posts = [];
        this.loading = true;
    }
    GroupPostsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.groupIdSub = this.route.parent.params.subscribe(function (params) {
            _this.groupId = params["groupId"];
            _this.groupService.isMember(_this.groupId).subscribe(function (res) {
                if (res) {
                    _this.loading = true;
                    _this.isMember = true;
                    _this.groupService.getPosts(_this.groupId).subscribe(function (posts) {
                        _this.posts = posts;
                        _this.loading = false;
                    });
                }
                else {
                    _this.isMember = false;
                }
            });
        });
    };
    GroupPostsComponent.prototype.ngOnDestroy = function () {
        if (this.groupIdSub != null) {
            this.groupIdSub.unsubscribe();
        }
    };
    GroupPostsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-group-posts',
            template: __webpack_require__(899),
            styles: [__webpack_require__(882)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_group_service__["a" /* GroupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_services_group_service__["a" /* GroupService */]) === 'function' && _b) || Object])
    ], GroupPostsComponent);
    return GroupPostsComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-posts.component.js.map

/***/ },

/***/ 459:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return EGroupStatus; });
var EGroupStatus;
(function (EGroupStatus) {
    EGroupStatus[EGroupStatus["Member"] = 0] = "Member";
    EGroupStatus[EGroupStatus["NotMember"] = 1] = "NotMember";
    EGroupStatus[EGroupStatus["RequestSent"] = 2] = "RequestSent";
})(EGroupStatus || (EGroupStatus = {}));
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-status.enum.js.map

/***/ },

/***/ 460:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_group_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__group_status_enum__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_user_data_service__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GroupComponent = (function () {
    function GroupComponent(route, groupService, userService) {
        this.route = route;
        this.groupService = groupService;
        this.userService = userService;
        this.isMember = __WEBPACK_IMPORTED_MODULE_3__group_status_enum__["a" /* EGroupStatus */].NotMember;
        this.groupId = -1;
        this.groupExists = false;
        this.ready = true;
    }
    GroupComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.ready = true;
            _this.groupId = params["groupId"];
            _this.groupService.getGroupData(_this.groupId).subscribe(function (data) {
                if (data == null) {
                    _this.groupName = "no group";
                    _this.groupDescription = "this group doesn't exist";
                    _this.groupExists = false;
                }
                else {
                    _this.groupName = data.groupName;
                    _this.groupDescription = data.description;
                    _this.groupExists = true;
                    _this.groupService.isMember(_this.groupId).subscribe(function (res) {
                        if (res) {
                            _this.groupService.isAdmin(_this.groupId).subscribe(function (res) {
                                _this.isAdmin = res;
                            });
                            _this.isMember = __WEBPACK_IMPORTED_MODULE_3__group_status_enum__["a" /* EGroupStatus */].Member;
                        }
                        else {
                            _this.groupService.hasSentMembershipRequest(_this.groupId).subscribe(function (res) {
                                if (res.hasSent === true) {
                                    _this.isMember = __WEBPACK_IMPORTED_MODULE_3__group_status_enum__["a" /* EGroupStatus */].RequestSent;
                                }
                                else {
                                    _this.isMember = __WEBPACK_IMPORTED_MODULE_3__group_status_enum__["a" /* EGroupStatus */].NotMember;
                                }
                            });
                        }
                    });
                }
            });
        });
    };
    GroupComponent.prototype.sendMembershipRequest = function () {
        var _this = this;
        if (this.groupId != -1) {
            this.ready = false;
            this.groupService.sendMembershipRequest(this.groupId).subscribe(function (res) {
                _this.isMember = __WEBPACK_IMPORTED_MODULE_3__group_status_enum__["a" /* EGroupStatus */].RequestSent;
                _this.ready = true;
            }, function (err) {
                _this.ready = true;
            });
        }
    };
    GroupComponent.prototype.isGroupMember = function () {
        return this.isMember == __WEBPACK_IMPORTED_MODULE_3__group_status_enum__["a" /* EGroupStatus */].Member;
    };
    GroupComponent.prototype.groupUrl = function () {
        return 'group/' + this.groupId + '/';
    };
    GroupComponent.prototype.leaveGroup = function () {
        var _this = this;
        if (this.groupId != -1) {
            this.ready = false;
            this.groupService.leaveGroup(this.groupId).subscribe(function (res) {
                if (res.deleted) {
                    _this.isMember = __WEBPACK_IMPORTED_MODULE_3__group_status_enum__["a" /* EGroupStatus */].NotMember;
                    _this.userService.refreshToken();
                    _this.ready = true;
                }
            }, function (err) {
                _this.ready = true;
            });
        }
    };
    GroupComponent.prototype.ngOnDestroy = function () {
        if (this.sub)
            this.sub.unsubscribe();
    };
    GroupComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-group',
            template: __webpack_require__(900),
            styles: [__webpack_require__(883)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_group_service__["a" /* GroupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_services_group_service__["a" /* GroupService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_services_user_data_service__["a" /* UserDataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__shared_services_user_data_service__["a" /* UserDataService */]) === 'function' && _c) || Object])
    ], GroupComponent);
    return GroupComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group.component.js.map

/***/ },

/***/ 461:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_profile_service__ = __webpack_require__(283);
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
            template: __webpack_require__(903),
            styles: [__webpack_require__(886)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_profile_service__["a" /* ProfileService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_services_profile_service__["a" /* ProfileService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], FriendListComponent);
    return FriendListComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/friend-list.component.js.map

/***/ },

/***/ 462:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_invite_service__ = __webpack_require__(282);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return InvitesComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InvitesComponent = (function () {
    function InvitesComponent(route, inviteService) {
        this.route = route;
        this.inviteService = inviteService;
        this.invites = [];
    }
    InvitesComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.params.subscribe(function (params) {
            _this.profileId = +params["profileId"];
            console.log(_this.profileId);
            _this.inviteService.getProfileInvites(_this.profileId).subscribe(function (invites) {
                console.log(invites);
                if (invites != null) {
                    _this.invites = invites;
                }
            }, function (err) {
                console.log(err);
            });
        });
    };
    InvitesComponent.prototype.ngOnDestroy = function () {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    };
    InvitesComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-invites',
            template: __webpack_require__(905),
            styles: [__webpack_require__(888)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_invite_service__["a" /* InviteService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_services_invite_service__["a" /* InviteService */]) === 'function' && _b) || Object])
    ], InvitesComponent);
    return InvitesComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/invites.component.js.map

/***/ },

/***/ 463:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ProfileInfoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProfileInfoComponent = (function () {
    function ProfileInfoComponent() {
    }
    ProfileInfoComponent.prototype.ngOnInit = function () {
    };
    ProfileInfoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-profile-info',
            template: __webpack_require__(906),
            styles: [__webpack_require__(889)]
        }), 
        __metadata('design:paramtypes', [])
    ], ProfileInfoComponent);
    return ProfileInfoComponent;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/profile-info.component.js.map

/***/ },

/***/ 464:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_profile_service__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_models_user_data__ = __webpack_require__(470);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_invite_service__ = __webpack_require__(282);
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
            template: __webpack_require__(907),
            styles: [__webpack_require__(890)],
            providers: [__WEBPACK_IMPORTED_MODULE_4__shared_services_invite_service__["a" /* InviteService */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_profile_service__["a" /* ProfileService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_services_profile_service__["a" /* ProfileService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* ActivatedRoute */]) === 'function' && _b) || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/profile.component.js.map

/***/ },

/***/ 465:
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

/***/ 466:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_group_service__ = __webpack_require__(85);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupAdminGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GroupAdminGuard = (function () {
    function GroupAdminGuard(groupService) {
        this.groupService = groupService;
    }
    GroupAdminGuard.prototype.canActivate = function (route, state) {
        var groupId = route.parent.params["groupId"];
        return this.groupService.isAdmin(groupId);
    };
    GroupAdminGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_group_service__["a" /* GroupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_group_service__["a" /* GroupService */]) === 'function' && _a) || Object])
    ], GroupAdminGuard);
    return GroupAdminGuard;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-admin.guard.js.map

/***/ },

/***/ 467:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_group_service__ = __webpack_require__(85);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupExistsGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GroupExistsGuard = (function () {
    function GroupExistsGuard(groupService, router) {
        this.groupService = groupService;
        this.router = router;
    }
    GroupExistsGuard.prototype.canActivate = function (route, state) {
        var groupId = route.params["groupId"];
        return this.groupService.groupExist(groupId);
    };
    GroupExistsGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_group_service__["a" /* GroupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_group_service__["a" /* GroupService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], GroupExistsGuard);
    return GroupExistsGuard;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-exists.guard.js.map

/***/ },

/***/ 468:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_data_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoggedInGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoggedInGuard = (function () {
    function LoggedInGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    LoggedInGuard.prototype.canActivate = function (route, state) {
        if (this.userService.isLoggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/login']);
        }
    };
    LoggedInGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_data_service__["a" /* UserDataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_data_service__["a" /* UserDataService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], LoggedInGuard);
    return LoggedInGuard;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/logged-in.guard.js.map

/***/ },

/***/ 469:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_data_service__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return WatchingOwnDataGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WatchingOwnDataGuard = (function () {
    function WatchingOwnDataGuard(userService) {
        this.userService = userService;
    }
    WatchingOwnDataGuard.prototype.canActivate = function (route, state) {
        var profileId = route.parent.params["profileId"];
        var loggedId = this.userService.getClaim("userId");
        console.log({
            visitId: profileId,
            authedId: loggedId,
            canVisit: loggedId == profileId
        });
        return loggedId == profileId;
    };
    WatchingOwnDataGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_user_data_service__["a" /* UserDataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_user_data_service__["a" /* UserDataService */]) === 'function' && _a) || Object])
    ], WatchingOwnDataGuard);
    return WatchingOwnDataGuard;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/watching-own-data.guard.js.map

/***/ },

/***/ 470:
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

/***/ 471:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_user_data_service__ = __webpack_require__(57);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoginComponent = (function () {
    function LoginComponent(userService) {
        this.userService = userService;
    }
    LoginComponent.prototype.submit = function (form) {
        if (form.username != null && form.username != "" && form.password != null && form.password != "") {
            this.userService.logIn(form.username, form.password);
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-login',
            template: __webpack_require__(908),
            styles: [__webpack_require__(891)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_user_data_service__["a" /* UserDataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_services_user_data_service__["a" /* UserDataService */]) === 'function' && _a) || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/login.component.js.map

/***/ },

/***/ 472:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__register_model__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_services_user_data_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = (function () {
    function RegisterComponent(userService) {
        this.userService = userService;
        this.errors = {
            count: 0,
            username: [],
            email: [],
            password: [],
            confirmPassword: [],
            firstName: [],
            lastName: [],
            university: []
        };
    }
    RegisterComponent.prototype.submit = function (form) {
        var _this = this;
        var data = new __WEBPACK_IMPORTED_MODULE_1__register_model__["a" /* RegisterData */](form.username, form.email, form.password, form.confirmPassword, form.firstName, form.lastName, form.university);
        this.errors = data.checkForValidationErrors();
        if (this.errors.count == 0) {
            this.userService.registerUser(data).catch(function (res) {
                res = res;
                if (res.status = 400) {
                    console.log(res.json());
                }
                return __WEBPACK_IMPORTED_MODULE_3_rxjs__["Observable"].throw(res);
            }).map(function (x) { return x.json(); }).subscribe(function (res) {
                if (res.status == "ok") {
                    _this.userService.logIn(data.username, data.password);
                }
            });
        }
    };
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-register',
            template: __webpack_require__(909),
            styles: [__webpack_require__(892)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_services_user_data_service__["a" /* UserDataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_services_user_data_service__["a" /* UserDataService */]) === 'function' && _a) || Object])
    ], RegisterComponent);
    return RegisterComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/register.component.js.map

/***/ },

/***/ 545:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 545;


/***/ },

/***/ 546:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(676);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(706);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["_40" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/main.js.map

/***/ },

/***/ 57:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_http_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__token_service__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs__ = __webpack_require__(304);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__(49);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserDataService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserDataService = (function () {
    function UserDataService(tokenService, apiHttp, router) {
        this.tokenService = tokenService;
        this.apiHttp = apiHttp;
        this.router = router;
        this.onLogIn = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* EventEmitter */]();
        this.onLogOut = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* EventEmitter */]();
        this.secondsBeforeTokenExpires = 5;
    }
    UserDataService.prototype.isLoggedIn = function () {
        return this.tokenService.getAccessToken() != null;
    };
    UserDataService.prototype.registerUser = function (data) {
        var urlSearchParams = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* URLSearchParams */]();
        urlSearchParams.append('username', data.username);
        urlSearchParams.append('email', data.email);
        urlSearchParams.append('password', data.password);
        urlSearchParams.append('confirmPassword', data.password);
        urlSearchParams.append('firstName', data.firstName);
        urlSearchParams.append('lastName', data.lastName);
        urlSearchParams.append('university', data.university);
        var body = urlSearchParams.toString();
        return this.apiHttp.post('/api/register', body);
    };
    UserDataService.prototype.logIn = function (username, password) {
        var _this = this;
        this.tokenService.deleteTokenData();
        clearTimeout(this.scheduledTokenRefresh);
        var urlSearchParams = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* URLSearchParams */]();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);
        var body = urlSearchParams.toString();
        this.apiHttp.post("/token", body).catch(function (error) {
            error = error;
            if (error.status == 400) {
                return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw("Invalid username or password");
            }
        }).subscribe(function (response) {
            if (response.status == 200) {
                var tokenData = response.json();
                _this.tokenService.setTokens(tokenData);
                _this.scheduledTokenRefresh = setTimeout(function () { _this.refreshToken(); }, (tokenData.expires_in - _this.secondsBeforeTokenExpires) * 1000);
                var username_1 = _this.getClaim("sub");
                var profileId = _this.getClaim("userId");
                _this.onLogIn.emit({ username: username_1, profileId: profileId });
                alert("Welcome, " + username_1);
                _this.router.navigate(['/profile', profileId]);
            }
        }, function (err) {
            alert(err);
            return err;
        });
    };
    /*private loginErrorHandler(error: Response | any) {
     error = error as Response;
     if (error.status == 400) {
     this.logOut();
     return Observable.throw("Incorrect login data");
     }
     }

    private refreshErrorHandler(error: Response | any) {
        error = error as Response;
        if (error.status == 401) {
            this.logOut();
            return Observable.throw("Incorrect refresh token");
        }
    }*/
    UserDataService.prototype.logOut = function () {
        this.tokenService.deleteTokenData();
        this.onLogOut.emit();
        this.router.navigate(['/']);
    };
    UserDataService.prototype.refreshToken = function () {
        var _this = this;
        clearTimeout(this.scheduledTokenRefresh);
        var token = this.tokenService.getRefreshToken();
        if (token == null) {
            return;
        }
        this.tokenService.setAccessToken(token);
        this.apiHttp.post("/refresh", null).catch(function (error) {
            error = error;
            if (error.status == 401) {
                _this.logOut();
                return __WEBPACK_IMPORTED_MODULE_4_rxjs__["Observable"].throw("Incorrect refresh token");
            }
        }).subscribe(function (response) {
            if (response.status == 200) {
                var tokenData = response.json();
                _this.tokenService.setAccessToken(tokenData.access_token);
                _this.scheduledTokenRefresh = setTimeout(function () { _this.refreshToken(); }, (tokenData.expires_in - _this.secondsBeforeTokenExpires) * 1000);
            }
        });
    };
    UserDataService.prototype.getClaim = function (claim) {
        return this.tokenService.getClaim(claim);
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Output */])(), 
        __metadata('design:type', Object)
    ], UserDataService.prototype, "onLogIn", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Output */])(), 
        __metadata('design:type', Object)
    ], UserDataService.prototype, "onLogOut", void 0);
    UserDataService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__token_service__["a" /* TokenService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__token_service__["a" /* TokenService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__api_http_service__["a" /* ApiHttpService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__api_http_service__["a" /* ApiHttpService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5__angular_router__["a" /* Router */]) === 'function' && _c) || Object])
    ], UserDataService);
    return UserDataService;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/user-data.service.js.map

/***/ },

/***/ 705:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_user_data_service__ = __webpack_require__(57);
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
    function AppComponent(userService) {
        this.userService = userService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.userService.refreshToken();
    };
    AppComponent.prototype.ngOnDestroy = function () {
    };
    AppComponent.prototype.login = function (username, password) {
        this.userService.logIn(username, password);
    };
    AppComponent.prototype.test = function () {
        var claim = this.userService.getClaim("member");
        console.log(claim);
    };
    AppComponent.prototype.refresh = function () {
        this.userService.refreshToken();
    };
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(893),
            styles: [__webpack_require__(876)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_user_data_service__["a" /* UserDataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_services_user_data_service__["a" /* UserDataService */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/app.component.js.map

/***/ },

/***/ 706:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(705);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__header_header_component__ = __webpack_require__(715);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routes__ = __webpack_require__(707);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__profile_profile_component__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_services_profile_service__ = __webpack_require__(283);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_services_api_http_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_services_token_service__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__profile_friend_list_friend_list_component__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__profile_friend_list_friend_item_friend_item_component__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__profile_invites_invites_component__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__profile_invites_invite_invite_component__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__shared_services_user_data_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__shared_guards_logged_in_guard__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__user_login_login_component__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__user_register_register_component__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__shared_guards_group_member_guard__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__shared_services_group_service__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__group_group_component__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__group_group_members_group_members_component__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__group_group_admin_group_admin_component__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__shared_guards_group_admin_guard__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__shared_services_notification_service__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__group_group_button_group_button_component__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__group_group_posts_group_posts_component__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__group_group_posts_group_post_group_post_component__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__group_group_posts_group_post_group_comment_group_comment_component__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__profile_profile_info_profile_info_component__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__shared_guards_watching_own_data_guard__ = __webpack_require__(469);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__angular_material__ = __webpack_require__(657);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__shared_guards_group_exists_guard__ = __webpack_require__(467);
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
                __WEBPACK_IMPORTED_MODULE_14__profile_invites_invites_component__["a" /* InvitesComponent */],
                __WEBPACK_IMPORTED_MODULE_15__profile_invites_invite_invite_component__["a" /* InviteComponent */],
                __WEBPACK_IMPORTED_MODULE_18__user_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_19__user_register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_22__group_group_component__["a" /* GroupComponent */],
                __WEBPACK_IMPORTED_MODULE_23__group_group_members_group_members_component__["a" /* GroupMembersComponent */],
                __WEBPACK_IMPORTED_MODULE_24__group_group_admin_group_admin_component__["a" /* GroupAdminComponent */],
                __WEBPACK_IMPORTED_MODULE_27__group_group_button_group_button_component__["a" /* GroupButtonComponent */],
                __WEBPACK_IMPORTED_MODULE_28__group_group_posts_group_posts_component__["a" /* GroupPostsComponent */],
                __WEBPACK_IMPORTED_MODULE_29__group_group_posts_group_post_group_post_component__["a" /* GroupPostComponent */],
                __WEBPACK_IMPORTED_MODULE_30__group_group_posts_group_post_group_comment_group_comment_component__["a" /* GroupCommentComponent */],
                __WEBPACK_IMPORTED_MODULE_31__profile_profile_info_profile_info_component__["a" /* ProfileInfoComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["e" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["e" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_router__["c" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_7__app_routes__["a" /* appRoutes */]),
                __WEBPACK_IMPORTED_MODULE_33__angular_material__["MaterialModule"].forRoot()
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_9__shared_services_profile_service__["a" /* ProfileService */], __WEBPACK_IMPORTED_MODULE_10__shared_services_api_http_service__["a" /* ApiHttpService */], __WEBPACK_IMPORTED_MODULE_11__shared_services_token_service__["a" /* TokenService */],
                __WEBPACK_IMPORTED_MODULE_16__shared_services_user_data_service__["a" /* UserDataService */], __WEBPACK_IMPORTED_MODULE_17__shared_guards_logged_in_guard__["a" /* LoggedInGuard */], __WEBPACK_IMPORTED_MODULE_20__shared_guards_group_member_guard__["a" /* GroupMemberGuard */], __WEBPACK_IMPORTED_MODULE_25__shared_guards_group_admin_guard__["a" /* GroupAdminGuard */], __WEBPACK_IMPORTED_MODULE_21__shared_services_group_service__["a" /* GroupService */],
                __WEBPACK_IMPORTED_MODULE_26__shared_services_notification_service__["a" /* NotificationService */], __WEBPACK_IMPORTED_MODULE_32__shared_guards_watching_own_data_guard__["a" /* WatchingOwnDataGuard */], __WEBPACK_IMPORTED_MODULE_34__shared_guards_group_exists_guard__["a" /* GroupExistsGuard */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/app.module.js.map

/***/ },

/***/ 707:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__profile_profile_component__ = __webpack_require__(464);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__profile_profile_routes__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_guards_logged_in_guard__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_login_login_component__ = __webpack_require__(471);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_register_register_component__ = __webpack_require__(472);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__group_group_component__ = __webpack_require__(460);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__group_group_routes__ = __webpack_require__(714);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_guards_group_exists_guard__ = __webpack_require__(467);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return appRoutes; });








var appRoutes = [
    { path: 'profile/:profileId', component: __WEBPACK_IMPORTED_MODULE_0__profile_profile_component__["a" /* ProfileComponent */], children: __WEBPACK_IMPORTED_MODULE_1__profile_profile_routes__["a" /* profileRoutes */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__shared_guards_logged_in_guard__["a" /* LoggedInGuard */]] },
    { path: 'group/:groupId', component: __WEBPACK_IMPORTED_MODULE_5__group_group_component__["a" /* GroupComponent */], children: __WEBPACK_IMPORTED_MODULE_6__group_group_routes__["a" /* groupRoutes */], canActivate: [__WEBPACK_IMPORTED_MODULE_2__shared_guards_logged_in_guard__["a" /* LoggedInGuard */], __WEBPACK_IMPORTED_MODULE_7__shared_guards_group_exists_guard__["a" /* GroupExistsGuard */]] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_3__user_login_login_component__["a" /* LoginComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_4__user_register_register_component__["a" /* RegisterComponent */] },
    { path: '**', redirectTo: "/" },
];
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/app.routes.js.map

/***/ },

/***/ 708:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_api_http_service__ = __webpack_require__(102);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupAdminService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GroupAdminService = (function () {
    function GroupAdminService(apiHttp) {
        this.apiHttp = apiHttp;
    }
    GroupAdminService.prototype.setSlug = function (newSlug) {
        // put api/group/id/
        // newslug:string
    };
    GroupAdminService.prototype.addMember = function (profileId) {
        // post api/group/id/members
        // profileId:int
        // role=> "user" : "admin"
    };
    GroupAdminService.prototype.removeMember = function (profileId) {
        // delete api/group/id/members/profileId
    };
    GroupAdminService.prototype.setMemberRole = function (profileId, role) {
        // put api/group/id/members/profileId
        // newrole:string
    };
    GroupAdminService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_api_http_service__["a" /* ApiHttpService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_services_api_http_service__["a" /* ApiHttpService */]) === 'function' && _a) || Object])
    ], GroupAdminService);
    return GroupAdminService;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-admin.service.js.map

/***/ },

/***/ 709:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__group_status_enum__ = __webpack_require__(459);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupButtonComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GroupButtonComponent = (function () {
    function GroupButtonComponent() {
        this.requestMembership = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* EventEmitter */]();
        this.leaveGroup = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["_20" /* EventEmitter */]();
    }
    GroupButtonComponent.prototype.hasSentRequest = function () {
        return (this.isMember == __WEBPACK_IMPORTED_MODULE_1__group_status_enum__["a" /* EGroupStatus */].RequestSent);
    };
    GroupButtonComponent.prototype.isGroupMember = function () {
        return (this.isMember == __WEBPACK_IMPORTED_MODULE_1__group_status_enum__["a" /* EGroupStatus */].Member);
    };
    GroupButtonComponent.prototype.clicked2 = function () {
        console.log("sent");
        console.log(this.isMember == __WEBPACK_IMPORTED_MODULE_1__group_status_enum__["a" /* EGroupStatus */].RequestSent);
        console.log("member");
        console.log(this.isMember == __WEBPACK_IMPORTED_MODULE_1__group_status_enum__["a" /* EGroupStatus */].Member);
        console.log("notmember");
        console.log(this.isMember == __WEBPACK_IMPORTED_MODULE_1__group_status_enum__["a" /* EGroupStatus */].NotMember);
    };
    GroupButtonComponent.prototype.clicked = function () {
        if (this.ready) {
            if (this.isGroupMember()) {
                this.leaveGroup.emit();
            }
            else if (!this.isGroupMember()) {
                this.requestMembership.emit();
            }
        }
    };
    GroupButtonComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Object)
    ], GroupButtonComponent.prototype, "groupExists", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__group_status_enum__["a" /* EGroupStatus */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__group_status_enum__["a" /* EGroupStatus */]) === 'function' && _a) || Object)
    ], GroupButtonComponent.prototype, "isMember", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', Object)
    ], GroupButtonComponent.prototype, "ready", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Output */])(), 
        __metadata('design:type', Object)
    ], GroupButtonComponent.prototype, "requestMembership", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Output */])(), 
        __metadata('design:type', Object)
    ], GroupButtonComponent.prototype, "leaveGroup", void 0);
    GroupButtonComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-group-button',
            template: __webpack_require__(895),
            styles: [__webpack_require__(878)]
        }), 
        __metadata('design:paramtypes', [])
    ], GroupButtonComponent);
    return GroupButtonComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-button.component.js.map

/***/ },

/***/ 710:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_group_comment_model__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_group_comment_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__models_group_comment_model__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupCommentComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GroupCommentComponent = (function () {
    function GroupCommentComponent() {
    }
    GroupCommentComponent.prototype.ngOnInit = function () {
    };
    GroupCommentComponent.prototype.upvoteComment = function () {
    };
    GroupCommentComponent.prototype.downvoteComment = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_group_comment_model__["IPostComment"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__models_group_comment_model__["IPostComment"]) === 'function' && _a) || Object)
    ], GroupCommentComponent.prototype, "comment", void 0);
    GroupCommentComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-group-comment',
            template: __webpack_require__(897),
            styles: [__webpack_require__(880)]
        }), 
        __metadata('design:paramtypes', [])
    ], GroupCommentComponent);
    return GroupCommentComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-comment.component.js.map

/***/ },

/***/ 711:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_group_post_model__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_group_post_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__models_group_post_model__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupPostComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GroupPostComponent = (function () {
    function GroupPostComponent() {
    }
    GroupPostComponent.prototype.ngOnInit = function () {
        console.log(this.post);
    };
    GroupPostComponent.prototype.upvotePost = function () {
    };
    GroupPostComponent.prototype.downvotePost = function () {
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__models_group_post_model__["IGroupPost"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__models_group_post_model__["IGroupPost"]) === 'function' && _a) || Object)
    ], GroupPostComponent.prototype, "post", void 0);
    GroupPostComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-group-post',
            template: __webpack_require__(898),
            styles: [__webpack_require__(881)]
        }), 
        __metadata('design:paramtypes', [])
    ], GroupPostComponent);
    return GroupPostComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-post.component.js.map

/***/ },

/***/ 712:
/***/ function(module, exports) {

//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-comment.model.js.map

/***/ },

/***/ 713:
/***/ function(module, exports) {

//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-post.model.js.map

/***/ },

/***/ 714:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__group_members_group_members_component__ = __webpack_require__(457);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_guards_group_admin_guard__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_admin_group_admin_component__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__group_posts_group_posts_component__ = __webpack_require__(458);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return groupRoutes; });




var groupRoutes = [
    { path: 'posts', component: __WEBPACK_IMPORTED_MODULE_3__group_posts_group_posts_component__["a" /* GroupPostsComponent */] },
    { path: 'members', component: __WEBPACK_IMPORTED_MODULE_0__group_members_group_members_component__["a" /* GroupMembersComponent */] },
    { path: 'requests', component: __WEBPACK_IMPORTED_MODULE_2__group_admin_group_admin_component__["a" /* GroupAdminComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__shared_guards_group_admin_guard__["a" /* GroupAdminGuard */]] },
    { path: 'settings', component: __WEBPACK_IMPORTED_MODULE_2__group_admin_group_admin_component__["a" /* GroupAdminComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_1__shared_guards_group_admin_guard__["a" /* GroupAdminGuard */]] },
    { path: '**', redirectTo: 'posts' }
];
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group.routes.js.map

/***/ },

/***/ 715:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_user_data_service__ = __webpack_require__(57);
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
    function HeaderComponent(userService) {
        this.userService = userService;
        this.username = "---";
        this.loggedIn = false;
        this.isDarkTheme = true;
    }
    HeaderComponent.prototype.login = function (username, password) {
        this.userService.logIn(username, password);
    };
    HeaderComponent.prototype.logout = function () {
        this.userService.logOut();
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loggedIn = this.userService.isLoggedIn();
        if (this.loggedIn) {
            this.profileId = this.userService.getClaim("userId");
            this.username = this.userService.getClaim("sub");
        }
        this.logoutSub = this.userService.onLogOut.subscribe(function () {
            _this.loggedIn = false;
        });
        this.loginSub = this.userService.onLogIn.subscribe(function (data) {
            _this.loggedIn = true;
            _this.profileId = data.profileId;
            _this.username = data.username;
        });
    };
    HeaderComponent.prototype.ngOnDestroy = function () {
        this.logoutSub.unsubscribe();
        this.loginSub.unsubscribe();
    };
    HeaderComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-header',
            template: __webpack_require__(901),
            styles: [__webpack_require__(884)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_user_data_service__["a" /* UserDataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_services_user_data_service__["a" /* UserDataService */]) === 'function' && _a) || Object])
    ], HeaderComponent);
    return HeaderComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/header.component.js.map

/***/ },

/***/ 716:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_models_user_data__ = __webpack_require__(470);
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
            template: __webpack_require__(902),
            styles: [__webpack_require__(885)]
        }), 
        __metadata('design:paramtypes', [])
    ], FriendItemComponent);
    return FriendItemComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/friend-item.component.js.map

/***/ },

/***/ 717:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_services_invite_service__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_models_invite__ = __webpack_require__(720);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return InviteComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var InviteComponent = (function () {
    function InviteComponent(inviteService) {
        this.inviteService = inviteService;
    }
    InviteComponent.prototype.ngOnInit = function () {
    };
    InviteComponent.prototype.acceptInvite = function (id) {
        this.inviteService.acceptInvite(this.invite.profile.profileId, this.invite.inviteId).subscribe(function (res) {
            console.log(res);
        });
    };
    InviteComponent.prototype.declineInvite = function (id) {
        this.inviteService.declineInvite(this.invite.profile.profileId, this.invite.inviteId).subscribe(function (res) {
            console.log(res);
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Input */])(), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_models_invite__["a" /* Invite */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__shared_models_invite__["a" /* Invite */]) === 'function' && _a) || Object)
    ], InviteComponent.prototype, "invite", void 0);
    InviteComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["G" /* Component */])({
            selector: 'socnet-invite',
            template: __webpack_require__(904),
            styles: [__webpack_require__(887)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_services_invite_service__["a" /* InviteService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__shared_services_invite_service__["a" /* InviteService */]) === 'function' && _b) || Object])
    ], InviteComponent);
    return InviteComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/invite.component.js.map

/***/ },

/***/ 718:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__friend_list_friend_list_component__ = __webpack_require__(461);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__invites_invites_component__ = __webpack_require__(462);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_info_profile_info_component__ = __webpack_require__(463);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_guards_watching_own_data_guard__ = __webpack_require__(469);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return profileRoutes; });




var profileRoutes = [
    { path: "friends", component: __WEBPACK_IMPORTED_MODULE_0__friend_list_friend_list_component__["a" /* FriendListComponent */] },
    { path: "invites", component: __WEBPACK_IMPORTED_MODULE_1__invites_invites_component__["a" /* InvitesComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_3__shared_guards_watching_own_data_guard__["a" /* WatchingOwnDataGuard */]], pathMatch: "full" },
    { path: "", component: __WEBPACK_IMPORTED_MODULE_2__profile_info_profile_info_component__["a" /* ProfileInfoComponent */] },
    { path: ":**", redirectTo: "" }
];
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/profile.routes.js.map

/***/ },

/***/ 719:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_group_service__ = __webpack_require__(85);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupMemberGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GroupMemberGuard = (function () {
    function GroupMemberGuard(groupService) {
        this.groupService = groupService;
    }
    GroupMemberGuard.prototype.canActivate = function (route, state) {
        var groupId = route.parent.params["groupId"];
        return this.groupService.isMember(groupId);
    };
    GroupMemberGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_group_service__["a" /* GroupService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_group_service__["a" /* GroupService */]) === 'function' && _a) || Object])
    ], GroupMemberGuard);
    return GroupMemberGuard;
    var _a;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group-member.guard.js.map

/***/ },

/***/ 720:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Invite; });
var Invite = (function () {
    function Invite(inviteId, profile, friend) {
        this.inviteId = inviteId;
        this.profile = profile;
        this.friend = friend;
    }
    return Invite;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/invite.js.map

/***/ },

/***/ 721:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NotificationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotificationService = (function () {
    function NotificationService() {
        this._notificationService = alertify;
    }
    NotificationService.prototype.showInformation = function (message, fullscreen) {
        if (fullscreen === void 0) { fullscreen = false; }
    };
    NotificationService.prototype.showSuccessInformation = function (message, fullscreen) {
        if (fullscreen === void 0) { fullscreen = false; }
    };
    NotificationService.prototype.showErrorInformation = function (message, fullscreen) {
        if (fullscreen === void 0) { fullscreen = false; }
    };
    NotificationService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], NotificationService);
    return NotificationService;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/notification.service.js.map

/***/ },

/***/ 722:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return RegisterData; });
var RegisterData = (function () {
    function RegisterData(username, email, password, confirmPassword, firstName, lastName, university) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.firstName = firstName;
        this.lastName = lastName;
        this.university = university;
    }
    RegisterData.prototype.checkForValidationErrors = function () {
        var errors = {
            count: 0,
            username: [],
            email: [],
            password: [],
            confirmPassword: [],
            firstName: [],
            lastName: [],
            university: []
        };
        if (this.username == null || this.username == "")
            errors.username.push("Username cannot be empty");
        if (this.email == null || this.email == "")
            errors.email.push("Email cannot be empty");
        // email valid
        if (!this.email.match(".+@.+..+"))
            errors.email.push("This is not a valid e-mail address");
        if (this.password == null || this.password == "")
            errors.password.push("Password cannot be empty");
        // password min-lenght 6 max 30
        if (this.password.length < 6 || this.password.length > 30)
            errors.password.push("Password should be between 6 and 30 characters long");
        // passwords match
        if (this.password != this.confirmPassword)
            errors.confirmPassword.push("Passwords do not match");
        if (this.firstName == null || this.firstName == "")
            errors.firstName.push("First name cannot be empty");
        if (this.lastName == null || this.lastName == "")
            errors.lastName.push("Last name cannot be empty");
        if (this.university == null || this.university == "")
            errors.university.push("University cannot be empty");
        errors.count = errors.username.length + errors.email.length +
            errors.password.length + +errors.confirmPassword.length +
            errors.firstName.length + errors.lastName.length +
            errors.university.length;
        return errors;
    };
    return RegisterData;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/register.model.js.map

/***/ },

/***/ 723:
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

/***/ 724:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(738);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(731);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(733);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(732);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(730);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(737);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(726);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(735);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(736);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(734);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(739);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(1164);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/polyfills.js.map

/***/ },

/***/ 85:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_http_service__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_data_service__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers__ = __webpack_require__(281);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GroupService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var GroupService = (function () {
    function GroupService(userDataService, apiHttp) {
        this.userDataService = userDataService;
        this.apiHttp = apiHttp;
    }
    GroupService.prototype.getMembers = function (groupId) {
        return this.apiHttp.get('/api/group/' + groupId + '/members').map(function (response) {
            if (response.status == 200) {
                return response.json();
            }
            else {
                return [];
            }
        }).map(function (x) {
            for (var _i = 0, x_1 = x; _i < x_1.length; _i++) {
                var member = x_1[_i];
                member.profile.avatarSrc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers__["a" /* resolveAvatarPath */])(member.profile.avatarSrc);
            }
            return x;
        });
    };
    GroupService.prototype.groupExist = function (groupId) {
        return this.apiHttp.get('/api/group/' + groupId + '/id/').map(function (x) { return x.status == 200; });
    };
    GroupService.prototype.hasSentMembershipRequest = function (groupId) {
        return this.apiHttp.get('/api/group/' + groupId + '/request/' + this.userDataService.getClaim("userId")).map(function (x) { return x.json(); });
    };
    GroupService.prototype.getGroupData = function (groupId) {
        return this.apiHttp.get('/api/group/' + groupId).map(function (x) { return x.json(); });
    };
    GroupService.prototype.leaveGroup = function (groupId) {
        return this.apiHttp.delete('/api/group/' + groupId + '/members/' + this.userDataService.getClaim("userId")).map(function (x) { return x.json(); });
    };
    GroupService.prototype.isMember = function (groupId) {
        var _this = this;
        return this.apiHttp.get('/api/group/' + groupId + '/id/').map(function (x) {
            var res = x.json();
            if (res == null)
                return false;
            var userGroups = _this.userDataService.getClaim('member');
            if (userGroups == null)
                return false;
            return [].concat(userGroups).indexOf(res) >= 0;
        });
    };
    GroupService.prototype.sendMembershipRequest = function (groupId) {
        return this.apiHttp.post('/api/group/' + groupId + '/request', null);
    };
    GroupService.prototype.getPosts = function (groupId) {
        return this.apiHttp.get('/api/group/' + groupId + '/posts').map(function (x) { return x.json(); }).map(function (posts) {
            for (var _i = 0, _a = posts; _i < _a.length; _i++) {
                var post = _a[_i];
                if (post.profile) {
                    post.profile.avatarSrc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers__["a" /* resolveAvatarPath */])(post.profile.avatarSrc);
                }
                if (post.comments) {
                    for (var _b = 0, _c = post.comments; _b < _c.length; _b++) {
                        var comment = _c[_b];
                        if (comment.profile) {
                            comment.profile.avatarSrc = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__helpers__["a" /* resolveAvatarPath */])(comment.profile.avatarSrc);
                        }
                    }
                }
            }
            return posts;
        });
    };
    GroupService.prototype.isAdmin = function (groupId) {
        var _this = this;
        return this.apiHttp.get('/api/group/' + groupId + '/id/').map(function (x) {
            var res = x.json();
            if (res == null)
                return false;
            var userGroups = _this.userDataService.getClaim('admin');
            if (userGroups == null)
                return false;
            return [].concat(userGroups).indexOf(res) >= 0;
        });
    };
    GroupService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["R" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__user_data_service__["a" /* UserDataService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__user_data_service__["a" /* UserDataService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__api_http_service__["a" /* ApiHttpService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__api_http_service__["a" /* ApiHttpService */]) === 'function' && _b) || Object])
    ], GroupService);
    return GroupService;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/Adam/Documents/Visual Studio 2015/Projects/socnet/src/FrontEnd/src/group.service.js.map

/***/ },

/***/ 876:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 877:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 878:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 879:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 880:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 881:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 882:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 883:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 884:
/***/ function(module, exports) {

module.exports = ".filling{\r\n    -webkit-box-flex: 1;\r\n        -ms-flex: 1 1 auto;\r\n            flex: 1 1 auto;\r\n}\r\n"

/***/ },

/***/ 885:
/***/ function(module, exports) {

module.exports = ".friend{\r\n    border: 1px solid black;\r\n    background: #888;\r\n    padding: 2px;\r\n}\r\n\r\n.friend-avatar{\r\n    height: 100px;\r\n}\r\n\r\n.friend-info{\r\n    text-align: left;\r\n}\r\n"

/***/ },

/***/ 886:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 887:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 888:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 889:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 890:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 891:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 892:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 893:
/***/ function(module, exports) {

module.exports = "<socnet-header></socnet-header>\r\n<a (click)=\"login('user','P@$$w0rd');\">User</a>\r\n<a (click)=\"login('admin','P@$$w0rd');\">Admin</a>\r\n<a (click)=\"login('test','P@$$w0rd');\">Test</a>|\r\n<input type=\"text\" #route (input)=\"1==1\"/>\r\n<a [routerLink]=\"route.value\">Go</a>\r\n\r\n<div class=\"container\">\r\n    <router-outlet></router-outlet>\r\n</div>\r\n"

/***/ },

/***/ 894:
/***/ function(module, exports) {

module.exports = "<p>\r\n  group-admin works!\r\n</p>\r\n"

/***/ },

/***/ 895:
/***/ function(module, exports) {

module.exports = "<p *ngIf=\"groupExists\">\n    <a id=\"group-btn\" class=\"pull-right btn btn-lg\" [class.btn-info]=\"!ready\" [class.btn-danger]=\"(isGroupMember() || hasSentRequest()) && ready\" [class.btn-success]=\"!isGroupMember() && ready\"\n       (click)=\"clicked();\">\n        <span *ngIf=\"ready && (!isGroupMember() && !hasSentRequest())\">Request membership</span>\n        <span *ngIf=\"ready && (!isGroupMember() && hasSentRequest())\">Cancel request</span>\n        <span *ngIf=\"ready && isGroupMember()\">Leave group</span>\n        <span *ngIf=\"!ready\"><img src=\"../../../assets/images/loading-small.svg\"/> Please wait...</span>\n    </a>\n</p>\n"

/***/ },

/***/ 896:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 897:
/***/ function(module, exports) {

module.exports = "<div class=\"comment row\">\n    <div class=\"col-sm-offset-2\">\n        <div class=\"comment-header row\">\n            <div class=\"col-sm-4\">\n                <img [src]=\"comment.profile.avatarSrc\" class=\"img img-responsive\" style=\"max-height: 40px;\">\n            </div>\n            <div class=\"col-sm-8\">\n                <h3>{{ comment.profile.firstName + ' ' + comment.profile.lastName }}</h3>\n            </div>\n        </div>\n        <div class=\"comment-content row\">\n            <div class=\"col-sm-9\">\n                <p>{{ comment.content }}</p>\n            </div>\n            <div class=\"col-sm-3\">\n                <span>+</span>\n                <span>{{ comment.rating }}</span>\n                <span>-</span>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ },

/***/ 898:
/***/ function(module, exports) {

module.exports = "<div class=\"post-header\">\n    <div class=\"col-md-4\">\n        <img [src]=\"post.profile.avatarSrc\" class=\"img-responsive img\" style=\"max-height: 80px;\"/>\n    </div>\n    <div class=\"col-md-8\">\n        <h3>{{ post.profile.firstName + ' ' + post.profile.lastName }}</h3>\n    </div>\n</div>\n<div class=\"post-content\">\n    <p>{{ post.content }}</p>\n</div>\n<div class=\"post-rating\">\n    <span>+</span>\n    <span>{{ post.rating }}</span>\n    <span>-</span>\n</div>\n<div class=\"post-comments row\">\n    <div class=\"col-offset-3\">\n        <div class=\"post-comment\" *ngFor=\"let comment of post.comments\">\n            <socnet-group-comment [comment]=\"comment\"></socnet-group-comment>\n        </div>\n    </div>\n</div>\n<div class=\"post-new-comment\" style=\"border-bottom: 1px solid black\">\n    new comment bar\n</div>\n"

/***/ },

/***/ 899:
/***/ function(module, exports) {

module.exports = "<div class=\"container posts row\" *ngIf=\"isMember\">\n    <div *ngIf=\"loading\">\n        loading posts.....\n    </div>\n    <div *ngIf=\"!loading\">\n        <div class=\"post col-sm-12\" *ngFor=\"let post of posts\">\n            <socnet-group-post [post]=\"post\"></socnet-group-post>\n        </div>\n    </div>\n</div>\n<div class=\"container posts\" *ngIf=\"!isMember\">\n    join to browse\n</div>\n"

/***/ },

/***/ 900:
/***/ function(module, exports) {

module.exports = "<div class=\"jumbotron row\">\r\n    <h1>{{ groupName }}</h1>\r\n    <p class=\"lead\">{{ groupDescription }}</p>\r\n    <socnet-group-button [ready]=\"ready\" [isMember]=\"isMember\" [groupExists]=\"groupExists\"\r\n                         (requestMembership)=\"sendMembershipRequest();\"\r\n                         (leaveGroup)=\"leaveGroup();\"></socnet-group-button>\r\n</div>\r\n<div class=\"row\">\r\n    <nav class=\"navbar navbar-default col-sm-12\">\r\n        <div class=\"container-fluid\">\r\n            <!-- Brand and toggle get grouped for better mobile display -->\r\n            <div class=\"navbar-header\">\r\n                <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\"\r\n                        data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\r\n                    <span class=\"sr-only\">Toggle navigation</span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                    <span class=\"icon-bar\"></span>\r\n                </button>\r\n            </div>\r\n            <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\r\n                <ul class=\"nav navbar-nav\">\r\n                    <li routerLinkActive=\"active\"><a [routerLink]=\"'/group/'+groupId+'/posts'\">Posts</a></li>\r\n                    <li routerLinkActive=\"active\"><a [routerLink]=\"'/group/'+groupId+'/members'\">Members</a></li>\r\n                    <li routerLinkActive=\"active\" *ngIf=\"isAdmin\"><a [routerLink]=\"'/group/'+groupId+'/requests'\">Requests</a></li>\r\n                    <li routerLinkActive=\"active\" *ngIf=\"isAdmin\"><a [routerLink]=\"'/group/'+groupId+'/settings'\">Settings</a></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n</div>\r\n<router-outlet></router-outlet>\r\n"

/***/ },

/***/ 901:
/***/ function(module, exports) {

module.exports = "<!-- <li class=\"pull-right\" *ngIf=\"loggedIn\"><a [routerLink]=\"'/profile/'+ profileId\">{{ username }}</a></li>\r\n<li class=\"pull-right\" *ngIf=\"loggedIn\"><a (click)=\"logout();\">Logout</a></li>\r\n<li class=\"pull-right\" *ngIf=\"!loggedIn\"><a routerLink=\"/register\">Register</a></li>\r\n<li class=\"pull-right\" *ngIf=\"!loggedIn\"><a routerLink=\"/login\">Login</a></li> -->\r\n<md-toolbar color=\"primary\" class=\"md-elevation-z3\">\r\n    <span>Socnet</span>\r\n\r\n    <span class=\"filling\"></span>\r\n\r\n    <span *ngIf=\"loggedIn\"><span [routerLink]=\"'/profile/'+ profileId\">{{ username }}</span></span>\r\n    <span *ngIf=\"loggedIn\"><a (click)=\"logout();\">Logout</a></span>\r\n    <span *ngIf=\"!loggedIn\"><a routerLink=\"/register\">Register</a></span>\r\n    <span *ngIf=\"!loggedIn\"><a routerLink=\"/login\">Login</a></span>\r\n</md-toolbar>\r\n"

/***/ },

/***/ 902:
/***/ function(module, exports) {

module.exports = "<div class=\"friend row\">\n    <div class=\"col-xs-4\">\n        <img class=\"friend-avatar\" [src]=\"friend.avatarSrc\"/>\n    </div>\n    <div class=\"friend-info col-xs-8\">\n        <h3><a [routerLink]=\"'/profile/'+friend.profileId + '/friends'\">{{ fullName }}</a></h3>\n        <h5>{{ friend.university }}</h5>\n    </div>\n</div>\n"

/***/ },

/***/ 903:
/***/ function(module, exports) {

module.exports = "<h1>Friends</h1>\n<ul>\n    <li *ngFor=\"let friend of friends\">\n        <socnet-friend-item [friend]=\"friend\"></socnet-friend-item>\n    </li>\n</ul>\n"

/***/ },

/***/ 904:
/***/ function(module, exports) {

module.exports = "<div class=\"invite row\">\n    <div class=\"col-xs-4\">\n        <img class=\"friend-avatar\" [src]=\"invite.friend.avatarSrc\"/>\n    </div>\n    <div class=\"friend-info col-xs-4\">\n        <h3><a [routerLink]=\"'/profile/'+invite.friend.profileId + '/friends'\">{{ fullName }}</a></h3>\n        <h5>{{ invite.friend.university }}</h5>\n    </div>\n    <div class=\"friend-commands col-xs-4\">\n        <button class=\"btn success\" (click)=\"acceptInvite(invite.inviteId)\">Accept</button>\n        <button class=\"btn btn-danger\" (click)=\"declineInvite(invite.inviteId)\">Decline</button>\n    </div>\n</div>\n"

/***/ },

/***/ 905:
/***/ function(module, exports) {

module.exports = "<ul>\n    <li *ngFor=\"let invite of invites\">\n        <socnet-invite [invite]=\"invite\"></socnet-invite>\n    </li>\n</ul>\n"

/***/ },

/***/ 906:
/***/ function(module, exports) {

module.exports = "<p>\n  profile-info works!\n</p>\n"

/***/ },

/***/ 907:
/***/ function(module, exports) {

module.exports = "<img style=\"max-height: 150px;\" [src]=\"user.avatarSrc\"/>\n<h1>{{ user.firstName + \" \" + user.lastName }}</h1>\n<h3>{{ user.university }}</h3>\n\n<router-outlet></router-outlet>\n"

/***/ },

/***/ 908:
/***/ function(module, exports) {

module.exports = "<form #form=\"ngForm\">\r\n    <md-input-container>\r\n        <input name=\"username\" md-input placeholder=\"Username\" ngModel/>\r\n    </md-input-container>\r\n    <md-input-container password>\r\n        <input name=\"password\" type=\"password\" md-input placeholder=\"Password\" ngModel/>\r\n    </md-input-container>\r\n    <button md-button type=\"submit\" (click)=\"submit(form.value);\" class=\"btn btn-default\">Login</button>\r\n</form>\r\n"

/***/ },

/***/ 909:
/***/ function(module, exports) {

module.exports = "<form #form=\"ngForm\">\r\n    <h4>Create a new account.</h4>\r\n    <hr/>\r\n\r\n    <div class=\"form-group\">\r\n        <label for=\"username\" class=\"col-md-2 control-label\">Username</label>\r\n        <div class=\"col-md-10\">\r\n            <input id=\"username\" name=\"username\" class=\"form-control\" ngModel/>\r\n        </div>\r\n        <div class=\"text-danger\">\r\n            <ul>\r\n                <li *ngFor=\"let validError of errors.username\">{{ validError }}</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <label for=\"email\" class=\"col-md-2 control-label\">E-mail</label>\r\n        <div class=\"col-md-10\">\r\n            <input id=\"email\" type=\"text\" name=\"email\" class=\"form-control\" ngModel/>\r\n        </div>\r\n        <div class=\"text-danger\">\r\n            <ul>\r\n                <li *ngFor=\"let validError of errors.email\">{{ validError }}</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <label for=\"password\" class=\"col-md-2 control-label\">Password</label>\r\n        <div class=\"col-md-10\">\r\n            <input id=\"password\" type=\"password\" name=\"password\" class=\"form-control\" ngModel/>\r\n        </div>\r\n        <div class=\"text-danger\">\r\n            <ul>\r\n                <li *ngFor=\"let validError of errors.password\">{{ validError }}</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <label for=\"confirmPassword\" class=\"col-md-2 control-label\">Confirm password</label>\r\n        <div class=\"col-md-10\">\r\n            <input id=\"confirmPassword\" type=\"password\" name=\"confirmPassword\" class=\"form-control\" ngModel/>\r\n        </div>\r\n        <div class=\"text-danger\">\r\n            <ul>\r\n                <li *ngFor=\"let validError of errors.confirmPassword\">{{ validError }}</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <hr/>\r\n    <div class=\"form-group\">\r\n        <label for=\"firstName\" class=\"col-md-2 control-label\">First Name</label>\r\n        <div class=\"col-md-10\">\r\n            <input id=\"firstName\" name=\"firstName\" class=\"form-control\" ngModel/>\r\n        </div>\r\n        <div class=\"text-danger\">\r\n            <ul>\r\n                <li *ngFor=\"let validError of errors.firstName\">{{ validError }}</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <label for=\"lastName\" class=\"col-md-2 control-label\">Last Name</label>\r\n        <div class=\"col-md-10\">\r\n            <input id=\"lastName\" name=\"lastName\" class=\"form-control\" ngModel/>\r\n        </div>\r\n        <div class=\"text-danger\">\r\n            <ul>\r\n                <li *ngFor=\"let validError of errors.lastName\">{{ validError }}</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <label for=\"university\" class=\"col-md-2 control-label\">University</label>\r\n        <div class=\"col-md-10\">\r\n            <input id=\"university\" name=\"university\" class=\"form-control\" ngModel/>\r\n        </div>\r\n        <div class=\"text-danger\">\r\n            <ul>\r\n                <li *ngFor=\"let validError of errors.university\">{{ validError }}</li>\r\n            </ul>\r\n        </div>\r\n    </div>\r\n    <div class=\"form-group\">\r\n        <div class=\"col-md-offset-2 col-md-10\">\r\n            <button type=\"submit\" (click)=\"submit(form.value);\" class=\"btn btn-default\">Register</button>\r\n        </div>\r\n    </div>\r\n</form>\r\n"

/***/ }

},[1165]);
//# sourceMappingURL=main.bundle.map