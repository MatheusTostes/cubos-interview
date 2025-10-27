import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginDto {
  @ApiProperty({
    example: 'john@example.com',
    description: 'Email ou nome de usuário',
  })
  @IsString()
  @IsNotEmpty()
  identifier: string

  @ApiProperty({
    example: 'password123',
    description: 'Senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password: string
}
