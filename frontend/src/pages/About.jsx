import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-700">
            About Green India
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Technology for a <span className="text-primary-600">Greener Future</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Green India is an AI-powered sustainability platform designed to help
            people make eco-friendly decisions in their everyday lives.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          <section className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🌱 Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our vision is to create a cleaner, greener, and more sustainable
              India by empowering individuals with actionable insights.
              Sustainability should not be complex — it should be visual,
              practical, and accessible to everyone.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🤖 What We Do
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Green India uses Artificial Intelligence and Computer Vision to
              analyze images of waste items or everyday objects. Based on the
              detected items, the platform provides eco-friendly alternatives,
              recycling tips, and sustainable suggestions tailored to real-life
              usage.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🇮🇳 Why Green India?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              India generates millions of tons of waste every year, much of which
              can be reduced or reused with better awareness. Green India focuses
              on Indian consumption habits and lifestyle patterns, making the
              suggestions practical, local, and impactful.
            </p>
          </section>

          <section className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl shadow-xl p-8 md:p-10 text-white">
            <h2 className="text-2xl font-bold mb-4">
              🌍 Our Mission
            </h2>
            <p className="leading-relaxed opacity-95">
              To bridge the gap between awareness and action by using AI to guide
              sustainable choices — one image, one decision, one step at a time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
