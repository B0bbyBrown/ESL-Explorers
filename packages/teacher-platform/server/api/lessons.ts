import { Router } from 'express';
import { storage } from '../storage';
import { z } from 'zod';
import { insertLessonSchema } from '@shared/schema';

export const lessonsRouter = Router();

// Get all lessons
lessonsRouter.get('/', async (req, res) => {
  try {
    const lessons = await storage.getLessons();
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: lessons,
      count: lessons.length,
    });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    res.status(500).json({ error: 'Failed to fetch lessons' });
  }
});

// Get a specific lesson
lessonsRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid lesson ID' });
    }
    
    const lesson = await storage.getLesson(id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: lesson,
    });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    res.status(500).json({ error: 'Failed to fetch lesson' });
  }
});

// Create a new lesson
lessonsRouter.post('/', async (req, res) => {
  try {
    const validatedData = insertLessonSchema.parse(req.body);
    const lesson = await storage.createLesson(validatedData);
    
    // Return data with API versioning
    res.status(201).json({
      version: '1.0',
      data: lesson,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid lesson data', details: error.errors });
    }
    console.error('Error creating lesson:', error);
    res.status(500).json({ error: 'Failed to create lesson' });
  }
});

// Update a lesson
lessonsRouter.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid lesson ID' });
    }
    
    const validatedData = insertLessonSchema.partial().parse(req.body);
    const updatedLesson = await storage.updateLesson(id, validatedData);
    
    if (!updatedLesson) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: updatedLesson,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid lesson data', details: error.errors });
    }
    console.error('Error updating lesson:', error);
    res.status(500).json({ error: 'Failed to update lesson' });
  }
});

// Delete a lesson
lessonsRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid lesson ID' });
    }
    
    const deleted = await storage.deleteLesson(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Lesson not found' });
    }
    
    // Return success message
    res.json({
      version: '1.0',
      success: true,
      message: 'Lesson deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    res.status(500).json({ error: 'Failed to delete lesson' });
  }
});

// Get materials for a specific lesson
lessonsRouter.get('/:id/materials', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid lesson ID' });
    }
    
    const materials = await storage.getLessonMaterials(id);
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: materials,
      count: materials.length,
    });
  } catch (error) {
    console.error('Error fetching lesson materials:', error);
    res.status(500).json({ error: 'Failed to fetch lesson materials' });
  }
});