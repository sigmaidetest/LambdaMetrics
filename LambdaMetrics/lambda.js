let AWS = require('aws-sdk');
const sns = new AWS.SNS();
const lambda = new AWS.Lambda();
const cloudwatch = new AWS.CloudWatch();

exports.handler = function (event, context, callback) {


	// var params = {
	// 	FunctionVersion: 'ALL',
	// 	// Marker: 'STRING_VALUE',
	// 	// MasterRegion: 'STRING_VALUE',
	// 	MaxItems: 100
	// };
	// lambda.listFunctions(params, function (err, data) {
	// 	if (err) { 
	// 		console.log(err, err.stack);
	// 		callback(err);
	// 	}
	// 	else {
	// 		console.log(data);
	// 		callback(null, 'Successfully executed');
	// 	}
	// });

	var params = {
		EndTime: 1526294898, /* required */
		MetricName: 'Duration', /* required */
		Namespace: 'AWS/Lambda', /* required */
		Period: 180, /* required */
		StartTime: 1526122095, /* required */
		Dimensions: [
			{
				Name: 'FunctionName', /* required */
				Value: 'SigmaTestEnvironmentRunner-andunranmal'
			},
			/* more items */
		],
		// ExtendedStatistics: [
		// 	'STRING_VALUE',
		// 	/* more items */
		// ],
		Statistics: ['Average', 'Minimum', 'Maximum'],
		Unit: 'Milliseconds'
	};
	cloudwatch.getMetricStatistics(params, function (err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else console.log(data);           // successful response
	});

	// var params = {
	// 	Dimensions: [
	// 		{
	// 			Name: 'FunctionName', /* required */
	// 			Value: 'SigmaTestEnvironmentRunner-andunranmal'
	// 		},
	// 		/* more items */
	// 	],
	// 	MetricName: 'Duration',
	// 	Namespace: 'AWS/Lambda',
	// 	// NextToken: 'STRING_VALUE'
	// };
	// cloudwatch.listMetrics(params, function (err, data) {
	// 	if (err) {
	// 		console.log(err, err.stack);
	// 		callback(err);
	// 	}
	// 	else {
	// 		let metrics = data.Metrics;
	// 		metrics.forEach(metric => {
	// 			console.log(metric['MetricName']);
	// 			console.log(metric['Dimensions']);
	// 		});
	// 		callback(null, 'Successfully executed');
	// 	}
	// });



}