import {LocalizedName} from "../../name/LocalizedName";

export class ProductName {
    constructor(
        public original: LocalizedName = new LocalizedName(),
        public candidate: LocalizedName[] = [],
    ) {
    }
}