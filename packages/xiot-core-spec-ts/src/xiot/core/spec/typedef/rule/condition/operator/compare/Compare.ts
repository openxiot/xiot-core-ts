import {isBoolean, isNumber, isString} from '../../../../utils/StringUtils';

export interface Compare {
  check(left: Object, right: Object): boolean;
}

export class CompareEqual implements Compare {

  check(left: Object, right: Object): boolean {
    if (isString(left) && isString(right)) {
      return left === right;
    }

    if (isNumber(left) && isNumber(right)) {
      return left === right;
    }

    if (isBoolean(left) && isBoolean(right)) {
      return left === right;
    }

    return false;
  }

}

export class CompareNotEqual implements Compare {

  check(left: Object, right: Object): boolean {
    if (isString(left) && isString(right)) {
      return left !== right;
    }

    if (isNumber(left) && isNumber(right)) {
      return left !== right;
    }

    return false;
  }

}

export class CompareGreater implements Compare {
  check(left: Object, right: Object): boolean {
    if (isNumber(left) && isNumber(right)) {
      return left > right;
    }

    return false;
  }

}

export class CompareGreaterOrEqual implements Compare {
  check(left: Object, right: Object): boolean {
    if (isNumber(left) && isNumber(right)) {
      return left >= right;

    }

    return false;

  }

}

export class CompareLess implements Compare {
  check(left: Object, right: Object): boolean {
    if (isNumber(left) && isNumber(right)) {
      return left < right;

    }

    return false;

  }

}

export class CompareLessOrEqual implements Compare {
  check(left: Object, right: Object): boolean {
    if (isNumber(left) && isNumber(right)) {
      return left <= right;

    }

    return false;

  }

}
