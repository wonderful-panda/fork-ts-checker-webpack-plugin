import ts = require('typescript');
import tslint = require('tslint');

export interface FilesRegisterData {
  source: ts.SourceFile;
  linted: boolean;
  lints: tslint.RuleFailure[];
}

export class FilesRegister {
  static EMPTY_DATA: FilesRegisterData = {
    source: undefined,
    linted: false,
    lints: []
  };

  files: { [filePath: string]: { mtime: number; data: FilesRegisterData; }};

  constructor() {
    this.files = {};
  }

  keys() {
    return Object.keys(this.files);
  }

  add(filePath: string) {
    this.files[filePath] = {
      mtime: undefined,
      data: Object.assign({}, FilesRegister.EMPTY_DATA)
    };
  }

  remove(filePath: string) {
    if (this.has(filePath)) {
      delete this.files[filePath];
    }
  }

  has(filePath: string) {
    return this.files.hasOwnProperty(filePath);
  }

  get(filePath: string) {
    if (!this.has(filePath)) {
      throw new Error('File "' + filePath + '" not found in register.');
    }

    return this.files[filePath];
  }

  ensure(filePath: string) {
    if (!this.has(filePath)) {
      this.add(filePath);
    }
  }

  getData(filePath: string) {
    return this.get(filePath).data;
  }

  mutateData(filePath: string, mutator: (data: FilesRegisterData) => void) {
    this.ensure(filePath);

    mutator(this.files[filePath].data);
  }

  getMtime(filePath: string) {
    return this.get(filePath).mtime;
  }

  setMtime(filePath: string, mtime: number) {
    this.ensure(filePath);

    if (this.files[filePath].mtime !== mtime) {
      this.files[filePath].mtime = mtime;
      // file has been changed - we have to reset data
      this.files[filePath].data = Object.assign({}, FilesRegister.EMPTY_DATA);
    }
  }
}
