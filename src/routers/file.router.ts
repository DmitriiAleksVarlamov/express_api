import express from 'express';
import { authMiddleware, AuthMiddleware } from '../middlawares/auth.middleware';
import { fileController, FileController } from '../controllers/file.controller';

class FileRouter {
  constructor(
    private router: express.Router,
    private authMiddleware: AuthMiddleware,
    private fileController: FileController,
  ) {
    this.setupRouter();
  }

  get fileRouter() {
    return this.router;
  }

  private setupRouter() {
    this.router
      .route('/upload')
      .post(
        this.authMiddleware.bearerStrategy,
        this.fileController.upload.bind(this.fileController),
      );
    this.router
      .route('/list')
      .get(
        this.authMiddleware.bearerStrategy,
        this.fileController.getList.bind(this.fileController),
      );
    this.router
      .route('/delete/:id')
      .delete(
        this.authMiddleware.bearerStrategy,
        this.fileController.delete.bind(this.fileController),
      );
    this.router
      .route('/:id')
      .get(
        this.authMiddleware.bearerStrategy,
        this.fileController.getById.bind(this.fileController),
      );
  }
}

const fileRouter = new FileRouter(
  express.Router(),
  authMiddleware,
  fileController,
).fileRouter;

export { fileRouter, FileRouter };
