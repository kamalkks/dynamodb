'use strict'
const uuid = require('uuid')
const AWS= require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.search=(event,context,callback) => {
	const params={
	TableName: 'recipe2',
	Key:{
		id: event.pathParameters.idofrecipe
	}
};
dynamo.get(params, (error,result) =>{
if(error)
{
	console.error(error);
	callback(new Error("Unable to search the recipe"));
	return;

}
const response = {
	statusCode: 200,
	body: JSON.stringify(result.Item)
};
callback(null,response);
});

}