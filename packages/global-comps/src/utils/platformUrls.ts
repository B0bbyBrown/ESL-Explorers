export type Platform = "student" | "teacher" | "admin";

export const getPlatformUrl = (platform: Platform): string => {
  switch (platform) {
    case "student":
      return process.env.NEXT_PUBLIC_STUDENT_URL || "http://localhost:3001";
    case "teacher":
      return process.env.NEXT_PUBLIC_TEACHER_URL || "http://localhost:3002";
    case "admin":
      return process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3003";
    default:
      throw new Error(`Invalid platform: ${platform}`);
  }
};
