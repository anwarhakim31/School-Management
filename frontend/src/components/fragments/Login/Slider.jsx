import React, { useEffect, useState, useRef } from "react";

const slides = [
  {
    name: "Ir. Soekarno",
    quote:
      "Gantungkan cita-citamu setinggi langit! Bermimpilah setinggi langit. Jika engkau jatuh, engkau akan jatuh di antara bintang-bintang.",
  },
  {
    name: "Mahatma Gandhi",
    quote:
      "Hiduplah seolah-olah Anda akan mati besok. Belajarlah seolah-olah Anda hidup selamanya.",
  },
  {
    name: "Nelson Mandela",
    quote:
      "Pendidikan adalah senjata paling mematikan di dunia, karena dengan pendidikan, Anda dapat mengubah dunia.",
  },
];

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevState) => prevState + 1);
    setIsTransitioning(true);
  };

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(timeoutRef.current);
  }, []);

  useEffect(() => {
    if (currentIndex >= slides.length) {
      const resetTimeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, 1000); // The transition duration should match the CSS transition duration

      return () => clearTimeout(resetTimeout);
    }
  }, [currentIndex]);

  return (
    <div className="w-full max-w-[220px] sm:max-w-[400px] sm:h-[250px] mx-auto select-none">
      <h1 className="font-bold text-xl mb-4 text-center">Quotes</h1>
      <div className="relative w-full z-10 h-full overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-y-1/2 -translate-x-1/2 -z-[1]">
          <img
            src="data:image/svg+xml,%3csvg%20width='358'%20height='274'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M19.101%2026.365C27.48%2013.798%2040.045%205.84%2056.801%202.489c15.917-3.351%2032.253-1.257%2049.008%206.283%2015.917%207.54%2028.065%2020.525%2036.442%2038.956%2011.729%2029.32%2016.337%2057.386%2013.823%2084.194-3.351%2027.646-12.147%2052.36-26.389%2074.141-14.242%2021.782-32.254%2038.537-54.035%2050.266-22.62%2012.566-46.496%2018.43-71.628%2017.592l-3.77-12.566c25.133-8.378%2042.306-20.944%2051.522-37.699%209.215-15.917%2012.566-32.672%2010.053-50.265-3.351-17.593-10.472-33.092-21.363-46.496-7.54-8.377-14.242-18.43-20.106-30.159-5.864-10.89-9.215-22.2-10.053-33.929-1.676-11.729%201.257-23.876%208.796-36.442zm201.062%200c8.377-12.567%2020.944-20.525%2037.699-23.876%2015.917-3.351%2032.253-1.257%2049.008%206.283%2015.918%207.54%2028.065%2020.525%2036.443%2038.956%2011.728%2029.32%2016.336%2057.386%2013.823%2084.194-3.351%2027.646-12.148%2052.36-26.39%2074.141-14.241%2021.782-32.253%2038.537-54.035%2050.266-22.619%2012.566-46.495%2018.43-71.628%2017.592l-3.77-12.566c25.133-8.377%2042.307-20.944%2051.522-37.699%209.216-15.917%2012.567-32.672%2010.053-50.265-3.351-17.593-10.472-33.092-21.362-46.496-7.54-8.377-14.242-18.43-20.107-30.159-5.864-10.89-9.215-22.2-10.053-33.929-1.675-11.729%201.257-23.876%208.797-36.442z'%20fill='%23F3F7FB'/%3e%3c/svg%3e"
            alt="img quotes"
            className="h-48 w-48 mx-auto -z-[1] object-contain"
          />
        </div>
        <div
          className={`flex transition-transform duration-500 ease-in-out ${
            isTransitioning ? "transform" : ""
          }`}
          style={{
            transform: `translateX(-${(currentIndex % slides.length) * 100}%)`,
          }}
        >
          {[...slides, ...slides].map((slide, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 h-full text-center text-black flex items-center justify-between flex-col px-4"
            >
              <q className="leading-9">{slide.quote}</q>
              <span className="mt-10 italic">{slide.name}</span>
            </div>
          ))}
        </div>

        <div className="absolute bottom-0 hidden sm:flex right-6 items-center gap-4">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setIsTransitioning(true);
              }}
              className={`${
                currentIndex % slides.length === i ? "bg-purple-500" : ""
              } w-5 h-5 rounded-full border-2 cursor-pointer hover:bg-purple-500 border-purple-300`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
