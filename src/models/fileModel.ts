import { model, Schema } from 'mongoose';

export type File = {
  name: string;
  size: number;
  mimetype: string;
  ext: string;
  createdAt: Date;
  pathname: string;
};

const fileSchema = new Schema<File>({
  name: { type: String, required: true },
  size: { type: Number, required: true },
  mimetype: { type: String, required: true },
  ext: { type: String, required: true },
  createdAt: { type: Date, required: true },
  pathname: { type: String, required: true },
});

const FileModel = model<File>('File', fileSchema);

export { FileModel };
