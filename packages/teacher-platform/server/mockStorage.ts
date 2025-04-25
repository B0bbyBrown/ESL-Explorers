import { mockData } from "./mockData";
import { z } from "zod";
import {
  insertStudentSchema,
  insertLessonSchema,
  insertCurriculumSchema,
  insertEventSchema,
  insertMessageSchema,
  insertAnnouncementSchema,
  insertTaskSchema,
  insertMaterialSchema,
  insertBookmarkSchema,
} from "@shared/schema";

class MockStorage {
  private data = { ...mockData };

  // Students
  async getStudents() {
    return this.data.students;
  }

  async getStudent(id: number) {
    return this.data.students.find((s) => s.id === id);
  }

  async createStudent(data: z.infer<typeof insertStudentSchema>) {
    const newStudent = {
      id: this.data.students.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.students.push(newStudent);
    return newStudent;
  }

  // Lessons
  async getLessons() {
    return this.data.lessons;
  }

  async getLesson(id: number) {
    return this.data.lessons.find((l) => l.id === id);
  }

  async createLesson(data: z.infer<typeof insertLessonSchema>) {
    const newLesson = {
      id: this.data.lessons.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.lessons.push(newLesson);
    return newLesson;
  }

  // Curriculum
  async getCurriculum() {
    return this.data.curriculum;
  }

  async getCurriculumItem(id: number) {
    return this.data.curriculum.find((c) => c.id === id);
  }

  async createCurriculumItem(data: z.infer<typeof insertCurriculumSchema>) {
    const newItem = {
      id: this.data.curriculum.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.curriculum.push(newItem);
    return newItem;
  }

  // Events
  async getEvents() {
    return this.data.events;
  }

  async getEvent(id: number) {
    return this.data.events.find((e) => e.id === id);
  }

  async createEvent(data: z.infer<typeof insertEventSchema>) {
    const newEvent = {
      id: this.data.events.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.events.push(newEvent);
    return newEvent;
  }

  // Messages
  async getMessages() {
    return this.data.messages;
  }

  async getMessage(id: number) {
    return this.data.messages.find((m) => m.id === id);
  }

  async createMessage(data: z.infer<typeof insertMessageSchema>) {
    const newMessage = {
      id: this.data.messages.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.messages.push(newMessage);
    return newMessage;
  }

  // Announcements
  async getAnnouncements() {
    return this.data.announcements;
  }

  async getAnnouncement(id: number) {
    return this.data.announcements.find((a) => a.id === id);
  }

  async createAnnouncement(data: z.infer<typeof insertAnnouncementSchema>) {
    const newAnnouncement = {
      id: this.data.announcements.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.announcements.push(newAnnouncement);
    return newAnnouncement;
  }

  // Tasks
  async getTasks() {
    return this.data.tasks;
  }

  async getTask(id: number) {
    return this.data.tasks.find((t) => t.id === id);
  }

  async createTask(data: z.infer<typeof insertTaskSchema>) {
    const newTask = {
      id: this.data.tasks.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.tasks.push(newTask);
    return newTask;
  }

  // Materials
  async getMaterials() {
    return this.data.materials;
  }

  async getMaterial(id: number) {
    return this.data.materials.find((m) => m.id === id);
  }

  async createMaterial(data: z.infer<typeof insertMaterialSchema>) {
    const newMaterial = {
      id: this.data.materials.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.materials.push(newMaterial);
    return newMaterial;
  }

  // Bookmarks
  async getBookmarks() {
    return this.data.bookmarks;
  }

  async getBookmark(id: number) {
    return this.data.bookmarks.find((b) => b.id === id);
  }

  async createBookmark(data: z.infer<typeof insertBookmarkSchema>) {
    const newBookmark = {
      id: this.data.bookmarks.length + 1,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.data.bookmarks.push(newBookmark);
    return newBookmark;
  }
}

export const mockStorage = new MockStorage();
