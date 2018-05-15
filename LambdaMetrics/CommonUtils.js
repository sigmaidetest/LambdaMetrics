module.exports = {

    generateResponse: function (payload, statusCode = 200, headers = {}) {
        return generateGenericResponse(payload, statusCode, headers);
    },

    generateSuccessResponse: function (payload) {
        return generateGenericResponse(payload, 200, { 'access-control-allow-origin': '*' });
    },

    generateFailureResponse: function (payload) {
        return generateGenericResponse(payload, 500, { 'access-control-allow-origin': '*' });
    }
}

function generateGenericResponse(payload, statusCode = 200, headers = {}) {
    return {
        "isBase64Encoded": 1,
        "statusCode": statusCode,
        "headers": headers,
        "body": JSON.stringify(payload)
    };
}