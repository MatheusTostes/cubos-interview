import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Prisma } from '@prisma/client'

export interface UserCreateData {
  email: string
  name: string
  password: string
}

export interface UserSelectFields {
  id?: boolean
  email?: boolean
  name?: boolean
  password?: boolean
  createdAt?: boolean
  updatedAt?: boolean
}

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: UserCreateData) {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    })
  }

  async findUnique(id: string, select?: UserSelectFields) {
    return this.prisma.user.findUnique({
      where: { id },
      select: select || {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    })
  }

  async findFirst(where: Prisma.UserWhereInput, select?: UserSelectFields) {
    return this.prisma.user.findFirst({
      where,
      select: select || {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    })
  }

  async findByEmail(email: string, caseInsensitive = true) {
    return this.prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: caseInsensitive ? 'insensitive' : undefined,
        },
      },
    })
  }

  async findByName(name: string, caseInsensitive = true) {
    return this.prisma.user.findFirst({
      where: {
        name: {
          equals: name,
          mode: caseInsensitive ? 'insensitive' : undefined,
        },
      },
    })
  }

  async findByEmailOrName(identifier: string) {
    const isEmail = identifier.includes('@')

    return this.prisma.user.findFirst({
      where: isEmail
        ? {
            email: {
              equals: identifier,
              mode: 'insensitive',
            },
          }
        : {
            name: {
              equals: identifier,
              mode: 'insensitive',
            },
          },
    })
  }

  async update(id: string, data: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id },
      data,
    })
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: { id },
    })
  }
}

