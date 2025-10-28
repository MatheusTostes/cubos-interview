import { IsString, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token de reset de senha',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  token: string

  @ApiProperty({
    description: 'Nova senha do usuário',
    example: 'novaSenha123!',
  })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string

  @ApiProperty({
    description: 'Confirmação da nova senha',
    example: 'novaSenha123!',
  })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  confirmPassword: string
}
