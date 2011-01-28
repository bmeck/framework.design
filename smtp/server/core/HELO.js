module.exports = function HELO(args,connection,resume) {
    if(args.length === 2) {
        var sender = connection.sender = args[1]
        connection.stream.write("250 Hello "+sender+", I am glad to meet you\r\n")
        resume()
    }
    else {
        if(args.length === 0) {
            //TODO: ERROR: Sender hostname required.
        }
        else {
            //TODO: ERROR: Only 1 argument allowed.
        }
    }
}