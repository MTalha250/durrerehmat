"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  size?: "default" | "lg" | "xl";
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  icon,
  size = "default",
}: ModalProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      // Small delay to trigger animation
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "unset";
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  const sizeClasses = {
    default: "max-w-2xl",
    lg: "max-w-3xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with fade animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Content with scale and fade animation */}
      <div
        className={`relative z-10 w-full ${sizeClasses[size]} transform transition-all duration-300 ease-out ${
          isAnimating
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-95 opacity-0"
        }`}
      >
        <div className="max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Decorative gradient top border */}
          <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-primary" />

          {/* Header */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white px-6 py-5">
            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5" />
            <div className="absolute -right-5 top-5 h-16 w-16 rounded-full bg-secondary/5" />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                {icon && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white shadow-lg shadow-primary/30">
                    {icon}
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-800 md:text-2xl">
                    {title}
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="group relative rounded-xl p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5 transition-transform group-hover:rotate-90" />
              </button>
            </div>
          </div>

          {/* Body with scroll */}
          <div className="max-h-[calc(90vh-100px)] overflow-y-auto px-6 py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
