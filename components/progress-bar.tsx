import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0–100
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-800 rounded-2xl h-3 overflow-hidden shadow-sm">
      <motion.div
        className="h-full bg-gradient-to-r from-purple-400 to-blue-300"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ ease: "easeOut", duration: 0.3 }}
      />
    </div>
  );
}
