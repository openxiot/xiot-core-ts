import {LifeCycle} from './Lifecycle';

export abstract class WithLifecycle {

  lifecycle: LifeCycle = LifeCycle.UNDEFINED;
}
