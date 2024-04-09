import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoryModule } from './modules/repository/repository.module';
import { ElasticsearchModule } from './providers/elasticsearch/elasticsearch.module';
import { ReleaseModule } from './modules/release/release.module';

@Module({
  imports: [RepositoryModule, ReleaseModule, ElasticsearchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
