import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket, Heart } from "lucide-react";

function AboutJourney() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-muted/30"></div>
      <div className="relative max-w-4xl mx-auto px-4">
        <Card className="p-8 shadow-xl border-0 bg-gradient-to-br from-card to-card/50">
          <CardHeader className="text-center mb-8">
            <Heart className="mb-4 w-8 h-8 mx-auto text-primary" />
            <CardTitle className="text-4xl md:text-5xl font-black tracking-tight">
              Who We Are
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Our Mission
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At <span className="font-bold text-primary">NextLevel Parcel</span>,
                we aim to revolutionize the delivery experience. Our mission is
                to make every parcel reach its destination safely, quickly, and
                sustainably.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-primary">
                What Sets Us Apart
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-primary" />
                    Lightning-fast delivery options
                  </li>
                  <li className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-primary" />
                    User-friendly dashboard for tracking parcels
                  </li>
                </ul>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-primary" />
                    Affordable and transparent pricing
                  </li>
                  <li className="flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-primary" />
                    Focused on community and eco-friendly initiatives
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default AboutJourney;
