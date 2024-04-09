import { ElasticsearchService } from './elasticsearch.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
