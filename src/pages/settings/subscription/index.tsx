import { CheckCircleIcon } from "@heroicons/react/24/outline";
import classNames from "clsx";
import { GetServerSidePropsContext } from "next";
import { Trans } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SettingsPageContainer from "~/components/settings/SettingsPageContainer";
import SettingsTile from "~/components/settings/SettingsTile";
import Plans from "~/components/subscriptions/Plans";
import SubscriptionCard from "~/components/subscriptions/SubscriptionCard";
import configuration from "~/configuration";
import Alert from "~/core/ui/Alert";
import Heading from "~/core/ui/Heading";
import If from "~/core/ui/If";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/core/ui/Tooltip";
import { useCurrentOrganization } from "~/lib/organizations/hooks/use-current-organization";
import { withAppProps } from "~/lib/props/with-app-props";
import { STRIPE_PRODUCTS } from "~/lib/stripe/stripe-products";

const Subscription = () => {
  const router = useRouter();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const organization = useCurrentOrganization();

  if (!organization) {
    return <></>;
  }

  const subscriptionProductId = organization?.subscription?.product!;
  const subscriptionPlan = STRIPE_PRODUCTS.find(
    (product) => product.stripeProductId == subscriptionProductId,
  )!;

  return (
    <SettingsPageContainer title={"Settings"}>
      <Head>
        <title key="title">Subscription</title>
      </Head>

      <div className={"w-full"}>
        <SettingsTile
          heading={<Trans i18nKey={"common:subscriptionSettingsTabLabel"} />}
          subHeading={<Trans i18nKey={"subscription:subscriptionTabSubheading"} />}
        >
          <div className={"flex flex-col space-y-4"}>
            <Plans />
          </div>
        </SettingsTile>
      </div>
    </SettingsPageContainer>
  );
};

export default Subscription;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await withAppProps(ctx);
}

interface PricingItemProps {
  product: {
    name: string;
    features: string[];
    description: string;
  };
  plan: {
    name: string;
  };
}

function PricingItem(props: React.PropsWithChildren<PricingItemProps>) {
  return (
    <div
      data-cy={"subscription-plan"}
      className={classNames(
        "relative flex w-full flex-col justify-between space-y-6 rounded-xl px-2",
      )}
    >
      <div className={"flex flex-col space-y-2.5"}>
        <div className={"flex items-center space-x-6"}>
          <Heading type={2}>
            <b className={"font-semibold"}>{props.product.name}</b>
          </Heading>
        </div>

        <Tooltip>
          <TooltipContent>Each token equals a minute</TooltipContent>
          <TooltipTrigger className={"text-sm w-fit text-gray-500 dark:text-gray-400"}>
            <Heading type={6}>{props.product.description}</Heading>
          </TooltipTrigger>
        </Tooltip>
      </div>

      <div className={"text-current"}>
        <FeaturesList features={props.product.features} />
      </div>
    </div>
  );
}

function FeaturesList(
  props: React.PropsWithChildren<{
    features: string[];
  }>,
) {
  return (
    <ul className={"grid w-fit space-y-2"}>
      {props.features.map((feature) => (
        <ListItem key={feature} isAvailable={!configuration.unavailableFeatures.includes(feature)}>
          <Trans i18nKey={`common:plans.features.${feature}`} defaults={feature} />
        </ListItem>
      ))}
    </ul>
  );
}

function ListItem(
  props: React.PropsWithChildren<{
    isAvailable: boolean;
  }>,
) {
  return (
    <li className={"flex items-center space-x-3 font-medium"}>
      <div>
        <CheckCircleIcon className={"h-5"} color={props.isAvailable ? "#62cd71" : "#585858"} />
      </div>
      <If condition={props.isAvailable}>
        <span className={"text-sm text-[#62cd71]"}>{props.children}</span>
      </If>
      <If condition={!props.isAvailable}>
        <Tooltip>
          <TooltipContent>Coming soon!</TooltipContent>
          <TooltipTrigger className={"text-sm text-[#585858]"}>
            ⧖&nbsp;{props.children}
          </TooltipTrigger>
        </Tooltip>
      </If>
    </li>
  );
}
