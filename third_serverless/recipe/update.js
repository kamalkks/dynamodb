'use strict'
const uuid = require('uuid')
const AWS= require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {

  const data = JSON.parse(event.body);

  const params = {
    TableName:'recipe2',
    Key: {
      id: event.pathParameters.idofrecipe,
    },
    ExpressionAttributeNames: {
      '#name': 'name',
      '#ingredients': 'ingredients',
      '#steps': 'steps'
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':ingredients': data.ingredients,
      ':steps': data.steps,
    },
    UpdateExpression: 'SET #name = :name, #ingredients = :ingredients, #steps = :steps',
    ReturnValues: 'ALL_NEW',
  };
  dynamo.update(params, (error, result) => {
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
};

// module.exports.update = (events, context, callback) => {

// 	const data = JSON.parse(event.body);

// const params = {
// 	TableName: 'recipe2',
// 	Item: {
// 		id: event.pathParameters.idofrecipe,
// 		name: data.name,
// 		ingredients: data.ingredients,
// 		steps: data.steps
// 	}
// }
// dynamoDb.put(params, (error, result) =>{
// 	if(error)
// 	{
// 		console.error(error);
// 		callback(new Error('Could not update the recipe'));
// 		return;
// 	}

// 	const response = {
// 		statusCode: 200,
// 		body: JSON.stringify(result.Item)
// 	}
// 	callback(null,response)
// });
// };

// module.exports.update=(event,context,callback) => {
	
// 	const diamond = JSON.parse(event.body);
	
// const params = {
// 	    TableName:'recipe2',
//     Key: {
//      id: event.pathParameters.idofrecipe
//     },
//     UpdateExpression: 'set name = :name, ingredients = :ingredients, steps = :steps',
//     ExpressionAttributeValues: {
//       ':name':diamond.name,
//       ':ingredients':diamond.ingredients,
//       ':steps': diamond.steps
//     },
   
//     ReturnValues:"UPDATED_NEW"

//              };

// dynamoDb.update(params, (error, result) => {

// if(error)
// {
// 	console.error(error);
// 	callback(new Error("Cannot update the recipe"));
// 	return;
// }
// const response = {
// 	statusCode:200,
// 	body: JSON.stringify(result);
// }
// callback(null,response);
// });

// };
