"use client";
import { useEffect, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  threshold?: number;
  className?: string;
};

const ScrollToggleButton = ({ threshold = 150, className }: Props) => {
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowUp(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const onClick = () => {
    window.scrollTo({
      top: showUp ? 0 : document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed left-3 bottom-5 z-50 p-3 rounded-full bg-violet-600 text-white shadow-lg hover:bg-violet-700",
        className
      )}
    >
      {showUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
    </button>
  );
};

export default ScrollToggleButton;
