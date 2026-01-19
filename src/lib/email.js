import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Envia email de redefinição de senha com magic link
 * @param {Object} params - Parâmetros do email
 * @param {string} params.to - Email do destinatário
 * @param {string} params.name - Nome do destinatário
 * @param {string} params.resetUrl - URL do magic link
 * @returns {Promise<Object>} Resultado do envio
 */
export async function sendPasswordResetEmail({ to, name, resetUrl }) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'help@3sdev.com.br',
      to: [to],
      subject: 'Redefinição de Senha',
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Redefinição de Senha</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; background-color: #f6f6f6;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f6f6f6; padding: 40px 20px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                        Redefinição de Senha
                      </h1>
                    </td>
                  </tr>

                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px;">
                      <p style="margin: 0 0 16px; color: #1a1a1a; font-size: 16px; line-height: 1.6;">
                        Olá <strong>${name}</strong>,
                      </p>

                      <p style="margin: 0 0 24px; color: #4a4a4a; font-size: 15px; line-height: 1.6;">
                        Recebemos uma solicitação para redefinir a senha da sua conta. Clique no botão abaixo para criar uma nova senha:
                      </p>

                      <!-- Button -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                        <tr>
                          <td align="center">
                            <a href="${resetUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 40px; border-radius: 6px; font-weight: 600; font-size: 15px; letter-spacing: 0.3px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                              Redefinir Senha
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="margin: 24px 0 0; color: #6a6a6a; font-size: 14px; line-height: 1.6;">
                        Ou copie e cole este link no seu navegador:
                      </p>

                      <p style="margin: 8px 0 24px; padding: 12px; background-color: #f8f8f8; border-radius: 4px; color: #667eea; font-size: 13px; word-break: break-all; border-left: 3px solid #667eea;">
                        ${resetUrl}
                      </p>

                      <!-- Security Note -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 32px; padding: 20px; background-color: #fff8e6; border-radius: 6px; border-left: 4px solid #ffa726;">
                        <tr>
                          <td>
                            <p style="margin: 0 0 8px; color: #d97706; font-size: 14px; font-weight: 600;">
                              🔒 Importante
                            </p>
                            <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.5;">
                              Este link expira em <strong>1 hora</strong> por motivos de segurança. Se você não solicitou a redefinição de senha, ignore este email.
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding: 30px 40px; background-color: #fafafa; border-top: 1px solid #eeeeee;">
                      <p style="margin: 0 0 8px; color: #8a8a8a; font-size: 13px; line-height: 1.5;">
                        Se você não solicitou esta redefinição, por favor ignore este email.
                      </p>
                      <p style="margin: 0; color: #8a8a8a; font-size: 13px; line-height: 1.5;">
                        © ${new Date().getFullYear()} Graph. Todos os direitos reservados.
                      </p>
                    </td>
                  </tr>
                </table>

                <!-- Bottom spacing -->
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin-top: 20px;">
                  <tr>
                    <td align="center" style="padding: 0 20px;">
                      <p style="margin: 0; color: #999999; font-size: 12px; line-height: 1.5;">
                        Este é um email automático. Por favor, não responda.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Erro ao enviar email:', error);
      throw new Error('Falha ao enviar email de redefinição');
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erro no serviço de email:', error);
    throw error;
  }
}
