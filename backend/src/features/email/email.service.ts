import { Injectable, Logger } from '@nestjs/common'
import { Resend } from 'resend'
import { EmailTemplates } from './templates/email-templates'
import { EmailSenderHelper } from './helpers/email-sender.helper'

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name)
  private resend: Resend

  constructor() {
    const apiKey = process.env.RESEND_API_KEY || ''
    this.resend = new Resend(apiKey)
  }

  async sendMovieReleaseNotification(data: {
    to: string
    movieTitle: string
    releaseDate: string
    userName: string
  }) {
    try {
      this.logger.log(`Attempting to send email to ${data.to}`)

      const html = EmailTemplates.getMovieReleaseNotification(
        data.userName,
        data.movieTitle,
        data.releaseDate
      )

      const response = await EmailSenderHelper.sendEmail(
        this.resend,
        data.to,
        `🎬 ${data.movieTitle} está lançando hoje!`,
        html
      )

      this.logger.log(
        `Email sent successfully to ${data.to} with ID: ${response.data?.id}`
      )

      return response
    } catch (error) {
      this.logger.error(`Failed to send email to ${data.to}:`, error)
      throw error
    }
  }

  async sendWelcomeEmail(data: { to: string; userName: string }) {
    try {
      this.logger.log(`Sending welcome email to ${data.to}`)

      const html = EmailTemplates.getWelcomeEmail(data.userName)

      const response = await EmailSenderHelper.sendEmail(
        this.resend,
        data.to,
        '🎬 Bem-vindo ao Cubos Movies!',
        html
      )

      this.logger.log(
        `Welcome email sent successfully to ${data.to} with ID: ${response.data?.id}`
      )

      return response
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${data.to}:`, error)
      throw error
    }
  }

  async sendPasswordResetEmail(data: {
    to: string
    userName: string
    resetLink: string
  }) {
    try {
      this.logger.log(`Sending password reset email to ${data.to}`)

      const html = EmailTemplates.getPasswordResetEmail(
        data.userName,
        data.resetLink
      )

      const response = await EmailSenderHelper.sendEmail(
        this.resend,
        data.to,
        '🔐 Redefina sua senha - Cubos Movies',
        html
      )

      this.logger.log(
        `Password reset email sent successfully to ${data.to} with ID: ${response.data?.id}`
      )

      return response
    } catch (error) {
      this.logger.error(
        `Failed to send password reset email to ${data.to}:`,
        error
      )
      throw error
    }
  }

  async sendPasswordChangedEmail(data: { to: string; userName: string }) {
    try {
      this.logger.log(`Sending password changed confirmation to ${data.to}`)

      const html = EmailTemplates.getPasswordChangedEmail(data.userName)

      const response = await EmailSenderHelper.sendEmail(
        this.resend,
        data.to,
        '✅ Senha alterada com sucesso - Cubos Movies',
        html
      )

      this.logger.log(
        `Password changed confirmation sent successfully to ${data.to} with ID: ${response.data?.id}`
      )

      return response
    } catch (error) {
      this.logger.error(
        `Failed to send password changed confirmation to ${data.to}:`,
        error
      )
      throw error
    }
  }
}
