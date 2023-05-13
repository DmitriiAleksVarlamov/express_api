// import { model, Schema } from 'mongoose';
//
export type FileModule = {
  name: string;
  size: number;
  mimetype: string;
  ext: string;
  createdAt: Date;
  pathname: string;
};
//
// // 2. Create a Schema corresponding to the document interface.
// const fileSchema = new Schema<FileModule>({
//   name: { type: String, required: true },
//   size: { type: Number, required: true },
//   mimetype: { type: String, required: true },
//   ext: { type: String, required: true },
//   createdAt: { type: Date, required: true },
//   pathname: { type: String, required: true },
// });
//
// const FileModel = model<FileModule>('File', fileSchema);
//
import { FileModel } from './fileModel';

const saveFileDatabase = async ({
  pathname,
  name,
  size,
  mimetype,
  ext,
  createdAt,
}: FileModule) => {
  const file = new FileModel({
    pathname,
    name,
    size,
    mimetype,
    ext,
    createdAt,
  });

  return await file.save();
};

const findFilesDatabase = async (limit = 2, page = 1) => {
  const files = await FileModel.find()
    .limit(limit)
    .skip(limit * (page - 1));

  return files;
};

const deleteFileDatabase = async (id: string): Promise<FileModule | null> => {
  return await FileModel.findByIdAndRemove(id).exec();
};

const findSingleFile = async (id: string) => {
  return await FileModel.findById(id).exec();
};

export {
  // FileModel,
  saveFileDatabase,
  findFilesDatabase,
  deleteFileDatabase,
  findSingleFile,
};
