import React from "react";

// User/Admin Types
export interface Admin {
  _id: string;
  profileImage: string;
  name: string;
  username: string;
  password?: string;
  createdAt: string;
  updatedAt: string;
}

// Family Types
export interface Child {
  _id?: string;
  name: string;
  dateOfBirth: string;
  description: string;
}

export interface Family {
  _id: string;
  fatherStatus: "Alive" | "Deceased" | "Disabled" | "Unknown";
  motherStatus: "Alive" | "Deceased" | "Disabled" | "Unknown";
  guardian: string;
  totalChildren: number;
  city: string;
  children: Child[];
  note: string;
  createdAt: string;
  updatedAt: string;
}

export interface FamilyFormData {
  fatherStatus: "Alive" | "Deceased" | "Disabled" | "Unknown";
  motherStatus: "Alive" | "Deceased" | "Disabled" | "Unknown";
  guardian: string;
  totalChildren: number;
  city: string;
  children: Child[];
  note: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  familyCount: number;
  totalChildren: number;
}

// Common Types
export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

// Form Types
export interface AdminFormData {
  profileImage: string;
  name: string;
  username: string;
  password?: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ApiError {
  message: string;
  status: number;
}

// Modal Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
  isFullscreen?: boolean;
}

// Table Props
export interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  isHeader?: boolean;
  colSpan?: number;
}

// Component Props
export interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "error" | "warning" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

// Navigation Types
export interface NavItem {
  icon: React.ReactNode;
  name: string;
  path: string;
}

// Form Input Types
export interface SelectOption {
  value: string;
  label: string;
}

export interface MultiSelectOption {
  value: string;
  text: string;
  selected: boolean;
}

// Photo Uploader Types
export interface PhotosUploaderProps {
  addedPhotos: string[];
  maxPhotos: number;
  onChange: (photos: string[]) => void;
}

// Authentication Types
export interface AuthState {
  token: string | null;
  admin: Admin | null;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  admin: Admin;
  token: string;
}
