import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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
  insertLessonMaterialSchema
} from "@shared/schema";
import { externalApiRouter } from "./api";

export async function registerRoutes(app: Express): Promise<Server> {
  const apiRouter = express.Router();
  
  // Students API
  apiRouter.get("/students", async (req, res) => {
    const students = await storage.getStudents();
    res.json(students);
  });
  
  apiRouter.get("/students/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    
    const student = await storage.getStudent(id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    res.json(student);
  });
  
  apiRouter.post("/students", async (req, res) => {
    try {
      const validatedData = insertStudentSchema.parse(req.body);
      const student = await storage.createStudent(validatedData);
      res.status(201).json(student);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid student data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create student" });
    }
  });
  
  apiRouter.put("/students/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    
    try {
      const validatedData = insertStudentSchema.partial().parse(req.body);
      const updatedStudent = await storage.updateStudent(id, validatedData);
      
      if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
      }
      
      res.json(updatedStudent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid student data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update student" });
    }
  });
  
  apiRouter.delete("/students/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }
    
    const deleted = await storage.deleteStudent(id);
    if (!deleted) {
      return res.status(404).json({ message: "Student not found" });
    }
    
    res.status(204).end();
  });
  
  // Lessons API
  apiRouter.get("/lessons", async (req, res) => {
    const lessons = await storage.getLessons();
    res.json(lessons);
  });
  
  apiRouter.get("/lessons/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid lesson ID" });
    }
    
    const lesson = await storage.getLesson(id);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    
    res.json(lesson);
  });
  
  apiRouter.post("/lessons", async (req, res) => {
    try {
      const validatedData = insertLessonSchema.parse(req.body);
      const lesson = await storage.createLesson(validatedData);
      res.status(201).json(lesson);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lesson data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create lesson" });
    }
  });
  
  apiRouter.put("/lessons/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid lesson ID" });
    }
    
    try {
      const validatedData = insertLessonSchema.partial().parse(req.body);
      const updatedLesson = await storage.updateLesson(id, validatedData);
      
      if (!updatedLesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      
      res.json(updatedLesson);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lesson data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update lesson" });
    }
  });
  
  apiRouter.delete("/lessons/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid lesson ID" });
    }
    
    const deleted = await storage.deleteLesson(id);
    if (!deleted) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    
    res.status(204).end();
  });
  
  // Curriculum API
  apiRouter.get("/curriculum", async (req, res) => {
    const curriculum = await storage.getCurriculumItems();
    res.json(curriculum);
  });
  
  apiRouter.get("/curriculum/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid curriculum ID" });
    }
    
    const curriculumItem = await storage.getCurriculumItem(id);
    if (!curriculumItem) {
      return res.status(404).json({ message: "Curriculum item not found" });
    }
    
    res.json(curriculumItem);
  });
  
  apiRouter.post("/curriculum", async (req, res) => {
    try {
      const validatedData = insertCurriculumSchema.parse(req.body);
      const curriculumItem = await storage.createCurriculumItem(validatedData);
      res.status(201).json(curriculumItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid curriculum data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create curriculum item" });
    }
  });
  
  apiRouter.put("/curriculum/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid curriculum ID" });
    }
    
    try {
      const validatedData = insertCurriculumSchema.partial().parse(req.body);
      const updatedItem = await storage.updateCurriculumItem(id, validatedData);
      
      if (!updatedItem) {
        return res.status(404).json({ message: "Curriculum item not found" });
      }
      
      res.json(updatedItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid curriculum data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update curriculum item" });
    }
  });
  
  apiRouter.delete("/curriculum/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid curriculum ID" });
    }
    
    const deleted = await storage.deleteCurriculumItem(id);
    if (!deleted) {
      return res.status(404).json({ message: "Curriculum item not found" });
    }
    
    res.status(204).end();
  });
  
  // Events API
  apiRouter.get("/events", async (req, res) => {
    const events = await storage.getEvents();
    res.json(events);
  });
  
  apiRouter.post("/events", async (req, res) => {
    try {
      const validatedData = insertEventSchema.parse(req.body);
      const event = await storage.createEvent(validatedData);
      res.status(201).json(event);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid event data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create event" });
    }
  });
  
  // Messages API
  apiRouter.get("/messages/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const messages = await storage.getMessages(userId);
    res.json(messages);
  });
  
  apiRouter.post("/messages", async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create message" });
    }
  });
  
  apiRouter.patch("/messages/:id/read", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid message ID" });
    }
    
    const updatedMessage = await storage.markMessageAsRead(id);
    if (!updatedMessage) {
      return res.status(404).json({ message: "Message not found" });
    }
    
    res.json(updatedMessage);
  });
  
  // Announcements API
  apiRouter.get("/announcements", async (req, res) => {
    const announcements = await storage.getAnnouncements();
    res.json(announcements);
  });
  
  apiRouter.post("/announcements", async (req, res) => {
    try {
      const validatedData = insertAnnouncementSchema.parse(req.body);
      const announcement = await storage.createAnnouncement(validatedData);
      res.status(201).json(announcement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid announcement data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create announcement" });
    }
  });
  
  // Tasks API
  apiRouter.get("/tasks/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const tasks = await storage.getTasks(userId);
    res.json(tasks);
  });
  
  apiRouter.post("/tasks", async (req, res) => {
    try {
      const validatedData = insertTaskSchema.parse(req.body);
      const task = await storage.createTask(validatedData);
      res.status(201).json(task);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid task data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create task" });
    }
  });
  
  apiRouter.patch("/tasks/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid task ID" });
    }
    
    try {
      const validatedData = insertTaskSchema.partial().parse(req.body);
      const updatedTask = await storage.updateTask(id, validatedData);
      
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.json(updatedTask);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid task data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to update task" });
    }
  });
  
  // Materials API
  apiRouter.get("/materials", async (req, res) => {
    const materials = await storage.getMaterials();
    res.json(materials);
  });
  
  apiRouter.post("/materials", async (req, res) => {
    try {
      const validatedData = insertMaterialSchema.parse(req.body);
      const material = await storage.createMaterial(validatedData);
      res.status(201).json(material);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid material data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create material" });
    }
  });
  
  // Bookmarks API
  apiRouter.get("/bookmarks/:userId", async (req, res) => {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    
    const bookmarks = await storage.getBookmarks(userId);
    res.json(bookmarks);
  });
  
  apiRouter.post("/bookmarks", async (req, res) => {
    try {
      const validatedData = insertBookmarkSchema.parse(req.body);
      const bookmark = await storage.createBookmark(validatedData);
      res.status(201).json(bookmark);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid bookmark data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create bookmark" });
    }
  });
  
  // Lesson Materials API
  apiRouter.get("/lesson-materials/:lessonId", async (req, res) => {
    const lessonId = parseInt(req.params.lessonId);
    if (isNaN(lessonId)) {
      return res.status(400).json({ message: "Invalid lesson ID" });
    }
    
    const materials = await storage.getLessonMaterials(lessonId);
    res.json(materials);
  });
  
  apiRouter.post("/lesson-materials", async (req, res) => {
    try {
      const validatedData = insertLessonMaterialSchema.parse(req.body);
      const lessonMaterial = await storage.createLessonMaterial(validatedData);
      res.status(201).json(lessonMaterial);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid lesson material data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create lesson material" });
    }
  });
  
  apiRouter.delete("/lesson-materials/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid lesson material ID" });
    }
    
    const deleted = await storage.deleteLessonMaterial(id);
    if (!deleted) {
      return res.status(404).json({ message: "Lesson material not found" });
    }
    
    res.status(204).end();
  });
  
  // Mount internal API router
  app.use("/api", apiRouter);
  
  // Mount external API router with versioning
  app.use("/api/v1/external", externalApiRouter);
  
  const httpServer = createServer(app);
  
  return httpServer;
}
