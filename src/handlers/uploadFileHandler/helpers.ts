// import { Request } from 'express';
// import { FileData } from '../../utils/types';
// import fileUpload from 'express-fileupload';
// import path from 'node:path';
// import fs from 'node:fs';
// import { saveFileDatabase } from '../../models/fileModule';
//
// // class Handler {
// //   constructor() {}
// //
// //   private toBool() {
// //     return [() => true, () => false];
// //   }
// //
// //   private fileDataBuilder({
// //     dataBuffer = null,
// //     name = '',
// //     size = 0,
// //     mimetype = 'text/plain',
// //   }) {
// //     return { dataBuffer, name, size, mimetype };
// //   }
// //
// //   public async createDir(dirName: string): Promise<string> {
// //     const dataDir = path.resolve(process.cwd(), `src/${dirName}`);
// //     const isDirExists = await fs.promises.access(dataDir).then(...toBool);
// //     if (!isDirExists) {
// //       await fs.promises.mkdir(dataDir, { recursive: true });
// //     }
// //
// //     return dataDir;
// //   }
// //
// //   public prepareFormData(req: Request): FileData {
// //     if (!req.files || Object.keys(req.files).length === 0) {
// //       return this.fileDataBuilder({});
// //     }
// //     const { data } = req.files;
// //     const {
// //       name,
// //       size,
// //       data: dataBuffer,
// //       mimetype,
// //     } = data as unknown as fileUpload.UploadedFile;
// //
// //     return this.fileDataBuilder({
// //       dataBuffer,
// //       name,
// //       size,
// //       mimetype,
// //     });
// //   }
// //
// //   public async saveInFileSystem(
// //     data: FileData,
// //     timestamp: number,
// //   ): Promise<[boolean, string | null]> {
// //     if (!data.dataBuffer) {
// //       return [false, null];
// //     }
// //     const dirPath = await createDir('uploads');
// //     const uniqueFileName = [timestamp.toString(), data.name].join('-');
// //     const filePath = path.join(dirPath, uniqueFileName);
// //
// //     await fs.promises.writeFile(filePath, data.dataBuffer);
// //
// //     return [true, filePath];
// //   }
// //
// //   public async saveStatsInDatabase(
// //     isAvailableToSave: boolean,
// //     data: FileData,
// //     address: string,
// //     timestamp: number,
// //   ) {
// //     if (!isAvailableToSave || !address) {
// //       return null;
// //     }
// //     const ext = path.extname(data.name);
// //
// //     return await saveFileDatabase({
// //       pathname: address,
// //       date: new Date(timestamp),
// //       name: data.name,
// //       size: data.size,
// //       mimetype: data.mimetype,
// //       ext,
// //     });
// //   }
// // }
//
// // До изменений
// const toBool = [() => true, () => false];
// const createDir = async (dirName: string): Promise<string> => {
//   const dataDir = path.resolve(process.cwd(), `src/${dirName}`);
//   const isDirExists = await fs.promises.access(dataDir).then(...toBool);
//   if (!isDirExists) {
//     await fs.promises.mkdir(dataDir, { recursive: true });
//   }
//
//   return dataDir;
// };
// const fileDataBuilder = ({
//   dataBuffer = null,
//   name = '',
//   size = 0,
//   mimetype = 'text/plain',
// }) => {
//   return { dataBuffer, name, size, mimetype };
// };
// const prepareFormData = (req: Request): FileData => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return fileDataBuilder({});
//   }
//   const { data } = req.files;
//   const {
//     name,
//     size,
//     data: dataBuffer,
//     mimetype,
//   } = data as unknown as fileUpload.UploadedFile;
//
//   return fileDataBuilder({
//     dataBuffer,
//     name,
//     size,
//     mimetype,
//   });
// };
//
// const saveInFileSystem = async (
//   data: FileData,
//   timestamp: number,
// ): Promise<[boolean, string | null]> => {
//   if (!data.dataBuffer) {
//     return [false, null];
//   }
//   const dirPath = await createDir('uploads');
//   const uniqueFileName = [timestamp.toString(), data.name].join('-');
//   const filePath = path.join(dirPath, uniqueFileName);
//
//   await fs.promises.writeFile(filePath, data.dataBuffer);
//
//   return [true, filePath];
// };
//
// const saveStatsInDatabase = async (
//   isAvailableToSave: boolean,
//   data: FileData,
//   address: string,
//   timestamp: number,
// ) => {
//   if (!isAvailableToSave || !address) {
//     return null;
//   }
//   const ext = path.extname(data.name);
//
//   return await saveFileDatabase({
//     pathname: address,
//     date: new Date(timestamp),
//     name: data.name,
//     size: data.size,
//     mimetype: data.mimetype,
//     ext,
//   });
// };
//
// export { prepareFormData, saveInFileSystem, saveStatsInDatabase };
