function NOOP(){}
module.exports = function QUIT(args,connection,resume) {
    connection.stream.write("221 Bye\r\n")
    connection.filter(NOOP)
    connection.stream.close()
}