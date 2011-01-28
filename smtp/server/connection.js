var ArgumentMatcher = /[^\s]+/
var CommandMatcher = /^[A-Za-z]+(?=\s|\r\n).*?\r\n/
module.exports = function Connection(server,stream) {
    var self = this
    this.server = server
    this.stream = stream
    
    this.buffer = ""
    this.filters = [
        function consumeCommand(next,resume) {
            var cmd = self.buffer.match(CommandMatcher)
            if(cmd) {
                var args = cmd.match(ArgumentMatcher)
                var handler = self.server.commands[args[0]]
                if(handler) {
                    handler.call(self.server,args, self, resume)
                }
                else {
                    //TODO: ERROR: Unknown command args[0].    
                }
            }
            else {
                next()
            }
        }
    ]
    
    stream.on("data",function onData(data){
        var i = 0
        self.buffer += data
        function next() {
            self.filters[i].call(
                self,
                next,
                resume
            )
            i++
        }
        function resume() {
            i = 0
            next()
        }
        next()
    })
    
    var extensions = this.server.extensions
    if(extensions) {
        extensions = " "+extensions.join(" ")
    }
    else {
        extensions = ""    
    }
    stream.write("220 "+this.server.host+extensions)
}

Connection.prototype.filter = function filter(filter) {
    this.filters.unshift(filter)
}
Connection.prototype.unfilter = function unfilter(filter) {
    var index = this.filters.indexOf(filter)
    if(index !== -1) {
        this.filters.splice(index,1)    
    }
}