import express, { NextFunction, Request, Response } from 'express';
import {
  deleteFileDatabase,
  findFilesDatabase,
  findSingleFile,
} from '../models/fileModule';
import { uploadFileHandler } from '../handlers/uploadFileHandler';
import { getFileListHandler } from '../handlers/getFileListHandler';
import { deleteFileHandler } from '../handlers/deleteFileHandler';
import { getSingleFileStats } from '../handlers/getSingleFileStats';
import { downloadFileHandler } from '../handlers/downloadFileHandler';
import { updateFileHandler } from '../handlers/updateFileHandler';

const router = express.Router();

router.post('/upload', uploadFileHandler);
router.get('/list', getFileListHandler);
router.delete('/delete/:id', deleteFileHandler);
router.get('/:id', getSingleFileStats);
router.get('/download/:id', downloadFileHandler);
router.put('/update/:id', updateFileHandler)
export default router;
