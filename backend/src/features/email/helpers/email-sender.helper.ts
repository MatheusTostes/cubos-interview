import { Resend } from 'resend'

export class EmailSenderHelper {
  private static getFromEmail(): string {
    const verifiedDomain = process.env.RESEND_VERIFIED_DOMAIN
    return verifiedDomain
      ? `Movies <noreply@${verifiedDomain}>`
      : 'Movies <onboarding@resend.dev>'
  }

  static async sendEmail(
    resend: Resend,
    to: string,
    subject: string,
    html: string
  ) {
    const fromEmail = this.getFromEmail()

    const response = await resend.emails.send({
      from: fromEmail,
      to,
      subject,
      html,
    })

    if (response.error) {
      throw new Error(`Resend API error: ${JSON.stringify(response.error)}`)
    }

    return response
  }
}

