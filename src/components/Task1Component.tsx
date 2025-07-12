import React, { useState } from "react";
import user1 from "../assets/user1.avif"
import user2 from "../assets/user2.avif"
import user3 from "../assets/user3.jpeg"
import user7 from "../assets/user7.jpeg"
import user8 from "../assets/user8.jpeg"
import user9 from "../assets/user9.jpeg"


import user4 from "../assets/user4.webp"
import user5 from "../assets/user5.webp"
import user6 from "../assets/user6.webp"



const Task1Component: React.FC = () => {
  // Base radii for contracted (oval) positions
  const baseRadiusX = 280;
  const baseRadiusY = 200;

  // Radii for scattered positions (further out)
  const scatterRadiusX = 450;
  const scatterRadiusY = 350;

  const items = [
    { src: user1, type: "user" },
    { src: user2, type: "user" },
    { src: user3, type: "user" },
    { src: user4, type: "user" },
    { src: user5, type: "user" },
    { src: user6, type: "icon" },
    { src: user7, type: "icon" },
    { src: user8, type: "icon" },
    { src: user9, type: "icon" },
  ];

  const total = items.length;

  // State to track hover on center text
  const [scattered, setScattered] = useState(false);

  // Compute positions with adjustment for items 5 and 6
  const positions = items.map((_, i) => {
    const angle = (i / total) * 2 * Math.PI;

    // Default radii based on scattered or not
    let radiusX = scattered ? scatterRadiusX : baseRadiusX;
    let radiusY = scattered ? scatterRadiusY : baseRadiusY;

    // Push items 5 and 6 (index 4 and 5) farther out
    if (i === 4 || i === 5) {
      radiusX += 40; // 40px farther horizontally
      radiusY += 30; // 30px farther vertically
    }

    const x = radiusX * Math.cos(angle);
    const y = radiusY * Math.sin(angle);
    return { x, y };
  });

  // Random delays for bounce animation
  const randomDelays = items.map(() => `${Math.random() * 2}s`);

  return (
    <>
      <style>
        {`
          @keyframes bounceUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          /* Smooth transition for position changes */
          .orbit-item {
            transition: left 0.5s ease, top 0.5s ease;
          }
        `}
      </style>

      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-white to-[#F4FBF8]">
        <div
          className="relative text-center cursor-pointer"
          onMouseEnter={() => setScattered(true)}
          onMouseLeave={() => setScattered(false)}
        >
          {/* Center Text */}
          <h3 className="text-gray-700 text-xl md:text-2xl font-medium mb-2">
            Hear How They Level Up Their Game!
          </h3>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Skill <span className="text-green-600">Masters</span> Unite! 🤝
          </h1>
          <a
            href="#"
            className="text-lg font-semibold inline-flex items-center gap-2 hover:underline"
          >
            View all Testimonials →
          </a>

          {/* Orbiting Items */}
          {items.map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt={`item-${index}`}
              className={`orbit-item absolute transform -translate-x-1/2 -translate-y-1/2 ${
                item.type === "user"
                  ? "w-20 h-20 rounded-[30%] object-cover shadow-lg"
                  : "w-10 md:w-12"
              }`}
              style={{
                left: `calc(50% + ${positions[index].x}px)`,
                top: `calc(50% + ${positions[index].y}px)`,
                zIndex: 0,
                animation: `bounceUpDown 2s infinite ease-in-out`,
                animationDelay: randomDelays[index],
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Task1Component;
