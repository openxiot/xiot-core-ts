import {ExternalCondition} from './ExternalCondition';
import {ExternalType} from './ExternalType';
import {ComparisonOperator} from './operator/ComparisonOperator';
import {PropertyID} from '../../xid/PropertyID';
import {EventOperation} from '../../operation/EventOperation';


export class TimeCondition extends ExternalCondition {

  static create(start: string, end: string, weekLoops: string): TimeCondition {
    return new TimeCondition(start + ',' + end + ',' + weekLoops);
  }

  constructor(value: string) {
    super(ExternalType.TIME, value, ComparisonOperator.EQUAL);
    if (!this.checkParam(value)) {
      throw new Error('invalid value, value format like : {HH:mm, HH:mm, weekLoops},' +
          'weekLoops can be 0123456 or 0235 ..., where 0:Sunday,1:Monday,...,6:Saturday');
    }
  }

  start(): string {
    const params = this.value.toString().split(',');
    return params[0].trim();
  }

  end(): string {
    const params = this.value.toString().split(',');
    return params[1].trim();
  }

  weekLoops(): string {
    const params = this.value.toString().split(',');
    return params[2].trim();
  }

  check(externalValues: Map<string, Object>, propertyValues: Map<PropertyID, Object>, event: EventOperation): boolean {
    const now = new Date();

    if (this.weekLoops().indexOf(now.getDay().toString()) < 0) {
      return false;
    }

    const hour = now.getHours();
    const minute = now.getMinutes();
    const startTimes = this.start().split(':');
    const endTimes = this.end().split(':');
    const startHour = parseInt(startTimes[0], 10);
    const endHour = parseInt(endTimes[0], 10);
    const startMinute = parseInt(startTimes[1], 10);
    const endMinute = parseInt(endTimes[1], 10);

    return hour >= startHour && (hour !== startHour || minute >= startMinute)
      && hour <= endHour && (hour !== endHour || minute <= endMinute);
  }

  private checkParam(value: string): boolean {
    const params = value.split(',');

    if (params.length !== 3) {
      return false;
    }

    const start = params[0].trim();
    const end = params[1].trim();
    const weekLoops = params[2].trim();

    return this.checkHourMinuteTime(start) && this.checkHourMinuteTime(end) && this.checkWeekLoops(weekLoops);
  }

  private checkHourMinuteTime(hourMinuteTime: string): boolean {
    const hour = parseInt(hourMinuteTime.substring(0, 1), 10);
    const minute = parseInt(hourMinuteTime.substring(3, 4), 10);

    return hour >= 0 && hour < 24
      && minute >= 0 && minute < 60
      && hourMinuteTime.charAt(2) === ':';
  }

  private checkWeekLoops(weekLoops: string): boolean {
    // weekLoops 不重复的7位以下的数字，数字为0-6,最多7位数，最少1位数
    const tmp = new Uint8Array(7);
    const zeroCharCode = '0'.charCodeAt(0);

    for (let i = 0; i < weekLoops.length; i++) {
      if (weekLoops.charAt(i) < '0' || weekLoops.charAt(i) >= '7') {
        return false;
      }
      tmp[weekLoops.charCodeAt(i) - zeroCharCode ] += 1;
    }

    let count = 0;
    for (let i = 0; i < 7; i++) {
      if (tmp[i] > 1) {
        return false;
      }

      if (tmp[i] === 1) {
        count++;
      }
    }

    return count <= 7 && count >= 1;
  }

}
