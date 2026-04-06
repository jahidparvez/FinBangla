import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminCoursesList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get('http://localhost:3000/courses');
    setCourses(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await axios.delete(`http://localhost:3000/courses/${id}`);
      fetchCourses();
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">📘 All Courses</h2>
      <table className="w-full table-auto border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Level</th>
            <th className="p-2 border">Start Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id} className="text-center">
              <td className="p-2 border">{course.title}</td>
              <td className="p-2 border">{course.subject}</td>
              <td className="p-2 border">{course.level}</td>
              <td className="p-2 border">{course.startDate || 'N/A'}</td>
              <td className="p-2 border">
                <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(course.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCoursesList;
