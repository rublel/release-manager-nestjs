import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

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

  @Get('/config')
  getConfig() {
    const envs = ['sfoa', 'uat', 'prod'];
    const columns = [
      'repo_manager',
      'repositryName',
      'tag',
      'version',
      'description',
      'ref',
      'commit',
      'createdBy',
      'createdAt',
      'remoteUrl',
    ];
    return { repos: this.respositories, envs, columns };
  }
}
