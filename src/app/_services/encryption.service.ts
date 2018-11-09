import { Injectable } from '@angular/core';
import * as uuid from 'uuid/v4';
import * as aesjs from 'aes-js';

export class EncryptionKey {
  key: number[];
  normalized: string;
}

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  generate256BitKey(): EncryptionKey {
    const key = new EncryptionKey();
    const u = uuid();
    key.normalized = u.split('').filter(char => char !== '-').join('');
    key.key = key.normalized.split('').map(char => char.charCodeAt(0));
    return key;
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
