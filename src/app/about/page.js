"use client"
import { useState, useEffect } from "react";
import Image from "next/image";

export default function About() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    { src: "/images/celebration-deity-navratri.jpg", alt: "Colorful firecrackers display" },
    { src: "/images/diwali-celebration-illustration.jpg", alt: "Diwali celebration with lamps and fireworks" },
    { src: "/images/Diwali-Celebration.webp", alt: "Eco-friendly green crackers" },
    { src: "/images/diwali-3.jpg", alt: "Sparklers lighting up the night" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="bg-gray-100 py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
          About Us
        </h2>

        {/* Carousel */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg bg-white">
          <div className="relative w-full">
            <div className="relative h-72 md:h-96 lg:h-[500px] overflow-hidden rounded-lg bg-gray-200">
              {carouselImages.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex absolute bottom-5 left-1/2 z-30 space-x-3 -translate-x-1/2">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide
                      ? "bg-white"
                      : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* Controls */}
            <button
              type="button"
              className="flex absolute top-0 left-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
              onClick={prevSlide}
            >
              <span className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </span>
            </button>
            <button
              type="button"
              className="flex absolute top-0 right-0 z-30 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none"
              onClick={nextSlide}
            >
              <span className="inline-flex justify-center items-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>

        {/* About Us Text */}
        <div className="max-w-4xl mx-auto text-center space-y-6 text-gray-700">
          <p className="text-base md:text-lg leading-relaxed">
            At <span className="font-semibold text-indigo-600">SMT Crackers</span>, we believe that celebrations are incomplete without the sparkle of fireworks. Crackers, also known as firecrackers, have been a joyful part of traditions across the world, bringing sound, light, and colorful effects that fill every moment with excitement.
          </p>

          <p className="text-base md:text-lg leading-relaxed">
            In India, crackers hold a special place during <span className="font-semibold">Diwali, weddings, temple festivals, and New Year’s celebrations</span>. From sparklers and flowerpots to rockets and sky shots, every cracker we offer is crafted to add happiness, energy, and unforgettable memories to your occasions.
          </p>

          <div className="text-left md:text-center">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">✨ Our Promise</h3>
            <p className="text-base md:text-lg leading-relaxed">
              While crackers symbolize fun and togetherness, we also understand the importance of <span className="font-semibold">safety and the environment</span>. That’s why we promote <span className="font-semibold text-green-600">eco-friendly green crackers</span> that reduce harmful emissions while keeping the festive spirit alive.
            </p>
          </div>

          <div className="text-left md:text-center">
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">🎇 Why Choose Us?</h3>
            <ul className="list-disc list-inside space-y-2 text-base md:text-lg leading-relaxed">
              <li>Wide range of high-quality crackers</li>
              <li>Safe, eco-friendly, and affordable options</li>
              <li>Trusted tradition with modern care</li>
              <li>Customer satisfaction as our top priority</li>
            </ul>
          </div>

          <p className="text-base md:text-lg leading-relaxed font-medium text-gray-800">
            At SMT Crackers, we aim to make every celebration brighter, safer, and more joyful.  
            By choosing responsible fireworks, we can keep the magic alive for generations to come.
          </p>

          <p className="text-lg font-semibold text-indigo-700">
            💥 Celebrate responsibly. Sparkle with joy. Choose SMT Crackers. 💥
          </p>
        </div>
      </div>
    </section>
  );
}
