import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';
import { getRandomJoke } from '../utils/jokes.js';

// Recreate __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const handleContactSubmit = async (req, res) => {
  // 1. Honeypot Trap
  if (req.body.honeypot && req.body.honeypot !== '') {
    console.log('Bot submission blocked (honeypot).');
    return res.send('success'); 
  }

  // 2. Google reCAPTCHA v3 Validation
  const recaptchaToken = req.body.recaptcha_token;
  if (!recaptchaToken) {
    console.log('Bot submission blocked (missing token).');
    return res.send('captcha_error');
  }

  try {
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`;
    const recaptchaResponse = await fetch(verifyURL, { method: 'POST' });
    const recaptchaData = await recaptchaResponse.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.log(`Bot submission blocked (score: ${recaptchaData.score}).`);
      return res.send('captcha_error');
    }
  } catch (err) {
    console.error('Error verifying reCAPTCHA:', err);
    return res.send('error');
  }

  // 3. Setup Mailer
  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.DIGITAL_LIASON_EMAIL,
      pass: process.env.DIGITAL_LIASON_PASSWORD,
    },
  });
  
  const selectedJoke = getRandomJoke();
  const type = req.body.partnerType;

  // 4. DEFINE CUSTOM MESSAGES
  const responseMap = {
    dispensary: `We are excited about the potential of bringing Northern Legacy's craft genetics to your shelves. Our wholesale team is reviewing your inquiry to ensure our small-batch drops align with your dispensary's needs.`,
    vendor: `We believe in building a robust local ecosystem in the North Country. We are reviewing your information now to see how we might collaborate to mutually strengthen our supply chain.`,
    community: `We are more than just a brand; we are 1000 Islands locals. The support of our neighbors drives everything we do. Thank you for reaching out—we always love to hear from fellow River Rats!`,
    default: `Our leadership team is currently reviewing your message to determine how we can best collaborate to bring world-class quality to the North Country.`,
  };

  const customMessage = responseMap[type] || responseMap['default'];

  // 5. Logo Attachment (Updated path with '..')
  const logoAttachment = {
    filename: 'logo_clear_bg.png',
    path: path.join(__dirname, '..', 'public', 'assets', 'logo_clear_bg.png'),
    cid: 'exg-logo',
  };

  // 6. Bot Signature
  const signatureHTML = `
    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eeeeee;">
      <p style="margin: 0; font-size: 16px; font-weight: 700; color: #000;">The Bot-any Dept. (Automated)</p>
      <p style="margin: 2px 0; font-size: 14px; color: #f8c25d; font-weight: 600;">Digital Cultivation Liaison | Excelsior Genetics, LLC</p>
      <p style="margin: 2px 0; font-size: 14px; color: #333;">42901 NY-12, Suite B | Alexandria Bay, NY 13607</p>
      <p style="margin: 2px 0; font-size: 14px;"><a href="https://www.exgenetics.com" style="color: #333; text-decoration: none; font-weight: 600;">www.exgenetics.com</a></p>
    </div>
  `;

  // 7. Full Legal Footer
  const legalFooterHTML = `
    <div style="background-color: #ffffff; padding: 20px; font-family: Arial, sans-serif; font-size: 11px; color: #999999; text-align: justify; line-height: 1.4; border-top: 1px solid #eeeeee;">
      <p style="margin-bottom: 10px; margin-top: 0;"><strong style="color: #666666;">Confidentiality Notice:</strong><br>
      This email and any accompanying attachments are intended solely for the designated recipient(s) and may contain confidential, privileged, or proprietary information. If you are not the intended recipient, any unauthorized review, dissemination, or use of this communication is strictly prohibited. Please notify the sender immediately and permanently delete this email from your system.</p>
      <p style="margin-bottom: 10px;"><strong style="color: #666666;">Privacy & Security:</strong><br>
      While we implement reasonable measures to safeguard the integrity of this email and its attachments, we cannot provide an absolute guarantee that they are free from viruses or other potentially harmful components. It remains the recipient's responsibility to ensure their systems are adequately protected.</p>
      <p style="margin-bottom: 0;"><strong style="color: #666666;">Cannabis Industry Disclaimer:</strong><br>
      Excelsior Genetics, LLC operates in the cannabis sector. The information contained in this communication should not be construed as legal advice.</p>
    </div>
  `;

  // 8. ADMIN EMAIL OPTIONS
  const adminMailOptions = {
    from: `"EXG Digital Liaison" <${process.env.DIGITAL_LIASON_EMAIL}>`,
    to: [process.env.ADMIN1_EMAIL, process.env.ADMIN2_EMAIL],
    subject: `EXG Portal: ${req.body.partnerType} Inquiry from ${req.body.name}`,
    attachments: [logoAttachment],
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0;">
        <div style="background-color: #000000; padding: 25px; text-align: center; border-bottom: 3px solid #f8c25d;">
          <img src="cid:exg-logo" alt="Excelsior Genetics" width="150" style="display: block; margin: 0 auto;">
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Hey Guys,</p>
          <p>We just received this message through the website.</p>
          <div style="background: #f9f9f9; padding: 20px; border-left: 4px solid #f8c25d; margin: 25px 0;">
            <p style="margin-top:0; font-size: 14px; text-transform: uppercase; color: #888; font-weight: bold;">Inquiry Details</p>
            <ul style="padding-left: 20px; margin-bottom: 20px;">
              <li><strong>Name:</strong> ${req.body.name}</li>
              <li><strong>Email:</strong> ${req.body.email}</li>
              <li><strong>Phone:</strong> ${req.body.phone || 'N/A'}</li>
              <li><strong>Type:</strong> ${req.body.partnerType}</li>
              <li><strong>Business:</strong> ${req.body.business || 'N/A'}</li>
            </ul>
            <p style="margin-top:0; font-size: 14px; text-transform: uppercase; color: #888; font-weight: bold;">Message</p>
            <p style="font-style: italic;">"${req.body.message}"</p>
          </div>
          <div style="text-align: center; margin: 20px 0; padding: 10px; border: 1px dashed #ccc; background-color: #fafafa; border-radius: 4px;">
            <p style="margin: 0; font-size: 12px; color: #155724; font-weight: bold;">✓ Verified Human (reCAPTCHA v3)</p>
          </div>
          ${signatureHTML}
        </div>
      </div>
    `,
  };

  // 9. USER CONFIRMATION OPTIONS
  const confirmationOptions = {
    from: `"EXG Digital Liaison" <${process.env.DIGITAL_LIASON_EMAIL}>`,
    to: req.body.email,
    subject: `Received: Your Inquiry to Excelsior Genetics`,
    attachments: [logoAttachment],
    html: `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333333; line-height: 1.6; border: 1px solid #e0e0e0;">
        <div style="background-color: #000000; padding: 25px; text-align: center; border-bottom: 3px solid #f8c25d;">
          <img src="cid:exg-logo" alt="Excelsior Genetics" width="150" style="display: block; margin: 0 auto;">
        </div>
        <div style="padding: 30px 25px; background-color: #ffffff;">
          <h2 style="color: #000000; margin-top: 0; font-weight: 700;">Hi ${req.body.name},</h2>
          <p>Thank you for reaching out to <strong>Excelsior Genetics</strong>.</p>
          <p>${customMessage}</p>
          <p>You can expect to hear from a human member of our team shortly.</p>
          <p style="margin-top: 30px; color: #555; text-align: center;">
            <em><strong>Joke of the Day:</strong> "${selectedJoke}"</em>
          </p>
          ${signatureHTML}
        </div>
        ${legalFooterHTML}
      </div>
    `,
  };

  if (req.body.name !== undefined) {
    transporter.sendMail(adminMailOptions, (err) => {
      if (err) console.log('Error sending admin notification:', err);
      else console.log('Successfully sent inquiry to Greg and Jason');
    });

    transporter.sendMail(confirmationOptions, (err) => {
      if (err) {
        console.log('Error sending user confirmation:', err);
        return res.status(500).send('error');
      } else {
        console.log('Successfully sent confirmation to user');
        res.send('success');
      }
    });
  }
};