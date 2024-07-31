import { selectedUserData } from "@/store/slices/auth-slice";
import { User } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const SideProfile = () => {
  const data = useSelector(selectedUserData);
  const [setHover, setIsHover] = useState(false);

  return (
    <div className="fixed p-4 rounded-md shadow-lg top-1/2 -translate-y-1/2 right-0 w-[204px] h-[60vh] bg-white">
      <caption className="relative cursor-pointer w-16 h-16 mx-auto bg-backup flex items-center justify-center rounded-full overflow-hidden">
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
        <div className="absolute inset-0 bg-black/20"></div>
        <input type="file" className="hidden" />
      </caption>
    </div>
  );
};

export default SideProfile;
