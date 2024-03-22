import { Text } from "@react-email/components";
import { OrganizationSubscription } from "~/lib/organizations/types/organization-subscription";
import { STRIPE_PRODUCTS } from "~/lib/stripe/stripe-products";
import { renderEmailHtml } from "../hooks/render-email-html";

export const getSuccessfulSubscriptionEmailTemplate = (subscription: OrganizationSubscription) => {
  const userSubscriptionPlan = STRIPE_PRODUCTS.find(
    (product) => product.stripeProductId === subscription.product,
  );
  
  const subscriptionPlanName = userSubscriptionPlan?.name;
  const subscriptionPlanFeatures = userSubscriptionPlan?.features;

  const subject = `You're All Set! Welcome to ${subscriptionPlanName} 🚀`;

  const html = renderEmailHtml(
    <>
      <Text>Hi there!</Text>
      <br />

      <Text>
        This is Liza from SpeechMate. I&apos;m thrilled to let you know that your subscription to our
        {subscriptionPlanName} plan is active. Get ready to experience audio and video translation
        like never before!
      </Text>
      <br />

      <Text>Your plan includes:</Text>
      <ul>{subscriptionPlanFeatures?.map((feature, index) => <li key={index}>{feature}</li>)}</ul>
      <br />

      <Text>Any questions or feedback? I&apos;m just an email away.</Text>
      <br />

      <Text>Happy translating,</Text>
      <Text>Liza S</Text>
      <Text>CEO & Co-founder, SpeechMate</Text>
    </>,
  );

  return { subject, html };
};
