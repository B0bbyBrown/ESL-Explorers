import { Router } from 'express';
import { storage } from '../storage';
import { z } from 'zod';
import { insertCurriculumSchema } from '@shared/schema';

export const curriculumRouter = Router();

// Get all curriculum items
curriculumRouter.get('/', async (req, res) => {
  try {
    const curriculumItems = await storage.getCurriculumItems();
    
    // Filter by level if provided in query params
    const { level } = req.query;
    let filteredItems = curriculumItems;
    
    if (level && typeof level === 'string') {
      filteredItems = curriculumItems.filter(item => 
        item.level.toLowerCase() === level.toLowerCase()
      );
    }
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: filteredItems,
      count: filteredItems.length,
    });
  } catch (error) {
    console.error('Error fetching curriculum items:', error);
    res.status(500).json({ error: 'Failed to fetch curriculum items' });
  }
});

// Get a specific curriculum item
curriculumRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid curriculum ID' });
    }
    
    const curriculumItem = await storage.getCurriculumItem(id);
    if (!curriculumItem) {
      return res.status(404).json({ error: 'Curriculum item not found' });
    }
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: curriculumItem,
    });
  } catch (error) {
    console.error('Error fetching curriculum item:', error);
    res.status(500).json({ error: 'Failed to fetch curriculum item' });
  }
});

// Create a new curriculum item
curriculumRouter.post('/', async (req, res) => {
  try {
    const validatedData = insertCurriculumSchema.parse(req.body);
    const curriculumItem = await storage.createCurriculumItem(validatedData);
    
    // Return data with API versioning
    res.status(201).json({
      version: '1.0',
      data: curriculumItem,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid curriculum data', details: error.errors });
    }
    console.error('Error creating curriculum item:', error);
    res.status(500).json({ error: 'Failed to create curriculum item' });
  }
});

// Update a curriculum item
curriculumRouter.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid curriculum ID' });
    }
    
    const validatedData = insertCurriculumSchema.partial().parse(req.body);
    const updatedItem = await storage.updateCurriculumItem(id, validatedData);
    
    if (!updatedItem) {
      return res.status(404).json({ error: 'Curriculum item not found' });
    }
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: updatedItem,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid curriculum data', details: error.errors });
    }
    console.error('Error updating curriculum item:', error);
    res.status(500).json({ error: 'Failed to update curriculum item' });
  }
});

// Delete a curriculum item
curriculumRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid curriculum ID' });
    }
    
    const deleted = await storage.deleteCurriculumItem(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Curriculum item not found' });
    }
    
    // Return success message
    res.json({
      version: '1.0',
      success: true,
      message: 'Curriculum item deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting curriculum item:', error);
    res.status(500).json({ error: 'Failed to delete curriculum item' });
  }
});

// Get curriculum by level
curriculumRouter.get('/level/:level', async (req, res) => {
  try {
    const { level } = req.params;
    
    const curriculumItems = await storage.getCurriculumItems();
    const filteredItems = curriculumItems.filter(item => 
      item.level.toLowerCase() === level.toLowerCase()
    );
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: filteredItems,
      count: filteredItems.length,
    });
  } catch (error) {
    console.error('Error fetching curriculum by level:', error);
    res.status(500).json({ error: 'Failed to fetch curriculum items' });
  }
});