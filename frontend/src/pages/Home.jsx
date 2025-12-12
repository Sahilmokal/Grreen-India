import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import Loader from '../components/Loader';
import { uploadPhoto } from '../api';
import { toast } from 'react-toastify';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first!');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('userId', '1'); // Using userId 1 as specified

      const response = await uploadPhoto(formData);
      
      toast.success('Image uploaded successfully!');
      
      // Navigate to results page with the response data
      navigate('/results', { state: { data: response } });
    } catch (error) {
      console.error('Upload error:', error);
      
      if (error.response) {
        toast.error(`Upload failed: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        toast.error('Cannot reach the server. Please ensure the backend is running on http://localhost:8080');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-green-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-primary-600">Green India</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a photo of waste items or objects to receive personalized eco-friendly suggestions
            for a more sustainable lifestyle.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 md:p-12">
          {!isUploading ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                  Upload Your Image
                </h2>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                />
              </div>

              <button
                onClick={handleUpload}
                disabled={!selectedFile}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all transform ${
                  selectedFile
                    ? 'bg-primary-600 hover:bg-primary-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Get Eco Suggestions
              </button>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  How it works:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <p className="text-gray-600 pt-1">
                      Upload an image of waste items, recyclables, or everyday objects
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <p className="text-gray-600 pt-1">
                      Our AI analyzes the image and identifies the objects
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <p className="text-gray-600 pt-1">
                      Receive personalized eco-friendly suggestions and alternatives
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <p className="text-gray-600 pt-1">
                      Provide feedback to help improve our suggestions
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12">
              <Loader message="Analyzing your image and generating suggestions..." />
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>
            🌱 Together, we can make a difference for our environment 🌍
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
