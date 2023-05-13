// import { FileModule } from '../../models/fileModule';
// import fs from 'node:fs';
//
// const deleteFileSystemStorage = async (file: FileModule): Promise<boolean> => {
//   if (!file) {
//     return false;
//   }
//
//   await fs.promises.rm(file.pathname, {
//     recursive: true,
//     maxRetries: 2,
//     force: true,
//   });
//
//   return true;
// };
//
// export { deleteFileSystemStorage };
