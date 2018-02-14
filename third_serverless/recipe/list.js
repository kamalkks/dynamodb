'use strict'
const uuid = require('uuid')
const AWS= require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const params={
	TableName: 'recipe2'
}
module.exports.list=(event,context,callback) => {
dynamo.scan(params, (error, result) =>{
	if(error)
	{
		console.error(error);
		callback(new error("Cannot find the recipe"));
		return;
	}
	const response={
	statusCode: 200,
	body: JSON.stringify(result.Items)
	 };
	 callback(null, response)
})

}