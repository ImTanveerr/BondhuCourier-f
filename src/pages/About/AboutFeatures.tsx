import { Badge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, Package, Headphones, Globe } from "lucide-react";

function AboutFeatures() {
  const features = [
    {
      title: "Fast Delivery",
      description: "We ensure your parcels reach their destination in record time.",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      title: "Secure Handling",
      description: "Safety and security are at the core of our logistics solutions.",
      icon: <Package className="w-6 h-6" />,
    },
    {
      title: "24/7 Support",
      description: "Our customer care team is always available for assistance.",
      icon: <Headphones className="w-6 h-6" />,
    },
    {
      title: "Global Reach",
      description: "Expanding across multiple cities and countries to serve you better.",
      icon: <Globe className="w-6 h-6" />,
    },
  ];

  return (
    <section className="py-20 bg-muted/30 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/60 to-muted/20"></div>
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4">
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            What Makes Us Different
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/50"
            >
              <CardContent className="space-y-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-xl">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutFeatures;
