import {Urn} from '../../definition/urn/Urn';
import {Creator} from '../../by/Creator';
import {Updater} from '../../by/Updater';
import {LifeCycle} from '../../lifecycle/Lifecycle';
import {LocalizedName} from "../../name/LocalizedName";

export class ProductBasic {
    constructor(
        public id: string,
        public organization: string,
        public model: string,
        public template: Urn,
        public icon: string,
        public name: LocalizedName = new LocalizedName(),
        public alias: LocalizedName[] = [],
        public upgrade: string[] = [],
        public protocol: string = '',
        public lifecycle: LifeCycle = LifeCycle.DEVELOPMENT,
        public creator: Creator | null = null,
        public updater: Updater | null = null
    ) {
    }
}

export class ProductName {
    constructor(
        public original: LocalizedName = new LocalizedName(),
        public candidate: LocalizedName[] = [],
    ) {
    }
}