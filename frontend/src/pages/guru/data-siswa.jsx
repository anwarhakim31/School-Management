import { selectedUserData } from "@/store/slices/auth-slice";
import { HOST } from "@/util/constant";
import responseError from "@/util/services";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DataKelasguruPage = () => {
  const userData = useSelector(selectedUserData);
  const [dataKelas, setDataKelas] = useState([]);

  console.log(userData);
  console.log(dataKelas);

  useEffect(() => {
    const getKelas = async () => {
      try {
        const res = await axios.get(
          HOST + "/api/kelas/get-wali-kelas/" + userData._id,
          { withCredentials: true }
        );

        setDataKelas(res.data.kelas);
      } catch (error) {
        responseError(error);
      }
    };

    getKelas();
  }, []);

  return <div>DataKelasguruPage</div>;
};

export default DataKelasguruPage;
