import { model, Schema } from 'mongoose';

export type FileModule = {
  name: string;
  size: number;
  mimetype: string;
  ext: string;
  date: Date;
  pathname: string;
};

// 2. Create a Schema corresponding to the document interface.
const fileSchema = new Schema<FileModule>({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
  ext: { type: String, required: true },
  date: { type: Date, required: true },
  pathname: { type: String, required: true },
});

const File = model<FileModule>('File', fileSchema);

const saveFileDatabase = async ({
  pathname, name, size, mimetype, ext, date,
}: FileModule) => {
  const file = new File({
    pathname,
    name,
    size,
    mimetype,
    ext,
    date,
  });

  return await file.save();
};

const findFilesDatabase = async (limit = 2, page = 1) => {
  const files = await File.find()
    .limit(limit)
    .skip(limit * (page - 1));

  return files;
};

const deleteFileDatabase = async (id: string): Promise<FileModule | null> => {
  return await File.findByIdAndRemove(id).exec();
};

const findSingleFile = async (id: string) => {
  return await File.findById(id).exec();
};

export {
  saveFileDatabase,
  findFilesDatabase,
  deleteFileDatabase,
  findSingleFile,
};
