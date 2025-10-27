import { Module } from '@nestjs/common'
import { SituationsController } from './situations.controller'
import { SituationsService } from './situations.service'

@Module({
  controllers: [SituationsController],
  providers: [SituationsService],
  exports: [SituationsService],
})
export class SituationsModule {}
