import {
  MediaStoreDataClient,
  ListItemsCommand,
  Item,
  ListItemsCommandInput,
} from '@aws-sdk/client-mediastore-data';

function endpointToRegion(endpoint: string): string {
  return endpoint.split('.')[3];
}

class AwsMediaStore {
  // eslint-disable-next-line no-use-before-define
  private static instance: AwsMediaStore;

  private client: MediaStoreDataClient | null = null;

  public async authenticate(
    secretAccessKey: string,
    accessKeyId: string,
    endpoint: string
  ) {
    this.client = new MediaStoreDataClient({
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
      const response = await this.client.send(command);

      return typeof response.Items === 'object';
    } catch (e) {
      this.client = null;
      return false;
    }
  }

  public async getFiles(path: string): Promise<Item[]> {
    if (this.client === null) {
      throw new Error('Not authenticated');
    }

    let response = null;
    let results: Item[] = [];
    try {
      do {
        const input: ListItemsCommandInput = {
          MaxResults: 500,
          Path: path,
          NextToken: response?.NextToken ?? undefined,
        };
        const command = new ListItemsCommand(input);
        // eslint-disable-next-line no-await-in-loop
        response = await this.client.send(command);
        if (response.Items) {
          results = results.concat(response.Items);
        }
      } while (response && response.NextToken);

      return results;
    } catch (e) {
      return [];
    }
  }

  public static get Instance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new this();
    return this.instance;
  }
}

const awsMediaStore = AwsMediaStore.Instance;
export default awsMediaStore;
