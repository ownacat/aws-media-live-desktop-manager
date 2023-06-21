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


  public async caluculateSizeByPath(path: string): Promise<number[]> {
    if (this.client === null) {
      throw new Error('Not authenticated');
    }

    let response = null;
    let totalSize: number = 0;
    let totalCount: number = 0;
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
        
            for(let i=0; i<response.Items.length; i++){
                if(response.Items[i].Type === 'FOLDER'){
                  const newPath = path + '/' + response.Items[i].Name ;
                  const [folderSize, folderCount] = await this.caluculateSizeByPath(newPath);
                  if(folderCount){
                    totalSize += folderSize;
                    totalCount += folderCount;
                  }
                }else if(response.Items[i].ContentLength){
                  totalSize += response.Items[i].ContentLength as number;
                  totalCount += 1;
                }
            }
          

        }
      } while (response && response.NextToken);

      return [totalCount, totalSize];
    } catch (e) {
      return [0,0];
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
