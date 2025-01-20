import React from "react";
import FileUpload from "./components/FileUpload";
import DataTable from "./components/DataTable";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center">
      <header className="w-full bg-blue-600 py-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold text-center">Excel Data Uploader</h1>
      </header>
      <main className="flex flex-col items-center justify-center py-12">
        <section className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 text-blue-700">
            Upload Your Excel Data with Ease!
          </h2>
          <p className="text-gray-600 text-lg">
            Transform your Excel data into actionable insights. Upload your file
            and let us do the rest.
          </p>
        </section>
        {<FileUpload />}
        <h2 className="text-4xl font-bold mb-4 text-blue-700">
          Uploaded EXL Data
        </h2>
        <DataTable />
      </main>
      <footer className="w-full bg-blue-600 py-4 text-white text-center">
        <p>&copy; 2025 ExcelUploader Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import axios from "axios";

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = async (e) => {
//     e.preventDefault();

//     if (!file) {
//       setMessage("Please select a file to upload!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       setIsLoading(true);
//       setMessage("");

//       const response = await axios.post(
//         "http://localhost:5000/upload",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage("Failed to upload the file. Please try again.");
//     } finally {
//       setIsLoading(false);
//       setFile(null);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <form
//         className="p-6 bg-white rounded shadow-md w-96"
//         onSubmit={handleFileUpload}
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Upload Excel File
//         </h2>

//         <input
//           type="file"
//           accept=".xlsx, .xls"
//           onChange={handleFileChange}
//           className="w-full p-2 mb-4 border border-gray-300 rounded"
//         />

//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
//         >
//           {isLoading ? "Uploading..." : "Upload File"}
//         </button>

//         {message && (
//           <p
//             className={`mt-4 text-center font-medium ${
//               message.includes("successfully")
//                 ? "text-green-600"
//                 : "text-red-600"
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default FileUpload;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const DataTable = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/data");
//         console.log(response.data);
//         setData(response.data);
//         setIsLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (isLoading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   if (error) {
//     return (
//       <div className="text-center mt-10 text-red-500">
//         Failed to fetch data: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold text-center mb-6">Uploaded Data</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100 text-gray-800 border-b">
//               <th className="text-left px-4 py-2">Full Name</th>
//               <th className="text-left px-4 py-2">Email</th>
//               <th className="text-left px-4 py-2">Phone</th>
//               <th className="text-left px-4 py-2">Date Applied</th>
//               <th className="text-left px-4 py-2">Job Board</th>
//               <th className="text-left px-4 py-2">Job Title</th>
//               <th className="text-left px-4 py-2">Status</th>
//               <th className="text-left px-4 py-2">Joining Date</th>
//               <th className="text-left px-4 py-2">Duration</th>
//               <th className="text-left px-4 py-2">Internship Type</th>
//               <th className="text-left px-4 py-2">Timing</th>
//               <th className="text-left px-4 py-2">Offer Letter Sent</th>
//               <th className="text-left px-4 py-2">Accepted Offer Letter</th>
//               <th className="text-left px-4 py-2">Candidates Enrolled</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((row, index) => (
//               <tr
//                 key={index}
//                 className={`border-b ${
//                   index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 }`}
//               >
//                 <td className="px-4 py-2">{row.fullName}</td>
//                 <td className="px-4 py-2">{row.email}</td>
//                 <td className="px-4 py-2">{row.phone}</td>
//                 <td className="px-4 py-2">{row.dateApplied}</td>
//                 <td className="px-4 py-2">{row.jobBoard}</td>
//                 <td className="px-4 py-2">{row.jobTitle}</td>
//                 <td className="px-4 py-2">{row.status}</td>
//                 <td className="px-4 py-2">{row.joiningDate}</td>
//                 <td className="px-4 py-2">{row.duration}</td>
//                 <td className="px-4 py-2">{row.internshipType}</td>
//                 <td className="px-4 py-2">{row.timing}</td>
//                 <td className="px-4 py-2">{row.offerLetterSent}</td>
//                 <td className="px-4 py-2">{row.acceptedOfferLetter}</td>
//                 <td className="px-4 py-2">{row.candidatesEnrolled}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DataTable;

// import React from "react";
// import FileUpload from "./component/FileUpload";
// import DataTable from "./component/DataTable";

// const App = () => {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center">
//       <header className="w-full bg-blue-600 py-6 text-white shadow-lg">
//         <h1 className="text-3xl font-bold text-center">Excel Data Uploader</h1>
//       </header>
//       <main className="flex flex-col items-center justify-center py-12">
//         <section className="text-center mb-8">
//           <h2 className="text-4xl font-bold mb-4 text-blue-700">
//             Upload Your Excel Data with Ease!
//           </h2>
//           <p className="text-gray-600 text-lg">
//             Transform your Excel data into actionable insights. Upload your file
//             and let us do the rest.
//           </p>
//         </section>
//         <FileUpload />
//         <h2 className="text-4xl font-bold mb-4 text-blue-700">
//           Uploaded EXL Data
//         </h2>
//         <DataTable />
//       </main>
//       <footer className="w-full bg-blue-600 py-4 text-white text-center">
//         <p>&copy; 2025 ExcelUploader Inc. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default App;
