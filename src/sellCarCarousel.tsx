import React, { useState } from 'react';

function SellCarCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Advertise on Auto Trader",
      description:
        "With the UK's largest audience of car buyers, it's highly likely someone is currently searching our website for the car that's sat on your driveway. Speak with potential buyers directly to answer any questions and negotiate price.",
      image: "./profile.png",
    },
    {
      title: "Auction your car",
      description:
        "Once you’ve answered a few questions and uploaded your images, our auction partner Dealer Auction will take it from there! Auctions last two working days, so you’ll get the highest bid in no time.",
      image: "./profile.png",
    },
  ];

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  return (
    <div className="bg-gray-100 py-12">
      <p className="text-center text-2xl font-bold mb-8">Place an advert on Auto Trader</p>
      <section className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Carousel Media */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={slides[activeSlide].image}
            alt={slides[activeSlide].title}
            className="w-3/4 rounded-lg shadow-lg"
          />
        </div>

        {/* Carousel Content */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
          <h3 className="text-xl font-bold mb-4">{slides[activeSlide].title}</h3>
          <p className="text-gray-700 mb-6">{slides[activeSlide].description}</p>

          {/* Carousel Navigation Dots */}
          <ul className="flex justify-center md:justify-start space-x-4">
            {slides.map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => handleSlideChange(index)}
                  className={`w-4 h-4 rounded-full ${
                    activeSlide === index ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default SellCarCarousel;