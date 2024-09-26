import nodemailer from "nodemailer";
import User from "@/models/userModal";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(
        userId,
        {
          verifyToken: hashToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(
        userId,
        {
          forgotPasswordToken: hashToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        },
        { new: true, runValidators: true }
      );
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "ff2ec4654696d3",
        pass: "bf5f7b0d8a3a43",
      },
    });
    const mailOption = {
      from: "anil@gmail.com",
      to: email,
      subject: emailType === "VERIFY" ? "verify email" : "forgot password",
      html: `<p>
      Click <a href="${
        process.env.domain
      }/verifyemail?token=${hashToken}">here</a> to ${
        emailType === "VERIFY" ? "verify email" : "forgot password"
      }
      or copy and paste the link below in your browser.<br>
      ${process.env.domain}/verifyemail?token=${hashToken}
      </p>`,
    };
    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error: any) {
    throw new error(error.message);
  }
};
