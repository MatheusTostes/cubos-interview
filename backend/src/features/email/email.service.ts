import { Injectable, Logger } from '@nestjs/common'
import { Resend } from 'resend'

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
      // Usar domínio verificado se disponível
      const verifiedDomain = process.env.RESEND_VERIFIED_DOMAIN
      const fromEmail = verifiedDomain
        ? `Movies <noreply@${verifiedDomain}>`
        : 'Movies <onboarding@resend.dev>'

      this.logger.log(`Attempting to send email to ${data.to}`)
      this.logger.log(`Using from address: ${fromEmail}`)

      const response = await this.resend.emails.send({
        from: fromEmail,
        to: data.to,
        subject: `🎬 ${data.movieTitle} está lançando hoje!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #8b5cf6;">Olá, ${data.userName}! 🎉</h1>
            
            <p>Está na hora! O filme <strong>${data.movieTitle}</strong> está lançando hoje, dia ${new Date(data.releaseDate).toLocaleDateString('pt-BR')}!</p>
            
            <p>Não perca este lançamento incrível! 🎭🍿</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Este é um email automático do sistema de notificações de filmes.
              </p>
            </div>
          </div>
        `,
      })

      // Log detalhado da resposta
      this.logger.log(`Response from Resend: ${JSON.stringify(response)}`)

      if (response.error) {
        this.logger.error(`Resend API error: ${JSON.stringify(response.error)}`)
        return { success: false, error: response.error }
      }

      this.logger.log(
        `Email sent successfully to ${data.to} with ID: ${response.data?.id}`
      )

      this.logger.log(`Response from Resend: ${JSON.stringify(response)}`)
      return response
    } catch (error) {
      this.logger.error(`Failed to send email to ${data.to}:`, error)
      throw error
    }
  }

  async sendWelcomeEmail(data: { to: string; userName: string }) {
    try {
      // Usar domínio verificado se disponível
      const verifiedDomain = process.env.RESEND_VERIFIED_DOMAIN
      const fromEmail = verifiedDomain
        ? `Movies <noreply@${verifiedDomain}>`
        : 'Movies <onboarding@resend.dev>'

      this.logger.log(`Sending welcome email to ${data.to}`)
      this.logger.log(`Using from address: ${fromEmail}`)

      const response = await this.resend.emails.send({
        from: fromEmail,
        to: data.to,
        subject: `🎬 Bem-vindo ao Cubos Movies!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #8b5cf6;">Olá, ${data.userName}! 🎉</h1>
            
            <p>Seja muito bem-vindo ao <strong>Cubos Movies</strong>!</p>
            
            <p>Estamos empolgados em ter você em nossa comunidade de amantes de cinema! 🎭</p>
            
            <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #8b5cf6; margin-top: 0;">O que você pode fazer:</h2>
              <ul style="color: #6b7280; line-height: 1.8;">
                <li>📝 Cadastrar seus filmes favoritos</li>
                <li>⭐ Avaliar e comentar</li>
                <li>📅 Receber notificações de lançamentos</li>
                <li>🎬 Explorar catálogo incrível de filmes</li>
              </ul>
            </div>
            
            <p>Comece a explorar agora mesmo e descubra seu próximo filme favorito! 🎬🍿</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Este é um email automático de boas-vindas do sistema Cubos Movies.
              </p>
            </div>
          </div>
        `,
      })

      // Log detalhado da resposta
      this.logger.log(`Response from Resend: ${JSON.stringify(response)}`)

      if (response.error) {
        this.logger.error(`Resend API error: ${JSON.stringify(response.error)}`)
        return { success: false, error: response.error }
      }

      this.logger.log(
        `Welcome email sent successfully to ${data.to} with ID: ${response.data?.id}`
      )

      return response
    } catch (error) {
      this.logger.error(`Failed to send welcome email to ${data.to}:`, error)
      throw error
    }
  }
}
