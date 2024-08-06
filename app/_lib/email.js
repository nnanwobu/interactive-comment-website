import nodeMailer from "nodemailer";
const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
/**
 * This function sends an email to the guest with a pdf invoice as an attachment
 *
 *import sendEmail
 *
 *  Read more: NodeMailer Doc SendMail</a>
 * @param {{name:string,email:string}} recipientDetails - an object containg the recipient's name and email
 * @param {string} dataurlstring -the dataurl generated by using pdf generator
 */
export async function sendEmail(recipientDetails, dataurlstring) {
  const { name, email } = recipientDetails;
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"The wild Oasis 🌲" <jensglobalmart@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Reservation receipt", // Subject line
    attachments: [
      {
        // data uri as an attachment
        filename: `${Date.now()}-${name.split(" ").join("-")}`,
        path: dataurlstring,
      },
    ],
    text: `Dear ${name}, Please see your booking invoice attached`, // plain text body
    html: `Dear ${name}, <b>Please see your booking invoice attached</b>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

sendEmail().catch(console.error);
