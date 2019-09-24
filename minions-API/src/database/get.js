
 const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

 const dynamoDb = new AWS.DynamoDB.DocumentClient();
 const myDomain = process.env.DOMAIN
 

module.exports.get = (event, context, callback) => {
    const params = {
      TableName: process.env.PRODUCT_TABLE_NAME,
      Key: {
        id: event.pathParameters.id,
      },
    };
  
    // fetch todo from the database
    dynamoDb.get(params, (error, result) => {
      // handle potential errors
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Couldn\'t fetch the minion.',
        });
        return;
      }
  
      // create a response
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': myDomain,
          "Access-Control-Allow-Credentials":"false",
          "Access-Control-Allow-Methods":"GET,OPTIONS",
          "Access-Control-Allow-Headers":"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          "Content-Type":"application/json"
        },
        body: JSON.stringify(result.Item),
      };
      callback(null, response);
    });
  };