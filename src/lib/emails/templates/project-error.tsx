import { Text } from "@react-email/components";
import { renderEmailHtml } from "../hooks/render-email-html";

export const getProjectErrorEmailTemplate = () => {
  const subject = "Attention Needed: Your Project Hit a Snag 🛠️";

  const html = renderEmailHtml(
    <>
      <Text>Hello,</Text>
      <br />

      <Text>
        Liza here. It looks like your recent project ran into a bit of trouble. But don&apos;t
        worry, our team is on it!
      </Text>
      <br />

      <Text>
        Could you take a moment to check the details and let us know if there&apos;s anything
        specific we should know?
      </Text>
      <br />

      <Text>Together,</Text>
      <Text>Liza S</Text>
      <Text>CEO & Co-founder, SpeechMate</Text>
    </>,
  );

  return { subject, html };
};
