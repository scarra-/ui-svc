(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//require('angular/angular.min');
require('angular-resource/angular-resource.min');
require('angular-route/angular-route.min');
//require('./pusher.min');
//require('./pusher-angular.min');
require('pusher-angular');
require('./my-pusher');




if(typeof angular == 'undefined') {
    alert('no angular');
}


var userApp = angular.module('userApp', ['ngRoute', 'ngResource'])
    .factory('UserService', ['$resource', function($resource) {
        return $resource('/users/:id', {id:'@id'}, {
            update: {method: 'PUT'}
        });
    }])


    .controller('HomeController', [function() {
        var self = this;
        self.title = 'asdasd';
    }])
    .controller('RegisterController', ['UserService', function(UserService) {
        var self = this;

        self.registerUser = function() {
            var user = new UserService(self.user);
            user.$save(function(success) {

                self.user = {};
            }, function(failure) {
                console.log(failure);
            });
        };
    }])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: 'partials/home.html'
        //   controller: 'HomeController'
        })
        .when('/register', {
          templateUrl: 'partials/register.html'
        //   controller: 'RegisterController'
        })
        .otherwise({redirectTo: '/'});
}]);


    var validator = angular.module('userApp', [])
     .controller('Controller', ['$scope', function($scope) {
       $scope.user = {};
//d
     }]);
},{"./my-pusher":5,"angular-resource/angular-resource.min":2,"angular-route/angular-route.min":3,"pusher-angular":4}],2:[function(require,module,exports){
/*
 AngularJS v1.3.14
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(I,d,B){'use strict';function D(f,q){q=q||{};d.forEach(q,function(d,h){delete q[h]});for(var h in f)!f.hasOwnProperty(h)||"$"===h.charAt(0)&&"$"===h.charAt(1)||(q[h]=f[h]);return q}var w=d.$$minErr("$resource"),C=/^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;d.module("ngResource",["ng"]).provider("$resource",function(){var f=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}};
this.$get=["$http","$q",function(q,h){function t(d,g){this.template=d;this.defaults=s({},f.defaults,g);this.urlParams={}}function v(x,g,l,m){function c(b,k){var c={};k=s({},g,k);r(k,function(a,k){u(a)&&(a=a());var d;if(a&&a.charAt&&"@"==a.charAt(0)){d=b;var e=a.substr(1);if(null==e||""===e||"hasOwnProperty"===e||!C.test("."+e))throw w("badmember",e);for(var e=e.split("."),n=0,g=e.length;n<g&&d!==B;n++){var h=e[n];d=null!==d?d[h]:B}}else d=a;c[k]=d});return c}function F(b){return b.resource}function e(b){D(b||
{},this)}var G=new t(x,m);l=s({},f.defaults.actions,l);e.prototype.toJSON=function(){var b=s({},this);delete b.$promise;delete b.$resolved;return b};r(l,function(b,k){var g=/^(POST|PUT|PATCH)$/i.test(b.method);e[k]=function(a,y,m,x){var n={},f,l,z;switch(arguments.length){case 4:z=x,l=m;case 3:case 2:if(u(y)){if(u(a)){l=a;z=y;break}l=y;z=m}else{n=a;f=y;l=m;break}case 1:u(a)?l=a:g?f=a:n=a;break;case 0:break;default:throw w("badargs",arguments.length);}var t=this instanceof e,p=t?f:b.isArray?[]:new e(f),
A={},v=b.interceptor&&b.interceptor.response||F,C=b.interceptor&&b.interceptor.responseError||B;r(b,function(b,a){"params"!=a&&"isArray"!=a&&"interceptor"!=a&&(A[a]=H(b))});g&&(A.data=f);G.setUrlParams(A,s({},c(f,b.params||{}),n),b.url);n=q(A).then(function(a){var c=a.data,g=p.$promise;if(c){if(d.isArray(c)!==!!b.isArray)throw w("badcfg",k,b.isArray?"array":"object",d.isArray(c)?"array":"object");b.isArray?(p.length=0,r(c,function(a){"object"===typeof a?p.push(new e(a)):p.push(a)})):(D(c,p),p.$promise=
g)}p.$resolved=!0;a.resource=p;return a},function(a){p.$resolved=!0;(z||E)(a);return h.reject(a)});n=n.then(function(a){var b=v(a);(l||E)(b,a.headers);return b},C);return t?n:(p.$promise=n,p.$resolved=!1,p)};e.prototype["$"+k]=function(a,b,c){u(a)&&(c=b,b=a,a={});a=e[k].call(this,a,this,b,c);return a.$promise||a}});e.bind=function(b){return v(x,s({},g,b),l)};return e}var E=d.noop,r=d.forEach,s=d.extend,H=d.copy,u=d.isFunction;t.prototype={setUrlParams:function(f,g,l){var m=this,c=l||m.template,h,
e,q=m.urlParams={};r(c.split(/\W/),function(b){if("hasOwnProperty"===b)throw w("badname");!/^\d+$/.test(b)&&b&&(new RegExp("(^|[^\\\\]):"+b+"(\\W|$)")).test(c)&&(q[b]=!0)});c=c.replace(/\\:/g,":");g=g||{};r(m.urlParams,function(b,k){h=g.hasOwnProperty(k)?g[k]:m.defaults[k];d.isDefined(h)&&null!==h?(e=encodeURIComponent(h).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"%20").replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+"),c=c.replace(new RegExp(":"+
k+"(\\W|$)","g"),function(b,a){return e+a})):c=c.replace(new RegExp("(/?):"+k+"(\\W|$)","g"),function(b,a,c){return"/"==c.charAt(0)?c:a+c})});m.defaults.stripTrailingSlashes&&(c=c.replace(/\/+$/,"")||"/");c=c.replace(/\/\.(?=\w+($|\?))/,".");f.url=c.replace(/\/\\\./,"/.");r(g,function(b,c){m.urlParams[c]||(f.params=f.params||{},f.params[c]=b)})}};return v}]})})(window,window.angular);
//# sourceMappingURL=angular-resource.min.js.map

},{}],3:[function(require,module,exports){
/*
 AngularJS v1.3.14
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(q,d,C){'use strict';function v(r,k,h){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(a,f,b,c,y){function z(){l&&(h.cancel(l),l=null);m&&(m.$destroy(),m=null);n&&(l=h.leave(n),l.then(function(){l=null}),n=null)}function x(){var b=r.current&&r.current.locals;if(d.isDefined(b&&b.$template)){var b=a.$new(),c=r.current;n=y(b,function(b){h.enter(b,null,n||f).then(function(){!d.isDefined(t)||t&&!a.$eval(t)||k()});z()});m=c.scope=b;m.$emit("$viewContentLoaded");
m.$eval(w)}else z()}var m,n,l,t=b.autoscroll,w=b.onload||"";a.$on("$routeChangeSuccess",x);x()}}}function A(d,k,h){return{restrict:"ECA",priority:-400,link:function(a,f){var b=h.current,c=b.locals;f.html(c.$template);var y=d(f.contents());b.controller&&(c.$scope=a,c=k(b.controller,c),b.controllerAs&&(a[b.controllerAs]=c),f.data("$ngControllerController",c),f.children().data("$ngControllerController",c));y(a)}}}q=d.module("ngRoute",["ng"]).provider("$route",function(){function r(a,f){return d.extend(Object.create(a),
f)}function k(a,d){var b=d.caseInsensitiveMatch,c={originalPath:a,regexp:a},h=c.keys=[];a=a.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(a,d,b,c){a="?"===c?c:null;c="*"===c?c:null;h.push({name:b,optional:!!a});d=d||"";return""+(a?"":d)+"(?:"+(a?d:"")+(c&&"(.+?)"||"([^/]+)")+(a||"")+")"+(a||"")}).replace(/([\/$\*])/g,"\\$1");c.regexp=new RegExp("^"+a+"$",b?"i":"");return c}var h={};this.when=function(a,f){var b=d.copy(f);d.isUndefined(b.reloadOnSearch)&&(b.reloadOnSearch=!0);
d.isUndefined(b.caseInsensitiveMatch)&&(b.caseInsensitiveMatch=this.caseInsensitiveMatch);h[a]=d.extend(b,a&&k(a,b));if(a){var c="/"==a[a.length-1]?a.substr(0,a.length-1):a+"/";h[c]=d.extend({redirectTo:a},k(c,b))}return this};this.caseInsensitiveMatch=!1;this.otherwise=function(a){"string"===typeof a&&(a={redirectTo:a});this.when(null,a);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(a,f,b,c,k,q,x){function m(b){var e=s.current;
(v=(p=l())&&e&&p.$$route===e.$$route&&d.equals(p.pathParams,e.pathParams)&&!p.reloadOnSearch&&!w)||!e&&!p||a.$broadcast("$routeChangeStart",p,e).defaultPrevented&&b&&b.preventDefault()}function n(){var u=s.current,e=p;if(v)u.params=e.params,d.copy(u.params,b),a.$broadcast("$routeUpdate",u);else if(e||u)w=!1,(s.current=e)&&e.redirectTo&&(d.isString(e.redirectTo)?f.path(t(e.redirectTo,e.params)).search(e.params).replace():f.url(e.redirectTo(e.pathParams,f.path(),f.search())).replace()),c.when(e).then(function(){if(e){var a=
d.extend({},e.resolve),b,g;d.forEach(a,function(b,e){a[e]=d.isString(b)?k.get(b):k.invoke(b,null,null,e)});d.isDefined(b=e.template)?d.isFunction(b)&&(b=b(e.params)):d.isDefined(g=e.templateUrl)&&(d.isFunction(g)&&(g=g(e.params)),g=x.getTrustedResourceUrl(g),d.isDefined(g)&&(e.loadedTemplateUrl=g,b=q(g)));d.isDefined(b)&&(a.$template=b);return c.all(a)}}).then(function(c){e==s.current&&(e&&(e.locals=c,d.copy(e.params,b)),a.$broadcast("$routeChangeSuccess",e,u))},function(b){e==s.current&&a.$broadcast("$routeChangeError",
e,u,b)})}function l(){var a,b;d.forEach(h,function(c,h){var g;if(g=!b){var k=f.path();g=c.keys;var m={};if(c.regexp)if(k=c.regexp.exec(k)){for(var l=1,n=k.length;l<n;++l){var p=g[l-1],q=k[l];p&&q&&(m[p.name]=q)}g=m}else g=null;else g=null;g=a=g}g&&(b=r(c,{params:d.extend({},f.search(),a),pathParams:a}),b.$$route=c)});return b||h[null]&&r(h[null],{params:{},pathParams:{}})}function t(a,b){var c=[];d.forEach((a||"").split(":"),function(a,d){if(0===d)c.push(a);else{var f=a.match(/(\w+)(?:[?*])?(.*)/),
h=f[1];c.push(b[h]);c.push(f[2]||"");delete b[h]}});return c.join("")}var w=!1,p,v,s={routes:h,reload:function(){w=!0;a.$evalAsync(function(){m();n()})},updateParams:function(a){if(this.current&&this.current.$$route)a=d.extend({},this.current.params,a),f.path(t(this.current.$$route.originalPath,a)),f.search(a);else throw B("norout");}};a.$on("$locationChangeStart",m);a.$on("$locationChangeSuccess",n);return s}]});var B=d.$$minErr("ngRoute");q.provider("$routeParams",function(){this.$get=function(){return{}}});
q.directive("ngView",v);q.directive("ngView",A);v.$inject=["$route","$anchorScroll","$animate"];A.$inject=["$compile","$controller","$route"]})(window,window.angular);
//# sourceMappingURL=angular-route.min.js.map

},{}],4:[function(require,module,exports){
"use strict";angular.module("pusher-angular",[]).factory("$pusher",["$rootScope","$channel","$connection",function(a,b,c){function d(a){return this instanceof d?(this._assertValidClient(a),this.client=a,this.connection=c(a.connection,a),this.channels={},void 0):new d(a)}return d.prototype={subscribe:function(a){var c=b(this.client.subscribe(a),this);return this.channels[a]=c,c},unsubscribe:function(a){this.client.channel(a)&&(this.client.unsubscribe(a),this.channels[a]&&delete this.channels[a])},bind:function(b,c){this.client.bind(b,function(b){c(b),a.$digest()})},bind_all:function(b){this.client.bind_all(function(c,d){b(c,d),a.$digest()})},disconnect:function(){this.client.disconnect()},channel:function(a){return this.channels[a]},allChannels:function(){return this.channels},_assertValidClient:function(a){if(!angular.isObject(a)||!angular.isObject(a.connection)||"function"!=typeof a.channel)throw new Error("Invalid Pusher client object")}},d}]).factory("$channel",["$rootScope","$members",function(a,b){function c(a){if(-1==a.indexOf("presence-")&&-1==a.indexOf("private-"))throw new Error("Presence or private channel required")}function d(a,c){return this instanceof d?(this._assertValidChannel(a),this.baseChannel=a,this.client=c,this.name=a.name,this.members=-1==a.name.indexOf("presence")?function(){throw new Error("Members object only exists for presence channels")}:b(a.members,a),void 0):new d(a,c)}return d.prototype={bind:function(b,c){this.baseChannel.bind(b,function(b){c(b),a.$digest()})},bind_all:function(b){this.baseChannel.bind_all(function(c,d){b(c,d),a.$digest()})},trigger:function(a,b){if(c(this.name),-1==a.indexOf("client-"))throw new Error("Event name requires 'client-' prefix");return this.baseChannel.trigger(a,b)},_assertValidChannel:function(a){if(!angular.isObject(a)||"string"!=typeof a.name)throw new Error("Invalid Pusher channel object")}},d}]).factory("$members",["$rootScope",function(a){function b(c,d){if(!(this instanceof b))return new b(c,d);var e=this;this._assertValidMembers(c),this.baseMembers=c,this.baseChannel=d,this.me={},this.count=0,this.members={},d.bind("pusher:subscription_succeeded",function(b){e.me=b.me,e.count=b.count,e.members=b.members,a.$digest()}),d.bind("pusher:member_added",function(b){e.count++,e.members[b.id.toString()]=b.info?b.info:null,a.$digest()}),d.bind("pusher:member_removed",function(b){e.count--,delete e.members[b.id.toString()],a.$digest()})}return b.prototype={get:function(a){return this.baseMembers.get(a)},each:function(b){this.baseMembers.each(function(c){b(c),a.$digest()})},_assertValidMembers:function(a){if(!angular.isObject(a)||"object"!=typeof a.me)throw new Error("Invalid Pusher channel members object")}},b}]).factory("$connection",["$rootScope",function(a){function b(a,c){return this instanceof b?(this._assertValidConnection(a),this.baseConnection=a,this.baseClient=c,void 0):new b(a,c)}return b.prototype={bind:function(b,c){this.baseConnection.bind(b,function(b){c(b),a.$digest()})},bind_all:function(b){this.baseConnection.bind_all(function(c,d){b(c,d),a.$digest()})},_assertValidConnection:function(a){if(!angular.isObject(a))throw new Error("Invalid Pusher connection object")}},b}]);
},{}],5:[function(require,module,exports){
console.info('works');


API_KEY = '7b0cc00ab6716c7191b4';

var apended = '';
var pusher = new Pusher('7b0cc00ab6716c7191b4');
var channel = pusher.subscribe('test_channel');
channel.bind('my_event', function (data) {
    apended = '<li class="activity test-event">'
    + '<div class="stream-item-content">'
    + '<div class="image">'
    + '<img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=monsterid&amp;s=48" width="48" height="48">'
    + '</div>'
    + '<div class="content">'
    + '<div class="activity-row"><span class="user-name"><em>Karlis</em></span>'
    + '</div>'
    + '<div class="activity-row">'
    + '<div class="text">' + data.message + '</div>'
    + '<div class="activity-row"><a class="timestamp"><span title="'+data.time+'">'+data.time+'</span></a><span class="activity-actions"><span class="tweet-action action-favorite"><a href="#" class="like-action" data-activity="like" title="Like"><span><i></i><b>Like</b></span></a></span></span></div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</li>';
    $('.activity-stream').prepend(apended);

});
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9sYXJhdmVsLWVsaXhpci1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJyZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcyIsIm5vZGVfbW9kdWxlcy9hbmd1bGFyLXJlc291cmNlL2FuZ3VsYXItcmVzb3VyY2UubWluLmpzIiwibm9kZV9tb2R1bGVzL2FuZ3VsYXItcm91dGUvYW5ndWxhci1yb3V0ZS5taW4uanMiLCJub2RlX21vZHVsZXMvcHVzaGVyLWFuZ3VsYXIvbGliL3B1c2hlci1hbmd1bGFyLm1pbi5qcyIsInJlc291cmNlcy9hc3NldHMvanMvbXktcHVzaGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy9yZXF1aXJlKCdhbmd1bGFyL2FuZ3VsYXIubWluJyk7XHJcbnJlcXVpcmUoJ2FuZ3VsYXItcmVzb3VyY2UvYW5ndWxhci1yZXNvdXJjZS5taW4nKTtcclxucmVxdWlyZSgnYW5ndWxhci1yb3V0ZS9hbmd1bGFyLXJvdXRlLm1pbicpO1xyXG4vL3JlcXVpcmUoJy4vcHVzaGVyLm1pbicpO1xyXG4vL3JlcXVpcmUoJy4vcHVzaGVyLWFuZ3VsYXIubWluJyk7XHJcbnJlcXVpcmUoJ3B1c2hlci1hbmd1bGFyJyk7XHJcbnJlcXVpcmUoJy4vbXktcHVzaGVyJyk7XHJcblxyXG5cclxuXHJcblxyXG5pZih0eXBlb2YgYW5ndWxhciA9PSAndW5kZWZpbmVkJykge1xyXG4gICAgYWxlcnQoJ25vIGFuZ3VsYXInKTtcclxufVxyXG5cclxuXHJcbnZhciB1c2VyQXBwID0gYW5ndWxhci5tb2R1bGUoJ3VzZXJBcHAnLCBbJ25nUm91dGUnLCAnbmdSZXNvdXJjZSddKVxyXG4gICAgLmZhY3RvcnkoJ1VzZXJTZXJ2aWNlJywgWyckcmVzb3VyY2UnLCBmdW5jdGlvbigkcmVzb3VyY2UpIHtcclxuICAgICAgICByZXR1cm4gJHJlc291cmNlKCcvdXNlcnMvOmlkJywge2lkOidAaWQnfSwge1xyXG4gICAgICAgICAgICB1cGRhdGU6IHttZXRob2Q6ICdQVVQnfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfV0pXHJcblxyXG5cclxuICAgIC5jb250cm9sbGVyKCdIb21lQ29udHJvbGxlcicsIFtmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgc2VsZi50aXRsZSA9ICdhc2Rhc2QnO1xyXG4gICAgfV0pXHJcbiAgICAuY29udHJvbGxlcignUmVnaXN0ZXJDb250cm9sbGVyJywgWydVc2VyU2VydmljZScsIGZ1bmN0aW9uKFVzZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgICAgICBzZWxmLnJlZ2lzdGVyVXNlciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgdXNlciA9IG5ldyBVc2VyU2VydmljZShzZWxmLnVzZXIpO1xyXG4gICAgICAgICAgICB1c2VyLiRzYXZlKGZ1bmN0aW9uKHN1Y2Nlc3MpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBzZWxmLnVzZXIgPSB7fTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZmFpbHVyZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZmFpbHVyZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICB9XSlcclxuICAgIC5jb25maWcoWyckcm91dGVQcm92aWRlcicsIGZ1bmN0aW9uKCRyb3V0ZVByb3ZpZGVyKSB7XHJcbiAgICAgICAgJHJvdXRlUHJvdmlkZXIud2hlbignLycsIHtcclxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvaG9tZS5odG1sJ1xyXG4gICAgICAgIC8vICAgY29udHJvbGxlcjogJ0hvbWVDb250cm9sbGVyJ1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLndoZW4oJy9yZWdpc3RlcicsIHtcclxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvcmVnaXN0ZXIuaHRtbCdcclxuICAgICAgICAvLyAgIGNvbnRyb2xsZXI6ICdSZWdpc3RlckNvbnRyb2xsZXInXHJcbiAgICAgICAgfSlcclxuICAgICAgICAub3RoZXJ3aXNlKHtyZWRpcmVjdFRvOiAnLyd9KTtcclxufV0pO1xyXG5cclxuXHJcbiAgICB2YXIgdmFsaWRhdG9yID0gYW5ndWxhci5tb2R1bGUoJ3VzZXJBcHAnLCBbXSlcclxuICAgICAuY29udHJvbGxlcignQ29udHJvbGxlcicsIFsnJHNjb3BlJywgZnVuY3Rpb24oJHNjb3BlKSB7XHJcbiAgICAgICAkc2NvcGUudXNlciA9IHt9O1xyXG4vL2RcclxuICAgICB9XSk7IiwiLypcbiBBbmd1bGFySlMgdjEuMy4xNFxuIChjKSAyMDEwLTIwMTQgR29vZ2xlLCBJbmMuIGh0dHA6Ly9hbmd1bGFyanMub3JnXG4gTGljZW5zZTogTUlUXG4qL1xuKGZ1bmN0aW9uKEksZCxCKXsndXNlIHN0cmljdCc7ZnVuY3Rpb24gRChmLHEpe3E9cXx8e307ZC5mb3JFYWNoKHEsZnVuY3Rpb24oZCxoKXtkZWxldGUgcVtoXX0pO2Zvcih2YXIgaCBpbiBmKSFmLmhhc093blByb3BlcnR5KGgpfHxcIiRcIj09PWguY2hhckF0KDApJiZcIiRcIj09PWguY2hhckF0KDEpfHwocVtoXT1mW2hdKTtyZXR1cm4gcX12YXIgdz1kLiQkbWluRXJyKFwiJHJlc291cmNlXCIpLEM9L14oXFwuW2EtekEtWl8kXVswLTlhLXpBLVpfJF0qKSskLztkLm1vZHVsZShcIm5nUmVzb3VyY2VcIixbXCJuZ1wiXSkucHJvdmlkZXIoXCIkcmVzb3VyY2VcIixmdW5jdGlvbigpe3ZhciBmPXRoaXM7dGhpcy5kZWZhdWx0cz17c3RyaXBUcmFpbGluZ1NsYXNoZXM6ITAsYWN0aW9uczp7Z2V0OnttZXRob2Q6XCJHRVRcIn0sc2F2ZTp7bWV0aG9kOlwiUE9TVFwifSxxdWVyeTp7bWV0aG9kOlwiR0VUXCIsaXNBcnJheTohMH0scmVtb3ZlOnttZXRob2Q6XCJERUxFVEVcIn0sXCJkZWxldGVcIjp7bWV0aG9kOlwiREVMRVRFXCJ9fX07XG50aGlzLiRnZXQ9W1wiJGh0dHBcIixcIiRxXCIsZnVuY3Rpb24ocSxoKXtmdW5jdGlvbiB0KGQsZyl7dGhpcy50ZW1wbGF0ZT1kO3RoaXMuZGVmYXVsdHM9cyh7fSxmLmRlZmF1bHRzLGcpO3RoaXMudXJsUGFyYW1zPXt9fWZ1bmN0aW9uIHYoeCxnLGwsbSl7ZnVuY3Rpb24gYyhiLGspe3ZhciBjPXt9O2s9cyh7fSxnLGspO3IoayxmdW5jdGlvbihhLGspe3UoYSkmJihhPWEoKSk7dmFyIGQ7aWYoYSYmYS5jaGFyQXQmJlwiQFwiPT1hLmNoYXJBdCgwKSl7ZD1iO3ZhciBlPWEuc3Vic3RyKDEpO2lmKG51bGw9PWV8fFwiXCI9PT1lfHxcImhhc093blByb3BlcnR5XCI9PT1lfHwhQy50ZXN0KFwiLlwiK2UpKXRocm93IHcoXCJiYWRtZW1iZXJcIixlKTtmb3IodmFyIGU9ZS5zcGxpdChcIi5cIiksbj0wLGc9ZS5sZW5ndGg7bjxnJiZkIT09QjtuKyspe3ZhciBoPWVbbl07ZD1udWxsIT09ZD9kW2hdOkJ9fWVsc2UgZD1hO2Nba109ZH0pO3JldHVybiBjfWZ1bmN0aW9uIEYoYil7cmV0dXJuIGIucmVzb3VyY2V9ZnVuY3Rpb24gZShiKXtEKGJ8fFxue30sdGhpcyl9dmFyIEc9bmV3IHQoeCxtKTtsPXMoe30sZi5kZWZhdWx0cy5hY3Rpb25zLGwpO2UucHJvdG90eXBlLnRvSlNPTj1mdW5jdGlvbigpe3ZhciBiPXMoe30sdGhpcyk7ZGVsZXRlIGIuJHByb21pc2U7ZGVsZXRlIGIuJHJlc29sdmVkO3JldHVybiBifTtyKGwsZnVuY3Rpb24oYixrKXt2YXIgZz0vXihQT1NUfFBVVHxQQVRDSCkkL2kudGVzdChiLm1ldGhvZCk7ZVtrXT1mdW5jdGlvbihhLHksbSx4KXt2YXIgbj17fSxmLGwsejtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSA0Ono9eCxsPW07Y2FzZSAzOmNhc2UgMjppZih1KHkpKXtpZih1KGEpKXtsPWE7ej15O2JyZWFrfWw9eTt6PW19ZWxzZXtuPWE7Zj15O2w9bTticmVha31jYXNlIDE6dShhKT9sPWE6Zz9mPWE6bj1hO2JyZWFrO2Nhc2UgMDpicmVhaztkZWZhdWx0OnRocm93IHcoXCJiYWRhcmdzXCIsYXJndW1lbnRzLmxlbmd0aCk7fXZhciB0PXRoaXMgaW5zdGFuY2VvZiBlLHA9dD9mOmIuaXNBcnJheT9bXTpuZXcgZShmKSxcbkE9e30sdj1iLmludGVyY2VwdG9yJiZiLmludGVyY2VwdG9yLnJlc3BvbnNlfHxGLEM9Yi5pbnRlcmNlcHRvciYmYi5pbnRlcmNlcHRvci5yZXNwb25zZUVycm9yfHxCO3IoYixmdW5jdGlvbihiLGEpe1wicGFyYW1zXCIhPWEmJlwiaXNBcnJheVwiIT1hJiZcImludGVyY2VwdG9yXCIhPWEmJihBW2FdPUgoYikpfSk7ZyYmKEEuZGF0YT1mKTtHLnNldFVybFBhcmFtcyhBLHMoe30sYyhmLGIucGFyYW1zfHx7fSksbiksYi51cmwpO249cShBKS50aGVuKGZ1bmN0aW9uKGEpe3ZhciBjPWEuZGF0YSxnPXAuJHByb21pc2U7aWYoYyl7aWYoZC5pc0FycmF5KGMpIT09ISFiLmlzQXJyYXkpdGhyb3cgdyhcImJhZGNmZ1wiLGssYi5pc0FycmF5P1wiYXJyYXlcIjpcIm9iamVjdFwiLGQuaXNBcnJheShjKT9cImFycmF5XCI6XCJvYmplY3RcIik7Yi5pc0FycmF5PyhwLmxlbmd0aD0wLHIoYyxmdW5jdGlvbihhKXtcIm9iamVjdFwiPT09dHlwZW9mIGE/cC5wdXNoKG5ldyBlKGEpKTpwLnB1c2goYSl9KSk6KEQoYyxwKSxwLiRwcm9taXNlPVxuZyl9cC4kcmVzb2x2ZWQ9ITA7YS5yZXNvdXJjZT1wO3JldHVybiBhfSxmdW5jdGlvbihhKXtwLiRyZXNvbHZlZD0hMDsoenx8RSkoYSk7cmV0dXJuIGgucmVqZWN0KGEpfSk7bj1uLnRoZW4oZnVuY3Rpb24oYSl7dmFyIGI9dihhKTsobHx8RSkoYixhLmhlYWRlcnMpO3JldHVybiBifSxDKTtyZXR1cm4gdD9uOihwLiRwcm9taXNlPW4scC4kcmVzb2x2ZWQ9ITEscCl9O2UucHJvdG90eXBlW1wiJFwiK2tdPWZ1bmN0aW9uKGEsYixjKXt1KGEpJiYoYz1iLGI9YSxhPXt9KTthPWVba10uY2FsbCh0aGlzLGEsdGhpcyxiLGMpO3JldHVybiBhLiRwcm9taXNlfHxhfX0pO2UuYmluZD1mdW5jdGlvbihiKXtyZXR1cm4gdih4LHMoe30sZyxiKSxsKX07cmV0dXJuIGV9dmFyIEU9ZC5ub29wLHI9ZC5mb3JFYWNoLHM9ZC5leHRlbmQsSD1kLmNvcHksdT1kLmlzRnVuY3Rpb247dC5wcm90b3R5cGU9e3NldFVybFBhcmFtczpmdW5jdGlvbihmLGcsbCl7dmFyIG09dGhpcyxjPWx8fG0udGVtcGxhdGUsaCxcbmUscT1tLnVybFBhcmFtcz17fTtyKGMuc3BsaXQoL1xcVy8pLGZ1bmN0aW9uKGIpe2lmKFwiaGFzT3duUHJvcGVydHlcIj09PWIpdGhyb3cgdyhcImJhZG5hbWVcIik7IS9eXFxkKyQvLnRlc3QoYikmJmImJihuZXcgUmVnRXhwKFwiKF58W15cXFxcXFxcXF0pOlwiK2IrXCIoXFxcXFd8JClcIikpLnRlc3QoYykmJihxW2JdPSEwKX0pO2M9Yy5yZXBsYWNlKC9cXFxcOi9nLFwiOlwiKTtnPWd8fHt9O3IobS51cmxQYXJhbXMsZnVuY3Rpb24oYixrKXtoPWcuaGFzT3duUHJvcGVydHkoayk/Z1trXTptLmRlZmF1bHRzW2tdO2QuaXNEZWZpbmVkKGgpJiZudWxsIT09aD8oZT1lbmNvZGVVUklDb21wb25lbnQoaCkucmVwbGFjZSgvJTQwL2dpLFwiQFwiKS5yZXBsYWNlKC8lM0EvZ2ksXCI6XCIpLnJlcGxhY2UoLyUyNC9nLFwiJFwiKS5yZXBsYWNlKC8lMkMvZ2ksXCIsXCIpLnJlcGxhY2UoLyUyMC9nLFwiJTIwXCIpLnJlcGxhY2UoLyUyNi9naSxcIiZcIikucmVwbGFjZSgvJTNEL2dpLFwiPVwiKS5yZXBsYWNlKC8lMkIvZ2ksXCIrXCIpLGM9Yy5yZXBsYWNlKG5ldyBSZWdFeHAoXCI6XCIrXG5rK1wiKFxcXFxXfCQpXCIsXCJnXCIpLGZ1bmN0aW9uKGIsYSl7cmV0dXJuIGUrYX0pKTpjPWMucmVwbGFjZShuZXcgUmVnRXhwKFwiKC8/KTpcIitrK1wiKFxcXFxXfCQpXCIsXCJnXCIpLGZ1bmN0aW9uKGIsYSxjKXtyZXR1cm5cIi9cIj09Yy5jaGFyQXQoMCk/YzphK2N9KX0pO20uZGVmYXVsdHMuc3RyaXBUcmFpbGluZ1NsYXNoZXMmJihjPWMucmVwbGFjZSgvXFwvKyQvLFwiXCIpfHxcIi9cIik7Yz1jLnJlcGxhY2UoL1xcL1xcLig/PVxcdysoJHxcXD8pKS8sXCIuXCIpO2YudXJsPWMucmVwbGFjZSgvXFwvXFxcXFxcLi8sXCIvLlwiKTtyKGcsZnVuY3Rpb24oYixjKXttLnVybFBhcmFtc1tjXXx8KGYucGFyYW1zPWYucGFyYW1zfHx7fSxmLnBhcmFtc1tjXT1iKX0pfX07cmV0dXJuIHZ9XX0pfSkod2luZG93LHdpbmRvdy5hbmd1bGFyKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFuZ3VsYXItcmVzb3VyY2UubWluLmpzLm1hcFxuIiwiLypcbiBBbmd1bGFySlMgdjEuMy4xNFxuIChjKSAyMDEwLTIwMTQgR29vZ2xlLCBJbmMuIGh0dHA6Ly9hbmd1bGFyanMub3JnXG4gTGljZW5zZTogTUlUXG4qL1xuKGZ1bmN0aW9uKHEsZCxDKXsndXNlIHN0cmljdCc7ZnVuY3Rpb24gdihyLGssaCl7cmV0dXJue3Jlc3RyaWN0OlwiRUNBXCIsdGVybWluYWw6ITAscHJpb3JpdHk6NDAwLHRyYW5zY2x1ZGU6XCJlbGVtZW50XCIsbGluazpmdW5jdGlvbihhLGYsYixjLHkpe2Z1bmN0aW9uIHooKXtsJiYoaC5jYW5jZWwobCksbD1udWxsKTttJiYobS4kZGVzdHJveSgpLG09bnVsbCk7biYmKGw9aC5sZWF2ZShuKSxsLnRoZW4oZnVuY3Rpb24oKXtsPW51bGx9KSxuPW51bGwpfWZ1bmN0aW9uIHgoKXt2YXIgYj1yLmN1cnJlbnQmJnIuY3VycmVudC5sb2NhbHM7aWYoZC5pc0RlZmluZWQoYiYmYi4kdGVtcGxhdGUpKXt2YXIgYj1hLiRuZXcoKSxjPXIuY3VycmVudDtuPXkoYixmdW5jdGlvbihiKXtoLmVudGVyKGIsbnVsbCxufHxmKS50aGVuKGZ1bmN0aW9uKCl7IWQuaXNEZWZpbmVkKHQpfHx0JiYhYS4kZXZhbCh0KXx8aygpfSk7eigpfSk7bT1jLnNjb3BlPWI7bS4kZW1pdChcIiR2aWV3Q29udGVudExvYWRlZFwiKTtcbm0uJGV2YWwodyl9ZWxzZSB6KCl9dmFyIG0sbixsLHQ9Yi5hdXRvc2Nyb2xsLHc9Yi5vbmxvYWR8fFwiXCI7YS4kb24oXCIkcm91dGVDaGFuZ2VTdWNjZXNzXCIseCk7eCgpfX19ZnVuY3Rpb24gQShkLGssaCl7cmV0dXJue3Jlc3RyaWN0OlwiRUNBXCIscHJpb3JpdHk6LTQwMCxsaW5rOmZ1bmN0aW9uKGEsZil7dmFyIGI9aC5jdXJyZW50LGM9Yi5sb2NhbHM7Zi5odG1sKGMuJHRlbXBsYXRlKTt2YXIgeT1kKGYuY29udGVudHMoKSk7Yi5jb250cm9sbGVyJiYoYy4kc2NvcGU9YSxjPWsoYi5jb250cm9sbGVyLGMpLGIuY29udHJvbGxlckFzJiYoYVtiLmNvbnRyb2xsZXJBc109YyksZi5kYXRhKFwiJG5nQ29udHJvbGxlckNvbnRyb2xsZXJcIixjKSxmLmNoaWxkcmVuKCkuZGF0YShcIiRuZ0NvbnRyb2xsZXJDb250cm9sbGVyXCIsYykpO3koYSl9fX1xPWQubW9kdWxlKFwibmdSb3V0ZVwiLFtcIm5nXCJdKS5wcm92aWRlcihcIiRyb3V0ZVwiLGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihhLGYpe3JldHVybiBkLmV4dGVuZChPYmplY3QuY3JlYXRlKGEpLFxuZil9ZnVuY3Rpb24gayhhLGQpe3ZhciBiPWQuY2FzZUluc2Vuc2l0aXZlTWF0Y2gsYz17b3JpZ2luYWxQYXRoOmEscmVnZXhwOmF9LGg9Yy5rZXlzPVtdO2E9YS5yZXBsYWNlKC8oWygpLl0pL2csXCJcXFxcJDFcIikucmVwbGFjZSgvKFxcLyk/OihcXHcrKShbXFw/XFwqXSk/L2csZnVuY3Rpb24oYSxkLGIsYyl7YT1cIj9cIj09PWM/YzpudWxsO2M9XCIqXCI9PT1jP2M6bnVsbDtoLnB1c2goe25hbWU6YixvcHRpb25hbDohIWF9KTtkPWR8fFwiXCI7cmV0dXJuXCJcIisoYT9cIlwiOmQpK1wiKD86XCIrKGE/ZDpcIlwiKSsoYyYmXCIoLis/KVwifHxcIihbXi9dKylcIikrKGF8fFwiXCIpK1wiKVwiKyhhfHxcIlwiKX0pLnJlcGxhY2UoLyhbXFwvJFxcKl0pL2csXCJcXFxcJDFcIik7Yy5yZWdleHA9bmV3IFJlZ0V4cChcIl5cIithK1wiJFwiLGI/XCJpXCI6XCJcIik7cmV0dXJuIGN9dmFyIGg9e307dGhpcy53aGVuPWZ1bmN0aW9uKGEsZil7dmFyIGI9ZC5jb3B5KGYpO2QuaXNVbmRlZmluZWQoYi5yZWxvYWRPblNlYXJjaCkmJihiLnJlbG9hZE9uU2VhcmNoPSEwKTtcbmQuaXNVbmRlZmluZWQoYi5jYXNlSW5zZW5zaXRpdmVNYXRjaCkmJihiLmNhc2VJbnNlbnNpdGl2ZU1hdGNoPXRoaXMuY2FzZUluc2Vuc2l0aXZlTWF0Y2gpO2hbYV09ZC5leHRlbmQoYixhJiZrKGEsYikpO2lmKGEpe3ZhciBjPVwiL1wiPT1hW2EubGVuZ3RoLTFdP2Euc3Vic3RyKDAsYS5sZW5ndGgtMSk6YStcIi9cIjtoW2NdPWQuZXh0ZW5kKHtyZWRpcmVjdFRvOmF9LGsoYyxiKSl9cmV0dXJuIHRoaXN9O3RoaXMuY2FzZUluc2Vuc2l0aXZlTWF0Y2g9ITE7dGhpcy5vdGhlcndpc2U9ZnVuY3Rpb24oYSl7XCJzdHJpbmdcIj09PXR5cGVvZiBhJiYoYT17cmVkaXJlY3RUbzphfSk7dGhpcy53aGVuKG51bGwsYSk7cmV0dXJuIHRoaXN9O3RoaXMuJGdldD1bXCIkcm9vdFNjb3BlXCIsXCIkbG9jYXRpb25cIixcIiRyb3V0ZVBhcmFtc1wiLFwiJHFcIixcIiRpbmplY3RvclwiLFwiJHRlbXBsYXRlUmVxdWVzdFwiLFwiJHNjZVwiLGZ1bmN0aW9uKGEsZixiLGMsayxxLHgpe2Z1bmN0aW9uIG0oYil7dmFyIGU9cy5jdXJyZW50O1xuKHY9KHA9bCgpKSYmZSYmcC4kJHJvdXRlPT09ZS4kJHJvdXRlJiZkLmVxdWFscyhwLnBhdGhQYXJhbXMsZS5wYXRoUGFyYW1zKSYmIXAucmVsb2FkT25TZWFyY2gmJiF3KXx8IWUmJiFwfHxhLiRicm9hZGNhc3QoXCIkcm91dGVDaGFuZ2VTdGFydFwiLHAsZSkuZGVmYXVsdFByZXZlbnRlZCYmYiYmYi5wcmV2ZW50RGVmYXVsdCgpfWZ1bmN0aW9uIG4oKXt2YXIgdT1zLmN1cnJlbnQsZT1wO2lmKHYpdS5wYXJhbXM9ZS5wYXJhbXMsZC5jb3B5KHUucGFyYW1zLGIpLGEuJGJyb2FkY2FzdChcIiRyb3V0ZVVwZGF0ZVwiLHUpO2Vsc2UgaWYoZXx8dSl3PSExLChzLmN1cnJlbnQ9ZSkmJmUucmVkaXJlY3RUbyYmKGQuaXNTdHJpbmcoZS5yZWRpcmVjdFRvKT9mLnBhdGgodChlLnJlZGlyZWN0VG8sZS5wYXJhbXMpKS5zZWFyY2goZS5wYXJhbXMpLnJlcGxhY2UoKTpmLnVybChlLnJlZGlyZWN0VG8oZS5wYXRoUGFyYW1zLGYucGF0aCgpLGYuc2VhcmNoKCkpKS5yZXBsYWNlKCkpLGMud2hlbihlKS50aGVuKGZ1bmN0aW9uKCl7aWYoZSl7dmFyIGE9XG5kLmV4dGVuZCh7fSxlLnJlc29sdmUpLGIsZztkLmZvckVhY2goYSxmdW5jdGlvbihiLGUpe2FbZV09ZC5pc1N0cmluZyhiKT9rLmdldChiKTprLmludm9rZShiLG51bGwsbnVsbCxlKX0pO2QuaXNEZWZpbmVkKGI9ZS50ZW1wbGF0ZSk/ZC5pc0Z1bmN0aW9uKGIpJiYoYj1iKGUucGFyYW1zKSk6ZC5pc0RlZmluZWQoZz1lLnRlbXBsYXRlVXJsKSYmKGQuaXNGdW5jdGlvbihnKSYmKGc9ZyhlLnBhcmFtcykpLGc9eC5nZXRUcnVzdGVkUmVzb3VyY2VVcmwoZyksZC5pc0RlZmluZWQoZykmJihlLmxvYWRlZFRlbXBsYXRlVXJsPWcsYj1xKGcpKSk7ZC5pc0RlZmluZWQoYikmJihhLiR0ZW1wbGF0ZT1iKTtyZXR1cm4gYy5hbGwoYSl9fSkudGhlbihmdW5jdGlvbihjKXtlPT1zLmN1cnJlbnQmJihlJiYoZS5sb2NhbHM9YyxkLmNvcHkoZS5wYXJhbXMsYikpLGEuJGJyb2FkY2FzdChcIiRyb3V0ZUNoYW5nZVN1Y2Nlc3NcIixlLHUpKX0sZnVuY3Rpb24oYil7ZT09cy5jdXJyZW50JiZhLiRicm9hZGNhc3QoXCIkcm91dGVDaGFuZ2VFcnJvclwiLFxuZSx1LGIpfSl9ZnVuY3Rpb24gbCgpe3ZhciBhLGI7ZC5mb3JFYWNoKGgsZnVuY3Rpb24oYyxoKXt2YXIgZztpZihnPSFiKXt2YXIgaz1mLnBhdGgoKTtnPWMua2V5czt2YXIgbT17fTtpZihjLnJlZ2V4cClpZihrPWMucmVnZXhwLmV4ZWMoaykpe2Zvcih2YXIgbD0xLG49ay5sZW5ndGg7bDxuOysrbCl7dmFyIHA9Z1tsLTFdLHE9a1tsXTtwJiZxJiYobVtwLm5hbWVdPXEpfWc9bX1lbHNlIGc9bnVsbDtlbHNlIGc9bnVsbDtnPWE9Z31nJiYoYj1yKGMse3BhcmFtczpkLmV4dGVuZCh7fSxmLnNlYXJjaCgpLGEpLHBhdGhQYXJhbXM6YX0pLGIuJCRyb3V0ZT1jKX0pO3JldHVybiBifHxoW251bGxdJiZyKGhbbnVsbF0se3BhcmFtczp7fSxwYXRoUGFyYW1zOnt9fSl9ZnVuY3Rpb24gdChhLGIpe3ZhciBjPVtdO2QuZm9yRWFjaCgoYXx8XCJcIikuc3BsaXQoXCI6XCIpLGZ1bmN0aW9uKGEsZCl7aWYoMD09PWQpYy5wdXNoKGEpO2Vsc2V7dmFyIGY9YS5tYXRjaCgvKFxcdyspKD86Wz8qXSk/KC4qKS8pLFxuaD1mWzFdO2MucHVzaChiW2hdKTtjLnB1c2goZlsyXXx8XCJcIik7ZGVsZXRlIGJbaF19fSk7cmV0dXJuIGMuam9pbihcIlwiKX12YXIgdz0hMSxwLHYscz17cm91dGVzOmgscmVsb2FkOmZ1bmN0aW9uKCl7dz0hMDthLiRldmFsQXN5bmMoZnVuY3Rpb24oKXttKCk7bigpfSl9LHVwZGF0ZVBhcmFtczpmdW5jdGlvbihhKXtpZih0aGlzLmN1cnJlbnQmJnRoaXMuY3VycmVudC4kJHJvdXRlKWE9ZC5leHRlbmQoe30sdGhpcy5jdXJyZW50LnBhcmFtcyxhKSxmLnBhdGgodCh0aGlzLmN1cnJlbnQuJCRyb3V0ZS5vcmlnaW5hbFBhdGgsYSkpLGYuc2VhcmNoKGEpO2Vsc2UgdGhyb3cgQihcIm5vcm91dFwiKTt9fTthLiRvbihcIiRsb2NhdGlvbkNoYW5nZVN0YXJ0XCIsbSk7YS4kb24oXCIkbG9jYXRpb25DaGFuZ2VTdWNjZXNzXCIsbik7cmV0dXJuIHN9XX0pO3ZhciBCPWQuJCRtaW5FcnIoXCJuZ1JvdXRlXCIpO3EucHJvdmlkZXIoXCIkcm91dGVQYXJhbXNcIixmdW5jdGlvbigpe3RoaXMuJGdldD1mdW5jdGlvbigpe3JldHVybnt9fX0pO1xucS5kaXJlY3RpdmUoXCJuZ1ZpZXdcIix2KTtxLmRpcmVjdGl2ZShcIm5nVmlld1wiLEEpO3YuJGluamVjdD1bXCIkcm91dGVcIixcIiRhbmNob3JTY3JvbGxcIixcIiRhbmltYXRlXCJdO0EuJGluamVjdD1bXCIkY29tcGlsZVwiLFwiJGNvbnRyb2xsZXJcIixcIiRyb3V0ZVwiXX0pKHdpbmRvdyx3aW5kb3cuYW5ndWxhcik7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbmd1bGFyLXJvdXRlLm1pbi5qcy5tYXBcbiIsIlwidXNlIHN0cmljdFwiO2FuZ3VsYXIubW9kdWxlKFwicHVzaGVyLWFuZ3VsYXJcIixbXSkuZmFjdG9yeShcIiRwdXNoZXJcIixbXCIkcm9vdFNjb3BlXCIsXCIkY2hhbm5lbFwiLFwiJGNvbm5lY3Rpb25cIixmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChhKXtyZXR1cm4gdGhpcyBpbnN0YW5jZW9mIGQ/KHRoaXMuX2Fzc2VydFZhbGlkQ2xpZW50KGEpLHRoaXMuY2xpZW50PWEsdGhpcy5jb25uZWN0aW9uPWMoYS5jb25uZWN0aW9uLGEpLHRoaXMuY2hhbm5lbHM9e30sdm9pZCAwKTpuZXcgZChhKX1yZXR1cm4gZC5wcm90b3R5cGU9e3N1YnNjcmliZTpmdW5jdGlvbihhKXt2YXIgYz1iKHRoaXMuY2xpZW50LnN1YnNjcmliZShhKSx0aGlzKTtyZXR1cm4gdGhpcy5jaGFubmVsc1thXT1jLGN9LHVuc3Vic2NyaWJlOmZ1bmN0aW9uKGEpe3RoaXMuY2xpZW50LmNoYW5uZWwoYSkmJih0aGlzLmNsaWVudC51bnN1YnNjcmliZShhKSx0aGlzLmNoYW5uZWxzW2FdJiZkZWxldGUgdGhpcy5jaGFubmVsc1thXSl9LGJpbmQ6ZnVuY3Rpb24oYixjKXt0aGlzLmNsaWVudC5iaW5kKGIsZnVuY3Rpb24oYil7YyhiKSxhLiRkaWdlc3QoKX0pfSxiaW5kX2FsbDpmdW5jdGlvbihiKXt0aGlzLmNsaWVudC5iaW5kX2FsbChmdW5jdGlvbihjLGQpe2IoYyxkKSxhLiRkaWdlc3QoKX0pfSxkaXNjb25uZWN0OmZ1bmN0aW9uKCl7dGhpcy5jbGllbnQuZGlzY29ubmVjdCgpfSxjaGFubmVsOmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmNoYW5uZWxzW2FdfSxhbGxDaGFubmVsczpmdW5jdGlvbigpe3JldHVybiB0aGlzLmNoYW5uZWxzfSxfYXNzZXJ0VmFsaWRDbGllbnQ6ZnVuY3Rpb24oYSl7aWYoIWFuZ3VsYXIuaXNPYmplY3QoYSl8fCFhbmd1bGFyLmlzT2JqZWN0KGEuY29ubmVjdGlvbil8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIGEuY2hhbm5lbCl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIFB1c2hlciBjbGllbnQgb2JqZWN0XCIpfX0sZH1dKS5mYWN0b3J5KFwiJGNoYW5uZWxcIixbXCIkcm9vdFNjb3BlXCIsXCIkbWVtYmVyc1wiLGZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYyhhKXtpZigtMT09YS5pbmRleE9mKFwicHJlc2VuY2UtXCIpJiYtMT09YS5pbmRleE9mKFwicHJpdmF0ZS1cIikpdGhyb3cgbmV3IEVycm9yKFwiUHJlc2VuY2Ugb3IgcHJpdmF0ZSBjaGFubmVsIHJlcXVpcmVkXCIpfWZ1bmN0aW9uIGQoYSxjKXtyZXR1cm4gdGhpcyBpbnN0YW5jZW9mIGQ/KHRoaXMuX2Fzc2VydFZhbGlkQ2hhbm5lbChhKSx0aGlzLmJhc2VDaGFubmVsPWEsdGhpcy5jbGllbnQ9Yyx0aGlzLm5hbWU9YS5uYW1lLHRoaXMubWVtYmVycz0tMT09YS5uYW1lLmluZGV4T2YoXCJwcmVzZW5jZVwiKT9mdW5jdGlvbigpe3Rocm93IG5ldyBFcnJvcihcIk1lbWJlcnMgb2JqZWN0IG9ubHkgZXhpc3RzIGZvciBwcmVzZW5jZSBjaGFubmVsc1wiKX06YihhLm1lbWJlcnMsYSksdm9pZCAwKTpuZXcgZChhLGMpfXJldHVybiBkLnByb3RvdHlwZT17YmluZDpmdW5jdGlvbihiLGMpe3RoaXMuYmFzZUNoYW5uZWwuYmluZChiLGZ1bmN0aW9uKGIpe2MoYiksYS4kZGlnZXN0KCl9KX0sYmluZF9hbGw6ZnVuY3Rpb24oYil7dGhpcy5iYXNlQ2hhbm5lbC5iaW5kX2FsbChmdW5jdGlvbihjLGQpe2IoYyxkKSxhLiRkaWdlc3QoKX0pfSx0cmlnZ2VyOmZ1bmN0aW9uKGEsYil7aWYoYyh0aGlzLm5hbWUpLC0xPT1hLmluZGV4T2YoXCJjbGllbnQtXCIpKXRocm93IG5ldyBFcnJvcihcIkV2ZW50IG5hbWUgcmVxdWlyZXMgJ2NsaWVudC0nIHByZWZpeFwiKTtyZXR1cm4gdGhpcy5iYXNlQ2hhbm5lbC50cmlnZ2VyKGEsYil9LF9hc3NlcnRWYWxpZENoYW5uZWw6ZnVuY3Rpb24oYSl7aWYoIWFuZ3VsYXIuaXNPYmplY3QoYSl8fFwic3RyaW5nXCIhPXR5cGVvZiBhLm5hbWUpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBQdXNoZXIgY2hhbm5lbCBvYmplY3RcIil9fSxkfV0pLmZhY3RvcnkoXCIkbWVtYmVyc1wiLFtcIiRyb290U2NvcGVcIixmdW5jdGlvbihhKXtmdW5jdGlvbiBiKGMsZCl7aWYoISh0aGlzIGluc3RhbmNlb2YgYikpcmV0dXJuIG5ldyBiKGMsZCk7dmFyIGU9dGhpczt0aGlzLl9hc3NlcnRWYWxpZE1lbWJlcnMoYyksdGhpcy5iYXNlTWVtYmVycz1jLHRoaXMuYmFzZUNoYW5uZWw9ZCx0aGlzLm1lPXt9LHRoaXMuY291bnQ9MCx0aGlzLm1lbWJlcnM9e30sZC5iaW5kKFwicHVzaGVyOnN1YnNjcmlwdGlvbl9zdWNjZWVkZWRcIixmdW5jdGlvbihiKXtlLm1lPWIubWUsZS5jb3VudD1iLmNvdW50LGUubWVtYmVycz1iLm1lbWJlcnMsYS4kZGlnZXN0KCl9KSxkLmJpbmQoXCJwdXNoZXI6bWVtYmVyX2FkZGVkXCIsZnVuY3Rpb24oYil7ZS5jb3VudCsrLGUubWVtYmVyc1tiLmlkLnRvU3RyaW5nKCldPWIuaW5mbz9iLmluZm86bnVsbCxhLiRkaWdlc3QoKX0pLGQuYmluZChcInB1c2hlcjptZW1iZXJfcmVtb3ZlZFwiLGZ1bmN0aW9uKGIpe2UuY291bnQtLSxkZWxldGUgZS5tZW1iZXJzW2IuaWQudG9TdHJpbmcoKV0sYS4kZGlnZXN0KCl9KX1yZXR1cm4gYi5wcm90b3R5cGU9e2dldDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5iYXNlTWVtYmVycy5nZXQoYSl9LGVhY2g6ZnVuY3Rpb24oYil7dGhpcy5iYXNlTWVtYmVycy5lYWNoKGZ1bmN0aW9uKGMpe2IoYyksYS4kZGlnZXN0KCl9KX0sX2Fzc2VydFZhbGlkTWVtYmVyczpmdW5jdGlvbihhKXtpZighYW5ndWxhci5pc09iamVjdChhKXx8XCJvYmplY3RcIiE9dHlwZW9mIGEubWUpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBQdXNoZXIgY2hhbm5lbCBtZW1iZXJzIG9iamVjdFwiKX19LGJ9XSkuZmFjdG9yeShcIiRjb25uZWN0aW9uXCIsW1wiJHJvb3RTY29wZVwiLGZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSxjKXtyZXR1cm4gdGhpcyBpbnN0YW5jZW9mIGI/KHRoaXMuX2Fzc2VydFZhbGlkQ29ubmVjdGlvbihhKSx0aGlzLmJhc2VDb25uZWN0aW9uPWEsdGhpcy5iYXNlQ2xpZW50PWMsdm9pZCAwKTpuZXcgYihhLGMpfXJldHVybiBiLnByb3RvdHlwZT17YmluZDpmdW5jdGlvbihiLGMpe3RoaXMuYmFzZUNvbm5lY3Rpb24uYmluZChiLGZ1bmN0aW9uKGIpe2MoYiksYS4kZGlnZXN0KCl9KX0sYmluZF9hbGw6ZnVuY3Rpb24oYil7dGhpcy5iYXNlQ29ubmVjdGlvbi5iaW5kX2FsbChmdW5jdGlvbihjLGQpe2IoYyxkKSxhLiRkaWdlc3QoKX0pfSxfYXNzZXJ0VmFsaWRDb25uZWN0aW9uOmZ1bmN0aW9uKGEpe2lmKCFhbmd1bGFyLmlzT2JqZWN0KGEpKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgUHVzaGVyIGNvbm5lY3Rpb24gb2JqZWN0XCIpfX0sYn1dKTsiLCJjb25zb2xlLmluZm8oJ3dvcmtzJyk7XG5cblxuQVBJX0tFWSA9ICc3YjBjYzAwYWI2NzE2YzcxOTFiNCc7XG5cbnZhciBhcGVuZGVkID0gJyc7XG52YXIgcHVzaGVyID0gbmV3IFB1c2hlcignN2IwY2MwMGFiNjcxNmM3MTkxYjQnKTtcbnZhciBjaGFubmVsID0gcHVzaGVyLnN1YnNjcmliZSgndGVzdF9jaGFubmVsJyk7XG5jaGFubmVsLmJpbmQoJ215X2V2ZW50JywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBhcGVuZGVkID0gJzxsaSBjbGFzcz1cImFjdGl2aXR5IHRlc3QtZXZlbnRcIj4nXG4gICAgKyAnPGRpdiBjbGFzcz1cInN0cmVhbS1pdGVtLWNvbnRlbnRcIj4nXG4gICAgKyAnPGRpdiBjbGFzcz1cImltYWdlXCI+J1xuICAgICsgJzxpbWcgc3JjPVwiaHR0cDovL3d3dy5ncmF2YXRhci5jb20vYXZhdGFyLzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwP2Q9bW9uc3RlcmlkJmFtcDtzPTQ4XCIgd2lkdGg9XCI0OFwiIGhlaWdodD1cIjQ4XCI+J1xuICAgICsgJzwvZGl2PidcbiAgICArICc8ZGl2IGNsYXNzPVwiY29udGVudFwiPidcbiAgICArICc8ZGl2IGNsYXNzPVwiYWN0aXZpdHktcm93XCI+PHNwYW4gY2xhc3M9XCJ1c2VyLW5hbWVcIj48ZW0+S2FybGlzPC9lbT48L3NwYW4+J1xuICAgICsgJzwvZGl2PidcbiAgICArICc8ZGl2IGNsYXNzPVwiYWN0aXZpdHktcm93XCI+J1xuICAgICsgJzxkaXYgY2xhc3M9XCJ0ZXh0XCI+JyArIGRhdGEubWVzc2FnZSArICc8L2Rpdj4nXG4gICAgKyAnPGRpdiBjbGFzcz1cImFjdGl2aXR5LXJvd1wiPjxhIGNsYXNzPVwidGltZXN0YW1wXCI+PHNwYW4gdGl0bGU9XCInK2RhdGEudGltZSsnXCI+JytkYXRhLnRpbWUrJzwvc3Bhbj48L2E+PHNwYW4gY2xhc3M9XCJhY3Rpdml0eS1hY3Rpb25zXCI+PHNwYW4gY2xhc3M9XCJ0d2VldC1hY3Rpb24gYWN0aW9uLWZhdm9yaXRlXCI+PGEgaHJlZj1cIiNcIiBjbGFzcz1cImxpa2UtYWN0aW9uXCIgZGF0YS1hY3Rpdml0eT1cImxpa2VcIiB0aXRsZT1cIkxpa2VcIj48c3Bhbj48aT48L2k+PGI+TGlrZTwvYj48L3NwYW4+PC9hPjwvc3Bhbj48L3NwYW4+PC9kaXY+J1xuICAgICsgJzwvZGl2PidcbiAgICArICc8L2Rpdj4nXG4gICAgKyAnPC9kaXY+J1xuICAgICsgJzwvbGk+JztcbiAgICAkKCcuYWN0aXZpdHktc3RyZWFtJykucHJlcGVuZChhcGVuZGVkKTtcblxufSk7Il19
