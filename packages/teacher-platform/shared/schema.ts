import { pgTable, text, serial, integer, boolean, timestamp, date, jsonb, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").default("teacher"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true,
  createdAt: true 
});

// Student schema
export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email"),
  level: text("level").notNull(),
  unitId: text("unit_id").notNull(),
  nativeLanguage: text("native_language"),
  guardianName: text("guardian_name"),
  guardianContact: text("guardian_contact"),
  attendanceRate: integer("attendance_rate"),
  performanceLevel: text("performance_level"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true
});

// Lesson schema
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  description: text("description"),
  classId: text("class_id").notNull(),
  date: date("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  location: text("location"),
  status: text("status").default("upcoming"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Curriculum schema
export const curriculum = pgTable("curriculum", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  level: text("level").notNull(),
  description: text("description"),
  objectives: text("objectives"),
  units: jsonb("units"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertCurriculumSchema = createInsertSchema(curriculum).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// Events schema
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: date("date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  location: text("location"),
  type: text("type").default("class"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEventSchema = createInsertSchema(events).omit({
  id: true,
  createdAt: true
});

// Messages schema
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  senderId: integer("sender_id").notNull(),
  receiverId: integer("receiver_id").notNull(),
  content: text("content").notNull(),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  createdAt: true
});

// Announcements schema
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  priority: text("priority").default("normal"),
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").notNull(),
});

export const insertAnnouncementSchema = createInsertSchema(announcements).omit({
  id: true,
  createdAt: true
});

// Tasks schema
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false),
  dueDate: date("due_date"),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertTaskSchema = createInsertSchema(tasks).omit({
  id: true,
  createdAt: true
});

// Materials schema
export const materials = pgTable("materials", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  category: text("category").notNull(),
  url: text("url").notNull(),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMaterialSchema = createInsertSchema(materials).omit({
  id: true,
  createdAt: true
});

// Bookmarks schema
export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  url: text("url").notNull(),
  category: text("category"),
  userId: integer("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertBookmarkSchema = createInsertSchema(bookmarks).omit({
  id: true,
  createdAt: true
});

// Lesson Materials schema (junction table)
export const lessonMaterials = pgTable("lesson_materials", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  materialId: integer("material_id").notNull().references(() => materials.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertLessonMaterialSchema = createInsertSchema(lessonMaterials).omit({
  id: true,
  createdAt: true
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  messages: many(messages, { relationName: "userMessages" }),
  tasks: many(tasks),
  bookmarks: many(bookmarks),
  announcements: many(announcements, { relationName: "userAnnouncements" }),
  materials: many(materials, { relationName: "userMaterials" }),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
    relationName: "userMessages"
  }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id]
  })
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id]
  })
}));

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, {
    fields: [bookmarks.userId],
    references: [users.id]
  })
}));

export const announcementsRelations = relations(announcements, ({ one }) => ({
  creator: one(users, {
    fields: [announcements.createdBy],
    references: [users.id],
    relationName: "userAnnouncements"
  })
}));

export const materialsRelations = relations(materials, ({ one, many }) => ({
  creator: one(users, {
    fields: [materials.createdBy],
    references: [users.id],
    relationName: "userMaterials"
  }),
  lessons: many(lessonMaterials)
}));

export const lessonsRelations = relations(lessons, ({ many }) => ({
  materials: many(lessonMaterials)
}));

export const lessonMaterialsRelations = relations(lessonMaterials, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonMaterials.lessonId],
    references: [lessons.id]
  }),
  material: one(materials, {
    fields: [lessonMaterials.materialId],
    references: [materials.id]
  })
}));

// Type Exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;

export type Curriculum = typeof curriculum.$inferSelect;
export type InsertCurriculum = z.infer<typeof insertCurriculumSchema>;

export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

export type Announcement = typeof announcements.$inferSelect;
export type InsertAnnouncement = z.infer<typeof insertAnnouncementSchema>;

export type Task = typeof tasks.$inferSelect;
export type InsertTask = z.infer<typeof insertTaskSchema>;

export type Material = typeof materials.$inferSelect;
export type InsertMaterial = z.infer<typeof insertMaterialSchema>;

export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;

export type LessonMaterial = typeof lessonMaterials.$inferSelect;
export type InsertLessonMaterial = z.infer<typeof insertLessonMaterialSchema>;
