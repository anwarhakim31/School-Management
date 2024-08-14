import HeaderModal from "@/components/elements/HeaderModal";
import Modal from "@/components/elements/Modal";
import React from "react";

const AddModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[425px] h-[200px] rounded-lg shadow-md bg-white"
      >
        <div className="p-4 border-b">
          <HeaderModal
            title={"Konfimasi Hapus"}
            onClose={onClose}
            className={"font-semibold"}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddModal;
