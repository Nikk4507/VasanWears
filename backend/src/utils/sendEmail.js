import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ email, subject, html }) => {
  const response = await resend.emails.send({
    from: `Vasan Wears <${process.env.EMAIL_USER}>`,
    to: email,
    subject,
    html,
  });
};

export default sendEmail;
