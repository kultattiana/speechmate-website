import Mail, { Address } from "nodemailer/lib/mailer";
import configuration from "../../configuration";

interface SendEmailParams {
  to: string;
  subject: string;
  priority?: Mail.Options["priority"];
  text?: string;
  html?: string;
}

export async function sendEmail(config: SendEmailParams) {
  const transporter = await getTransporter();

  if (!process.env.EMAIL_SENDER || !process.env.EMAIL_USER) {
    throw new Error(
      `Missing email configuration. Please add the following environment variables:
      EMAIL_SENDER
      EMAIL_USER
      `,
    );
  }

  const emailFrom: Address = {
    name: process.env.EMAIL_SENDER,
    address: process.env.EMAIL_USER,
  };

  return transporter.sendMail({
    ...config,
    from: emailFrom,
  });
}

function getTransporter() {
  if (process.env.IS_CI) {
    return getMockMailTransporter();
  }

  if (configuration.emulator) {
    return getEtherealMailTransporter();
  }

  return getSMTPTransporter();
}

/**
 * @description SMTP Transporter for production use. Add your favorite email
 * API details (Mailgun, Sendgrid, etc.) to the configuration.
 */
async function getSMTPTransporter() {
  const nodemailer = await import("nodemailer");

  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT);

  const secure = port === 465 && !configuration.production;

  // validate that we have all the required configuration
  if (!user || !pass || !host || !port) {
    throw new Error(
      `Missing email configuration. Please add the following environment variables:
      EMAIL_USER
      EMAIL_PASSWORD
      EMAIL_HOST
      EMAIL_PORT
      `,
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
}

/**
 * @description Dev transport for https://ethereal.email that you can use to
 * debug your emails for free. It's the default for the dev environment
 */
async function getEtherealMailTransporter() {
  const nodemailer = await import("nodemailer");
  const testAccount = await getEtherealTestAccount();

  const host = "smtp.ethereal.email";
  const port = 587;

  return nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
}

function getMockMailTransporter() {
  return {
    sendMail(params: SendEmailParams) {
      console.log(`Using mock email transporter with params`, JSON.stringify(params, null, 2));
    },
  };
}

async function getEtherealTestAccount() {
  const testAccount = configuration.emailEtherealTestAccount;

  // if we have added an Ethereal account, we reuse these credentials to
  // send the email
  if (testAccount?.email && testAccount?.password) {
    console.log(`Sending email with Ethereal test account...`);

    return {
      user: testAccount.email,
      pass: testAccount.password,
    };
  }

  // Otherwise, we create a new account and recommend to add the credentials
  // to the configuration file
  return createEtherealTestAccount();
}

async function createEtherealTestAccount() {
  const nodemailer = await import("nodemailer");
  const newAccount = await nodemailer.createTestAccount();

  console.warn(`
    Configuration property "emailEtherealTestAccount" was not found! 
    Consider adding a fixed Ethereal account so that you don't need to update the credentials each time you use it.
    To do so, please use the guide at https://makerkit.dev/docs/next-fire/emails
  `);

  console.log(`Created Ethereal test account: ${JSON.stringify(newAccount, null, 2)}`);

  console.log(`Consider adding these credentials to your configuration file`);

  return newAccount;
}
