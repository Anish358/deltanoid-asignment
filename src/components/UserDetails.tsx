import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { User } from "../types";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  UserCircle2,
  Mail,
  MapPin,
  GlobeIcon,
  CheckCircle,
} from "lucide-react";

const UserDetails: React.FC = () => {
  const userId: any = window.location.pathname.split("/")[2];
  const navigate = useNavigate();

  const { userData } = useSelector((state: RootState) => state.users);
  const { user } = useSelector((state: RootState) => state.login);

  const [User, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user.email) {
      navigate("/");
    }
    if (userData) {
      setUser(userData[userId - 1]);
    } else {
      navigate("/");
    }
  }, [user, userData]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md border-2 border-blue-100"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            Back to Dashboard
          </motion.button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <UserCircle2 size={100} className="text-blue-500 mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {User?.name}
          </h2>
          <p className="text-gray-500 text-sm">{User?.status} User</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <DetailRow
            icon={<Mail className="text-blue-500" />}
            label="Email"
            value={user?.email || "N/A"}
          />
          <DetailRow
            icon={<CheckCircle className="text-green-500" />}
            label="Age"
            value="22"
          />
          <DetailRow
            icon={<MapPin className="text-red-500" />}
            label="City"
            value="Paris"
          />
          <DetailRow
            icon={<GlobeIcon className="text-purple-500" />}
            label="Country"
            value="India"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

const DetailRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
}> = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4 bg-blue-50 p-3 rounded-lg">
    <div className="w-10 flex justify-center">{icon}</div>
    <div>
      <p className="text-sm text-gray-600 font-medium">{label}</p>
      <p className="text-gray-800 font-semibold">{value}</p>
    </div>
  </div>
);

export default UserDetails;
