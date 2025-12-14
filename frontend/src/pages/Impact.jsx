import React from "react";

const Impact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
            Our Impact
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Turning Awareness Into <span className="text-primary-600">Action</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Green India helps individuals make small changes that collectively
            create a big environmental impact.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { value: "30%", label: "Potential Waste Reduction" },
            { value: "50%", label: "Better Recycling Awareness" },
            { value: "∞", label: "Long-term Sustainability Impact" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-2xl shadow-xl p-8 text-center"
            >
              <h2 className="text-4xl font-extrabold text-primary-600 mb-2">
                {item.value}
              </h2>
              <p className="text-gray-600">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Explanation */}
        <div className="bg-white rounded-2xl shadow-xl p-10">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            🌍 Why This Matters
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Most people want to live sustainably but lack clarity on what to do.
            Green India removes confusion by visually identifying waste items
            and guiding users toward eco-friendly alternatives. Even small
            daily decisions — when multiplied across millions — can drastically
            reduce landfill waste and pollution.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Impact;
