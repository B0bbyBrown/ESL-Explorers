export type UserPlatform = "student" | "teacher";

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export interface FormInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
}
