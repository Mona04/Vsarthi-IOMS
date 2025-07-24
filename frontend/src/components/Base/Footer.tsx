import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-blue-800 text-white py-4 mt-10 text-center">
    <div className="container mx-auto">
      <span className="font-medium">&copy; {new Date().getFullYear()} Veersa IOMS. All rights reserved.</span>
    </div>
  </footer>
);

export default Footer;