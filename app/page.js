import FeedbackSection from "../components/FeedbackSection";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CompanySection from "../components/CompanySection";
import SynopsisSection from "../components/SynopsisSection";
import MediaSection from "../components/MediaSection";
import ContactSection from "../components/ContactSection";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <CompanySection />
      <SynopsisSection />
      <MediaSection />
      <ContactSection />
      <FeedbackSection />
    </main>
  );
}
