import React from "react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
            How It Works
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Simple Steps. <span className="text-primary-600">Powerful Impact.</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Green India is designed to be intuitive and easy to use, while
            delivering meaningful sustainability insights powered by AI.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {[
            {
              icon: "📸",
              title: "Upload Image",
              desc: "Upload a photo of waste items, recyclables, or everyday objects.",
            },
            {
              icon: "🤖",
              title: "AI Detection",
              desc: "Our AI model analyzes the image and identifies the objects present.",
            },
            {
              icon: "🌱",
              title: "Eco Suggestions",
              desc: "Receive eco-friendly alternatives, recycling tips, and sustainable actions.",
            },
            {
              icon: "⭐",
              title: "Feedback Loop",
              desc: "Provide feedback to help improve future recommendations.",
            },
          ].map((step) => (
            <div
              key={step.title}
              className="bg-white rounded-2xl shadow-xl p-6 text-center hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Technology Section */}
        <div className="bg-white rounded-2xl shadow-xl p-10 mb-16">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            ⚙️ Technology Behind Green India
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Green India combines modern web technologies with Machine Learning.
            The backend uses AI-based object detection models to identify items
            in images, while the frontend delivers a clean and responsive user
            experience. This ensures fast, reliable, and meaningful results.
          </p>
        </div>

        {/* Impact Section */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl shadow-xl p-10 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">
            🌍 Small Actions. Big Change.
          </h2>
          <p className="opacity-95 max-w-3xl mx-auto">
            By helping users understand the environmental impact of everyday
            items, Green India encourages responsible consumption and sustainable
            habits that collectively make a real difference.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
