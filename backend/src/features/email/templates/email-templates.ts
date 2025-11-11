export class EmailTemplates {
  static getWelcomeEmail(userName: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8b5cf6;">Olá, ${userName}! 🎉</h1>
        
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
    `
  }

  static getPasswordResetEmail(userName: string, resetLink: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8b5cf6;">Olá, ${userName}! 👋</h1>
        
        <p>Recebemos uma solicitação para redefinir sua senha no Cubos Movies.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" 
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
    `
  }

  static getPasswordChangedEmail(userName: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8b5cf6;">Olá, ${userName}! ✅</h1>
        
        <p>Sua senha foi alterada com sucesso!</p>
        
        <p>Se você não realizou esta alteração, entre em contato conosco imediatamente.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Este é um email automático do sistema Cubos Movies.
          </p>
        </div>
      </div>
    `
  }

  static getMovieReleaseNotification(
    userName: string,
    movieTitle: string,
    releaseDate: string
  ): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #8b5cf6;">Olá, ${userName}! 🎉</h1>
        
        <p>Está na hora! O filme <strong>${movieTitle}</strong> está lançando hoje, dia ${new Date(releaseDate).toLocaleDateString('pt-BR')}!</p>
        
        <p>Não perca este lançamento incrível! 🎭🍿</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            Este é um email automático do sistema de notificações de filmes.
          </p>
        </div>
      </div>
    `
  }
}

