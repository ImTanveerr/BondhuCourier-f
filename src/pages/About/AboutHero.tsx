import { Card, CardContent } from "@/components/ui/card";
import { Badge, Star, Globe, Truck, Headphones } from "lucide-react";

function AboutHero() {
  const stats = [
    {
      number: "15K+",
      label: "Satisfied Clients",
      icon: <Star className="w-6 h-6" />,
    },
    {
      number: "98%",
      label: "Timely Deliveries",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      number: "60+",
      label: "Locations Served",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      number: "24/7",
      label: "Customer Care",
      icon: <Headphones className="w-6 h-6" />,
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background"></div>
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-6">
            Who We Are
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
            Discover
            <span className="block text-primary">NextLevel Parcel</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            We deliver more than parcels — we deliver trust, reliability, and
            efficiency. From small packages to large shipments, our goal is to
            make logistics seamless for everyone.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50"
            >
              <CardContent className="p-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-xl mb-4">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
