import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ErrorModalProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  message,
  isVisible,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-50 w-96"
        >
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-xl">
            <div className="flex items-center">
              <AlertTriangle className="text-red-500 mr-3" size={24} />
              <span className="text-red-800 font-semibold">{message}</span>
            </div>
            <div className="mt-2 flex justify-end">
              <button
                onClick={onClose}
                className="text-red-600 hover:bg-red-100 px-3 py-1 rounded-md transition"
              >
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
