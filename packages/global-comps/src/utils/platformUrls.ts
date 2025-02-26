export type Platform = "student" | "teacher" | "admin";

export const getPlatformUrl = (platform: Platform): string => {
  const platformUrls = {
    student:
      process.env.NEXT_PUBLIC_STUDENT_PLATFORM_URL || "http://localhost:3001",
    teacher:
      process.env.NEXT_PUBLIC_TEACHER_PLATFORM_URL || "http://localhost:3002",
    admin:
      process.env.NEXT_PUBLIC_ADMIN_PLATFORM_URL || "http://localhost:3003",
  };

  return platformUrls[platform];
};

export const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_MAIN_SITE_URL || "http://localhost:3000";
