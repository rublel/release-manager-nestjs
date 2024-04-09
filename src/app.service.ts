import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ReleaseService } from './modules/release/release.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AppService {
  constructor(private releaseService: ReleaseService) {}

  async getDevOpsRepos() {
    const devOpsApiUrl = `https://dev.azure.com/${process.env.AZURE_DEVOPS_ORG}/_apis/git/repositories?api-version=6.0`;
    const headers = {
      Authorization: `Basic ${Buffer.from(
        `:${process.env.AZURE_DEVOPS_PAT}`,
      ).toString('base64')}`,
    };
    try {
      const response = await axios.get(devOpsApiUrl, { headers });
      const repos = response.data.value.map((repo: any) => repo.name);
      console.log('Azure DevOps Repositories:', repos);
      return repos;
    } catch (error) {
      console.error(
        'Error fetching Azure DevOps repositories:',
        error.response?.data || error.message,
      );
    }
  }

  async getDevOpsRepo(reposotiory: string) {
    const devOpsApiUrl = `https://dev.azure.com/${process.env.AZURE_DEVOPS_ORG}/${process.env.AZURE_DEVOPS_PROJECT_NAME}/_apis/git/repositories/${reposotiory}?api-version=6.0`;

    const headers = {
      Authorization: `Basic ${Buffer.from(
        `:${process.env.AZURE_DEVOPS_PAT}`,
      ).toString('base64')}`,
    };
    try {
      const response = await axios.get(devOpsApiUrl, { headers });
      return response.data;
    } catch (error) {
      console.error(
        'Error fetching Azure DevOps repositories:',
        error.response?.data || error.message,
      );
    }
  }

  async getDevOpsRepoRef(repository: string, ref: string) {
    const devOpsApiUrl = `https://dev.azure.com/${process.env.AZURE_DEVOPS_ORG}/${process.env.AZURE_DEVOPS_PROJECT_NAME}/_apis/git/repositories/${repository}/refs?filter=${ref}&api-version=6.0`;

    const headers = {
      Authorization: `Basic ${Buffer.from(
        `:${process.env.AZURE_DEVOPS_PAT}`,
      ).toString('base64')}`,
    };
    try {
      const response = await axios.get(devOpsApiUrl, { headers });
      const refs = response.data.value;
      return refs.filter((_ref: any) => _ref.name.includes(ref));
    } catch (error) {
      console.error(
        'Error fetching Azure DevOps repositories:',
        error.response?.data || error.message,
      );
    }
  }

  async getLastRelease(repository: string, env: string) {
    const response = await this.releaseService.getLastRelease(repository, env);
    return response.hits.hits[0]?._source;
  }
}
