var net = require("net")
var Connection = require("./connection.js")

function Server(messageHandler) {
    var self = this
    this.extensions = []
    this.commands = {}
    if(config.commands) {
        config.commands.forEach(function(command) {
            self.commands[command] = require(__dirname+"/commands/"+command)
        })    
    }
    this.server = net.createServer(function(connection) {
        connection = new Connection(this,connection)
        connection.on("email",messageHander)
        self.emit("connect",connection)
    })
}
Server.prototype.listen = function(port,host) {
    var server = this.server
    server.port = port
    server.host = host
    server.liten(port,host)
}