import fileUpload from 'express-fileupload';

// type File = {
//   name: string;
//   size: number;
//   mimetype: string;
//   ext: string;
//   timestamp: Date;
//   pathname: string;
// };

type FileData = {
  dataBuffer: fileUpload.UploadedFile['data'] | null;
  name: fileUpload.UploadedFile['name'];
  size: fileUpload.UploadedFile['size'];
  mimetype: fileUpload.UploadedFile['mimetype'];
};

export { /* File,*/ FileData };
