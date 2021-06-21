class ErrorService {
    ErrorService() { }

    static genError(errorObj) {
        if (errorObj.error === 'VALIDATION') {
            return ({ status: 400, message: errorObj.error_msg });
        } else if (errorObj.error === 'DB_CONNECTION') {
            return ({ status: 500, message: "Problem while getting database connection. Please try again" });
        } else if (errorObj.error === 'INSERT_FAILURE') {
            return ({ status: 500, message: "Problem while saving given details. Please try again" });
        } else {
            return ({ status: 500, message: "Problem while processing request. Please try again" });
        }
    }
}

module.exports = ErrorService;