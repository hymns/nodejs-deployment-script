module.exports = { 
   "development" : [
        'git stash',
        'git pull origin dev',     // change branch name
        'yarn',                    // build command
        'pm2 restart express-web'  // change service name
   ],
   "production" : [
        'git stash',
        'git pull origin master',   // change branch name
        'yarn',                     // build command
        'pm2 restart express-web'   // change service name
   ]
};