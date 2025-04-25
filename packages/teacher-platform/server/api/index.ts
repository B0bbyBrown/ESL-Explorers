import express, { Router } from 'express';
import { studentsRouter } from './students';
import { lessonsRouter } from './lessons';
import { curriculumRouter } from './curriculum';
import { materialsRouter } from './materials';

// Create a router for external API endpoints
const apiRouter = Router();

// Mount the resource-specific routers
apiRouter.use('/students', studentsRouter);
apiRouter.use('/lessons', lessonsRouter);
apiRouter.use('/curriculum', curriculumRouter);
apiRouter.use('/materials', materialsRouter);

// Export the router to be mounted in the main app
export const externalApiRouter = apiRouter;