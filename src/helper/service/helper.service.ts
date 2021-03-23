import { ConfigService } from '@/common';
import { Injectable } from '@nestjs/common';
import { createHash, createCipheriv, createDecipheriv } from 'crypto';
const ObjProto = Object.prototype;
const toString = ObjProto.toString,
  hasOwnProperty = ObjProto.hasOwnProperty;

@Injectable()
export class HelperService {
  constructor(private config: ConfigService) {}
  isArray(anyOpt): boolean {
    return toString.call(anyOpt) === '[object Array]';
  }

  isString(obj): boolean {
    return toString.call(obj) === '[object String]';
  }

  isArguments(obj): boolean {
    return toString.call(obj) === '[object Arguments]';
  }
  has(obj, key: string) {
    return obj != null && hasOwnProperty.call(obj, key);
  }

  isEmpty(anyOpt: any): boolean {
    if (anyOpt == null) {
      return true;
    }
    if (
      this.isArray(anyOpt) ||
      this.isString(anyOpt) ||
      this.isArguments(anyOpt)
    ) {
      return anyOpt.length === 0;
    }
    for (const key in anyOpt) {
      if (this.has(anyOpt, key)) {
        return false;
      }
    }
    return true;
  }

  cryptoMd5(defaultStr: string) {
    const saltStr = this.config.get('auth') + defaultStr;
    const md5 = createHash('md5');
    return md5.update(saltStr).digest('hex');
  }

  aesEncrypt(data, key, iv) {
    let sign = '';
    const cipher = createCipheriv('aes-128-cbc', key, iv);
    sign += cipher.update(data, 'utf8', 'hex');
    sign += cipher.final('hex');
    return sign;
  }

  aesDecrypt(encrypted, key, iv) {
    let src = '';
    const cipher = createDecipheriv('aes-128-cbc', key, iv);
    src += cipher.update(encrypted, 'hex', 'utf8');
    src += cipher.final('utf8');
    return src;
  }

  flatten(arr, depth = 1) {
    return arr.reduce(
      (a, v) =>
        a.concat(
          depth > 1 && Array.isArray(v) ? this.flatten(v, depth - 1) : v,
        ),
      [],
    );
  }

  toSnakeCase(str): string {
    return (
      str &&
      str
        .match(
          /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g,
        )
        .map((x) => x.toLowerCase())
        .join('_')
    );
  }

  toColumField(obj = {}) {
    const columObj = {};
    Object.keys(obj).forEach((key) => {
      const snakeKey = this.toSnakeCase(key);
      columObj[snakeKey] = obj[key];
    });
    return columObj;
  }
}
