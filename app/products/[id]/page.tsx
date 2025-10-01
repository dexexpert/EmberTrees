interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-emerald-700 mb-6">
        Product Details
      </h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-lg text-gray-700 mb-4">
          Product ID: <span className="font-semibold">{params.id}</span>
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <span className="text-gray-500">Product Image</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Cannabis Product Name
            </h2>
            <p className="text-gray-600 mb-4">
              High-quality cannabis product with detailed information
              about strain, THC/CBD content, and effects.
            </p>
            <div className="space-y-2">
              <p><span className="font-semibold">THC:</span> 22.5%</p>
              <p><span className="font-semibold">CBD:</span> 0.8%</p>
              <p><span className="font-semibold">Strain:</span> Sativa</p>
            </div>
            <button className="mt-6 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}