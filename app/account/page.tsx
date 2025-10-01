export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-emerald-700 mb-6">
        My Account
      </h1>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Account Navigation */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Account Menu</h2>
          <nav className="space-y-2">
            <a href="#" className="block p-3 text-emerald-600 bg-emerald-50 rounded-lg">
              Profile
            </a>
            <a href="#" className="block p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              Order History
            </a>
            <a href="#" className="block p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              Addresses
            </a>
            <a href="#" className="block p-3 text-gray-700 hover:bg-gray-50 rounded-lg">
              Age Verification
            </a>
          </nav>
        </div>

        {/* Account Content */}
        <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <p className="text-gray-900">John Doe</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <p className="text-gray-900">john@example.com</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age Verification Status
              </label>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Verified ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}