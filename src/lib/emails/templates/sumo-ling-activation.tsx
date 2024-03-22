import { Text } from "@react-email/components";
import { renderEmailHtml } from "../hooks/render-email-html";

export const getSumolingActivationEmailTemplate = (activationUrl: string) => {
  const subject = "Activate your SpeechMate account! 🎉";

  const html = renderEmailHtml(
    <>
      <Text>Hi Sumo-ling!</Text>
      <br />

      <Text>
        You&apos;re a just few clicks away from using the SpeechMate. Please click the link below
        to activate your account.
      </Text>
      <br />

      <Text>
        If you already activated it via AppSumo, then you&apos;re all set. No need to do anything.
      </Text>
      <br />

      <Text>
        <a href={activationUrl}>Activate SpeechMate Account</a>
      </Text>
      <br />

      <Text>
        If you&apos;re having trouble with the button above, copy and paste the URL below into your
        web browser.
      </Text>
      <Text>{activationUrl}</Text>
      <br />

      <Text>Have an awesome day!</Text>
      <Text>SpeechMate Team</Text>
      <br />
    </>,
  );

  return { subject, html };
};
