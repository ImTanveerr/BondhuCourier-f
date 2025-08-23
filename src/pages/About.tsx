import { cn } from "@/lib/utils";

export default function AboutPage({ className }: { className?: string }) {
  return (
    <div className={cn("max-w-6xl mx-auto p-6", className)}>
      {/* Header */}
      <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>

      {/* Service Description */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
        <p className="text-muted-foreground leading-relaxed">
          BondhuCurrier provides fast, reliable, and affordable courier services
          across Bangladesh. Whether it’s documents, boxes, or fragile items, we
          ensure your parcels reach their destination safely and on time. Our
          automated tracking system keeps you updated every step of the way.
        </p>
      </section>

      {/* Mission */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed">
          Our mission is to simplify parcel delivery in Bangladesh by providing
          a seamless, secure, and technology-driven solution. We aim to connect
          people and businesses by making courier services transparent,
          efficient, and trustworthy.
        </p>
      </section>

      {/* Team */}
     <section className="text-center my-12">
  <h2 className="text-2xl font-semibold mb-8">Meet Our Founder</h2>
  <div className="border rounded-lg p-6 inline-block shadow-md bg-background/50">
    <img
      src="https://res.cloudinary.com/dpyxwxq8g/image/upload/v1755964322/387419731_700335598786203_5658084669813959194_n_wcjte6.jpg"
      alt="Founder"
      className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
    />
    <h3 className="text-xl font-semibold">Akram Hossain Tanveer</h3>
    <p className="text-muted-foreground">Founder & CEO</p>
    <p className="text-sm mt-2 text-blue-500">iamtanv33r@gmail.com</p>
  </div>
</section>

    </div>
  );
}
