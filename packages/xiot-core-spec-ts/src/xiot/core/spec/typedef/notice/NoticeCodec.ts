import {Notice} from './Notice';

export abstract class NoticeCodec<T extends Notice, K> {
  /**
   * main type of notice
   * @return type
   */
  abstract mainType(): string;

  /**
   * encode notice to Object
   * @param record notice
   * @return Object
   */
  abstract encode(record: K): K;

  /**
   * decode Object to notice
   * @param subType subType of notice
   * @param object Object
   * @return notice
   */
  abstract decode(subType: string, object: K): T | null;

  /**
   * decode object to notice
   * @param object Object
   * @return notice
   */
  abstract decodeObject(object: any): T | null;
}
