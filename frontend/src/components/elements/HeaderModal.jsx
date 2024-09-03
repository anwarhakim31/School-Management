import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";

const HeaderModal = ({ titile, onClose, className }) => {
  const focusRef = useRef(null);

  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, []);

  return (
    <div className="flex-between">
      <h5 className={`${className} text-gray-700 text-sm`}>{titile}</h5>
      <button
        onClick={onClose}
        ref={focusRef}
        aria-label="close modal"
        className={` py-1.5 px-1.5 rounded-md bg-gray-100 hover:bg-gray-200 font-bold text-gray-800 focus:outline-neutral focus:outline outline-1`}
      >
        <X width={15} height={15} />
      </button>
    </div>
  );
};

export default HeaderModal;
