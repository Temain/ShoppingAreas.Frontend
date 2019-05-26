export class FileEntity {
  fileName: string;
  fileType: string;
  fileData: string;

  constructor(fileName: string, fileType: string, fileData: string) {
      this.fileName = fileName;
      this.fileType = fileType;
      this.fileData = fileData;
  }
}
