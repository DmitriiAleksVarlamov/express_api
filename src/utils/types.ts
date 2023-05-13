import fileUpload from 'express-fileupload';
import { Types, Document } from 'mongoose';

type FindDbResult<T> = Document<unknown, any, T> & T & { _id: Types.ObjectId };

type FileDb = {
  data: fileUpload.UploadedFile['data'];
  name: fileUpload.UploadedFile['name'];
  size: fileUpload.UploadedFile['size'];
  mimetype: fileUpload.UploadedFile['mimetype'];
  createdAt: number;
};

export { FileDb, FindDbResult };
