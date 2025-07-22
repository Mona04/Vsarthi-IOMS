import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import Marquee from "../ui/marquee";

type LandingPageProps = {
  heroRef: React.RefObject<HTMLDivElement>;
};

const LandingPage = ({ heroRef }: LandingPageProps) => {
  const images = [
    { name: "Mobile 1", src: "/Images/mobile.jpg", link: "#" },
    { name : "Device 2", src: "/Images/pic2.jpg", link: "#"},
    { name: "Headphone 2", src: "/Images/Headphone2.jpg", link: "#" },
    { name: "Laptop 1", src: "/Images/Laptop1.webp", link: "#" },
    { name: "Earpodes 2", src: "/Images/earpodes2.webp", link: "#" },
    { name : "Device 1", src: "/Images/Pic1.jpg", link: "#"}, 
    { name: "Headphone 1", src: "/Images/Headphone1.webp", link: "#" },
    { name : "Speaker 2", src: "/Images/speaker2.jpg", link: "#"},
    { name: "Mobile 2", src: "/Images/mobile2.jpg", link: "#" },
    { name: "Earpodes 1", src: "/Images/earpodes1.webp", link: "#" },
    { name : "Device 1", src: "/Images/pic3.avif", link: "#"},
    { name: "Laptop 2", src: "/Images/Laptop2.webp", link: "#" },
    { name : "Speaker 1", src: "/Images/speaker1.webp", link: "#"},
    
  ];

  const first = images.slice(0, 4);
  const second = images.slice(4);

  return (
    <div
      ref={heroRef}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center py-10 px-4"
    >
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-semibold mb-2">
                  <b>Veersa - IOMS</b>
        </h1>
  <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
    QuickKart
  </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
       Discover our latest collection of mobiles, laptops, headphones, and earpods. Quality products at the best prices!
        </p>
        <div className="mt-6">
          <Link to="/dashboard">
            <Button className="bg-white text-black hover:bg-gray-200">
              <b>Go to Dashboard</b>
            </Button>
          </Link>
        </div>
      </div>

      {/* Marquee Image Rows */}
      <div className="w-full max-w-[1200px]">
        <Marquee
          pauseOnHover
          className="[--duration:25s] py-3 gap-4 flex items-center"
        >
          {first.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="mx-2 block rounded overflow-hidden shadow-lg"
            >
              <img
                src={item.src}
                alt={item.name}
                className="w-[250px] h-[160px] object-cover rounded-md"
              />
            </Link>
          ))}
        </Marquee>

        <Marquee
          reverse
          pauseOnHover
          className="[--duration:25s] py-3 gap-4 flex items-center"
        >
          {second.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="mx-2 block rounded overflow-hidden shadow-lg"
            >
              <img
                src={item.src}
                alt={item.name}
                className="w-[250px] h-[160px] object-cover rounded-md"
              />
            </Link>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default LandingPage;
