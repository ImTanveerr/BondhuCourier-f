import HeroSection from "@/components/modules/HomePage/HeroSection";

export default function Homepage() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-16 px-4 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose Our Parcel Delivery System
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p>We ensure your parcels reach their destination quickly and safely.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
            <p>Track your parcels at every step with our live tracking system.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p>Your parcels are handled with care and security at every stage.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 md:px-12 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">Step 1: Register</h3>
            <p>Create an account and set up your profile to start sending parcels.</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">Step 2: Create Parcel</h3>
            <p>Add parcel details, pickup, and delivery addresses.</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold mb-2">Step 3: Track & Deliver</h3>
            <p>Monitor the parcel live until it reaches the recipient safely.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 px-4 md:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Send Your Parcel?
        </h2>
        <p className="mb-8 text-gray-700 dark:text-gray-300">
          Sign up and start delivering parcels with ease.
        </p>
        <a
          href="/register"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </section>

  
    </div>
  );
}
