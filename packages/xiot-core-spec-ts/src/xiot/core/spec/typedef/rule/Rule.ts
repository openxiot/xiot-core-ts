import {RuleContent} from './RuleContent';
import {AbstractOperation} from '../operation/AbstractOperation';
import {AbstractCondition} from './condition/AbstractCondition';
import {RuleType} from './RuleType';
import {Somewhere} from "../somewhere/Somewhere";

export class Rule extends Somewhere {
  private _id: string | undefined;
  private _name: string | undefined;
  private _description: Map<string, string> = new Map<string, string>();
  private _content: RuleContent | undefined;
  private _actuator: string | undefined;
  private _enabled: boolean | undefined;
  private _createAt: Date | undefined;
  private _updateAt: Date | undefined;
  private _appId: string | undefined;
  private _ownerId: string | undefined;

  static create(operations: Array<AbstractOperation>): Rule {
    const instance = new Rule();
    instance.content = new RuleContent(null, null, operations);

    return instance;
  }

  static createWithCondition(condition: AbstractCondition, operations: Array<AbstractOperation>): Rule {
    const instance = new Rule();
    instance.content = new RuleContent(null, condition, operations);

    return instance;
  }

  public createAtString(): string {
    if (this._createAt === undefined) {
      return '';
    }

    return `${this._createAt.getFullYear()}-${this._createAt.getMonth() + 1}-${this._createAt.getDate()} ${this._createAt.getHours()}:${this._createAt.getMinutes()}`;
  }

  public updateAtString(): string {
    if (this._updateAt === undefined) {
      return '';
    }

    return `${this._updateAt.getFullYear()}-${this._updateAt.getMonth() + 1}-${this._updateAt.getDate()} ${this._updateAt.getHours()}:${this._updateAt.getMinutes()}`;
  }

  get id(): string {
    return <string>this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get name(): string {
    return <string>this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get description(): Map<string, string> {
    return this._description;
  }

  set description(value: Map<string, string>) {
    if (value !== null && value !== undefined) {
      this._description = value;
    }
  }

  get content(): RuleContent {
    return <RuleContent>this._content;
  }

  get type(): RuleType {
    if (this.content.trigger === null || this.content.trigger === undefined) {
      return RuleType.MANUAL;
    }

    return RuleType.AUTOMATION;
  }

  set content(value: RuleContent) {
    this._content = value;
  }

  get actuator(): string {
    return <string>this._actuator;
  }

  set actuator(value: string) {
    this._actuator = value;
  }

  get enabled(): boolean {
    return <boolean>this._enabled;
  }

  set enabled(value: boolean) {
    this._enabled = value;
  }

  get createAt(): Date {
    return <Date>this._createAt;
  }

  set createAt(value: Date) {
    this._createAt = value;
  }

  get updateAt(): Date {
    return <Date>this._updateAt;
  }

  set updateAt(value: Date) {
    this._updateAt = value;
  }

  get appId(): string {
    return <string>this._appId;
  }

  set appId(value: string) {
    this._appId = value;
  }

  get ownerId(): string {
    return <string>this._ownerId;
  }

  set ownerId(value: string) {
    this._ownerId = value;
  }

  private nonValue(value: any): boolean {
    return value !== undefined && value !== null;
  }

  update(other: Rule): boolean {
    let changed = false;

    if (other !== this) {
      return false;
    }

    if (!this.nonValue(this.id)) {
      return false;
    }

    if (this.id !== other.id) {
      return false;
    }

    if (this.nonValue(this.name)) {
      if (this.name !== other.name) {
        this.name = other.name;
        changed = true;
      }
    } else {
      if (this.nonValue(other.name)) {
        this.name = other.name;
        changed = true;
      }
    }

    this.description = other.description;

    if (this.nonValue(this.content)) {
      if (this.nonValue(other.content)) {
        if (this.content.toString() !== other.content.toString()) {
          this.content = other.content;
          changed = true;
        }
      } else {
        this.content = other.content;
        changed = true;
      }
    } else {
      if (this.nonValue(other.content)) {
        this.content = other.content;
        changed = true;
      }
    }

    if (this.createAt !== other.createAt) {
      this.createAt = other.createAt;
      changed = true;
    }

    if (this.updateAt !== other.updateAt) {
      this.updateAt = other.updateAt;
      changed = true;
    }

    if (this.enabled !== other.enabled) {
      this.enabled = other.enabled;
      changed = true;
    }

    if (this.nonValue(this.actuator)) {
      if (this.actuator !== other.actuator) {
        this.actuator = other.actuator;
        changed = true;
      }
    } else {
      if (this.nonValue(other.actuator)) {
        this.actuator = other.actuator;
        changed = true;
      }
    }

    return changed;
  }
}
