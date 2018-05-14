let AWS = require('aws-sdk');
exports.handler = function (event, context, callback) {

	var params = {
		FunctionVersion: ALL,
		// Marker: 'STRING_VALUE',
		// MasterRegion: 'STRING_VALUE',
		MaxItems: 0
	};
	lambda.listFunctions(params, function (err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else console.log(data);           // successful response
	});
	callback(null, 'Successfully executed');
}