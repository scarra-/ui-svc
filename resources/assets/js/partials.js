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
  $templateCache.put('confirmRegistration.html',
    '<div class="col-md-12 password-reset-distribution" >\n' +
    '\n' +
    '<div ng-controller="ConfirmRegistrationController as confirmRegCtlr">\n' +
    '    <p>\n' +
    '        Thank you for confirming your registration\n' +
    '    </p>\n' +
    '</div>\n' +
    '\n' +
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
  $templateCache.put('header.html',
    '\n' +
    '<div ng-controller="ProfileController as profileCtrl">\n' +
    '    <div class="jumbotron" ng-switch on="profileCtrl.auth()">\n' +
    '        <nav class="navbar navbar-inverse navbar-fixed-top container-padding">\n' +
    '            <div class="container">\n' +
    '                <div ng-switch-when="true">\n' +
    '                    <div ng-include="\'headerButtons.html\'" ></div>\n' +
    '                </div>\n' +
    '                <div class="navbar-header">\n' +
    '                    <h3 class="navbar-text">Bootcamp app</h3>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </nav>\n' +
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
  $templateCache.put('headerButtons.html',
    '<form class="navbar-form navbar-right">\n' +
    '    <div ng-controller="LoginController as loginCtrl">\n' +
    '        <a href="#/" type="button" class="btn btn-primary navbar-btn">New messges</a>\n' +
    '        <button id="logout" class="btn btn-primary navbar-btn" ng-click="loginCtrl.logout()"> Logout </button>\n' +
    '    </div>\n' +
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
  $templateCache.put('main.html',
    '<div ng-controller="MainController as mainCtrl">\n' +
    '    <div class="container jumbotron" ng-switch on="mainCtrl.auth()">\n' +
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
    '\n' +
    '\n' +
    '        </div>\n' +
    '        <div class="col-md-9">\n' +
    '            <div ng-switch-when="true">\n' +
    '                <div ng-include="\'msgBox.html\'"></div>\n' +
    '                <div ng-include="\'header.html\'"></div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div ng-switch-when="false">\n' +
    '                <div ng-include="\'stream.html\'"></div>\n' +
    '                <div ng-include="\'header.html\'"></div>\n' +
    '            </div>\n' +
    '\n' +
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
    '              class="form-control custom-control"\n' +
    '              rows="3"\n' +
    '              required >\n' +
    '    </textarea>\n' +
    '\n' +
    '    <button id="sendMsg"\n' +
    '            class="btn btn-sm btn-primary btn-block message-btn-margin"\n' +
    '            type="submit"\n' +
    '            ng-disabled="msgForm.$invalid">Send msg\n' +
    '    </button>\n' +
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
  $templateCache.put('profile.html',
    '\n' +
    '<div ng-controller="ProfileController as profileCtrl">\n' +
    '    <div class="panel panel-default profile-panel">\n' +
    '      <div class="panel-heading">Username</div>\n' +
    '      <div class="panel-body" ng-bind="profileCtrl.login">\n' +
    '      </div>\n' +
    '    </div>\n' +
    '\n' +
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
    '\n' +
    '    <div class="alert alert-success" ng-show = "regCtrl.userRegistered "role="alert">Well done! You managed to register successfuly.</div>\n' +
    '\n' +
    '    <label ng-show="regCtrl.userError" name="registerError" class="formError">Username is already taken!</label>\n' +
    '    <label ng-show="regCtrl.mailError" name="registerError" class="formError">There is already registered user with this e-mail!</label>\n' +
    '\n' +
    '    <input ng-model="regCtrl.user.login" name="login" type="username" class="form-control"\n' +
    '    placeholder="Username" required >\n' +
    '\n' +
    '    <input type="email" ng-model="regCtrl.user.email" name="email" class="form-control" placeholder="Email address"\n' +
    '    ng-minlength=6 ng-maxlength=256 ng-pattern="/^[a-z]+[a-z0-9._]+@[a-z]+\\.[a-z.]{1,5}$/" required>\n' +
    '\n' +
    '    <div class="error-container" ng-show="registrationForm.email.$dirty && registrationForm.email.$invalid">\n' +
    '\n' +
    '        <small class="error" ng-show="registrationForm.email.$error.email">\n' +
    '               That is not a valid email. Please input a valid email.<br/>\n' +
    '        </small>\n' +
    '\n' +
    '        <small class="error" ng-show="registrationForm.email.$error.maxlength">\n' +
    '                Your email cannot be longer than 20 characters<br/>\n' +
    '        </small>\n' +
    '        <small class="error" ng-show="registrationForm.email.$error.pattern">\n' +
    '                The email pattern is invalid. It should be something like mail@example.com.\n' +
    '        </small>\n' +
    '    </div>\n' +
    '\n' +
    '\n' +
    '    <!-- <p ng-show="" class="help-block">Enter a valid email.</p> -->\n' +
    '    <!-- <span ng-hide="registrationForm.email.$error.invalid">email not valid</span> -->\n' +
    '\n' +
    '    <input type="password" ng-model="regCtrl.user.password" name="password" class="form-control"\n' +
    '    placeholder="Password" required >\n' +
    '    <!-- <p ng-show="" class="help-block">Enter a valid email.</p> -->\n' +
    '\n' +
    '    <button class="btn btn-lg btn-primary btn-block" ng-disabled="registrationForm.$invalid" type="submit">Register</button>\n' +
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
    '        <div class="col-md-12 password-reset-distribution" >\n' +
    '\n' +
    '            <form class="" name="requestResetForm" ng-controller="RequestResetController as requestResetCtrl"\n' +
    '            ng-submit="requestResetCtrl.requestReset()" novalidate>\n' +
    '\n' +
    '                <input ng-model="requestResetCtrl.reset.email" name="requestReset" type="email" class="form-control"\n' +
    '                placeholder="email" required>\n' +
    '\n' +
    '                <button class="btn btn-lg btn-primary btn-block" ng-disabled="requestResetForm.$invalid" type="submit">Request Password Reset</button>\n' +
    '            </form>\n' +
    '\n' +
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
  $templateCache.put('resetPassword.html',
    '\n' +
    '<div class="col-md-12 password-reset-distribution" >\n' +
    '\n' +
    '    <form class="" name="resetPasswordForm" ng-controller="ResetPasswordController as resetPassCtrl"\n' +
    '    ng-submit="resetPassCtrl.resetPassword()" novalidate>\n' +
    '\n' +
    '        <input ng-model="resetPassCtrl.passwordReset.password" name="password" type="password" class="form-control"\n' +
    '        placeholder="password" required>\n' +
    '\n' +
    '        <input ng-model="resetPassCtrl.passwordReset.password2" name="passsword2" type="password" class="form-control"\n' +
    '        placeholder="password" required>\n' +
    '\n' +
    '        <button class="btn btn-lg btn-primary btn-block" ng-disabled="resetPassCtrl.$invalid" type="submit">Reset Password</button>\n' +
    '    </form>\n' +
    '\n' +
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
    '		<label ng-show="loginCtrl.loginError()" name="loginError" class="formError">Username or password is incorrect!</label>\n' +
    '\n' +
    '		<input ng-model="loginCtrl.user.login" name="login" type="username" class="form-control" placeholder="Username" required >\n' +
    '\n' +
    '		<input type="password" ng-model="loginCtrl.user.password" name="password" class="form-control" placeholder="Password" required >\n' +
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
    '<!-- <a href="/tests" target="_blank">test</a> -->\n' +
    '');
}]);
})();
