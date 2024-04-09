import {
  HttpException,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Client, ClientOptions } from '@elastic/elasticsearch';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ElasticsearchService implements OnModuleInit {
  private client: Client;
  public defaultPageSize: number;
  private environmentUrl: string;
  private username: string;
  private password: string;

  async onModuleInit(): Promise<void> {
    this.environmentUrl = process.env.ELASTICSEARCH_URL;
    this.username = process.env.ELASTICSEARCH_USERNAME;
    this.password = process.env.ELASTICSEARCH_PASSWORD;
    this.defaultPageSize = 100;

    const clientOptions: ClientOptions = {
      node: this.environmentUrl,
      requestTimeout: 300000,
      auth: {
        username: this.username,
        password: this.password,
      },
    };

    this.client = new Client(clientOptions);

    Logger.verbose('Initiated successfully', ElasticsearchService.name);
  }

  // ========== MAIN ==========
  async create(params, options?) {
    try {
      const ESCreationRes = await this.client.create(params, options);

      return ESCreationRes;
    } catch (error) {
      const metaData = {
        action: 'Elastic create API',
        system: 'ELASTIC',
        originalStatusCode: error?.response?.status,
        originalMessage: error?.message,
        data: { params },
      };
      error.metaData = metaData;
      throw error;
    }
  }

  async index(params, options?) {
    try {
      return await this.client.index(params, options);
    } catch (error) {
      throw new Error('Elastic failed to index');
    }
  }

  async update(params, options?) {
    try {
      return await this.client.update(params, options);
    } catch (error) {
      throw new Error('Elastic failed to update');
    }
  }

  async bulk(params, options?) {
    try {
      return await this.client.bulk(params, options);
    } catch (error) {
      throw new Error('Elastic failed to bulk');
    }
  }

  async updateByQuery(params, options?) {
    try {
      return await this.client.updateByQuery(params, options);
    } catch (error) {
      throw new Error('Elastic failed to Update by Query');
    }
  }

  async deleteByQuery(params, options?) {
    try {
      return await this.client.deleteByQuery(params, options);
    } catch (error) {
      throw new Error('Elastic failed to delete');
    }
  }

  async count(params, options?) {
    try {
      return await this.client.count(params, options);
    } catch (error) {
      throw new Error('Elastic failed to count');
    }
  }

  async search(params, options?) {
    try {
      return await this.client.search(params, options);
    } catch (error) {
      throw new Error('Elastic failed to search');
    }
  }

  async msearch(params, options?) {
    try {
      return await this.client.msearch(params, options);
    } catch (error) {
      throw new Error('Elastic failed to multiple search');
    }
  }

  async get(params, options?) {
    try {
      return await this.client.get(params, options);
    } catch (error) {
      throw new HttpException('Elastic failed to get', 404);
    }
  }

  async delete(params, options?) {
    try {
      return await this.client.delete(params, options);
    } catch (error) {
      throw new Error('Elastic failed to delete');
    }
  }

  async health() {
    try {
      return await this.client.cluster.health();
    } catch (error) {
      throw new Error('Elastic failed on get cluster health');
    }
  }

  async isHealthGreen() {
    try {
      const health: any = await this.health();
      return health.body.status === 'green';
    } catch (error) {
      return false;
    }
  }

  // ========== UTILS ==========
  getTotalSize(
    //! return type any to unknown and handle the errors
    results,
  ) {
    return results.body.hits.total.value;
  }

  normalizeResults(
    //! return type any to unknown and handle the errors
    results,
  ) {
    return results.body.hits.hits.map((hit: { _source: any }) => hit._source);
  }

  normalizeDocResult(
    //! return type any to unknown and handle the errors
    results,
  ) {
    return results.body._source;
  }
  extractDocumentsIds(
    //! return type any to unknown and handle the errors
    results,
  ): [string] {
    return results.body.hits.hits.map((hit: { _id: string }) => hit._id);
  }
  extractFieldsData(
    //! return type any to unknown and handle the errors
    results,
  ) {
    return results.body.hits.hits.map((hit) => ({
      id: hit._id,
      source: hit._source,
    }));
  }

  checkIfThisDocumentAlreadyExist(error: Record<string, any>): boolean {
    const hasConflict = error?.status == 409;
    if (hasConflict) {
      const isDocumentAlreadyExists = error?.root_cause?.[0]?.reason.includes(
        'document already exists',
      );
      if (isDocumentAlreadyExists) return true;
    }
    return false;
  }
}
