<div align="center">
  <h1>Web Dev</h1>
  <p>School Management System!</p>
</div>

![School Management System (1)](https://github.com/user-attachments/assets/d955ad55-bdfa-435d-b73e-90549ab0a4de)

## About

Scholarchy website is an innovative online platform designed to enhance the educational experience by simplifying access to educational resources and administrative services. It empowers administrators to efficiently manage school data, including a feature that allows bulk student data entry via Excel. The platform streamlines daily attendance tracking, automatically compiling the data into comprehensive records, which in turn simplifies report card creation. Additionally, it provides students with easy access to their exam scores and the ability to print their report cards. Scholarchy is the perfect solution for managing a school system effectively.

## Account

- siswa

~ nis : 20240031

~ password : 2000-05-31

## Features

- Admin

1. Mengelola Data Siswa, Guru, Kelas, Mata Pelajaran, Kelas, dan Jadwal
2. Cetak Rekap Nilai dan Absen
3. Upload dengan Excel serta export ke excel dan print

- Guru

1. Mengelola Data Nilai Pertemuan
2. Cetak Rekap nilai pertemuan <br/>
   ~ Extra fitur Guru sebagai wali kelas ~ <br/>
3. Mengelola data Siswa, Absen Harian, dan Nilai Ujian
4. Cetak Rekap Nilai Ujian dan Absensi
5. Cetak Rapor

- Siswa

1. Cetak Rapor

## Screenshots

- Admin

|                                                                                                        |                                                                                                         |
| :----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
|  ![dashboard-admin](https://github.com/user-attachments/assets/03a5f838-8cdb-4937-9868-f7757d4f06be)   |     ![data-siswa](https://github.com/user-attachments/assets/6b3cd176-06b1-42a5-b776-1a5bea549ae0)      |
| ![tambah siswa excel](https://github.com/user-attachments/assets/3aa7518e-9900-4a40-99d8-0f2399eb12cc) | ![tambah siswa manual](https://github.com/user-attachments/assets/d20128d5-b930-4f3a-bbc8-fec5a813f747) |
|     ![data-guru](https://github.com/user-attachments/assets/e2d7b0a7-b8a9-4283-a7d5-2b601de6a05d)      |     ![tambah-guru](https://github.com/user-attachments/assets/6f3cc7c7-0e4a-4729-ab18-18e59c27cdde)     |
|    ![data-jadwal](https://github.com/user-attachments/assets/ed986b8b-1a69-41d5-a4f6-a9b7ba8ff41f)     |     ![tambah-guru](https://github.com/user-attachments/assets/6f3cc7c7-0e4a-4729-ab18-18e59c27cdde)     |

- Guru

|                                                                                                                                   |                                                                                                                                  |
| :-------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------: |
| ![Macbook-Air-scholarchy-school vercel app (1)](https://github.com/user-attachments/assets/415b6641-289f-434d-be2f-f680de3df46d)  | ![Macbook-Air-scholarchy-school vercel app (1)](https://github.com/user-attachments/assets/e702c964-8d1b-4c16-b789-ef1a7cc01181) |
| ![Macbook-Air-scholarchy-school vercel app (2)](https://github.com/user-attachments/assets/80bc9c06-f4b2-440b-ac16-96759838441a)  | ![Macbook-Air-scholarchy-school vercel app (3)](https://github.com/user-attachments/assets/b4eee000-c65c-4ad2-9d8d-6723002c2a12) |
| ![Macbook-Air-scholarchy-school vercel app (4)](https://github.com/user-attachments/assets/6d8b3cd0-c070-409e-96c0-9fe7fddffcba)  | ![Macbook-Air-scholarchy-school vercel app (5)](https://github.com/user-attachments/assets/a9269178-8c9c-420c-a1c6-a8ea8ceebea4) |
| ![Macbook-Air-scholarchy-school vercel app (10)](https://github.com/user-attachments/assets/6edda21f-fc48-49e2-a6ea-e48e8366ac19) | ![Macbook-Air-scholarchy-school vercel app (7)](https://github.com/user-attachments/assets/637f3e2d-b193-4668-9fd3-5a9643e7259f) |
| ![Macbook-Air-scholarchy-school vercel app (8)](https://github.com/user-attachments/assets/0091974e-d3a8-4bcf-ae32-e28c38a24305)  |         ![Screenshot 2024-09-09 225018](https://github.com/user-attachments/assets/016101ca-e9a2-4f3d-8ec4-626f70a1ddf3)         |
|         ![Screenshot 2024-09-09 225045](https://github.com/user-attachments/assets/bc8eb5fd-3e69-4c66-b367-87a4672fd28d)          |

- Siswa

|                                                                                                                                   |                                                                                                                                   |
| :-------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------: |
| ![Macbook-Air-scholarchy-school vercel app (12)](https://github.com/user-attachments/assets/4837d621-9746-40b0-bc46-286146a8abea) | ![Macbook-Air-scholarchy-school vercel app (13)](https://github.com/user-attachments/assets/b747ac55-ba64-41a8-ab29-f66d13a50362) |
| ![Macbook-Air-scholarchy-school vercel app (14)](https://github.com/user-attachments/assets/eb7bf63a-34de-4564-abc7-408e5156a656) |

## The dependencies that this project uses:

_Frontend_

-vite For building and bundling the application

-react-router-dom: For routing

-tailwind: for stayling

-React Hook Form : For Form validation

-axios: For making HTTP requests

-rechart js: For making chart

-Redux Toolkit : For State management feature

-cookie : For authentication

-Sonner : For toast notification

_Backend_

-express: For creating the server

-mongoose: For interacting with MongoDB

-cors: For handling Cross-Origin Resource Sharing

-dotenv: For managing environment variables

-bcryptjs: For hashing passwords

-jsonwebtoken: For authentication

-nodemon: For automatic server restarts during development

-multer: for upload and donwload file

-aws: for upload and download image

## Getting Started

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js: [Download and install Node.js](https://nodejs.org/)
- npm: Node.js package manager (comes with Node.js installation)

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/anwarhakim31/School-Management.git
   ```

2. Navigate to front project directory:

   ```bash
   cd School-Management
   ```

3. Navigate to backend directory and install depedencies

   ```bash
   cd backend
   npm install
   ```

4. Navigate to frontend directory and install depedencies

   ```bash
   cd ..
   cd frontend
   npm install
   ```

## Setup Environment

1. Create a .env file in the root backend of your project.

   PORT=

   JWT_KEY=

   ORIGIN="http://localhost:5173"

   DATABASE_URL=

   AWS_ACCESS_KEY_ID=

   AWS_SECRET_ACCESS_KEY=

   AWS_REGION=

   AWS_S3_BUCKET=

2. Create a .env file in the root frontend of your project.

   VITE_SERVER_URL = "http://localhost:8080"

## Development

1. To start the server, run:

   ```bash
   npm run dev
   ```

2. To start the frontend, run :

   ```bash
   npm run dev
   ```

## Deployment

Deploy the `dist` directory to your hosting platform of choice.
