//ARPANET MESSAGE
var ARPANETMessageMatcher = /^[\s\S]*?(?=$|\r\n.\r\n)/
var ARPANETMessageScrub = /^[.]{2,}/m
var i = 0
module.exports = function DATA(args,connection,resume) {
    if(args) {
        //TODO: ERROR: DATA command does not take arguments.    
    }
    if(!connection.mail || !connection.mail.recievers) {
        //TODO: ERROR: Command send out of order.
    }
    else {
        connection.stream.write("354 End data with <CR><LF>.<CR><LF>\r\n")
        function ARPANETConsumer(next,resume){
            var data = connection.buffer.match(ARPANETMessageMatcher)
            if(data) {
                var mail = connection.mail
                mail.text = data.replace(ARPANETMessageScrub,".")
                mail.id = ++i
                connection.mail = null
                connection.buffer = connection.buffer.slice(data.length)
                connection.unfilter(ARPANETConsumer)
                connection.stream.write("250 Ok: queued as "+(mail.id)+"\r\n")
                connection.emit("email",mail)
                resume()
            }
            //else let it buffer
        }
    }
    connection.filter(ARPANETConsumer)
    resume()
}