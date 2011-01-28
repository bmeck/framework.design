//ARPANET MESSAGE
var ARPANETMessageMatcher = /^[\s\S]*?(?=$|\r\n.\r\n)/
var ARPANETMessageScrub = /^[.]{2,}/m
var i = 0
module.exports = function DATA(args,connection,resume) {
    if(args) {
        //TODO: ERROR: DATA command does not take arguments.    
    }
    connection.mail = null
    connection.stream.write("250 Ok\r\n")
    resume()
}