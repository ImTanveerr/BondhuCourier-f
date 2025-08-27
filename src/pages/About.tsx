
import AboutFeatures from "./About/AboutFeatures";
import AboutHero from "./About/AboutHero";
import AboutJourney from "./About/AboutJourney";


export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <AboutHero />
      <AboutFeatures />
      <AboutJourney />
    </div>
  );
}
