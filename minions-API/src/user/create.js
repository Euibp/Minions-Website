'use strict';


const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const uuid = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();

//Post : http.../create --data

module.exports.create = (event, context, callback) => {
  //const timestamp = new Date().getTime();
  const token = JSON.parse(event.body);
  
  if (typeof token.text !== 'string') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the minion.',
    });
    return;
  }

  const params = {
    TableName: process.env.USERS_TABLE_NAME,
    Item: {
      id: uuid.v1(),
      token: token.text,
      shoplist: new Map(),
    },
  };

  // write the todo to the database
  dynamodb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the minion.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
      headers: {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":"false",
        "Access-Control-Allow-Methods":"POST,OPTIONS",
        "Access-Control-Allow-Headers":"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Content-Type":"application/json"
      },
    };
    callback(null, response);
  });
};