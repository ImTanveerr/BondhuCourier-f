import { Package, MapPin, Clock, Shield, RefreshCw, Smartphone } from "lucide-react";

const features = [
  {
    title: "Easy Parcel Booking",
    description:
      "Quickly book a parcel by filling in pickup, delivery, weight, and cost details. User-friendly interface for smooth experience.",
    icon: Package,
  },
  {
    title: "Real-Time Tracking",
    description:
      "Track your parcels live using a Tracking ID. Get instant updates about pickup, transit, and delivery status.",
    icon: MapPin,
  },
  {
    title: "Fast & Reliable Delivery",
    description:
      "Choose from standard or express delivery options. We ensure parcels reach their destination safely and on time.",
    icon: Clock,
  },
  {
    title: "Secure Handling",
    description:
      "Your parcels are handled with care. We support fragile and high-value items with extra protection.",
    icon: Shield,
  },
  {
    title: "Easy Cancellations & Returns",
    description:
      "Cancel your parcel before dispatch or accept returns in case the delivery was unsuccessful.",
    icon: RefreshCw,
  },
  {
    title: "Mobile Friendly",
    description:
      "Access our platform on desktop or mobile. Manage, track, and update parcels from anywhere.",
    icon: Smartphone,
  },
];

export default function FeaturesPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        Features of Our Parcel Delivery System
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-6 hover:shadow-lg transition"
          >
            <feature.icon className="h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
