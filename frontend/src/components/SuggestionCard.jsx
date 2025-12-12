import React, { useState } from 'react';

const SuggestionCard = ({ suggestion, onFeedback, photoId }) => {
  const [feedbackGiven, setFeedbackGiven] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFeedback = async (feedbackType) => {
    setIsSubmitting(true);
    try {
      await onFeedback(photoId, suggestion.id, feedbackType);
      setFeedbackGiven(feedbackType);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'product':
        return 'bg-blue-100 text-blue-800';
      case 'action':
        return 'bg-green-100 text-green-800';
      case 'tip':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactStars = (score) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" className="text-yellow-400" style={{ stopOpacity: 1 }} />
                <stop offset="50%" stopColor="currentColor" className="text-gray-300" style={{ stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-${i})`}
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-5 h-5 text-gray-300 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{suggestion.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(suggestion.type)}`}>
          {suggestion.type}
        </span>
      </div>

      <p className="text-gray-600 mb-4 leading-relaxed">{suggestion.content}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600 font-medium">Impact:</span>
          <div className="flex">{getImpactStars(suggestion.impact_score)}</div>
          <span className="text-sm text-gray-500">({suggestion.impact_score.toFixed(1)})</span>
        </div>

        {!feedbackGiven ? (
          <div className="flex space-x-2">
            <button
              onClick={() => handleFeedback('helpful')}
              disabled={isSubmitting}
              className="flex items-center space-x-1 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <span>Helpful</span>
            </button>
            <button
              onClick={() => handleFeedback('not_helpful')}
              disabled={isSubmitting}
              className="flex items-center space-x-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                />
              </svg>
              <span>Not Helpful</span>
            </button>
          </div>
        ) : (
          <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
            feedbackGiven === 'helpful' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
          }`}>
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm font-medium">Feedback submitted!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuggestionCard;
