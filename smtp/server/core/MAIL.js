var FROMMatcher = /^FROM:<[^>]+@[^>]+>$/
module.exports = function HELO(args,connection,resume) {
    if(args.length === 2) {
        var SendingUser = args[1].match(FROMMatcher).slice(6,-1)
        connection.mail = {
            sender: SendingUser
        }
        connection.stream.write("250 Ok\r\n")
    }
    else {
        if(args.length === 0) {
            //TODO: ERROR: Sender email required.
        }
        else {
            //TODO: ERROR: Only 1 argument allowed.
        }
    }
}