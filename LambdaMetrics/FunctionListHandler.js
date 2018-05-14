let AWS = require('aws-sdk');
let commonUtils = require('./CommonUtils');

exports.handler = function(event, context, callback) {

	var params = {
		FunctionVersion: 'ALL',
		// Marker: 'STRING_VALUE',
		// MasterRegion: 'STRING_VALUE',
		MaxItems: 100
	};
	lambda.listFunctions(params, function (err, data) {
		if (err) { 
			console.log(err, err.stack);
			callback(null, commonUtils.generateFailureResponse(err));
		}
		else {
			console.log(data);
			callback(null, commonUtils.generateSuccessResponse(data));
		}
	});
}