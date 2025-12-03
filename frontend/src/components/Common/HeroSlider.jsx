import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const slides = [
  {
    type: "image",
    url: "./images/slider.jpg",
    title: "WEDDING STORIES",
    button: "SHOP NOW",
  },
  {
    type: "video",
    url: "/videos/video1.mp4",
    title: "FESTIVE COLLECTION",
    button: "EXPLORE",
  },
  {
    type: "image",
    url: "./images/slider2.jpg",
    title: "NEW ARRIVALS",
    button: "SHOP NOW",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef(null);
  const contentRef = useRef(null);

  const animateSlide = () => {
    gsap.from(slideRef.current, {
      opacity: 0,
      scale: 1.06,
      duration: 1.2,
      ease: "power3.out",
    });

    gsap.from(contentRef.current.children, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.2,
    });
  };

  useGSAP(() => {
    animateSlide();
  }, [current]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Slide Media */}
      <div ref={slideRef} className="w-full h-full">
        {slides[current].type === "image" ? (
          <img
            src={slides[current].url}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <video
            src={slides[current].url}
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute top-1/2 right-20 -translate-y-1/2 text-white text-right space-y-4"
      >
        <h1 className="text-6xl font-bold tracking-wide drop-shadow-lg">
          {slides[current].title}
        </h1>

        <button className="px-6 py-3 bg-red-600 text-white text-lg font-semibold shadow-lg hover:bg-red-700">
          {slides[current].button}
        </button>
      </div>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/70 w-10 h-10 flex items-center justify-center rounded-full"
      >
        ←
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/70 w-10 h-10 flex items-center justify-center rounded-full"
      >
        →
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              i === current ? "bg-red-600" : "bg-white/60"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
