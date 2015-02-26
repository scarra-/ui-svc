<!DOCTYPE html>
<html lang="en" ng-app="userApp">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>User Registration</title>
    <link href="css/app.css" rel="stylesheet">
  </head>

  <body>
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Web Bootcamp</a>
          </div>
          <div id="navbar" class="navbar-collapse collapse">
            <ul class="nav navbar-nav navbar-right">
              <li><a ng-href="#/signin">Sign In</a></li>
              <li><a ng-href="#/register">Register</a></li>
            </ul>
          </div>
        </div>
      </nav>
    <div class="container" ng-view></div>
    <script src="{{ elixir("js/app.js") }}"></script>
  </body>
</html>
