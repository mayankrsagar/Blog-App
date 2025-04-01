import React from 'react';

import Link from 'next/link';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <p className="mt-4 text-2xl text-gray-600">Page Not Found</p>
        <Link 
          href="/" 
          className="mt-6 inline-block text-lg text-blue-600 hover:underline transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
