import React from "react";

const FAQ = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600">
            Everything you need to know about Green India
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              q: "Is Green India free to use?",
              a: "Yes. Green India is free and accessible to everyone.",
            },
            {
              q: "How accurate is the AI detection?",
              a: "The AI model is trained on real-world data and continuously improves with user feedback.",
            },
            {
              q: "Does this work for Indian waste items?",
              a: "Yes. The platform focuses on Indian lifestyle and commonly used products.",
            },
            {
              q: "Is my uploaded image stored?",
              a: "Images are only used for analysis and are not shared publicly.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-lg mb-2">{item.q}</h3>
              <p className="text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
