'use client';

const Footer = () => (
  <footer className="bg-indigo-700 text-white py-6 mt-8">
    <div className="container mx-auto flex justify-between items-center">
      <p className="text-sm text-center sm:text-left">
        &copy; 2024 Movie Site. All Rights Reserved.
      </p>
      <div className="flex gap-4">
        {/* Add social media icons or other links if needed */}
        <a href="#" className="text-white hover:text-indigo-300 transition-colors duration-300">
          <span className="material-icons">facebook</span>
        </a>
        <a href="#" className="text-white hover:text-indigo-300 transition-colors duration-300">
          <span className="material-icons">twitter</span>
        </a>
        <a href="#" className="text-white hover:text-indigo-300 transition-colors duration-300">
          <span className="material-icons">instagram</span>
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;

  
  
  