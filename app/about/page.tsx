export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-emerald-700 mb-6">
        About Ember Trees
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        Your trusted cannabis delivery platform, bringing premium products
        directly to your door with complete compliance and care.
      </p>
      <div className="bg-emerald-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-emerald-800 mb-3">
          Our Mission
        </h2>
        <p className="text-emerald-700">
          To provide safe, legal, and convenient access to high-quality
          cannabis products while ensuring full regulatory compliance.
        </p>
      </div>
    </div>
  );
}