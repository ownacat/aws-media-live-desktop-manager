import {
  MediaStoreDataClient,
  ListItemsCommand,
  Item,
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

    const input = {
      MaxResults: 100,
      Path: path,
    };
    try {
      const command = new ListItemsCommand(input);
      const response = await this.client.send(command);

      // TODO paging
      if (response.Items) {
        return response.Items;
      }
      return [];
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
