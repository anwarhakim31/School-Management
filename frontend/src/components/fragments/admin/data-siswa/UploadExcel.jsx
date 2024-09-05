// import React, { useState } from "react";
// import axios from "axios";
// import { HOST } from "@/util/constant";

// const ExcelUpload = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage("Harap pilih file terlebih dahulu.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await axios.post(
//         HOST + "/api/siswa/upload-excel",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage("Terjadi kesalahan saat mengunggah file.");
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Unggah File Excel</h2>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Unggah</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ExcelUpload;
