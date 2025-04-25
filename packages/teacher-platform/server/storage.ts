import {
  users, type User, type InsertUser,
  students, type Student, type InsertStudent,
  lessons, type Lesson, type InsertLesson,
  curriculum, type Curriculum, type InsertCurriculum,
  events, type Event, type InsertEvent,
  messages, type Message, type InsertMessage,
  announcements, type Announcement, type InsertAnnouncement,
  tasks, type Task, type InsertTask,
  materials, type Material, type InsertMaterial,
  bookmarks, type Bookmark, type InsertBookmark,
  lessonMaterials, type LessonMaterial, type InsertLessonMaterial
} from "@shared/schema";
import { db } from "./db";
import { eq, or, and, sql } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Students
  getStudents(): Promise<Student[]>;
  getStudent(id: number): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student | undefined>;
  deleteStudent(id: number): Promise<boolean>;
  
  // Lessons
  getLessons(): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  updateLesson(id: number, lesson: Partial<InsertLesson>): Promise<Lesson | undefined>;
  deleteLesson(id: number): Promise<boolean>;
  
  // Curriculum
  getCurriculumItems(): Promise<Curriculum[]>;
  getCurriculumItem(id: number): Promise<Curriculum | undefined>;
  createCurriculumItem(curriculum: InsertCurriculum): Promise<Curriculum>;
  updateCurriculumItem(id: number, curriculum: Partial<InsertCurriculum>): Promise<Curriculum | undefined>;
  deleteCurriculumItem(id: number): Promise<boolean>;
  
  // Events
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  
  // Messages
  getMessages(userId: number): Promise<Message[]>;
  getMessage(id: number): Promise<Message | undefined>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: number): Promise<Message | undefined>;
  deleteMessage(id: number): Promise<boolean>;
  
  // Announcements
  getAnnouncements(): Promise<Announcement[]>;
  getAnnouncement(id: number): Promise<Announcement | undefined>;
  createAnnouncement(announcement: InsertAnnouncement): Promise<Announcement>;
  updateAnnouncement(id: number, announcement: Partial<InsertAnnouncement>): Promise<Announcement | undefined>;
  deleteAnnouncement(id: number): Promise<boolean>;
  
  // Tasks
  getTasks(userId: number): Promise<Task[]>;
  getTask(id: number): Promise<Task | undefined>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<InsertTask>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<boolean>;
  
  // Materials
  getMaterials(): Promise<Material[]>;
  getMaterial(id: number): Promise<Material | undefined>;
  createMaterial(material: InsertMaterial): Promise<Material>;
  updateMaterial(id: number, material: Partial<InsertMaterial>): Promise<Material | undefined>;
  deleteMaterial(id: number): Promise<boolean>;
  
  // Bookmarks
  getBookmarks(userId: number): Promise<Bookmark[]>;
  getBookmark(id: number): Promise<Bookmark | undefined>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  updateBookmark(id: number, bookmark: Partial<InsertBookmark>): Promise<Bookmark | undefined>;
  deleteBookmark(id: number): Promise<boolean>;
  
  // Lesson Materials
  getLessonMaterials(lessonId: number): Promise<Material[]>;
  getLessonMaterial(id: number): Promise<LessonMaterial | undefined>;
  createLessonMaterial(lessonMaterial: InsertLessonMaterial): Promise<LessonMaterial>;
  deleteLessonMaterial(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private students: Map<number, Student>;
  private lessons: Map<number, Lesson>;
  private curriculumItems: Map<number, Curriculum>;
  private events: Map<number, Event>;
  private messages: Map<number, Message>;
  private announcements: Map<number, Announcement>;
  private tasks: Map<number, Task>;
  private materials: Map<number, Material>;
  private bookmarks: Map<number, Bookmark>;
  private lessonMaterialsMap: Map<number, LessonMaterial>;
  
  currentUserId: number;
  currentStudentId: number;
  currentLessonId: number;
  currentCurriculumId: number;
  currentEventId: number;
  currentMessageId: number;
  currentAnnouncementId: number;
  currentTaskId: number;
  currentMaterialId: number;
  currentBookmarkId: number;
  currentLessonMaterialId: number;

  constructor() {
    // Initialize maps
    this.users = new Map();
    this.students = new Map();
    this.lessons = new Map();
    this.curriculumItems = new Map();
    this.events = new Map();
    this.messages = new Map();
    this.announcements = new Map();
    this.tasks = new Map();
    this.materials = new Map();
    this.bookmarks = new Map();
    this.lessonMaterialsMap = new Map();
    
    // Initialize IDs
    this.currentUserId = 1;
    this.currentStudentId = 1;
    this.currentLessonId = 1;
    this.currentCurriculumId = 1;
    this.currentEventId = 1;
    this.currentMessageId = 1;
    this.currentAnnouncementId = 1;
    this.currentTaskId = 1;
    this.currentMaterialId = 1;
    this.currentBookmarkId = 1;
    this.currentLessonMaterialId = 1;
    
    // Seed data
    this.seedData();
  }

  // Seed some initial data
  private seedData() {
    // Create default teacher user
    const defaultUser: InsertUser = {
      username: 'teacher',
      password: 'password',
      fullName: 'John Doe',
      email: 'john.doe@teachpro.edu',
      role: 'teacher'
    };
    this.createUser(defaultUser);
    
    // Add some sample students
    const sampleStudents: InsertStudent[] = [
      {
        fullName: 'Emma Wilson',
        email: 'emma.wilson@student.edu',
        grade: 'Pre A1',
        classId: 'ESL-A1',
        guardianName: 'Sarah Wilson',
        guardianContact: '555-123-4567',
        attendanceRate: 95,
        performanceGrade: 'A',
        notes: 'Native language: Spanish. Strong verbal skills, needs work on written grammar.'
      },
      {
        fullName: 'James Miller',
        email: 'james.miller@student.edu',
        grade: 'Pre A1',
        classId: 'ESL-A1',
        guardianName: 'Robert Miller',
        guardianContact: '555-234-5678',
        attendanceRate: 88,
        performanceGrade: 'B',
        notes: 'Native language: Mandarin. Excellent reading comprehension, working on pronunciation.'
      }
    ];
    
    sampleStudents.forEach(student => this.createStudent(student));
    
    // Add some sample lessons
    const sampleLessons: InsertLesson[] = [
      {
        title: 'Daily Routines Vocabulary',
        subject: 'ESL Vocabulary',
        description: 'Learning and practicing vocabulary related to daily routines with interactive activities',
        classId: 'Pre A1',
        date: new Date(),
        startTime: '10:30',
        endTime: '11:45',
        location: 'Language Lab 1',
        status: 'upcoming'
      },
      {
        title: 'Present Simple Tense Practice',
        subject: 'ESL Grammar',
        description: 'Introduction to Present Simple tense with guided practice activities',
        classId: 'Pre A1',
        date: new Date(),
        startTime: '13:15',
        endTime: '14:30',
        location: 'Language Lab 2',
        status: 'upcoming'
      }
    ];
    
    sampleLessons.forEach(lesson => this.createLesson(lesson));
    
    // Add sample curriculum items
    const sampleCurriculum: InsertCurriculum[] = [
      {
        title: 'ESL Curriculum - Pre A1 Level',
        subject: 'English as a Second Language',
        grade: 'Pre A1',
        description: 'Foundational English language curriculum for beginner ESL students',
        objectives: 'Students will build fundamental English language skills for basic communication needs',
        units: [
          {
            title: 'Unit 1: Introduction to English',
            lessons: [
              { id: 1, title: 'Greetings and Introductions' },
              { id: 2, title: 'Classroom Language' }
            ]
          },
          {
            title: 'Unit 2: Daily Routines',
            lessons: [
              { id: 3, title: 'Daily Routines Vocabulary' },
              { id: 4, title: 'Present Simple Tense' }
            ]
          },
          {
            title: 'Unit 3: Colors and Numbers',
            lessons: [
              { id: 5, title: 'Basic Colors' },
              { id: 6, title: 'Numbers 1-20' }
            ]
          },
          {
            title: 'Unit 4: Family',
            lessons: [
              { id: 7, title: 'Family Members' },
              { id: 8, title: 'Possessive Adjectives' }
            ]
          },
          {
            title: 'Unit 5: Food and Drink',
            lessons: [
              { id: 9, title: 'Food Vocabulary' },
              { id: 10, title: 'Expressing Likes and Dislikes' }
            ]
          },
          {
            title: 'Unit 6: Animals',
            lessons: [
              { id: 11, title: 'Pets and Farm Animals' },
              { id: 12, title: 'Simple Adjectives' }
            ]
          },
          {
            title: 'Unit 7: Weather',
            lessons: [
              { id: 13, title: 'Weather Types' },
              { id: 14, title: 'Seasons Vocabulary' }
            ]
          },
          {
            title: 'Unit 8: Clothes',
            lessons: [
              { id: 15, title: 'Basic Clothing Items' },
              { id: 16, title: 'Colors and Clothes' }
            ]
          },
          {
            title: 'Unit 9: My House',
            lessons: [
              { id: 17, title: 'Rooms in a House' },
              { id: 18, title: 'Furniture Vocabulary' }
            ]
          },
          {
            title: 'Unit 10: Transportation',
            lessons: [
              { id: 19, title: 'Transport Vocabulary' },
              { id: 20, title: 'Getting Around' }
            ]
          }
        ]
      }
    ];
    
    sampleCurriculum.forEach(curr => this.createCurriculumItem(curr));
    
    // Add sample tasks
    const sampleTasks: InsertTask[] = [
      {
        title: 'Grade Pre A1 vocabulary worksheets',
        completed: false,
        dueDate: new Date(),
        userId: 1
      },
      {
        title: 'Prepare flashcards for Daily Routines lesson',
        completed: false,
        dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
        userId: 1
      }
    ];
    
    sampleTasks.forEach(task => this.createTask(task));
    
    // Add sample announcements
    const sampleAnnouncements: InsertAnnouncement[] = [
      {
        title: 'ESL Teaching Methods Workshop',
        content: 'Reminder: No classes on Friday due to scheduled ESL teaching methods workshop. All language teachers are required to attend. Focus will be on interactive learning approaches.',
        priority: 'high',
        createdBy: 1
      },
      {
        title: 'Language Progress Reports Due',
        content: 'All student language assessment reports for the current quarter must be submitted by next Wednesday. Contact the ESL department head for any extensions.',
        priority: 'normal',
        createdBy: 1
      }
    ];
    
    sampleAnnouncements.forEach(announcement => this.createAnnouncement(announcement));
    
    // Add sample materials
    const sampleMaterials: InsertMaterial[] = [
      {
        title: 'Daily Routines Vocabulary Flashcards',
        description: 'A set of visual flashcards showing daily routine activities with English vocabulary',
        category: 'Flashcards',
        url: '/materials/daily-routines-flashcards.pdf',
        createdBy: 1
      },
      {
        title: 'Present Simple Grammar Worksheet',
        description: 'Practice worksheet for Present Simple tense with fill-in-the-blank exercises',
        category: 'Worksheet',
        url: '/materials/present-simple-worksheet.pdf',
        createdBy: 1
      },
      {
        title: 'Morning Routine Speaking Activity',
        description: 'Pair work activity where students practice describing their morning routines',
        category: 'Speaking Activity',
        url: '/materials/morning-routine-speaking.pdf',
        createdBy: 1
      }
    ];
    
    // Create materials and link them to lessons
    sampleMaterials.forEach(material => {
      const createdMaterial = this.createMaterial(material);
      
      // Link flashcards to Daily Routines lesson
      if (material.title.includes('Flashcards')) {
        this.createLessonMaterial({
          lessonId: 1,
          materialId: createdMaterial.id
        });
      }
      
      // Link worksheet to Present Simple lesson
      if (material.title.includes('Grammar Worksheet')) {
        this.createLessonMaterial({
          lessonId: 2,
          materialId: createdMaterial.id
        });
      }
      
      // Link speaking activity to both lessons
      if (material.title.includes('Speaking Activity')) {
        this.createLessonMaterial({
          lessonId: 1,
          materialId: createdMaterial.id
        });
        this.createLessonMaterial({
          lessonId: 2,
          materialId: createdMaterial.id
        });
      }
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }
  
  // Student methods
  async getStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }
  
  async getStudent(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }
  
  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const id = this.currentStudentId++;
    const student: Student = { ...insertStudent, id, createdAt: new Date() };
    this.students.set(id, student);
    return student;
  }
  
  async updateStudent(id: number, updatedFields: Partial<InsertStudent>): Promise<Student | undefined> {
    const student = this.students.get(id);
    if (!student) return undefined;
    
    const updatedStudent = { ...student, ...updatedFields };
    this.students.set(id, updatedStudent);
    return updatedStudent;
  }
  
  async deleteStudent(id: number): Promise<boolean> {
    return this.students.delete(id);
  }
  
  // Lesson methods
  async getLessons(): Promise<Lesson[]> {
    return Array.from(this.lessons.values());
  }
  
  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }
  
  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = this.currentLessonId++;
    const now = new Date();
    const lesson: Lesson = { 
      ...insertLesson, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.lessons.set(id, lesson);
    return lesson;
  }
  
  async updateLesson(id: number, updatedFields: Partial<InsertLesson>): Promise<Lesson | undefined> {
    const lesson = this.lessons.get(id);
    if (!lesson) return undefined;
    
    const updatedLesson = { 
      ...lesson, 
      ...updatedFields,
      updatedAt: new Date()
    };
    this.lessons.set(id, updatedLesson);
    return updatedLesson;
  }
  
  async deleteLesson(id: number): Promise<boolean> {
    return this.lessons.delete(id);
  }
  
  // Curriculum methods
  async getCurriculumItems(): Promise<Curriculum[]> {
    return Array.from(this.curriculumItems.values());
  }
  
  async getCurriculumItem(id: number): Promise<Curriculum | undefined> {
    return this.curriculumItems.get(id);
  }
  
  async createCurriculumItem(insertCurriculum: InsertCurriculum): Promise<Curriculum> {
    const id = this.currentCurriculumId++;
    const now = new Date();
    const curriculum: Curriculum = { 
      ...insertCurriculum, 
      id, 
      createdAt: now,
      updatedAt: now
    };
    this.curriculumItems.set(id, curriculum);
    return curriculum;
  }
  
  async updateCurriculumItem(id: number, updatedFields: Partial<InsertCurriculum>): Promise<Curriculum | undefined> {
    const curriculumItem = this.curriculumItems.get(id);
    if (!curriculumItem) return undefined;
    
    const updatedItem = { 
      ...curriculumItem, 
      ...updatedFields,
      updatedAt: new Date()
    };
    this.curriculumItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async deleteCurriculumItem(id: number): Promise<boolean> {
    return this.curriculumItems.delete(id);
  }
  
  // Event methods
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.currentEventId++;
    const event: Event = { 
      ...insertEvent, 
      id, 
      createdAt: new Date()
    };
    this.events.set(id, event);
    return event;
  }
  
  async updateEvent(id: number, updatedFields: Partial<InsertEvent>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;
    
    const updatedEvent = { ...event, ...updatedFields };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }
  
  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }
  
  // Message methods
  async getMessages(userId: number): Promise<Message[]> {
    return Array.from(this.messages.values()).filter(
      message => message.senderId === userId || message.receiverId === userId
    );
  }
  
  async getMessage(id: number): Promise<Message | undefined> {
    return this.messages.get(id);
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = { 
      ...insertMessage, 
      id, 
      createdAt: new Date()
    };
    this.messages.set(id, message);
    return message;
  }
  
  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const message = this.messages.get(id);
    if (!message) return undefined;
    
    const updatedMessage = { ...message, isRead: true };
    this.messages.set(id, updatedMessage);
    return updatedMessage;
  }
  
  async deleteMessage(id: number): Promise<boolean> {
    return this.messages.delete(id);
  }
  
  // Announcement methods
  async getAnnouncements(): Promise<Announcement[]> {
    return Array.from(this.announcements.values());
  }
  
  async getAnnouncement(id: number): Promise<Announcement | undefined> {
    return this.announcements.get(id);
  }
  
  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const id = this.currentAnnouncementId++;
    const announcement: Announcement = { 
      ...insertAnnouncement, 
      id, 
      createdAt: new Date()
    };
    this.announcements.set(id, announcement);
    return announcement;
  }
  
  async updateAnnouncement(id: number, updatedFields: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const announcement = this.announcements.get(id);
    if (!announcement) return undefined;
    
    const updatedAnnouncement = { ...announcement, ...updatedFields };
    this.announcements.set(id, updatedAnnouncement);
    return updatedAnnouncement;
  }
  
  async deleteAnnouncement(id: number): Promise<boolean> {
    return this.announcements.delete(id);
  }
  
  // Task methods
  async getTasks(userId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      task => task.userId === userId
    );
  }
  
  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }
  
  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.currentTaskId++;
    const task: Task = { 
      ...insertTask, 
      id, 
      createdAt: new Date()
    };
    this.tasks.set(id, task);
    return task;
  }
  
  async updateTask(id: number, updatedFields: Partial<InsertTask>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updatedTask = { ...task, ...updatedFields };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }
  
  async deleteTask(id: number): Promise<boolean> {
    return this.tasks.delete(id);
  }
  
  // Material methods
  async getMaterials(): Promise<Material[]> {
    return Array.from(this.materials.values());
  }
  
  async getMaterial(id: number): Promise<Material | undefined> {
    return this.materials.get(id);
  }
  
  async createMaterial(insertMaterial: InsertMaterial): Promise<Material> {
    const id = this.currentMaterialId++;
    const material: Material = { 
      ...insertMaterial, 
      id, 
      createdAt: new Date()
    };
    this.materials.set(id, material);
    return material;
  }
  
  async updateMaterial(id: number, updatedFields: Partial<InsertMaterial>): Promise<Material | undefined> {
    const material = this.materials.get(id);
    if (!material) return undefined;
    
    const updatedMaterial = { ...material, ...updatedFields };
    this.materials.set(id, updatedMaterial);
    return updatedMaterial;
  }
  
  async deleteMaterial(id: number): Promise<boolean> {
    return this.materials.delete(id);
  }
  
  // Bookmark methods
  async getBookmarks(userId: number): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values()).filter(
      bookmark => bookmark.userId === userId
    );
  }
  
  async getBookmark(id: number): Promise<Bookmark | undefined> {
    return this.bookmarks.get(id);
  }
  
  async createBookmark(insertBookmark: InsertBookmark): Promise<Bookmark> {
    const id = this.currentBookmarkId++;
    const bookmark: Bookmark = { 
      ...insertBookmark, 
      id, 
      createdAt: new Date()
    };
    this.bookmarks.set(id, bookmark);
    return bookmark;
  }
  
  async updateBookmark(id: number, updatedFields: Partial<InsertBookmark>): Promise<Bookmark | undefined> {
    const bookmark = this.bookmarks.get(id);
    if (!bookmark) return undefined;
    
    const updatedBookmark = { ...bookmark, ...updatedFields };
    this.bookmarks.set(id, updatedBookmark);
    return updatedBookmark;
  }
  
  async deleteBookmark(id: number): Promise<boolean> {
    return this.bookmarks.delete(id);
  }
  
  // Lesson Materials methods
  
  async getLessonMaterials(lessonId: number): Promise<Material[]> {
    // Find all lesson materials for this lesson
    const lessonMaterialsForLesson = Array.from(this.lessonMaterialsMap.values())
      .filter(lm => lm.lessonId === lessonId);
    
    // Get the corresponding materials
    return lessonMaterialsForLesson
      .map(lm => this.materials.get(lm.materialId))
      .filter(Boolean) as Material[];
  }
  
  async getLessonMaterial(id: number): Promise<LessonMaterial | undefined> {
    return this.lessonMaterialsMap.get(id);
  }
  
  async createLessonMaterial(insertLessonMaterial: InsertLessonMaterial): Promise<LessonMaterial> {
    const id = this.currentLessonMaterialId++;
    const lessonMaterial: LessonMaterial = { 
      ...insertLessonMaterial, 
      id, 
      createdAt: new Date()
    };
    this.lessonMaterialsMap.set(id, lessonMaterial);
    return lessonMaterial;
  }
  
  async deleteLessonMaterial(id: number): Promise<boolean> {
    return this.lessonMaterialsMap.delete(id);
  }
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Student methods
  async getStudents(): Promise<Student[]> {
    return await db.select().from(students);
  }
  
  async getStudent(id: number): Promise<Student | undefined> {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student || undefined;
  }
  
  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const [student] = await db.insert(students).values(insertStudent).returning();
    return student;
  }
  
  async updateStudent(id: number, updatedFields: Partial<InsertStudent>): Promise<Student | undefined> {
    const [student] = await db.update(students)
      .set(updatedFields)
      .where(eq(students.id, id))
      .returning();
    return student || undefined;
  }
  
  async deleteStudent(id: number): Promise<boolean> {
    const result = await db.delete(students).where(eq(students.id, id));
    return result.rowCount > 0;
  }
  
  // Lesson methods
  async getLessons(): Promise<Lesson[]> {
    return await db.select().from(lessons);
  }
  
  async getLesson(id: number): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson || undefined;
  }
  
  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const [lesson] = await db.insert(lessons).values(insertLesson).returning();
    return lesson;
  }
  
  async updateLesson(id: number, updatedFields: Partial<InsertLesson>): Promise<Lesson | undefined> {
    const [lesson] = await db.update(lessons)
      .set({ ...updatedFields, updatedAt: new Date() })
      .where(eq(lessons.id, id))
      .returning();
    return lesson || undefined;
  }
  
  async deleteLesson(id: number): Promise<boolean> {
    const result = await db.delete(lessons).where(eq(lessons.id, id));
    return result.rowCount > 0;
  }
  
  // Curriculum methods
  async getCurriculumItems(): Promise<Curriculum[]> {
    return await db.select().from(curriculum);
  }
  
  async getCurriculumItem(id: number): Promise<Curriculum | undefined> {
    const [curriculumItem] = await db.select().from(curriculum).where(eq(curriculum.id, id));
    return curriculumItem || undefined;
  }
  
  async createCurriculumItem(insertCurriculum: InsertCurriculum): Promise<Curriculum> {
    const [currItem] = await db.insert(curriculum).values(insertCurriculum).returning();
    return currItem;
  }
  
  async updateCurriculumItem(id: number, updatedFields: Partial<InsertCurriculum>): Promise<Curriculum | undefined> {
    const [currItem] = await db.update(curriculum)
      .set({ ...updatedFields, updatedAt: new Date() })
      .where(eq(curriculum.id, id))
      .returning();
    return currItem || undefined;
  }
  
  async deleteCurriculumItem(id: number): Promise<boolean> {
    const result = await db.delete(curriculum).where(eq(curriculum.id, id));
    return result.rowCount > 0;
  }
  
  // Event methods
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    const [event] = await db.select().from(events).where(eq(events.id, id));
    return event || undefined;
  }
  
  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const [event] = await db.insert(events).values(insertEvent).returning();
    return event;
  }
  
  async updateEvent(id: number, updatedFields: Partial<InsertEvent>): Promise<Event | undefined> {
    const [event] = await db.update(events)
      .set(updatedFields)
      .where(eq(events.id, id))
      .returning();
    return event || undefined;
  }
  
  async deleteEvent(id: number): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id));
    return result.rowCount > 0;
  }
  
  // Message methods
  async getMessages(userId: number): Promise<Message[]> {
    return await db.select().from(messages).where(
      or(
        eq(messages.senderId, userId),
        eq(messages.receiverId, userId)
      )
    );
  }
  
  async getMessage(id: number): Promise<Message | undefined> {
    const [message] = await db.select().from(messages).where(eq(messages.id, id));
    return message || undefined;
  }
  
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }
  
  async markMessageAsRead(id: number): Promise<Message | undefined> {
    const [message] = await db.update(messages)
      .set({ isRead: true })
      .where(eq(messages.id, id))
      .returning();
    return message || undefined;
  }
  
  async deleteMessage(id: number): Promise<boolean> {
    const result = await db.delete(messages).where(eq(messages.id, id));
    return result.rowCount > 0;
  }
  
  // Announcement methods
  async getAnnouncements(): Promise<Announcement[]> {
    return await db.select().from(announcements);
  }
  
  async getAnnouncement(id: number): Promise<Announcement | undefined> {
    const [announcement] = await db.select().from(announcements).where(eq(announcements.id, id));
    return announcement || undefined;
  }
  
  async createAnnouncement(insertAnnouncement: InsertAnnouncement): Promise<Announcement> {
    const [announcement] = await db.insert(announcements).values(insertAnnouncement).returning();
    return announcement;
  }
  
  async updateAnnouncement(id: number, updatedFields: Partial<InsertAnnouncement>): Promise<Announcement | undefined> {
    const [announcement] = await db.update(announcements)
      .set(updatedFields)
      .where(eq(announcements.id, id))
      .returning();
    return announcement || undefined;
  }
  
  async deleteAnnouncement(id: number): Promise<boolean> {
    const result = await db.delete(announcements).where(eq(announcements.id, id));
    return result.rowCount > 0;
  }
  
  // Task methods
  async getTasks(userId: number): Promise<Task[]> {
    return await db.select().from(tasks).where(eq(tasks.userId, userId));
  }
  
  async getTask(id: number): Promise<Task | undefined> {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task || undefined;
  }
  
  async createTask(insertTask: InsertTask): Promise<Task> {
    const [task] = await db.insert(tasks).values(insertTask).returning();
    return task;
  }
  
  async updateTask(id: number, updatedFields: Partial<InsertTask>): Promise<Task | undefined> {
    const [task] = await db.update(tasks)
      .set(updatedFields)
      .where(eq(tasks.id, id))
      .returning();
    return task || undefined;
  }
  
  async deleteTask(id: number): Promise<boolean> {
    const result = await db.delete(tasks).where(eq(tasks.id, id));
    return result.rowCount > 0;
  }
  
  // Material methods
  async getMaterials(): Promise<Material[]> {
    return await db.select().from(materials);
  }
  
  async getMaterial(id: number): Promise<Material | undefined> {
    const [material] = await db.select().from(materials).where(eq(materials.id, id));
    return material || undefined;
  }
  
  async createMaterial(insertMaterial: InsertMaterial): Promise<Material> {
    const [material] = await db.insert(materials).values(insertMaterial).returning();
    return material;
  }
  
  async updateMaterial(id: number, updatedFields: Partial<InsertMaterial>): Promise<Material | undefined> {
    const [material] = await db.update(materials)
      .set(updatedFields)
      .where(eq(materials.id, id))
      .returning();
    return material || undefined;
  }
  
  async deleteMaterial(id: number): Promise<boolean> {
    const result = await db.delete(materials).where(eq(materials.id, id));
    return result.rowCount > 0;
  }
  
  // Bookmark methods
  async getBookmarks(userId: number): Promise<Bookmark[]> {
    return await db.select().from(bookmarks).where(eq(bookmarks.userId, userId));
  }
  
  async getBookmark(id: number): Promise<Bookmark | undefined> {
    const [bookmark] = await db.select().from(bookmarks).where(eq(bookmarks.id, id));
    return bookmark || undefined;
  }
  
  async createBookmark(insertBookmark: InsertBookmark): Promise<Bookmark> {
    const [bookmark] = await db.insert(bookmarks).values(insertBookmark).returning();
    return bookmark;
  }
  
  async updateBookmark(id: number, updatedFields: Partial<InsertBookmark>): Promise<Bookmark | undefined> {
    const [bookmark] = await db.update(bookmarks)
      .set(updatedFields)
      .where(eq(bookmarks.id, id))
      .returning();
    return bookmark || undefined;
  }
  
  async deleteBookmark(id: number): Promise<boolean> {
    const result = await db.delete(bookmarks).where(eq(bookmarks.id, id));
    return result.rowCount > 0;
  }
  
  // Lesson Materials methods
  async getLessonMaterials(lessonId: number): Promise<Material[]> {
    const result = await db
      .select({
        id: materials.id,
        title: materials.title,
        description: materials.description,
        category: materials.category,
        url: materials.url,
        createdBy: materials.createdBy,
        createdAt: materials.createdAt
      })
      .from(lessonMaterials)
      .innerJoin(materials, eq(lessonMaterials.materialId, materials.id))
      .where(eq(lessonMaterials.lessonId, lessonId));
    return result;
  }
  
  async getLessonMaterial(id: number): Promise<LessonMaterial | undefined> {
    const [lessonMaterial] = await db
      .select()
      .from(lessonMaterials)
      .where(eq(lessonMaterials.id, id));
    return lessonMaterial || undefined;
  }
  
  async createLessonMaterial(insertLessonMaterial: InsertLessonMaterial): Promise<LessonMaterial> {
    const [lessonMaterial] = await db
      .insert(lessonMaterials)
      .values(insertLessonMaterial)
      .returning();
    return lessonMaterial;
  }
  
  async deleteLessonMaterial(id: number): Promise<boolean> {
    const result = await db.delete(lessonMaterials).where(eq(lessonMaterials.id, id));
    return result.rowCount > 0;
  }
}

