import {Action} from '../instance/Action';
import {ArgumentImage} from './ArgumentImage';
import {Property} from '../instance/Property';
import {ActionType} from '../definition/urn/ActionType';
import {ActionOperation} from '../operation/ActionOperation';
import {Status} from '../status/Status';
import {Argument} from '../instance/Argument';

export class ActionImage extends Action {

  static of(action: Action): ActionImage {
    return new ActionImage(
        action.iid,
        action.type,
        action.description,
        action.getArgumentsIn().map(x => ArgumentImage.fromArgument(x)),
        action.getArgumentsOut().map(x => ArgumentImage.fromArgument(x))
    );
  }

  static addValues(argument: ArgumentImage, property: Property, values: any[]) {
    for (let i = 0; i < values.length; ++i) {
      const newProperty: Property = Property.copy(property);
      newProperty.iid = argument.piid;
      newProperty.type._index = i;
      newProperty.type._optional = false;
      newProperty.setValue(values[i]);
      argument.properties.push(newProperty);
    }
  }

  constructor(
    iid: number,
    type: ActionType,
    description: Map<string, string>,
    argumentsIn: ArgumentImage[],
    argumentsOut: ArgumentImage[]
  ) {
    super(iid, type, description, argumentsIn, argumentsOut);
  }

  override getArgumentsIn(): ArgumentImage[] {
    return super
      .getArgumentsIn()
      .filter(x => x instanceof ArgumentImage)
      .map(x => <ArgumentImage>x);
  }

  override getArgumentsOut(): ArgumentImage[] {
    return super
      .getArgumentsOut()
      .filter(x => x instanceof ArgumentImage)
      .map(x => <ArgumentImage>x);
  }

  tryInvoke(o: ActionOperation, properties: Map<number, Property>) {
    console.log('tryInvoke');

    o.status = <number>Status.COMPLETED;

    for (const argument of this.getArgumentsIn()) {
      const iid: number = argument.piid;
      const v = o.in.get(iid);
      if (v == null) {
        if (argument.minRepeat > 0) {
          o.status = <number>Status.ACTION_IN_ERROR;
          o.description = `action argument in error, piid(${iid}) min repeat > 0`;
          break;
        }

        continue;
      }

      const property = properties.get(iid);
      if (property == null) {
        o.status = <number>Status.ACTION_IN_VALUE_INVALID;
        o.description = `action argument in error, piid(${iid}) value invalid`;
        break;
      }

      if (!property.trySetValues(v.values)) {
        o.status = <number>Status.ACTION_IN_VALUE_INVALID;
        o.description = `action argument in error, piid(${iid}) set value failed`;
        break;
      }

      ActionImage.addValues(argument, property, v.values);
    }

    if (o.status !== <number>Status.COMPLETED) {
      return;
    }

    const out: Argument[] = this.getArgumentsOut().map(x => {
      const a = new Argument(x.piid);
      a.values = x.properties.map(p => p.value.currentValue?.rawValue());
      return a;
    });

    o.setArgumentsOut(out);
  }
}
