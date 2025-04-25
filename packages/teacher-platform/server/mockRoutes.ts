import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { mockStorage } from "./mockStorage";
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

export async function registerMockRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();
  const server = createServer(app);

  // Students API
  apiRouter.get("/students", async (_req, res) => {
    const students = await mockStorage.getStudents();
    res.json(students);
  });

  apiRouter.get("/students/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await mockStorage.getStudent(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  });

  apiRouter.post("/students", async (req, res) => {
    try {
      const validatedData = insertStudentSchema.parse(req.body);
      const student = await mockStorage.createStudent(validatedData);
      res.status(201).json(student);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid student data", errors: error.errors });
      }
      throw error;
    }
  });

  // Lessons API
  apiRouter.get("/lessons", async (_req, res) => {
    const lessons = await mockStorage.getLessons();
    res.json(lessons);
  });

  apiRouter.get("/lessons/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid lesson ID" });
    }

    const lesson = await mockStorage.getLesson(id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.json(lesson);
  });

  apiRouter.post("/lessons", async (req, res) => {
    try {
      const validatedData = insertLessonSchema.parse(req.body);
      const lesson = await mockStorage.createLesson(validatedData);
      res.status(201).json(lesson);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid lesson data", errors: error.errors });
      }
      throw error;
    }
  });

  // Curriculum API
  apiRouter.get("/curriculum", async (_req, res) => {
    const curriculum = await mockStorage.getCurriculum();
    res.json(curriculum);
  });

  apiRouter.get("/curriculum/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid curriculum ID" });
    }

    const item = await mockStorage.getCurriculumItem(id);
    if (!item) {
      return res.status(404).json({ message: "Curriculum item not found" });
    }

    res.json(item);
  });

  apiRouter.post("/curriculum", async (req, res) => {
    try {
      const validatedData = insertCurriculumSchema.parse(req.body);
      const item = await mockStorage.createCurriculumItem(validatedData);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid curriculum data", errors: error.errors });
      }
      throw error;
    }
  });

  // Events API
  apiRouter.get("/events", async (_req, res) => {
    const events = await mockStorage.getEvents();
    res.json(events);
  });

  apiRouter.get("/events/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const event = await mockStorage.getEvent(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  });

  apiRouter.post("/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await mockStorage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid event data", errors: error.errors });
      }
      throw error;
    }
  });

  // Messages API
  apiRouter.get("/messages", async (_req, res) => {
    const messages = await mockStorage.getMessages();
    res.json(messages);
  });

  apiRouter.get("/messages/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }

    const message = await mockStorage.getMessage(id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json(message);
  });

  apiRouter.post("/messages", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await mockStorage.createMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid message data", errors: error.errors });
      }
      throw error;
    }
  });

  // Announcements API
  apiRouter.get("/announcements", async (_req, res) => {
    const announcements = await mockStorage.getAnnouncements();
    res.json(announcements);
  });

  apiRouter.get("/announcements/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid announcement ID" });
    }

    const announcement = await mockStorage.getAnnouncement(id);
    if (!announcement) {
      return res.status(404).json({ message: "Announcement not found" });
    }

    res.json(announcement);
  });

  apiRouter.post("/announcements", async (req, res) => {
    try {
      const validatedData = insertAnnouncementSchema.parse(req.body);
      const announcement = await mockStorage.createAnnouncement(validatedData);
      res.status(201).json(announcement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid announcement data", errors: error.errors });
      }
      throw error;
    }
  });

  // Tasks API
  apiRouter.get("/tasks", async (_req, res) => {
    const tasks = await mockStorage.getTasks();
    res.json(tasks);
  });

  apiRouter.get("/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }

    const task = await mockStorage.getTask(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  });

  apiRouter.post("/tasks", async (req, res) => {
    try {
      const validatedData = insertTaskSchema.parse(req.body);
      const task = await mockStorage.createTask(validatedData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid task data", errors: error.errors });
      }
      throw error;
    }
  });

  // Materials API
  apiRouter.get("/materials", async (_req, res) => {
    const materials = await mockStorage.getMaterials();
    res.json(materials);
  });

  apiRouter.get("/materials/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid material ID" });
    }

    const material = await mockStorage.getMaterial(id);
    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    res.json(material);
  });

  apiRouter.post("/materials", async (req, res) => {
    try {
      const validatedData = insertMaterialSchema.parse(req.body);
      const material = await mockStorage.createMaterial(validatedData);
      res.status(201).json(material);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid material data", errors: error.errors });
      }
      throw error;
    }
  });

  // Bookmarks API
  apiRouter.get("/bookmarks", async (_req, res) => {
    const bookmarks = await mockStorage.getBookmarks();
    res.json(bookmarks);
  });

  apiRouter.get("/bookmarks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid bookmark ID" });
    }

    const bookmark = await mockStorage.getBookmark(id);
    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.json(bookmark);
  });

  apiRouter.post("/bookmarks", async (req, res) => {
    try {
      const validatedData = insertBookmarkSchema.parse(req.body);
      const bookmark = await mockStorage.createBookmark(validatedData);
      res.status(201).json(bookmark);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid bookmark data", errors: error.errors });
      }
      throw error;
    }
  });

  app.use("/api", apiRouter);
  return server;
}
