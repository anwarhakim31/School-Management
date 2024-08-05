import HeaderModal from "@/components/elements/HeaderModal";
import Modal from "@/components/elements/Modal";
import {
  selectedDataDeleteMany,
  setDataDeleteMany,
} from "@/store/slices/admin-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import { TriangleAlert } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const DeleteManyModal = ({ onClose, setAllCheck }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const dataChecked = useSelector(selectedDataDeleteMany);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await axios.delete(HOST + "/api/siswa/delete-many-siswa", {
        data: { dataChecked },
        withCredentials: true,
      });

      toast.success(res.data.message);
      setAllCheck(false);
      dispatch(setDataDeleteMany([]));
      onClose();
    } catch (error) {
      responseError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-[425px] h-[200px] rounded-2xl shadow-md bg-white"
      >
        <div className="p-4 border-b">
          <HeaderModal
            titile={"Konfimasi Hapus"}
            onClose={onClose}
            className={"font-semibold"}
          />
        </div>
        <div className="flex-center gap-6 mt-4 mx-4">
          <div>
            <TriangleAlert className="w-8 h-8 text-neutral2" />
          </div>
          <h3 className="text-sm  font-medium">
            {" Apakah And yakin ingin menghapus siswa terpilih?"}
          </h3>
        </div>
        <div className="text-end border-t mt-4 p-4 space-x-4">
          <button
            aria-label="batal"
            type="submit"
            disabled={loading}
            className="btn w-24 h-8.5 bg-gray-100 disabled:bg-gray-200  text-gray-800 border-gray-200 border hover:text-white"
            onClick={() => onClose()}
          >
            {loading ? "Loading" : "Tidak"}
          </button>
          <button
            aria-label="ya"
            type="submit"
            disabled={loading}
            onClick={handleDelete}
            className="btn w-24 h-8.5 disabled:bg-gray-800"
          >
            {loading ? "Loading" : "Ya"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteManyModal;
