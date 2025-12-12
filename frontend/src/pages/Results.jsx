import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import SuggestionCard from '../components/SuggestionCard';
import { sendFeedback } from '../api';
import { toast } from 'react-toastify';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.data;

  // Redirect to home if no data
  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl p-8 max-w-md text-center">
          <svg
            className="w-16 h-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Data Found</h2>
          <p className="text-gray-600 mb-6">
            Please upload an image first to see suggestions.
          </p>
          <Link
            to="/"
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const { photoId, detections, suggestions } = data;

  const handleFeedback = async (photoId, suggestionId, feedbackType) => {
    try {
      await sendFeedback({
        photoId,
        suggestionId,
        userId: 1,
        feedback: feedbackType,
      });
      toast.success('Thank you for your feedback!');
    } catch (error) {
      console.error('Feedback error:', error);
      toast.error('Failed to submit feedback. Please try again.');
      throw error;
    }
  };

  const handleNewUpload = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleNewUpload}
            className="flex items-center space-x-2 text-primary-700 hover:text-primary-800 font-medium mb-4 transition"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span>Upload New Image</span>
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Your Eco Suggestions
          </h1>
          <p className="text-gray-600 mt-2">
            Based on our analysis, here are personalized suggestions for a greener lifestyle
          </p>
        </div>

        {/* Detections Section */}
        {detections && detections.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
              <svg
                className="w-6 h-6 text-primary-600 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
              </svg>
              Detected Items
            </h2>
            <div className="flex flex-wrap gap-3">
              {detections.map((detection, index) => (
                <div
                  key={index}
                  className="bg-primary-100 text-primary-800 px-4 py-2 rounded-full flex items-center space-x-2"
                >
                  <span className="font-medium">
                    {detection.label.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </span>
                  <span className="text-primary-600 text-sm">
                    ({Math.round(detection.confidence * 100)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suggestions Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg
              className="w-6 h-6 text-primary-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Eco-Friendly Recommendations
          </h2>
          {suggestions && suggestions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {suggestions.map((suggestion) => (
                <SuggestionCard
                  key={suggestion.id}
                  suggestion={suggestion}
                  onFeedback={handleFeedback}
                  photoId={photoId}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Suggestions Available
              </h3>
              <p className="text-gray-600">
                We couldn't find specific suggestions for the detected items.
                Try uploading a different image.
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleNewUpload}
            className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition shadow-lg hover:shadow-xl"
          >
            Upload Another Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
