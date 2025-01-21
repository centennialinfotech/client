import React, { useState, useEffect } from "react";
import axios from "axios";
// import { set } from "mongoose";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [duplicates, setDuplicates] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://clientbackend-qmlk.onrender.com/api/data");
        setData(response.data);
        findDuplicates(response.data); // Call the function to find duplicates
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const findDuplicates = (data) => {
    const seen = new Map();
    const duplicates = [];

    data.forEach((item, index) => {
      if (seen.has(item.email)) {
        duplicates.push({
          value: item.email,
          firstRow: seen.get(item.email) + 1,
          duplicateRow: index + 1,
        });
      } else {
        seen.set(item.email, index);
      }
    });

    setDuplicates(duplicates);
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to fetch data: {error}
      </div>
    );
  }

  // const formatDate = (date) => {
  //   const d = new Date(date);
  //   const year = d.getFullYear().toString();
  //   const month = String(d.getMonth() + 1).padStart(2, "0");
  //   const day = String(d.getDate()).padStart(2, "0");
  //   return `${year}-${month}-${day}`;
  // };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleDelete = () => {
    selectedIds.forEach(async (id) => {
      axios.delete(`https://clientbackend-qmlk.onrender.com/api/data/${id}`).then(() => {
        setData((prev) => prev.filter((item) => item._id !== id));
      });
    });
    setSelectedIds([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-6">Uploaded Data</h1>

      {duplicates.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-red-500">
            Duplicate Entries Found:
          </h2>
          <ul className="list-disc pl-6">
            {duplicates.map((dup, index) => (
              <li key={index}>
                Duplicate email: <strong>{dup.value}</strong>, first seen in row{" "}
                {dup.firstRow}, duplicate in row {dup.duplicateRow}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="overflow-x-auto">
        <button
          className="bg-red-500 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleDelete}
          disabled={selectedIds.length === 0}
        >
          Delete Duplicates
        </button>
        <table className="min-w-full bg-white border border-gray-300 text-nowrap">
          <thead>
            <tr className="bg-gray-100 text-gray-800 border-b">
              <th className="text-left px-4 py-2">Select Duplicates</th>
              <th className="text-left px-4 py-2">Serial No.</th>
              <th className="text-left px-4 py-2">Full Name</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Phone</th>
              <th className="text-left px-4 py-2">Date Applied</th>
              <th className="text-left px-4 py-2">Job Board</th>
              <th className="text-left px-4 py-2">Hiring Company</th>
              <th className="text-left px-4 py-2">Job Title</th>
              <th className="text-left px-4 py-2">Job Posting Link</th>
              <th className="text-left px-4 py-2">Job Posting Screenshot</th>
              <th className="text-left px-4 py-2">Reviewed By</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr
                key={row._id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td>
                  <input
                    className="px-4 py-2 ml-6"
                    type="checkbox"
                    checked={selectedIds.includes(row._id)}
                    onChange={() => handleCheckboxChange(row._id)}
                  />
                </td>
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{row.fullName}</td>
                <td className="px-4 py-2">{row.email}</td>
                <td className="px-4 py-2">{row.phone}</td>
                <td className="px-4 py-2">{row.dateApplied.split("T")[0]}</td>
                <td className="px-4 py-2">{row.jobBoard}</td>
                <td className="px-4 py-2">{row.hiringCompany}</td>
                <td className="px-4 py-2">{row.jobTitle}</td>
                <td className="px-4 py-2">{row.jobPostingLink}</td>
                <td className="px-4 py-2">{row.jobPostingScreenshot}</td>
                <td className="px-4 py-2">{row.reviewedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
//.split("T")[0]
