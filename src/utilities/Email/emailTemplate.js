
const emailTemplate = ({ name, jobTitle, email, brandName, phone, subject, message }) => {
  const esc = (v) => v.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <tr>
          <td style="background-color: #1449e7; padding: 20px; text-align: center; color: #ffffff; font-size: 24px; font-weight: bold;">
            Contact Inquiry
          </td>
        </tr>
        <tr>
          <td style="padding: 30px; color: #333;">
            <h2 style="color: #20368a; margin-bottom: 20px;">New Message from Contact Form</h2>
            <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name:</td><td style="padding: 8px; border: 1px solid #ddd;">${esc(name)}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Job Title:</td><td style="padding: 8px; border: 1px solid #ddd;">${esc(jobTitle)}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email:</td><td style="padding: 8px; border: 1px solid #ddd;">${esc(email)}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Brand Name:</td><td style="padding: 8px; border: 1px solid #ddd;">${esc(brandName)}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Phone:</td><td style="padding: 8px; border: 1px solid #ddd;">${esc(phone)}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Subject:</td><td style="padding: 8px; border: 1px solid #ddd;">${esc(subject)}</td></tr>
              <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message:</td><td style="padding: 8px; border: 1px solid #ddd;">${esc(message)}</td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777;">
            © ${new Date().getFullYear()} Afaq. All rights reserved.
          </td>
        </tr>
      </table>
    </body>
  `;
};

export default emailTemplate;
