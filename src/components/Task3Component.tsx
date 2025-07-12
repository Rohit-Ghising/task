import React, { useState } from "react";

const icons = [
  "https://cdn-icons-png.flaticon.com/512/919/919851.png",
  "https://cdn-icons-png.flaticon.com/512/733/733579.png",
  "https://cdn-icons-png.flaticon.com/512/919/919825.png",
  "https://cdn-icons-png.flaticon.com/512/888/888859.png",
];

const Task3Component: React.FC = () => {
  const [activeCard, setActiveCard] = useState<string>("all");

  const cards = [
    {
      id: "all",
      title: "All Courses",
      count: 23,
      desc: "courses you're powering through right now.",
    },
    {
      id: "upcoming",
      title: "Upcoming Courses",
      count: 5,
      desc: "exciting new courses waiting to boost your skills.",
    },
    {
      id: "ongoing",
      title: "Ongoing Courses",
      count: 10,
      desc: "currently happening—don't miss out on the action!",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-10 relative">
      <p className="mb-4 text-2xl text-gray-700 font-medium">
        Explore our classes and master trending skills!
      </p>
      <h2 className="text-5xl font-extrabold mb-12">
        Dive Into{" "}
        <span className="text-green-600">
          What's Hot Right Now! <span role="img" aria-label="fire">🔥</span>
        </span>
      </h2>

      <div className="flex gap-6 items-start relative z-10">
        {cards.map((card) => {
          const isActive = activeCard === card.id;

          return (
            <div
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              className={`transition-all duration-700 ease-in-out cursor-pointer rounded-2xl relative overflow-hidden 
                ${isActive
                  ? "flex-[2] bg-red-600 text-white scale-105"
                  : "flex-1 bg-red-100 text-red-700"}
                min-w-[160px] h-[520px] flex items-center justify-center`}
            >
              {/* Show label only on active card */}
              {isActive && (
                <div className="absolute top-4 right-4 text-white text-sm select-none opacity-80 pointer-events-none">
                  View all Courses &rarr;
                </div>
              )}

              {isActive ? (
                <div className="p-10 w-full relative">
                  {/* Icons */}
                  <div className="flex gap-8 mb-8 justify-center">
                    {icons.map((src, index) => (
                      <img
                        key={`${card.id}-${index}`}
                        src={src}
                        alt={`Icon ${index}`}
                        className="w-20 h-20 transition-all duration-500"
                      />
                    ))}
                  </div>

                  <div className="text-8xl font-black">
                    {card.count}
                    <span className="text-5xl align-top">+</span>
                  </div>
                  <div className="text-4xl font-bold mt-4">{card.title}</div>
                  <p className="text-xl mt-3">{card.desc}</p>
                </div>
              ) : (
                <div className="transform -rotate-90 text-center whitespace-nowrap">
                  <div className="text-2xl font-bold">{card.title}</div>
                  <div className="text-6xl font-black">
                    {card.count}
                    <span className="text-3xl align-top">+</span>
                  </div>
                  <div className="text-lg w-80 mx-auto">{card.desc}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Task3Component;
