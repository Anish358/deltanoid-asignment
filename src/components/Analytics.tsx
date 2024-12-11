import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchAnalyticsData } from "../features/analytics/analyticsAction";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { getDailyData, getMonthlyData } from "../utils";
import { motion } from "framer-motion";
import {
  Calendar,
  Filter,
  Users,
  UserCheck,
  UserX,
  ChevronRight,
  List,
} from "lucide-react";
import ErrorModal from "../utils/ErrorModal";

const Analytics: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.login);

  const { data, status } = useSelector((state: RootState) => state.analytics);
  const { userData, count } = useSelector((state: RootState) => state.users);

  const [view, setView] = useState<"monthly" | "daily">("monthly");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filteredData, setFilteredData] = useState<
    {
      date: string;
      registrations: number;
      month?: string;
      totalRegistrations?: number;
    }[]
  >([]);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const COLORS = ["#6A5ACD", "#20B2AA", "#FF6347", "#4682B4"];

  useEffect(() => {
    if (!user.email) {
      navigate("/");
    }
    if (status === "idle") {
      dispatch(fetchAnalyticsData());
    }
  }, [dispatch, status, user.email, navigate]);

  // Initial data loading and setting monthly view
  useEffect(() => {
    if (data?.trendData) {
      const monthlyData = getMonthlyData(data.trendData);
      setFilteredData(monthlyData);
    }
  }, [data]);

  // Function
  const filterData = (type: string) => {
    if (type === "monthly") {
      const monthlyData = getMonthlyData(data?.trendData);
      setFilteredData(monthlyData);
      setView("monthly");
      return monthlyData;
    }
    if (type === "daily") {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      if (!dateRange.start || !dateRange.end || startDate > endDate) {
        setErrorMessage("Invalid date range. Please select a valid range.");
        return;
      }
      const dailyData = getDailyData(data?.trendData, startDate, endDate);
      setFilteredData(dailyData);
      setView("daily");
      return dailyData;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center">
            <Users className="mr-4 text-blue-600" size={36} />
            Analytics Dashboard
          </h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="flex items-center text-blue-600 hover:text-blue-800 transition"
          >
            Dashboard <ChevronRight className="ml-2" />
          </motion.button>
        </div>

        {/* Filtering Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-5 gap-4 mb-8"
        >
          <div>
            <label className="flex items-center text-gray-700 mb-2">
              <Calendar className="mr-2 text-blue-500" size={20} />
              Start Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={dateRange.start}
              onChange={(e) =>
                setDateRange({ ...dateRange, start: e.target.value })
              }
            />
          </div>
          <div>
            <label className="flex items-center text-gray-700 mb-2">
              <Calendar className="mr-2 text-blue-500" size={20} />
              End Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={dateRange.end}
              onChange={(e) =>
                setDateRange({ ...dateRange, end: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => filterData("daily")}
              className="flex items-center justify-center bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
            >
              <Filter className="mr-2" /> Apply Daily Filter
            </motion.button>
          </div>
          <div className="flex flex-col justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => filterData("monthly")}
              className="flex items-center justify-center bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
            >
              <List className="mr-2" /> Monthly View
            </motion.button>
          </div>
        </motion.div>

        {/* User Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <Users className="text-blue-600" size={36} />,
              title: "Total Users",
              value: userData?.length,
            },
            {
              icon: <UserCheck className="text-green-600" size={36} />,
              title: "Active Users",
              value: userData?.filter(
                (u) => u.status.toLowerCase() === "active"
              ).length,
            },
            {
              icon: <UserX className="text-red-600" size={36} />,
              title: "Deleted Users",
              value: userData ? count - userData?.length : 0,
            },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.2 }}
              className="bg-white border border-gray-100 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{card.icon}</div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                {card.title}
              </h3>
              <p className="text-3xl font-bold text-gray-800">{card.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              User Registration Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <XAxis dataKey={view === "monthly" ? "month" : "date"} />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={
                    view === "monthly" ? "totalRegistrations" : "registrations"
                  }
                  stroke="#6A5ACD"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white border border-gray-100 rounded-xl p-6 shadow-md"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Active vs Inactive Users
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Active",
                      value: userData?.filter(
                        (u) => u.status.toLowerCase() === "active"
                      ).length,
                    },
                    {
                      name: "Inactive",
                      value: userData?.filter(
                        (u) => u.status.toLowerCase() === "inactive"
                      ).length,
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                >
                  {[COLORS[0], COLORS[1]].map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Regions Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white border border-gray-100 rounded-xl p-6 shadow-md"
        >
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Users by Region
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data?.regionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Error Modal */}
      <ErrorModal
        message={errorMessage || ""}
        isVisible={!!errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};

export default Analytics;
