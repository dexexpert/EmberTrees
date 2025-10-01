export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            🌿 Premium Cannabis Delivery
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            High-quality cannabis products delivered safely to your door.
            Fast, discreet, and fully compliant.
          </p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Same-day delivery within 2 hours</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure & Legal</h3>
              <p className="text-gray-600">Fully licensed and compliant</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">Lab-tested, highest quality products</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}