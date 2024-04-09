import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from 'src/providers/elasticsearch/elasticsearch.service';

@Injectable()
export class ReleaseService {
  constructor(private elasticService: ElasticsearchService) {}
  createRelease(body) {
    return this.elasticService.index({
      index: 'releases',
      body: {
        tag: body.tag,
        env: body.env,
        version: body.version,
        repository: body.repository,
        ref: body.ref,
        commit: body.commit,
        created_by: body.created_by,
        created_at: new Date(),
      },
    });
  }

  getLastRelease(repository: string, env: string) {
    return this.elasticService.search({
      index: 'releases',
      body: {
        query: {
          bool: {
            filter: [
              { term: { 'repository.keyword': repository } },
              { term: { 'env.keyword': env } },
            ],
          },
        },
        sort: [{ created_at: { order: 'desc' } }],
        size: 1,
      },
    });
  }
}
