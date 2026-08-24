import { useRef } from "react";
import Slider from "react-slick";
import {
  FaQuoteRight,
  FaStar,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




const Testimonials = () => {
  const sliderRef = useRef(null);



  // Testimonial data
  const testimonials = [
    {
      name: "Research Director",
      position: "Political Polling",
      company: null,
      rating: 5,
      content:`We just went through the most intensive period of polling we have ever conducted and included a national sample and several states. QuantifyAI was a true partner in this effort to deliver Sample quickly and efficiently. They were very responsive to any concerns we had. Communication with the team was quick and respectful, which is not always the case with other Sample providers.
      
       The samples we obtained were some of the most representative we’ve ever produced in our 20+ years of doing survey research. Nearly all of the samples had maximum weights that were less than 5, with care paid to obtaining young, people of color, or low income respondents, who are typically harder to obtain. I highly recommend QuantifyAI for your next in-depth survey project.` ,
      verified: true,
    },
    {
      name: "Senior Director",
      position: "Consumer Insights",
      company: null,
      rating: 5,
      content:`I've been in the insights industry for over 25 years, and in recent years, securing high-quality sample has become increasingly challenging. The rise of aggregator panels, professional survey takers, bots, and even the use of tools like ChatGPT by respondents has led to a decline in data quality, compromising the integrity of our research. While various technologies aim to detect fraud, they don't address the root issue: the need for genuinely engaged, real panelistsand a positive experience for them.
      
      Thankfully, Adam and his team at QuantifyAI are bringing meaning back to insights. After years of discarding 30-50% of our sample due to quality issues, we recently completed a strategic study with QuantifyAI and found only 5% of the responses to be problematic. The panelists provided thoughtful, high-quality responses that will guide our organization for years to come.

In addition to the outstanding sample quality, Adam's project management team delivered a seamless experience from start to finish, managing everything from redirect links to quality assurance with precision. Moving forward, QuantifyAI will be our go-to partner for panel sourcing.`,
      verified: true,
    },
    {
      name: "Senior Analyst",
      position: "Research Services",
      company: null,
      rating: 5,
      content:`Working with QuantifyAI has been an incredibly smooth process as each member of the team goes above and beyond to help make our projects successful. They have been instrumental in helping us reach tricky demographics that others would struggle to obtain and are proactive in taking steps to limit the number of fraudulent survey takers in their panels!`,
      verified: true,
    },
  ];

  // Slider settings for partner logos
const desktopSliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: false,
  autoplaySpeed: 2000,
  speed: 800,
  slidesToShow: 5,
  slidesToScroll: 1,
  pauseOnHover: true,

  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 4 } },
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
  ],
};


// MOBILE SLIDER SETTINGS (1 image only)
const mobileSliderSettings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2000,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
};




  // Navigation handlers
  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <section
      id="testimonials"
      className="relative z-10 py-20 bg-gradient-to-b from-gray-900 to-black"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full">
              TRUSTED PARTNERS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See what industry leaders say about working with QuantifyAI
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Partner Logos Carousel */}
          {/* <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-white">
                Trusted By Industry Leaders
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 group"
                  aria-label="Previous logos"
                >
                  <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 group"
                  aria-label="Next logos"
                >
                  <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none" />

<div className="hidden md:block">
  <Slider ref={sliderRef} {...desktopSliderSettings}>
    {partners.map((partner) => (
      <div key={partner.name} className="px-4 py-6">
        <a href={partner.url} target="_blank" rel="noopener noreferrer">
          <div className="glass-card rounded-xl p-4 hover:scale-105 transition">
            <div className="flex justify-center h-24">
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-20 mt-8 object-contain"
              />
            </div>
          </div>
        </a>
      </div>
    ))}
  </Slider>
</div>
<div className="block md:hidden">
  <Slider {...mobileSliderSettings}>
    {partners.map((partner) => (
      <div key={partner.name} className="px-6 py-8">
        <a href={partner.url} target="_blank" rel="noopener noreferrer">
          <div className="glass-card rounded-xl p-6">
            <div className="flex justify-center h-24">
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-full mt-5 object-contain mx-auto"
              />
            </div>
          </div>
        </a>
      </div>
    ))}
  </Slider>
</div>

            </div>
          </div> */}

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Animated border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-blue-400 to-teal-400 rounded-3xl opacity-0 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200" />

                <div className="relative bg-gray-900 rounded-3xl p-8 h-full">
                  {/* Quote icon */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                    <FaQuoteRight className="text-white text-2xl" />
                  </div>

                  {/* Rating stars */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-yellow-400 mr-1 text-lg group-hover:scale-110 transition-transform"
                        style={{ transitionDelay: `${i * 50}ms` }}
                      />
                    ))}
                  </div>

                  {/* Testimonial content */}
                  <p className="text-gray-300 italic  mb-8 group-hover:text-white transition-colors whitespace-pre-line">
                    "{testimonial.content}"
                  </p>

                  {/* Client info */}
                  <div className="flex items-center pt-6 border-t border-gray-800">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center">
                          <span className="text-white font-bold">
                            {testimonial.name.charAt(0)}
                          </span>
                        </div>
                      </div>
                      {testimonial.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center border-2 border-gray-900">
                          <FaCheck className="text-white text-xs" />
                        </div>
                      )}
                    </div>

                    <div className="ml-4">
                      <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.position}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-20 pt-12 border-t border-gray-800">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">99%</div>
                <p className="text-gray-400">Client Satisfaction</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">
                  2500+
                </div>
                <p className="text-gray-400">Projects Completed</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">48</div>
                <p className="text-gray-400">Global Markets</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">30 Minutes</div>
                <p className="text-gray-400">Avg. Response Time</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
