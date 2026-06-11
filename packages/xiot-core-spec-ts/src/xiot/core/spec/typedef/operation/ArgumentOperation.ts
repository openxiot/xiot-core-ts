export class ArgumentOperation {
  piid: number;
  values: any[];

  constructor(piid: number, values: any[] = []) {
    this.piid = piid;
    this.values = values;
  }

  toString(): string {
    let str = '#' + this.piid + ' = ';

    for (let i = 0; i < this.values.length; i++) {
      const value = this.values[i];

      if ('string' === typeof value) {
        str += `"${value}"`;
      } else {
        str += value.toString();
      }

      if ((i + 1) < this.values.length) {
        str += ', ';
      }
    }

    return str;
  }

  static toString(argumentList: Map<number, ArgumentOperation>, pretty = false, tab = false): string {
    let str = '', i = 1, size = argumentList.size;

    if (pretty) {
      str += `\n    `;
      if (tab) {
        str += '    ';
      }
    }

    argumentList.forEach((o) => {
      str += o.toString();

      if (i < size) {
        str += ',';

        if (pretty) {
          str += `\n    `;

          if (tab) {
            str += '    ';
          }
        } else {
          str += ' ';
        }
      }

      i++;
    });

    return str;
  }
}