export async function seedInitialData() {
  // Create default teacher user
  const [existingUser] = await db.select().from(users).where(eq(users.username, 'teacher'));
  
  if (!existingUser) {
    await db.insert(users).values({
      username: 'teacher',
      password: 'password',
      fullName: 'John Doe',
      email: 'john.doe@teachpro.edu',
      role: 'teacher'
    });
  }
  
  // Check if we have students
  const studentCount = await db.select({ count: sql`count(*)` }).from(students);
  if (Number(studentCount[0].count) === 0) {
    // Add some sample ESL students
    await db.insert(students).values([
      {
        fullName: 'Sofia García',
        email: 'sofia.garcia@student.edu',
        level: 'Pre-A1',
        unitId: 'Unit1',
        guardianName: 'Miguel García',
        guardianContact: '555-123-4567',
        attendanceRate: 95,
        performanceLevel: 'A',
        notes: 'Beginner English learner, native Spanish speaker'
      },
      {
        fullName: 'Ling Wei',
        email: 'ling.wei@student.edu',
        level: 'Pre-A1',
        unitId: 'Unit2',
        guardianName: 'Zhang Wei',
        guardianContact: '555-234-5678',
        attendanceRate: 88,
        performanceLevel: 'B',
        notes: 'Beginner English learner, native Mandarin speaker'
      },
      {
        fullName: 'Ahmed Al-Farsi',
        email: 'ahmed.alfarsi@student.edu',
        level: 'A1',
        unitId: 'Unit1',
        guardianName: 'Samir Al-Farsi',
        guardianContact: '555-345-6789',
        attendanceRate: 92,
        performanceLevel: 'A',
        notes: 'Elementary English learner, native Arabic speaker'
      },
      {
        fullName: 'Yuri Petrov',
        email: 'yuri.petrov@student.edu',
        level: 'A2',
        unitId: 'Unit3',
        guardianName: 'Natasha Petrova',
        guardianContact: '555-456-7890',
        attendanceRate: 90,
        performanceLevel: 'B+',
        notes: 'Pre-intermediate English learner, native Russian speaker'
      }
    ]);
  }
  
  // Check if we have lessons
  const lessonCount = await db.select({ count: sql`count(*)` }).from(lessons);
  if (Number(lessonCount[0].count) === 0) {
    // Add some sample ESL lessons
    await db.insert(lessons).values([
      {
        title: 'Daily Routines and Present Simple',
        subject: 'ESL',
        description: 'Practicing vocabulary and grammar related to daily routines using Present Simple tense',
        classId: 'Pre-A1',
        date: new Date(),
        startTime: '10:30',
        endTime: '11:45',
        location: 'Room 102',
        status: 'upcoming'
      },
      {
        title: 'Food and Drink Vocabulary',
        subject: 'ESL',
        description: 'Introduction to basic food and drink vocabulary with speaking practice',
        classId: 'A1',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        startTime: '13:15',
        endTime: '14:30',
        location: 'Room 205',
        status: 'upcoming'
      },
      {
        title: 'Giving Directions - City Navigation',
        subject: 'ESL',
        description: 'Practicing prepositions and imperative form through city navigation role-play',
        classId: 'A2',
        date: new Date(Date.now() + 48 * 60 * 60 * 1000),
        startTime: '09:00',
        endTime: '10:15',
        location: 'Room 103',
        status: 'upcoming'
      }
    ]);
  }
  
  // Check if we have curriculum items
  const curriculumCount = await db.select({ count: sql`count(*)` }).from(curriculum);
  if (Number(curriculumCount[0].count) === 0) {
    // Add sample ESL curriculum items
    await db.insert(curriculum).values([
      {
        title: 'ESL Curriculum - Pre-A1 Level',
        subject: 'ESL',
        level: 'Pre-A1',
        description: 'Beginner level English curriculum for Pre-A1 students',
        objectives: 'Students will learn basic vocabulary, simple grammatical structures, and develop confidence in simple conversations',
        units: [
          {
            title: 'Unit 1: Personal Information',
            lessons: [
              { id: 1, title: 'Greetings and Introductions' },
              { id: 2, title: 'Numbers and Personal Details' }
            ]
          },
          {
            title: 'Unit 2: Daily Life',
            lessons: [
              { id: 3, title: 'Daily Routines and Present Simple' },
              { id: 4, title: 'Time and Days of the Week' }
            ]
          },
          {
            title: 'Unit 3: Food and Drink',
            lessons: [
              { id: 5, title: 'Food and Drink Vocabulary' },
              { id: 6, title: 'Ordering in a Restaurant' }
            ]
          }
        ]
      },
      {
        title: 'ESL Curriculum - A1 Level',
        subject: 'ESL',
        level: 'A1',
        description: 'Elementary level English curriculum for A1 students',
        objectives: 'Students will expand vocabulary, learn basic tenses, and engage in structured conversations',
        units: [
          {
            title: 'Unit 1: Home and Family',
            lessons: [
              { id: 1, title: 'Family Members and Relations' },
              { id: 2, title: 'Describing Your Home' }
            ]
          },
          {
            title: 'Unit 2: Travel and Transport',
            lessons: [
              { id: 3, title: 'Transportation Vocabulary' },
              { id: 4, title: 'Giving Directions - City Navigation' }
            ]
          }
        ]
      }
    ]);
  }
  
  // Get the default user ID for related records
  const [defaultUser] = await db.select().from(users).where(eq(users.username, 'teacher'));
  if (defaultUser) {
    // Check if we have materials
    const materialCount = await db.select({ count: sql`count(*)` }).from(materials);
    if (Number(materialCount[0].count) === 0) {
      // Add sample materials
      const addedMaterials = await db.insert(materials).values([
        {
          title: 'Daily Routines Vocabulary Flashcards',
          description: 'A set of visual flashcards showing daily routine activities with English vocabulary',
          category: 'Flashcards',
          url: '/materials/daily-routines-flashcards.pdf',
          createdBy: defaultUser.id
        },
        {
          title: 'Present Simple Grammar Worksheet',
          description: 'Practice worksheet for Present Simple tense with fill-in-the-blank exercises',
          category: 'Worksheet',
          url: '/materials/present-simple-worksheet.pdf',
          createdBy: defaultUser.id
        },
        {
          title: 'Morning Routine Speaking Activity',
          description: 'Pair work activity where students practice describing their morning routines',
          category: 'Speaking Activity',
          url: '/materials/morning-routine-speaking.pdf',
          createdBy: defaultUser.id
        }
      ]).returning();
      
      // Get lessons to link materials to
      const lessonsList = await db.select().from(lessons);
      if (lessonsList.length >= 2 && addedMaterials.length >= 3) {
        const flashcardMaterial = addedMaterials[0];
        const worksheetMaterial = addedMaterials[1];
        const speakingActivityMaterial = addedMaterials[2];
        const firstLesson = lessonsList[0];
        const secondLesson = lessonsList[1];
        
        // Link flashcards to first lesson
        await db.insert(lessonMaterials).values({
          lessonId: firstLesson.id,
          materialId: flashcardMaterial.id
        });
        
        // Link worksheet to second lesson
        await db.insert(lessonMaterials).values({
          lessonId: secondLesson.id,
          materialId: worksheetMaterial.id
        });
        
        // Link speaking activity to both lessons
        await db.insert(lessonMaterials).values([
          {
            lessonId: firstLesson.id,
            materialId: speakingActivityMaterial.id
          },
          {
            lessonId: secondLesson.id,
            materialId: speakingActivityMaterial.id
          }
        ]);
      }
    }
    
    // Check if we have tasks
    const taskCount = await db.select({ count: sql`count(*)` }).from(tasks);
    if (Number(taskCount[0].count) === 0) {
      // Add sample tasks
      await db.insert(tasks).values([
        {
          title: 'Grade Pre A1 English vocabulary worksheets',
          completed: false,
          dueDate: new Date(),
          userId: defaultUser.id
        },
        {
          title: 'Prepare flashcards for Daily Routines lesson',
          completed: false,
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
          userId: defaultUser.id
        },
        {
          title: 'Review student speaking assessments',
          completed: false,
          dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000), // day after tomorrow
          userId: defaultUser.id
        }
      ]);
    }
    
    // Check if we have announcements
    const announcementCount = await db.select({ count: sql`count(*)` }).from(announcements);
    if (Number(announcementCount[0].count) === 0) {
      // Add sample ESL-related announcements
      await db.insert(announcements).values([
        {
          title: 'ESL Teacher Professional Development Day',
          content: 'Reminder: No classes on Friday due to ESL teaching methodology workshop. All ESL teachers are required to attend for CEFR alignment training.',
          priority: 'high',
          createdBy: defaultUser.id
        },
        {
          title: 'CEFR Assessment Guidelines Update',
          content: 'New Common European Framework (CEFR) assessment guidelines have been published. Please review the updated rubrics for speaking and writing assessments.',
          priority: 'normal',
          createdBy: defaultUser.id
        },
        {
          title: 'New ESL Learning Materials Available',
          content: 'The digital resource library has been updated with new interactive materials for Pre-A1 and A1 level students. Access them through the Materials section.',
          priority: 'normal',
          createdBy: defaultUser.id
        }
      ]);
    }
  }
}

// Initialize the database with seed data
seedInitialData().catch(console.error);

// Export the storage instance
export const storage = new DatabaseStorage();
