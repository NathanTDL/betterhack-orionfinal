import FooterSection from "@/components/homepage/footer";
import HeroSection from "@/components/homepage/hero-section";
import Features from "@/components/homepage/integrations";
import HowItWorks from "@/components/homepage/how-it-works";
import SocialProof from "@/components/homepage/social-proof";
import { getSubscriptionDetails } from "@/lib/subscription";
import PricingTable from "./pricing/_component/pricing-table";

export default async function Home() {
  const subscriptionDetails = await getSubscriptionDetails();

  return (
    <>
      <HeroSection />
      <HowItWorks />
      <Features />
      <SocialProof />
      <PricingTable subscriptionDetails={subscriptionDetails} />
      <FooterSection />
    </>
  );
}
