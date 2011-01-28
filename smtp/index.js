require("./config")

var SMTPServer = require("./server/server.js")

new SMTPServer(function(email){
    console.log(email)
}).listen(config.port||25,config.host||"0.0.0.0",function(){
    console.log("Listening on port",config.port)    
})