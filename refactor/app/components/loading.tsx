'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="relative flex items-center justify-center flex-col mt-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
      <span className="ml-4 text-sm text-gray-700">Loading...</span>
    </div>
  );
}
