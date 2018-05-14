function generateResponse(payload, statusCode = 200, headers = {}) {
    return {
        "isBase64Encoded": 1,
        "statusCode": statusCode,
        "headers": headers,
        "body": JSON.stringify(payload)
    };
}

function generateSuccessResponse(payload) {
    return generateResponse(payload, 200, {'access-control-allow-origin': '*'});
}

function generateFailureResponse(payload) {
    return generateResponse(payload, 500, {'access-control-allow-origin': '*'});
}