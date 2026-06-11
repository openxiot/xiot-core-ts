import {LifeCycle} from './Lifecycle';

export class ObjectWithLifecycle<T> {

  constructor(
    public lifecycle: LifeCycle,
    public value: T
  ) {
  }
}
