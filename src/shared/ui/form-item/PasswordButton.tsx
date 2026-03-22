"use client";

import { Eye, EyeOff } from "lucide-react";

interface IProps {
  showPassword: boolean;
  onClick: () => void;
}
const PasswordButton = ({ showPassword, onClick }: IProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  );
};

export default PasswordButton;
