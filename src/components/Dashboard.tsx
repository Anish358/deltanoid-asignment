import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchUsers } from "../features/users/userActions";
import { deleteUser } from "../features/users/userSlice";
import { Search, Trash2, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { userData, status } = useSelector((state: RootState) => state.users);
  const { user } = useSelector((state: RootState) => state.login);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingUserId, setDeletingUserId] = useState<number | null>(null);
  const usersPerPage = 10;

  useEffect(() => {
    if (!user.email) {
      navigate("/");
    }
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status, user.email, navigate]);

  const filteredUsers =
    userData?.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
    ) || [];

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleDelete = (id: number) => {
    setDeletingUserId(id);
    setTimeout(() => {
      dispatch(deleteUser(id));
      setDeletingUserId(null);
    }, 300);
  };

  const statusColorMap = {
    active: "bg-green-100 text-green-800",
    inactive: "bg-red-100 text-red-800",
    pending: "bg-yellow-100 text-yellow-800",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 max-w-5xl mx-auto bg-white shadow-xl rounded-2xl"
    >
      <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 tracking-wider">
        User Management
      </h2>

      {/* Search Input with Icon */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by name or email"
          className="w-full p-3 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* User Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <AnimatePresence>
            <tbody>
              {paginatedUsers?.map((user) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className={`hover:bg-gray-100 transition duration-200 ${
                    deletingUserId === user.id ? "opacity-50" : ""
                  }`}
                >
                  <td className="border-b px-4 py-3">{user.name}</td>
                  <td className="border-b px-4 py-3">{user.email}</td>
                  <td className="border-b px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        statusColorMap[
                          user.status as keyof typeof statusColorMap
                        ] || "text-gray-600 bg-gray-100"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="border-b px-4 py-3 text-center">
                    <div className="flex justify-center space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500 hover:text-red-700 transition"
                        onClick={() => handleDelete(user.id)}
                        aria-label="Delete User"
                      >
                        <Trash2 size={20} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-500 hover:text-blue-700 transition"
                        onClick={() => navigate(`/dashboard/${user.id}`)}
                        aria-label="View User Details"
                      >
                        <Eye size={20} />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </AnimatePresence>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center items-center space-x-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="text-gray-600" />
        </motion.button>

        {Array.from({ length: totalPages }, (_, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg transition duration-300 ${
              currentPage === index + 1
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </motion.button>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          className="p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight className="text-gray-600" />
        </motion.button>
      </div>

      {/* Analytics Button */}
      <div className="mt-6 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          onClick={() => navigate("/analytics")}
        >
          View Analytics Dashboard
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
