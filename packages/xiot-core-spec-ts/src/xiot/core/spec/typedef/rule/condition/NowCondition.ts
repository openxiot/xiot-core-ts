import {ExternalCondition} from './ExternalCondition';
import {ComparisonOperator} from './operator/ComparisonOperator';
import {ExternalType} from './ExternalType';

export class NowCondition extends ExternalCondition {

  constructor(cron: string) {
    super(ExternalType.NOW, cron, ComparisonOperator.EQUAL);
  }

  cron(): string {
    return this.value.toString();
  }

}
