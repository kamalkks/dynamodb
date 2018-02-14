'use strict'
const uuid = require('uuid')
const AWS= require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event,context,callback) => {
	const params={
	TableName: 'recipe2',
	Key:{
		id: event.pathParameters.idofrecipe
	}
};
dynamo.delete(params, (error,result) =>{
if(error)
{
	console.error(error);
	callback(new Error("Cannot delete the recipe"));
	return;

}
const response = {
	statusCode: 200,
	body: JSON.stringify({})
};
callback(null,response);
});

}