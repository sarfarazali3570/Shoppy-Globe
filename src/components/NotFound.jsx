import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 text-center py-16">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist or has been moved.</p>
      <Link 
        to="/" 
        className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;