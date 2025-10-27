import { ApiProperty } from '@nestjs/swagger'

export class UserProfileDto {
  @ApiProperty({ example: 'uuid-example', description: 'ID do usuário' })
  id: string

  @ApiProperty({ example: 'user@example.com', description: 'Email do usuário' })
  email: string

  @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
  name: string

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Data de criação',
  })
  createdAt: Date

  @ApiProperty({
    example: '2024-01-01T00:00:00.000Z',
    description: 'Data de atualização',
  })
  updatedAt: Date
}
