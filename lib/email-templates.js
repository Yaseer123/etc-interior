/**
 * Email templates for the application
 */

export const contactFormEmailTemplate = (data) => {
  const { name, email, phone, subject, message, messageId } = data;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #333; margin: 0; font-size: 28px;">New Contact Form Submission</h1>
        <div style="width: 60px; height: 3px; background-color: #007bff; margin: 10px auto;"></div>
      </div>
      
      <div style="background-color: #f8f9fa; padding: 25px; border-radius: 10px; margin: 20px 0; border-left: 4px solid #007bff;">
        <h3 style="color: #495057; margin-top: 0; margin-bottom: 20px; font-size: 20px;">Contact Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333; width: 100px;">Name:</td>
            <td style="padding: 8px 0; color: #555;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
            <td style="padding: 8px 0; color: #555;">
              <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
            </td>
          </tr>
          ${
            phone
              ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
            <td style="padding: 8px 0; color: #555;">
              <a href="tel:${phone}" style="color: #007bff; text-decoration: none;">${phone}</a>
            </td>
          </tr>
          `
              : ""
          }
          ${
            subject
              ? `
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #333;">Subject:</td>
            <td style="padding: 8px 0; color: #555;">${subject}</td>
          </tr>
          `
              : ""
          }
        </table>
      </div>
      
      <div style="background-color: #ffffff; padding: 25px; border: 1px solid #dee2e6; border-radius: 10px; margin: 20px 0;">
        <h3 style="color: #495057; margin-top: 0; margin-bottom: 15px; font-size: 20px;">Message</h3>
        <div style="line-height: 1.6; color: #333; background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
          ${message.replace(/\n/g, "<br>")}
        </div>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e9ecef; color: #6c757d; font-size: 14px; text-align: center;">
        <p style="margin: 5px 0;">This message was sent from your website contact form</p>
        <p style="margin: 5px 0;">Message ID: <strong>${messageId}</strong></p>
        <p style="margin: 5px 0;">Timestamp: <strong>${new Date().toLocaleString()}</strong></p>
        <div style="margin-top: 15px;">
          <a href="mailto:${email}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reply to ${name}
          </a>
        </div>
      </div>
    </div>
  `;
};

export const contactFormEmailSubject = (subject) => {
  return `New Contact Form Submission${subject ? `: ${subject}` : ""}`;
};
