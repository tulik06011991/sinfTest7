import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      {/* <header className="bg-blue-900 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold">Bosh Sahifa</h1>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="container mx-auto py-12 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Xush Kelibsiz!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Bizning veb-saytimiz orqali turli fanlardan testlar yechib, bilim darajangizni oshiring.
              Birgalikda o'rganing va bilimlaringizni sinovdan o'tkazing!
            </p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700 transition">
              Boshlash
            </button>
          </div>
          {/* Right Content (Image) */}
          <div>
            <img
              src="https://via.placeholder.com/500"
              alt="Main"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Bizning Xizmatlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md hover:bg-gray-300 transition">
              <img
                src="https://via.placeholder.com/300"
                alt="Feature 1"
                className="rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Test Yechish</h3>
              <p className="text-gray-600">
                Fanlar bo'yicha testlarni yechib ko'ring va bilimlaringizni mustahkamlang.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md hover:bg-gray-300 transition">
              <img
                src="https://via.placeholder.com/300"
                alt="Feature 2"
                className="rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">O'quv Materiallari</h3>
              <p className="text-gray-600">
                Har bir fan bo'yicha o'quv materiallarini yuklab oling va o'rganing.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-200 p-6 rounded-lg shadow-md hover:bg-gray-300 transition">
              <img
                src="https://via.placeholder.com/300"
                alt="Feature 3"
                className="rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Sertifikatlar</h3>
              <p className="text-gray-600">
                Bilimingizni tasdiqlovchi sertifikatlarga ega bo'ling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
