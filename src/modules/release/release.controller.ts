import { Body, Controller, Post } from '@nestjs/common';
import { ReleaseService } from './release.service';

@Controller('release')
export class ReleaseController {
  constructor(private releaseService: ReleaseService) {}

  @Post()
  async createRelease(@Body() body: any) {
    return this.releaseService.createRelease(body);
  }
}
