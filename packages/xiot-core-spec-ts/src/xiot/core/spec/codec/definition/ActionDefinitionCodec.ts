import {ActionDefinition} from '../../typedef/definition/ActionDefinition';
import {ActionType} from '../../typedef/definition/urn/ActionType';
import {DescriptionCodec} from './DescriptionCodec';
import {Spec} from '../../typedef/constant/Spec';
import {ArgumentDefinitionCodec} from './ArgumentDefinitionCodec';


export class ActionDefinitionCodec {
  static decodeArray(list: any[]): ActionDefinition[] {
    const array: ActionDefinition[] = [];

    list.forEach(o => {
      array.push(ActionDefinitionCodec.decode(o));
    });

    return array;
  }

  static decode(o: any): ActionDefinition {
    const type = new ActionType(o[Spec.TYPE]);
    const description = DescriptionCodec.decode(o[Spec.DESCRIPTION]);
    const argumentsIn = ArgumentDefinitionCodec.decodeArray(o[Spec.IN]);
    const argumentsOut = ArgumentDefinitionCodec.decodeArray(o[Spec.OUT]);
    return new ActionDefinition(type, description, argumentsIn, argumentsOut);
  }

  static encode(def: ActionDefinition): any {
    const o: any = {
      type: def.type.toString(),
      description: DescriptionCodec.encode(def.description)
    };

    if (def.in.length > 0) {
      o[Spec.IN] = ArgumentDefinitionCodec.encodeArray(def.in);
    }

    if (def.out.length > 0) {
      o[Spec.OUT] = ArgumentDefinitionCodec.encodeArray(def.out);
    }

    return o;
  }

  static encodeArray(list: ActionDefinition[]): any[] {
    return list.map(x => {
      return ActionDefinitionCodec.encode(x);
    });
  }
}
