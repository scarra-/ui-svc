To get everything working:

      1. git clone URL 
                 ** check if you are cloning features branch, use SSH url
      2. Create an .env file 
      3. Check your files:
                -/etc/hosts;
                  ** add insert ui-svc.acn-bootcamp
                -.homestead/Homestead.yaml
                  ** add     - map: ui-svc.acn-bootcamp.com
                               to: /home/vagrant/code/ui-svc/public
                               hhvm: true
                 
      4. CLI : -composer install;
               -npm install;
                  ** if getting error then npm install -g npm@latest and then again npm install;
               -/node_modules/gulp/bin/gulp.js
               
To get ui-svc working you also need a user-sv repository and to get that working:
  
      1. git clone URL 
      2. Create an .env file 
      3. Check your files:
                -/etc/hosts;
                  ** add user.acn-bootcamp.com
                -.homestead/Homestead.yaml;
                  ** add     - map: user.acn-bootcamp.com
                               to: /home/vagrant/code/user-svc/public
                               hhvm: true
                  ** check that youre database name is the same in Homestead.yaml and .env file 
      4. CLI : -composer install;
               -npm install;
                  ** if getting error then npm install -g npm@latest and then again npm install;
               -/node_modules/gulp/bin/gulp.js
               -php artisan migrate
