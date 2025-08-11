"use client";
import React from "react";

const LoadingLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen pt-8 gap-2">
      <span className="w-6 h-6 border-3 border-[var(--card)] border-t-[#2cb97c] rounded-full animate-spin" />
      Loading...
    </div>
  );
};

export default LoadingLayout;
