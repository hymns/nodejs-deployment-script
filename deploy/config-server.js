module.exports = { 
   "development" : [
      {
         host: "ec2-development-server.compute.amazonaws.com",
         port: "22",
         username: "ubuntu",
         privateKey: "/path/to/dev/privatekey.pem",   // path to private key
      }
   ],
   "production" : [
      {
         host: "ec2-development-server.compute.amazonaws.com",
         port: "22",
         username: "ubuntu",
         privateKey: "/path/to/prod/privatekey.pem",   // path to private key
      },
   ]
};