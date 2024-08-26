import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ButtonScrollTop = ({ scrollContainerRef }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (scrollContainerRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;

      setIsVisible(scrollTop > 50);
    }
  };

  const handleScrollTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", toggleVisibility);
      return () => {
        container.removeEventListener("scroll", toggleVisibility);
      };
    }
  }, [scrollContainerRef]);

  return (
    isVisible && (
      <button
        role="button"
        aria-label="scroll to top"
        onClick={handleScrollTop}
        className="fixed w-8 h-8 bottom-12 right-3 flex items-center justify-center border border-gray-100 rounded-full bg-neutral z-10"
      >
        <ChevronUp className="text-white" />
      </button>
    )
  );
};

export default ButtonScrollTop;
