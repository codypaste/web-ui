import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';
import * as aesjs from 'aes-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  generate256BitKey(): number[] {
    return uuid().split('').filter(char => char !== '-').map(char => char.charCodeAt(0));
  }

  encrypt(s: string, key: number[]): string {
    const textBytes = aesjs.utils.utf8.toBytes(s);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const encryptedBytes = aesCtr.encrypt(textBytes);

    const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encryptedHex;
  }

  decrypt(encrypted: string, key: string): string {
    const encryptedBytes = aesjs.utils.hex.toBytes(encrypted);

    const aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    const decryptedBytes = aesCtr.decrypt(encryptedBytes);

    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    return decryptedText;
  }
}
