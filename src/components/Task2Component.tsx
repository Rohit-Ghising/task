import { useState } from "react";

import img1 from "../assets/user1.avif";
import img2 from "../assets/user2.avif";
import img3 from "../assets/user3.jpeg";
import img4 from "../assets/user4.webp";
import img5 from "../assets/user5.webp";
import img6 from "../assets/user6.webp";

export default function Task2Component() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Random delays for bounce animation for all 6 images (fixed length)
  const randomDelays = Array(6)
    .fill(0)
    .map(() => `${(Math.random() * 2).toFixed(2)}s`);

  // Main cards data (1, 2, 5, 6)
  const mainCards = [
    {
      id: 1,
      img: img1,
      bg: "bg-gray-700",
      textColor: "text-gray-300",
      imageOnLeft: true,
      overlayCard: {
        id: 3,
        img: img3,
        bg: "bg-red-600",
        textColor: "text-gray-300",
        imageOnLeft: true,
      },
      title: "Master Your Basics",
      subtitle: "Fundamental Skills",
      paragraph:
        "Build a strong foundation with essential skills to take your learning journey forward.",
      overlayTitle: "Advanced Techniques",
      overlaySubtitle: "Deep Dive",
      overlayParagraph:
        "Explore advanced concepts and techniques to stand out in your field.",
    },
    {
      id: 2,
      img: img2,
      bg: "bg-blue-500",
      textColor: "text-blue-200",
      imageOnLeft: false,
      overlayCard: {
        id: 4,
        img: img4,
        bg: "bg-purple-500",
        textColor: "text-purple-200",
        imageOnLeft: false,
      },
      title: "Interactive Learning",
      subtitle: "Engage & Practice",
      paragraph:
        "Participate in practical exercises and interactive sessions to enhance understanding.",
      overlayTitle: "Expert Guidance",
      overlaySubtitle: "Mentorship",
      overlayParagraph:
        "Gain insights and support from experienced mentors to accelerate your growth.",
    },
    {
      id: 5,
      img: img5,
      bg: "bg-green-600",
      textColor: "text-green-200",
      imageOnLeft: true,
      overlayCard: null,
      title: "Community Support",
      subtitle: "Collaborate & Grow",
      paragraph:
        "Join a community of learners to share knowledge, ask questions, and grow together.",
    },
    {
      id: 6,
      img: img6,
      bg: "bg-yellow-600",
      textColor: "text-yellow-200",
      imageOnLeft: false,
      overlayCard: null,
      title: "Continuous Improvement",
      subtitle: "Stay Updated",
      paragraph:
        "Keep your skills current with regular updates and new learning resources.",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 px-10 py-6">
        <h2 className="text-gray-600 text-base mb-1">Your Skill Sikshya Journey</h2>
        <h1 className="font-bold text-2xl mb-12">StepInSkillUpStandOut</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 max-w-7xl mx-auto justify-center">
          {mainCards.map((card, index) => {
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                className="relative group overflow-hidden w-full max-w-4xl h-96 rounded-xl mx-auto cursor-pointer"
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Main Card Content */}
                <div
                  className={`flex ${card.bg} border border-gray-300 rounded-xl shadow-lg h-full`}
                >
                  {/* Image Left or Right */}
                  {card.imageOnLeft && (
                    <div className="w-40 h-full rounded-l-xl overflow-hidden flex items-center justify-center">
                      <img
                        src={card.img}
                        alt={`img-${card.id}`}
                        className="object-cover w-full h-full"
                        style={{
                          animation: "bounceSlow 4s ease-in-out infinite",
                          animationDelay: randomDelays[index],
                        }}
                      />
                    </div>
                  )}

                  <div className="flex flex-col justify-center text-white flex-1 px-8">
                    <h1 className="text-3xl font-semibold mb-1">{card.title}</h1>
                    <h2 className="text-2xl mb-3">{card.subtitle}</h2>
                    <p className={`text-xl ${card.textColor}`}>{card.paragraph}</p>
                  </div>

                  {!card.imageOnLeft && (
                    <div className="w-40 h-full rounded-r-xl overflow-hidden flex items-center justify-center">
                      <img
                        src={card.img}
                        alt={`img-${card.id}`}
                        className="object-cover w-full h-full"
                        style={{
                          animation: "bounceSlow 4s ease-in-out infinite",
                          animationDelay: randomDelays[index],
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Overlay for cards 1 and 2 only */}
                {card.overlayCard && (
                  <div
                    className={`absolute inset-0 ${card.overlayCard.bg} rounded-xl shadow-lg flex items-center justify-between z-20
                      transition-transform duration-500 ease
                      ${
                        isHovered
                          ? "translate-x-0 opacity-100 pointer-events-auto"
                          : "translate-x-full opacity-0 pointer-events-none"
                      }
                    `}
                  >
                    {/* Left semicircle with arrow */}
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-40 bg-gray-100 rounded-r-full z-30 flex items-center justify-center"
                      style={{ transitionDelay: "300ms" }}
                    >
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-400 flex items-center justify-center text-gray-700 shadow">
                        ⬅️
                      </div>
                    </div>

                    {/* Right semicircle with arrow */}
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-40 bg-gray-100 rounded-l-full z-30 flex items-center justify-center"
                      style={{ transitionDelay: "300ms" }}
                    >
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-400 flex items-center justify-center text-gray-700 shadow">
                        ➡️
                      </div>
                    </div>

                    {/* Overlay card content */}
                    {card.overlayCard.imageOnLeft ? (
                      <>
                        {/* Image container */}
                        <div className="w-40 h-full rounded-l-xl overflow-hidden flex items-center justify-center">
                          <img
                            src={card.overlayCard.img}
                            alt={`overlay-img-${card.overlayCard.id}`}
                            className="object-cover w-full h-full"
                            style={{
                              animation: "bounceSlow 4s ease-in-out infinite",
                              animationDelay:
                                randomDelays[card.overlayCard.id - 1],
                            }}
                          />
                        </div>

                        {/* Text container */}
                        <div className="flex flex-col justify-center mx-auto text-center text-white flex-1 px-8">
                          <h1 className="text-3xl font-semibold mb-1">{card.overlayTitle}</h1>
                          <h2 className="text-2xl mb-3">{card.overlaySubtitle}</h2>
                          <p className={`text-xl ${card.overlayCard.textColor}`}>
                            {card.overlayParagraph}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Text container */}
                        <div className="flex flex-col justify-center mx-auto text-center text-white flex-1 px-8">
                          <h1 className="text-3xl font-semibold mb-1">{card.overlayTitle}</h1>
                          <h2 className="text-2xl mb-3">{card.overlaySubtitle}</h2>
                          <p className={`text-xl ${card.overlayCard.textColor}`}>
                            {card.overlayParagraph}
                          </p>
                        </div>

                        {/* Image container */}
                        <div className="w-40 h-full rounded-r-xl overflow-hidden flex items-center justify-center">
                          <img
                            src={card.overlayCard.img}
                            alt={`overlay-img-${card.overlayCard.id}`}
                            className="object-cover w-full h-full"
                            style={{
                              animation: "bounceSlow 4s ease-in-out infinite",
                              animationDelay:
                                randomDelays[card.overlayCard.id - 1],
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
