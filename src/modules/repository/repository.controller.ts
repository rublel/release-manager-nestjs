import { Controller, Get, Param } from '@nestjs/common';
import { RepositoryService } from './repository.service';

@Controller('repository')
export class RepositoryController {
  constructor(private reposotoryService: RepositoryService) {}
  private readonly respositories = [
    'diorstar-wechat-replication-functions',
    'diorstar-wechat-replication-functions-sfoa',
    'diorstar-wechat-logicapps',
    'diorstar-wechat-apimanager',
    'diorstar-wechat-backend',
    'diorstar-wechat-azfunction',
    'diorstar-wechat-webapp',
    'algolia-middleware',
    'mp-js-wechat',
    'sch-diorstar-mpjs',
    'sch-wechat-backend',
    'sch-diorstar-jobs',
    'sch-diorstar-h5',
  ];

  @Get()
  async getAzDevopsRepos() {
    return await this.reposotoryService.getDevOpsRepos();
  }

  @Get('/:repository')
  async getAzDevopsRepo(@Param('repository') repository: string) {
    return await this.reposotoryService.getDevOpsReleases(repository);
  }

  @Get('/env/:env')
  async getAzDevopsReposByEnv(@Param('env') env: string) {
    const promises = this.respositories.map(async (repo) => {
      //   const { remoteUrl, repository } =
      //     await this.reposotoryService.getDevOpsRepo(repo);
      const release: any = await this.reposotoryService.getLastRelease(
        repo,
        env,
      );
      return { remoteUrl: '', ...release };
    });
    const data = await Promise.all(promises);
    return { data };
  }

  @Get('/:repository/env/:env')
  async getAzDevopsRepoByEnv(
    @Param('repository') repository: string,
    @Param('env') env: string,
  ) {
    // const { remoteUrl, repository: repo } =
    //   await this.reposotoryService.getDevOpsRepo(repository);
    const release: any = await this.reposotoryService.getLastRelease(
      repository,
      env,
    );
    if (!release) return { data: [] };
    return { data: [{ remoteUrl: '', ...release }] };
  }

  @Get('/:repository/ref/:ref')
  getAzDevopsRepoRef(
    @Param('repository') repository: string,
    @Param('ref') ref: string,
  ) {
    return this.reposotoryService.getDevOpsRepoRef(repository, ref);
  }
}
