var TOMatcher = /^TO:<[^>]+@[^>]+>$/
module.exports = function RCPT(args,connection,resume) {
    if(args.length === 2) {
        if(!connection.mail) {
            //TODO: ERROR: Command send out of order.
        }
        else {
            var RecievingUser = args[1].match(ToMatcher).slice(6,-1)
            var recievers = connection.mail.recievers = (connection.mail.recievers || [])
            recievers.push(RecievingUser)
            connection.stream.write("250 Ok\r\n")
        }
    }
    else {
        if(args.length === 0) {
            //TODO: ERROR: Reciever email required.
        }
        else {
            //TODO: ERROR: Only 1 argument allowed.
        }
    }
}