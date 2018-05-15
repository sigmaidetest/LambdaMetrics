const commonUtils = require('./CommonUtils');
let AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

const LAMBDA_ARN_QPARAM = 'lambdaArn';

exports.handler = function (event, context, callback) {

	let qParams = event.queryStringParameters;
	let qParamsKeys = Object.keys(qParams || {});
	console.log(qParamsKeys);

	if (qParamsKeys.indexOf(LAMBDA_ARN_QPARAM) >= 0) {
		getLambdaInfo(callback, qParams[LAMBDA_ARN_QPARAM]);
	} else {
		listLambdas(callback, qParams);
	}
}

function listLambdas(callback, qParams) {

	var params = {
		FunctionVersion: 'ALL',
		// MasterRegion: 'STRING_VALUE',
		MaxItems: qParams.maxLimit
	};
	if (qParams.nextMarker) {
		params['Marker'] = qParams.nextMarker;
	}

	lambda.listFunctions(params).promise()
		.then(data => {
			let nextMarker = data.NextMarker;
			let functions = data.Functions;

			let summarizedFunctions = [];
			if (functions) {
				summarizedFunctions = functions.map(func => {
					return {
						"FunctionName": func.FunctionName,
						"FunctionArn": func.FunctionArn,
						"Runtime": func.Runtime,
						"Description": func.Description,
						"Timeout": func.Timeout,
						"MemorySize": func.MemorySize
					}
				});
			}
			callback(null, commonUtils.generateSuccessResponse({
				NextMarker: nextMarker,
				Functions: summarizedFunctions
			}));
		})
		.catch(err => {
			console.log(err, err.stack);
			callback(null, commonUtils.generateFailureResponse(err));
		});
}

function getLambdaInfo(callback, lambdaArn) {

	var params = {
		FunctionName: lambdaArn
		// Qualifier: 'STRING_VALUE'
	};
	lambda.getFunction(params).promise()
		.then(data => {
			console.log(data);
			callback(null, commonUtils.generateSuccessResponse(data));
		})
		.catch(err => {
			console.log(err, err.stack);
			callback(null, commonUtils.generateFailureResponse(err));
		});
};