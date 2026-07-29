import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-200/80 bg-[#F9FAFB] py-8 relative z-10 font-sans">
      <div className="container mx-auto px-6 text-center max-w-6xl">
        <p className="text-gray-500 text-xs font-medium tracking-wide">
          &copy; {new Date().getFullYear()} Entrepreneurship Cell, Rajkiya Engineering College Ambedkar Nagar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
