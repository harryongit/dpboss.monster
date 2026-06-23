"use client";
import { Home } from "lucide-react";
import { useNavigate } from "@/lib/router-compat";
import { cn } from "@/lib/utils";

type Props = {
  to?: string;
  className?: string;
};

const HomeButton = ({ to = "/", className }: Props) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(to)}
      className={cn(
        "fixed bottom-5 right-4 z-50 p-3 rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-700",
        className
      )}
    >
      <Home size={18} />
    </button>
  );
};

export default HomeButton;
