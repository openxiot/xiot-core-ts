import {Urn} from '../../definition/urn/Urn';
import {Creator} from '../../by/Creator';
import {Updater} from '../../by/Updater';
import {LifeCycle} from '../../lifecycle/Lifecycle';

export class ProductBasic {
  constructor(
    public id: number = 0,
    public organization: string,
    public model: string,
    public template: Urn,
    public name: string,
    public icon: string,
    public upgrade: string[] = [],
    public protocol: string = '',
    public lifecycle: LifeCycle = LifeCycle.DEVELOPMENT,
    public naming: string[] = [],
    public creator: Creator | null = null,
    public updater: Updater | null = null
  ) {
  }
}
