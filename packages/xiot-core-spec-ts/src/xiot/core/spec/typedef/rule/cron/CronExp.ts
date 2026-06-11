
/**
 * cron表达式解析类，终端设置定时器时可用，支持单独设置某一项
 * toString()方法返回cron表达式
 * 基于一般闹钟的逻辑，时分秒只支持有意义的整数型值，不支持形如*、1/5、23-56等范围
 * 格式暂定，实际使用中需要继续优化
 * Author zhanghaitao039
 */
export class CronExp {
  private _second = 0;
  private _minute = 0;
  private _hour = 0;
  private _day = '*';
  private _month = '*';
  private _week = '?';
  private _year = '';

  get second(): number {
    return this._second;
  }

  set second(value: number) {
    if (value >= 0 && value <= 59) {
      this._second = value;
    } else {
      throw new Error(`minute part should between 0 and 23 or be *, but [${value}]`);
    }
  }

  get minute(): number {
    return this._minute;
  }

  set minute(value: number) {
    if (value >= 0 && value <= 59) {
      this._minute = value;
    } else {
      throw new Error(`minute part should between 0 and 23 or be *, but [${value}]`);
    }
  }

  get hour(): number {
    return this._hour;
  }

  set hour(value: number) {
    if (value >= 0 && value <= 23) {
      this._hour = value;
    } else {
      throw new Error(`hour part should between 0 and 23 or be *, but [${value}]`);
    }
  }

  get day(): string {
    return this._day;
  }

  set day(value: string) {
    if ('*' === value) {
      this._day = value;
    } else if (parseInt(value, 10) >= 1 && parseInt(value, 10) <= 31) {
      this._day = value;
    } else {
      throw new Error(`day part should between 1 and 31 or be *, but [${value}]`);
    }
  }

  get month(): string {
    return this._month;
  }

  set month(value: string) {
    if ('*' === value) {
      this._month = value;
    } else if (parseInt(value, 10) >= 1 && parseInt(value, 10) <= 12) {
      this._month = value;
    } else {
      throw new Error(`month part should between 1 and 12 or be *, but [${value}]`);
    }
  }

  get week(): string {
    return this._week;
  }

  set week(value: string) {
    this._week = value;
  }

  get year(): string {
    return this._year;
  }

  set year(value: string) {
    this._year = value;
  }

  toString(): string {
    let str = `${this.second} ${this.minute} ${this.hour} ${this.day} ${this.month} ${this.week}`;

    if (this.year !== null && this.year !== undefined && this.year.length > 0) {
      str += ` ${this.year}`;
    }

    return str;
  }
}
