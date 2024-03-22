import { Text } from "@react-email/components";
import { renderEmailHtml } from "../hooks/render-email-html";

export const getSuccessfulProjectCompletionEmailTemplate = () => {
  const subject = "Congrats! Your Project is Ready 🎊";

  const html = renderEmailHtml(
    <>
      <Text>Hi there!</Text>
      <br />

      <Text>
        It&apos;s Liza from SpeechMate. I&apos;m thrilled to let you know that your project is
        complete and ready for you. Great job on bringing this to life!
      </Text>
      <br />

      <Text>Have a look and let me know what you think.</Text>
      <br />

      <Text>Onwards and upwards,</Text>
      <Text>Liza S</Text>
      <Text>CEO & Co-founder, SpeechMate</Text>
    </>,
  );

  return { subject, html };
};
