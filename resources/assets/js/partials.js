(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('auth.html',
    '<form ng-controller="AuthController as autcCtrl"\n' +
    '      class="simple-form" >\n' +
    '    <label>AuthController</label><br/>\n' +
    '    <input ng-model="authCtrl.user.bool"\n' +
    '           type="radio"\n' +
    '           value="true"\n' +
    '           ng-click="auth(authCtrl.user);"/> true \n' +
    '\n' +
    '    <input ng-model="authCtrl.user.bool" \n' +
    '           type="radio"\n' +
    '           value="false"\n' +
    '           ng-click="auth(authCtrl.user);"/> false <br/>\n' +
    '</form>');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('editprofile.html',
    '<h1>edit profile page</h1>');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('main.html',
    '<div ng-controller="MainController as mainCtrl">\n' +
    '    <div class="container" ng-switch on="mainCtrl.auth()">\n' +
    '        <div class="col-md-3" >\n' +
    '\n' +
    '            <div ng-switch-when="false">\n' +
    '                <div ng-include="\'signin.html\'"></div>\n' +
    '                <div ng-include="\'registration.html\'"></div>\n' +
    '            </div>\n' +
    '\n' +
    '\n' +
    '            <div ng-switch-when="true">\n' +
    '                <div ng-include="\'profile.html\'"></div>\n' +
    '            </div>\n' +
    '            <br/>\n' +
    '\n' +
    '        </div>\n' +
    '        <div class="col-md-9">\n' +
    '            <div ng-switch-when="true">\n' +
    '                <div ng-include="\'msgBox.html\'"></div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div ng-include="\'stream.html\'"></div>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('msgBox.html',
    '<form class=""\n' +
    '      name="msgForm"\n' +
    '      ng-controller="MsgController as msgCtrl"\n' +
    '      ng-submit="msgCtrl.sendMessage();"\n' +
    '      novalidate\n' +
    '>\n' +
    '    <textarea name="message"\n' +
    '    		      ng-model="msgCtrl.msg.message"\n' +
    '              class="form-control custom-control" \n' +
    '              rows="3"\n' +
    '              required >\n' +
    '    </textarea>  \n' +
    '\n' +
    '    <button id="sendMsg"\n' +
    '            class="btn btn-sm btn-primary btn-block"\n' +
    '            type="submit"\n' +
    '            ng-disabled="msgForm.$invalid">Send msg\n' +
    '    </button>\n' +
    '</form>');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('profile.html',
    '<div ng-controller="LoginController as loginCtrl">\n' +
    '    <button id="logout"\n' +
    '            class="btn btn-sm btn-primary btn-block"\n' +
    '            ng-click="loginCtrl.logout()"\n' +
    '            > Logout </button>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('registration.html',
    '\n' +
    '<!-- REGISTRATION FORM  ~  novalidate disables HTML5 validation-->\n' +
    '<form class="" name="registrationForm" ng-controller="RegisterController as regCtrl" ng-submit="regCtrl.registerUser()" novalidate>\n' +
    '  <input ng-model="regCtrl.user.login" name="login" type="username" class="form-control" placeholder="Username"\n' +
    '  required\n' +
    '  >\n' +
    '\n' +
    '  <input type="email" ng-model="regCtrl.user.email" name="email" class="form-control" placeholder="Email address">\n' +
    '  <!-- <p ng-show="" class="help-block">Enter a valid email.</p> -->\n' +
    '  <!-- <span ng-hide="registrationForm.email.$error.invalid">email not valid</span> -->\n' +
    '\n' +
    '  <input type="password" ng-model="regCtrl.user.password" name="password" class="form-control" placeholder="Password"\n' +
    '    required\n' +
    '  >\n' +
    '  <!-- <p ng-show="" class="help-block">Enter a valid email.</p> -->\n' +
    '\n' +
    '  <button class="btn btn-lg btn-primary btn-block" ng-disabled="registrationForm.$invalid" type="submit">Register</button>\n' +
    '</form>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('requestReset.html',
    '<div ng-controller="MainController as mainCtrl">\n' +
    '    <div class="container" ng-switch on="mainCtrl.auth()">\n' +
    '        <div class="col-md-12" >\n' +
    '\n' +
    '            <form class="" name="requestResetForm" ng-controller="RequestResetController as requestResetCtrl"\n' +
    '            ng-submit="requestResetCtrl.requestReset()" novalidate>\n' +
    '            \n' +
    '                <input ng-model="requestResetCtrl.reset.email" name="requestReset" type="email" class="form-control"\n' +
    '                placeholder="email" required>\n' +
    '\n' +
    '                <button class="btn btn-lg btn-primary btn-block" ng-disabled="requestResetForm.$invalid" type="submit">Reset</button>\n' +
    '            </form>\n' +
    '\n' +
    '        </div>\n' +
    '\n' +
    '    </div>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('signin.html',
    '\n' +
    '<div class="signin">\n' +
    '	<form class="" name="loginForm" ng-controller="LoginController as loginCtrl" ng-submit="loginCtrl.login()" novalidate>\n' +
    '		<input ng-model="loginCtrl.user.login" name="login" type="username" class="form-control" placeholder="Username"\n' +
    '		required\n' +
    '		>\n' +
    '		<input type="password" ng-model="loginCtrl.user.password" name="password" class="form-control" placeholder="Password"\n' +
    '		required\n' +
    '		>\n' +
    '		<!-- <p ng-show="" class="help-block">Enter a valid email.</p> -->\n' +
    '\n' +
    '		<button class="btn btn-lg btn-primary btn-block" ng-disabled="loginForm.$invalid" type="submit">Login</button>\n' +
    '	</form>\n' +
    '\n' +
    '		<a href="#/forgotPassword">Forgot Password?</a>\n' +
    '</div>\n' +
    '');
}]);
})();

(function(module) {
try {
  module = angular.module('partialsModule');
} catch (e) {
  module = angular.module('partialsModule', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('stream.html',
    '<ul ng-controller="PusherController as pusherCtrl" id="activity_stream_example" class="activity-stream no-actions animate-repeat">\n' +
    '    <li class="activity test-event" ng-repeat="tweet in pusherCtrl.tweets()">\n' +
    '        <div class="stream-item-content">\n' +
    '            <div class="image"><img src="http://www.gravatar.com/avatar/00000000000000000000000000000000?d=monsterid&amp;s=48"\n' +
    '                    width="48" height="48"></div>\n' +
    '            <div class="content">\n' +
    '                <!-- jāuztaisa links uz cilvēka lapu, kas tweeto-->\n' +
    '                <div class="activity-row">\n' +
    '                    <span class="user-name"><a href=""> <em>{{ tweet.name }}</em> </a> </span>\n' +
    '                    <div class="text">{{ tweet.message }}</div>\n' +
    '                    <div class="activity-row"><span class="time">{{ tweet.time }}</span></div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    </li>\n' +
    '</ul>\n' +
    '<a href="/tests" target="_blank">test</a>\n' +
    '');
}]);
})();
