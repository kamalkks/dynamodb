'use strict'
const uuid = require('uuid')
const aws= require('aws-sdk');
const dynamo = new aws.DynamoDB.DocumentClient();

module.exports.create=(event,context,callback) => {
	const data = JSON.parse(event.body);
		if(typeof data.ingredients !== 'string' || typeof data.name !== 'string'|| typeof data.steps !== 'string')
	{
		console.error('Validation failed');
		callback(new Error('There is an error'));
		return;
	}

	const params = {
		TableName: 'recipe2',
		Item: {
			id: uuid.v1(),
			name:data.name,
			ingredients:data.ingredients,
			steps:data.steps
		}
	}
	dynamo.put(params, (error,result) =>{
		if(error)
		{
			console.error(error);
			callback(new Error('Create didnt work'));
			return;
		}
		const response = {
			statusCode: 200,
			body: JSON.stringify(result.Item)
		}
		callback(null,response)
	})

}