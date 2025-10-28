import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Email ou nome de usuário para recuperar senha',
    example: 'user@example.com ou username',
  })
  @IsString()
  @IsNotEmpty()
  identifier: string
}
