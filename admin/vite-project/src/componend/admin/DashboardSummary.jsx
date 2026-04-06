import React, { useEffect, useState } from "react";
import axios from "axios";
import { BookOpen, Video, FileText, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useSpring, useTransform } from "framer-motion";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FeatureCard = ({
  title,
  value,
  icon: Icon,
  link,
  gradientFrom,
  gradientTo,
}) => {
  const navigate = useNavigate();
  const scale = useSpring(1, { stiffness: 100, damping: 20 });
  const rotate = useTransform(scale, [1, 1.05], [0, 2]);

  const handleManageClick = () => {
    navigate(link);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ scale, rotate }}
      className={`relative p-6 rounded-3xl bg-gradient-to-br from-${gradientFrom}-100 to-${gradientTo}-100 shadow-xl border border-gray-600 dark:border-gray-700 transition-all duration-300 flex flex-col justify-between gap-4 hover:shadow-2xl backdrop-blur-lg cursor-pointer overflow-hidden`}
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2220%22 height=%2220%22 viewBox=%220 0 20 20%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath d=%22M0 0h1v1H0z%22 fill=%22rgba(255,255,255,0.1)%22/%3E%3C/svg%3E')] opacity-20" />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
        className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-${gradientFrom}-500 to-${gradientTo}-500 flex items-center justify-center shadow-lg`}
      >
        <Icon className="text-black" size={24} />
      </motion.div>
      <div className="relative z-10">
        <p className="text-sm uppercase tracking-wider text-gray-700 dark:text-gray-200 font-medium">
          {title}
        </p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mt-2"
        >
          {value}
        </motion.h2>
      </div>
      <motion.button
        whileHover={{ scale: 1.05, backgroundColor: `rgb(var(--${gradientTo}-600))` }}
        whileTap={{ scale: 0.95 }}
        onClick={handleManageClick}
        className={`relative z-10 mt-4 w-full bg-${gradientTo}-500 text-black text-sm font-semibold py-2.5 px-4 rounded-full transition-all duration-200 hover:bg-${gradientTo}-600 shadow-md`}
      >
        Manage
      </motion.button>
    </motion.div>
  );
};

const DashboardSummary = () => {
  const [stats, setStats] = useState({
    courses: 0,
    sessions: 0,
    blogs: 0,
    testimonials: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [courses, sessions, blogs, testimonials] = await Promise.all([
          axios.get("http://localhost:3000/courses"),
          axios.get("http://localhost:3000/upcomingSessions"),
          axios.get("http://localhost:3000/blogs"),
          axios.get("http://localhost:3000/testimonials"),
        ]);
        setStats({
          courses: courses.data.length,
          sessions: sessions.data.length,
          blogs: blogs.data.length,
          testimonials: testimonials.data.length,
        });
        setError(null);
      } catch (error) {
        setError("Failed to fetch dashboard data. Please try again later.");
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-4 text-gray-700">Loading dashboard data...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        {error} <button onClick={() => navigate("/")} className="ml-2 text-blue-500 underline">Go to Home</button>
      </div>
    );
  }

  const chartData = {
    labels: ['Total Courses', 'Live Sessions', 'Blog Posts', 'Testimonials'],
    datasets: [{
      label: 'Count',
      data: [stats.courses, stats.sessions, stats.blogs, stats.testimonials],
      backgroundColor: ['#3b82f6', '#f43f5e', '#22c55e', '#f59e0b'],
      borderColor: ['#1e40af', '#be123c', '#15803d', '#c084fc'],
      borderWidth: 1,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: 'Number of Items' } },
      x: { title: { display: true, text: 'Categories' } },
    },
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 to-blue-100 p-6 rounded-xl">
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <FeatureCard
          title="Total Courses"
          value={stats.courses}
          icon={BookOpen}
          link="/admin/courses"
          gradientFrom="blue"
          gradientTo="red"
        />
        <FeatureCard
          title="Live Sessions"
          value={stats.sessions}
          icon={Video}
          link="/admin/sessions"
          gradientFrom="pink"
          gradientTo="red"
        />
        <FeatureCard
          title="Blog Posts"
          value={stats.blogs}
          icon={FileText}
          link="/admin/blogs"
          gradientFrom="green"
          gradientTo="red"
        />
        <FeatureCard
          title="Testimonials"
          value={stats.testimonials}
          icon={MessageSquare}
          link="/admin/testimonials"
          gradientFrom="orange"
          gradientTo="red"
        />
      </div>
      <div className="w-full bg-white p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Statistics Overview</h2>
        <div className="w-full h-64">
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;

