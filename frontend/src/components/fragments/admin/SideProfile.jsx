import { selectedUserData } from "@/store/slices/auth-slice";
import { Edit2, Plus, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const SideProfile = () => {
  const data = useSelector(selectedUserData);
  const [isHover, setIsHover] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="fixed p-4 rounded-md shadow-lg top-1/2 -translate-y-1/2 right-0 w-[204px] h-[60vh] bg-white">
      <caption
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative cursor-pointer w-16 h-16 mx-auto bg-backup flex items-center justify-center rounded-full overflow-hidden"
      >
        {data.photo ? (
          <img src={data.photo} alt="foto" />
        ) : (
          <User
            color="white"
            width={50}
            height={50}
            className="mt-7 fill-white"
          />
        )}
        {isHover && (
          <div className="absolute inset-0 bg-black/30 w-full h-full flex-center">
            {data.image ? (
              <Plus color="white" width={20} height={20} />
            ) : (
              <Edit2 color="white" width={20} height={20} />
            )}
          </div>
        )}
        <input type="file" className="hidden" />
      </caption>
      <form
        action="
          "
      >
        <input type="text" />
      </form>
    </div>
  );
};

export default SideProfile;
