var net = require("net")

var u = 0
var DISCONNECTED = u++
var CONNECTED = u++
var READY = u++
var SENT_FROM = u++
var SENT_TO = u++
var SENT_DATA = u++

function Client(ourhost) {
    this.host = ourhost
    this.socket = null
    this.state = DISCONNECTED
    this.queue = []
}

Client.prototype.connect = function connect(port,host) {
    var self = this
    this.state = DISCONNECTED
    this.socket = net.createConnection(port,host,function onConnect(){
        if(self.socket === this) {
            self.state = CONNECTED    
        }
    })
}

Client.prototype.handleStatus = function handleStatus(status,msg) {
    
}

Client.prototype.send = function send(email) {
    if(this.state === HANDSHAKE) {
        this.socket.
    }
    else {
        this.socket.send("MAIL FROM:<"+email.from+">\r\n")
        this.socket.send("RCPT TO:<"+email.from+">\r\n")    
        this.socket.send("DATA\r\n")
        var headers = email.headers
        for(var header in headers) {
            this.socket.send(header+": "+headers[header])
        }
        this.socket.send("\r\n")
        this.socket.send(email.body)
        this.socket.send("\r\n")
    }
}