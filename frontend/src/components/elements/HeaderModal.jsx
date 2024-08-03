import { X } from "lucide-react";
import React from "react";

const HeaderModal = ({ titile, onClose, className }) => {
  return (
    <div className="flex-between">
      <h5 className={`${className} text-gray-700 text-base`}>{titile}</h5>
      <button
        onClick={onClose}
        aria-label="close modal"
        className={` py-1.5 px-1.5 rounded-md bg-gray-100 hover:bg-gray-200 font-bold text-gray-800`}
      >
        <X width={15} height={15} />
      </button>
    </div>
  );
};

export default HeaderModal;
