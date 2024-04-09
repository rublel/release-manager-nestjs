import { Module } from '@nestjs/common';
import { RepositoryController } from './repository.controller';
import { RepositoryService } from './repository.service';
import { ReleaseService } from '../release/release.service';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService, ReleaseService],
})
export class RepositoryModule {}
