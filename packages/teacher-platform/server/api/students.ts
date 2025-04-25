import { Router } from 'express';
import { storage } from '../storage';
import { z } from 'zod';
import { insertStudentSchema } from '@shared/schema';

export const studentsRouter = Router();

// Get all students
studentsRouter.get('/', async (req, res) => {
  try {
    const students = await storage.getStudents();
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: students,
      count: students.length,
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Get a specific student
studentsRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }
    
    const student = await storage.getStudent(id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: student,
    });
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// Create a new student
studentsRouter.post('/', async (req, res) => {
  try {
    const validatedData = insertStudentSchema.parse(req.body);
    const student = await storage.createStudent(validatedData);
    
    // Return data with API versioning
    res.status(201).json({
      version: '1.0',
      data: student,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid student data', details: error.errors });
    }
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
});

// Update a student
studentsRouter.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }
    
    const validatedData = insertStudentSchema.partial().parse(req.body);
    const updatedStudent = await storage.updateStudent(id, validatedData);
    
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: updatedStudent,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid student data', details: error.errors });
    }
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Delete a student
studentsRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid student ID' });
    }
    
    const deleted = await storage.deleteStudent(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Return success message
    res.json({
      version: '1.0',
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});