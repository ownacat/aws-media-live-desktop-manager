import {
  MediaStoreDataClient,
  ListItemsCommand,
} from '@aws-sdk/client-mediastore-data';

function endpointToRegion(endpoint: string): string {
  return endpoint.split('.')[3];
}

export async function verify(
  accessKeyId: string,
  secretAccessKey: string,
  endpoint: string
) {
  const client = new MediaStoreDataClient({
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    region: endpointToRegion(endpoint),
    endpoint,
  });
  const input = {
    MaxResults: 1,
  };
  try {
    const command = new ListItemsCommand(input);
    const response = await client.send(command);

    return typeof response.Items === 'object';
  } catch (e) {
    return false;
  }
}

export default null;
