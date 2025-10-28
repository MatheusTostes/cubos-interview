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

  async sendPasswordResetEmail(data: {
    to: string
    userName: string
    resetLink: string
  }) {
    try {
      const verifiedDomain = process.env.RESEND_VERIFIED_DOMAIN
      const fromEmail = verifiedDomain
        ? `Movies <noreply@${verifiedDomain}>`
        : 'Movies <onboarding@resend.dev'

      this.logger.log(`Sending password reset email to ${data.to}`)

      const response = await this.resend.emails.send({
        from: fromEmail,
        to: data.to,
        subject: '🔐 Redefina sua senha - Cubos Movies',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #8b5cf6;">Olá, ${data.userName}! 👋</h1>
            
            <p>Recebemos uma solicitação para redefinir sua senha no Cubos Movies.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.resetLink}" 
                 style="display: inline-block; padding: 12px 30px; background-color: #8b5cf6; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
                Redefinir Senha
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">
              Se você não solicitou a redefinição de senha, ignore este email. Este link expira em 1 hora.
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Este é um email automático do sistema Cubos Movies.
              </p>
            </div>
          </div>
        `,
      })

      this.logger.log(`Response from Resend: ${JSON.stringify(response)}`)

      if (response.error) {
        this.logger.error(`Resend API error: ${JSON.stringify(response.error)}`)
        return { success: false, error: response.error }
      }

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
      const verifiedDomain = process.env.RESEND_VERIFIED_DOMAIN
      const fromEmail = verifiedDomain
        ? `Movies <noreply@${verifiedDomain}>`
        : 'Movies <onboarding@resend.dev>'

      this.logger.log(`Sending password changed confirmation to ${data.to}`)

      const response = await this.resend.emails.send({
        from: fromEmail,
        to: data.to,
        subject: '✅ Senha alterada com sucesso - Cubos Movies',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #8b5cf6;">Olá, ${data.userName}! ✅</h1>
            
            <p>Sua senha foi alterada com sucesso!</p>
            
            <p>Se você não realizou esta alteração, entre em contato conosco imediatamente.</p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px;">
                Este é um email automático do sistema Cubos Movies.
              </p>
            </div>
          </div>
        `,
      })

      this.logger.log(`Response from Resend: ${JSON.stringify(response)}`)

      if (response.error) {
        this.logger.error(`Resend API error: ${JSON.stringify(response.error)}`)
        return { success: false, error: response.error }
      }

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
