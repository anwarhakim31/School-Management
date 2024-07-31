import { toast } from "sonner";

const responseError = (error) => {
  const errorMessage = error.response?.data?.message || error.message;
  toast.error(errorMessage);
};

export default responseError;
