
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const params = {
  TableName: process.env.PRODUCT_TABLE_NAME,
};

module.exports.list = (event, context, callback) => {
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
        print('error');
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 
          'Content-Type': 'text/plain' 
        },
        body: 'Couldn\'t fetch the the minion.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
      headers: { 
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":"false",
        "Access-Control-Allow-Methods":"GET,OPTIONS",
        "Access-Control-Allow-Headers":"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Content-Type":"application/json"
      },
    };
    callback(null, response);
  });
}