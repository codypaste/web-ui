export enum ErrorTypes {
  ENCRYPTION_ERROR = 'ENCRYPTION_ERROR'
}

export class EncryptionError {
  type: string;
  message: string;
  constructor(msg?: string) {
    this.type = ErrorTypes.ENCRYPTION_ERROR;
    this.message = msg || '';
  }
}
