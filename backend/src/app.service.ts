import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Cubos Interview API - Backend is running!'
  }
}
