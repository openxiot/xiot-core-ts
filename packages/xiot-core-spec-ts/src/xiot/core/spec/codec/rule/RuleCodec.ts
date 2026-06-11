import {Rule} from '../../typedef/rule/Rule';
import {RuleContentParser} from '../../typedef/rule/parser/RuleContentParser';
import {RuleType} from '../../typedef/rule/RuleType';


export class RuleCodec {
  static decode(o: any): Rule {
    const rule = new Rule();

    rule.id = o.id;
    rule.name = o.name;
    rule.description = o.description;
    rule.content = RuleContentParser.parse(o.content);
    rule.actuator = o.actuator;
    rule.enabled = o.enabled;
    rule.appId = o.appId;
    rule.ownerId = o.ownerId;

    if (o.createAt !== undefined) {
      rule.createAt = new Date(o.createAt);
    }

    if (o.updateAt !== undefined) {
      rule.updateAt = new Date(o.updateAt);
    }

    return rule;
  }

  static encode(x: Rule): any {
    const o: any = {
      id: x.id,
      name: x.name,
      description: x.description,
      content: x.content.toString()
    };

    if (x.type !== RuleType.MANUAL) {
      o.enabled = x.enabled;
    }

    if (x.actuator != null) {
      o.actuator = x.actuator;
    }

    if (x.createAt !== undefined) {
      console.log('x.createAt: ', (typeof x.createAt));
      o.createAt = x.createAt.getTime();
    }

    if (x.updateAt !== undefined) {
      console.log('x.updateAt: ', (typeof x.updateAt));
      o.updateAt = x.updateAt.getTime();
    }

    if (x.appId != null) {
      o.appId = x.appId;
    }

    if (x.ownerId != null) {
      o.ownerId = x.ownerId;
    }

    return o;
  }

  static decodeArray(arr: any[]): Rule[] {
    const list: Rule[] = [];
    if (arr != null) {
      for (const o of arr) {
        list.push(this.decode(o));
      }
    }
    return list;
  }

  static encodeArray(x: Rule[]): any[] {
    const arr: any[] = [];
    if (x?.length) {
      for (const p of x) {
        arr.push(this.encode(p));
      }
    }
    return arr;
  }
}
