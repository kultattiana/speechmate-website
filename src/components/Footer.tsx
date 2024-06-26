import Link from "next/link";

import Container from "~/core/ui/Container";
import LogoImage from "~/core/ui/Logo/LogoImage";
import configuration from "~/configuration";
import Heading from "~/core/ui/Heading";
import NewsletterSignup from "~/components/NewsletterSignup";

const YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className={"py-8 lg:py-24"}>
      <Container>
        <div className={"flex flex-col space-y-8 lg:flex-row lg:space-y-0"}>
          <div
            className={"flex w-full space-x-2 lg:w-4/12 xl:w-3/12" + " xl:space-x-6 2xl:space-x-5"}
          >
            <div className={"flex flex-col space-y-4"}>
              <div>
                <LogoImage className={"w-[85px] md:w-[115px]"} />
              </div>

              <div>
                <p className={"text-sm text-gray-500 dark:text-gray-400"}>
                  {
                    "SpeechMate is committed to delivering world-class audio, video, and text co-pilot tools for creators, educators, authors, bloggers, newsmakers, and other artists around the world with no borders. We're proud to bring this product to you."
                  }
                </p>
              </div>
              <div>
                <p className={"text-sm text-gray-500 dark:text-gray-400"}>
                  Hi there! If you need help with SpeechMate, please contact us on{" "}
                  <a className="text-green-700" href="mailto:help@speechmate.io">
                    help@speechmate.io
                  </a>
                </p>
              </div>

              <div className={"flex text-xs text-gray-500 dark:text-gray-400"}>
                <p>
                  © Copyright {YEAR} {configuration.site.siteName}. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          <div
            className={
              "flex flex-col space-y-8 lg:space-y-0 lg:space-x-6" +
              " xl:space-x-16 2xl:space-x-20" +
              " w-full lg:flex-row lg:justify-end"
            }
          >
            <div>
              <div className={"flex flex-col space-y-4"}>
                <Heading type={6}>About</Heading>

                <FooterSectionList>
                  <FooterLink>
                    <Link href={configuration.paths.blog}>Blog</Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <div>
              <div className={"flex flex-col space-y-4"}>
                <Heading type={6}>Product</Heading>

                <FooterSectionList>
                  <FooterLink>
                    <Link href={configuration.paths.faq}>FAQ</Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <div>
              <div className={"flex flex-col space-y-4"}>
                <Heading type={6}>Legal</Heading>

                <FooterSectionList>
                  <FooterLink>
                    <Link href={configuration.paths.termsOfService}>Terms of Service</Link>
                  </FooterLink>
                  <FooterLink>
                    <Link href={configuration.paths.privacyPolicy}>Privacy Policy</Link>
                  </FooterLink>
                </FooterSectionList>
              </div>
            </div>

            <NewsletterSignup />
          </div>
        </div>
      </Container>
    </footer>
  );
}

function FooterSectionList(props: React.PropsWithChildren) {
  return (
    <ul className={"flex flex-col space-y-4 text-gray-500 dark:text-gray-400"}>{props.children}</ul>
  );
}

function FooterLink(props: React.PropsWithChildren) {
  return (
    <li
      className={
        "text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800" + " dark:[&>a]:hover:text-white"
      }
    >
      {props.children}
    </li>
  );
}

export default Footer;
