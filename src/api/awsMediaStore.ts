import {
  MediaStoreDataClient,
  ListItemsCommand,
} from '@aws-sdk/client-mediastore-data';

// import { fromIni } from '@aws-sdk/credential-provider-ini';

// fromIni();

// ES Modules import
// const { MediaStoreDataClient, ListItemsCommand } = require("@aws-sdk/client-mediastore-data"); // CommonJS import

// AWS.config.loadFromPath('./config.json');

// var credentials = new AWS.SharedIniFileCredentials({profile: 'work-account'});
// AWS.config.credentials = credentials;
// { "accessKeyId": <YOUR_ACCESS_KEY_ID>, "secretAccessKey": <YOUR_SECRET_ACCESS_KEY>, "region": "us-east-1" }
export function verify(accessKeyId: string, secretAccessKey: string) {
  const client = new MediaStoreDataClient({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region: 'us-east-1',
    endpoint: 'https://data.mediastore.us-east-1.amazonaws.com',
  });
  const input = {
    // ListItemsRequest
    MaxResults: 1,
    // NextToken: 'STRING_VALUE',
  };
  const command = new ListItemsCommand(input);
  const response = /* await */ client.send(command);
  console.log(response);
}
/*
const client = new MediaStoreDataClient({
  credentials: {
    accessKeyId: 'asdasd',
    secretAccessKey: 'asdasd',
  },
});
const input = {
  // ListItemsRequest
  MaxResults: 1,
  NextToken: 'STRING_VALUE',
};
const command = new ListItemsCommand(input);
const response =  client.send(command);
*/
export default null;
