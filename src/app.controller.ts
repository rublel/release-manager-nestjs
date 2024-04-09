import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly respositories = [
    'diorstar-wechat-replication-functions',
    'diorstar-wechat-replication-functions-sfoa',
    'diorstar-wechat-logicapps',
    'mp-js-wechat',
    'diorstar-wechat-apimanager',
    'diorstar-wechat-backend',
    'diorstar-wechat-azfunction',
    'diorstar-wechat-webapp',
    'algolia-middleware',
  ];

  @Get('/config')
  getConfig() {
    const envs = ['dev', 'uat', 'prod'];
    const columns = [
      'repositryName',
      'version',
      'ref',
      'commit',
      'createdBy',
      'createdAt',
      'remoteUrl',
    ];
    return { repos: this.respositories, envs, columns };
  }
}
