class ErrorResponse extends Error{
    constructer(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse