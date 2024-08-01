import { ClipLoader } from "react-spinners";

const LoaderButton = () => {
  return (
    <span className="flex items-center justify-center gap-2">
      <ClipLoader size={20} color="#ffffff" /> Loading
    </span>
  );
};

export default LoaderButton;
