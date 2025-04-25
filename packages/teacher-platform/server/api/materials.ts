import { Router } from 'express';
import { storage } from '../storage';
import { z } from 'zod';
import { insertMaterialSchema, insertLessonMaterialSchema } from '@shared/schema';

export const materialsRouter = Router();

// Get all materials
materialsRouter.get('/', async (req, res) => {
  try {
    const materials = await storage.getMaterials();
    
    // Filter by category if provided in query params
    const { category } = req.query;
    let filteredMaterials = materials;
    
    if (category && typeof category === 'string') {
      filteredMaterials = materials.filter(material => 
        material.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: filteredMaterials,
      count: filteredMaterials.length,
    });
  } catch (error) {
    console.error('Error fetching materials:', error);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
});

// Get a specific material
materialsRouter.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid material ID' });
    }
    
    const material = await storage.getMaterial(id);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: material,
    });
  } catch (error) {
    console.error('Error fetching material:', error);
    res.status(500).json({ error: 'Failed to fetch material' });
  }
});

// Create a new material
materialsRouter.post('/', async (req, res) => {
  try {
    const validatedData = insertMaterialSchema.parse(req.body);
    const material = await storage.createMaterial(validatedData);
    
    // Return data with API versioning
    res.status(201).json({
      version: '1.0',
      data: material,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid material data', details: error.errors });
    }
    console.error('Error creating material:', error);
    res.status(500).json({ error: 'Failed to create material' });
  }
});

// Update a material
materialsRouter.put('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid material ID' });
    }
    
    const validatedData = insertMaterialSchema.partial().parse(req.body);
    const updatedMaterial = await storage.updateMaterial(id, validatedData);
    
    if (!updatedMaterial) {
      return res.status(404).json({ error: 'Material not found' });
    }
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: updatedMaterial,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid material data', details: error.errors });
    }
    console.error('Error updating material:', error);
    res.status(500).json({ error: 'Failed to update material' });
  }
});

// Delete a material
materialsRouter.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: 'Invalid material ID' });
    }
    
    const deleted = await storage.deleteMaterial(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Material not found' });
    }
    
    // Return success message
    res.json({
      version: '1.0',
      success: true,
      message: 'Material deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting material:', error);
    res.status(500).json({ error: 'Failed to delete material' });
  }
});

// Get materials by category
materialsRouter.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    
    const materials = await storage.getMaterials();
    const filteredMaterials = materials.filter(material => 
      material.category.toLowerCase() === category.toLowerCase()
    );
    
    // Return data with API versioning
    res.json({
      version: '1.0',
      data: filteredMaterials,
      count: filteredMaterials.length,
    });
  } catch (error) {
    console.error('Error fetching materials by category:', error);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
});

// Associate a material with a lesson
materialsRouter.post('/lesson/:lessonId', async (req, res) => {
  try {
    const lessonId = parseInt(req.params.lessonId);
    if (isNaN(lessonId)) {
      return res.status(400).json({ error: 'Invalid lesson ID' });
    }
    
    const { materialId } = req.body;
    if (!materialId || isNaN(parseInt(materialId))) {
      return res.status(400).json({ error: 'Invalid material ID' });
    }
    
    const lessonMaterial = await storage.createLessonMaterial({
      lessonId,
      materialId: parseInt(materialId)
    });
    
    // Return data with API versioning
    res.status(201).json({
      version: '1.0',
      data: lessonMaterial,
      message: 'Material associated with lesson successfully',
    });
  } catch (error) {
    console.error('Error associating material with lesson:', error);
    res.status(500).json({ error: 'Failed to associate material with lesson' });
  }
});