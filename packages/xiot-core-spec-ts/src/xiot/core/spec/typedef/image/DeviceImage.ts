import {DeviceInstance} from '../instance/DeviceInstance';
import {Summary} from '../summary/Summary';
import {DeviceType} from '../definition/urn/DeviceType';
import {ServiceImage} from './ServiceImage';
import {PropertyOperation} from '../operation/PropertyOperation';
import {ActionOperation} from '../operation/ActionOperation';
import {EventOperation} from '../operation/EventOperation';
import {Status} from '../status/Status';

export class DeviceImage extends DeviceInstance {
  public did = '';

  public summary: Summary | null = null;

  public children: Map<string, DeviceImage> = new Map<string, DeviceImage>();

  public parentFound = false;

  static createTrees(nodes: DeviceImage[]): DeviceImage[] {
    const size = nodes.length;

    for (let i = 0; i < size; ++i) {
      for (let j = i + 1; j < size; ++j) {
        const a: DeviceImage = nodes[i];
        const b: DeviceImage = nodes[j];

        if (a.did === b.did) {
          continue;
        }

        // A is B's parent
        if (b.summary == null) {
          continue;
        }

        if (a.did === b.summary.parentId) {
          b.parentFound = true;
          a.children.set(b.did, b);
          continue;
        }

        // B is A's parent
        if (a.summary == null) {
          continue;
        }

        if (b.did === a.summary.parentId) {
          a.parentFound = true;
          b.children.set(a.did, a);
        }
      }
    }

    return nodes.filter(x => !x.parentFound);
  }

  static of(did: string, device: DeviceInstance): DeviceImage {
    return new DeviceImage(did, device.type, device.description, device.getServices().map(x => ServiceImage.of(x)));
  }

  constructor(did: string, type: DeviceType, description: Map<string, string>, services: ServiceImage[]) {
    super(type, description, services);
    this.did = did;
  }

  online(value: boolean): void {
    if (this.summary != null) {
      this.summary.online = value;
    }

    for (const child of this.children.values()) {
      child.online(value);
    }
  }

  tryRead(list: Array<PropertyOperation>): void {
    for (const o of list) {
      this.tryReadProperty(o);
    }
  }

  tryWrite(list: Array<PropertyOperation>, save: boolean) {
    for (const o of list) {
      this.tryWriteProperty(o, save);
    }
  }

  tryInvoke(list: Array<ActionOperation>) {
    for (const o of list) {
      this.tryInvokeAction(o);
    }
  }

  tryEventOccurred(o: EventOperation) {
    if (o.eid == null) {
      o.status = Status.EID_INVALID;
      o.description = 'EventId INVALID';
      return;
    }

    const device = this.getNode(o.eid.did);
    if (device) {
      const service = device.services.get(o.eid.siid);
      if (service) {
        if (service instanceof ServiceImage) {
          service.tryEventOccurred(o);
        } else {
          o.status = Status.INTERNAL_ERROR;
          o.description = 'service is not ServiceImage';
        }
      } else {
        o.status = Status.SERVICE_NOT_FOUND;
        o.description = 'service not found';
      }
    } else {
      o.status = Status.DEVICE_ID_NOT_EXIST;
      o.description = `device not found, root: ${this.did}`;
    }
  }

  private tryReadProperty(o: PropertyOperation): void {
    if (o.pid == null) {
      o.status = Status.PID_INVALID;
      o.description = 'PropertyID INVALID';
      return;
    }

    const device = this.getNode(o.pid?.did);
    if (device != null) {
      const service = device.services.get(o.pid.siid);
      if (service != null) {
        if (service instanceof ServiceImage) {
          service.tryRead(o);
        } else {
          o.status = Status.INTERNAL_ERROR;
          o.description = 'service is not ServiceImage';
        }
      } else {
        o.status = Status.SERVICE_NOT_FOUND;
        o.description = 'service not found';
      }
    } else {
      o.status = Status.DEVICE_ID_NOT_EXIST;
      o.description = `device not found, root: ${this.did}`;
    }
  }

  private tryWriteProperty(o: PropertyOperation, save: boolean): void {
    if (o.pid == null) {
      o.status = Status.PID_INVALID;
      o.description = 'PropertyID INVALID';
      return;
    }

    const device = this.getNode(o.pid.did);
    if (device != null) {
      const service = device.services.get(o.pid.siid);
      if (service != null) {
        if (service instanceof ServiceImage) {
          service.tryWrite(o, save);
        } else {
          o.status = Status.INTERNAL_ERROR;
          o.description = 'service is not ServiceImage';
        }
      } else {
        o.status = Status.SERVICE_NOT_FOUND;
        o.description = 'service not found';
      }
    } else {
      o.status = Status.DEVICE_ID_NOT_EXIST;
      o.description = `device not found, root: ${this.did}`;
    }
  }

  private tryInvokeAction(o: ActionOperation) {
    if (o.aid == null) {
      o.status = Status.PID_INVALID;
      o.description = 'ActionID INVALID';
      return;
    }

    const device = this.getNode(o.aid.did);
    if (device != null) {
      const service = device.services.get(o.aid.siid);
      if (service != null) {
        if (service instanceof ServiceImage) {
          service.tryInvoke(o);
        } else {
          o.status = Status.INTERNAL_ERROR;
          o.description = 'service is not ServiceImage';
        }
      } else {
        o.status = Status.SERVICE_NOT_FOUND;
        o.description = 'service not found';
      }
    } else {
      o.status = Status.DEVICE_ID_NOT_EXIST;
      o.description = `device not found, root: ${this.did}`;
    }
  }

  public add(nodes: DeviceImage[]): DeviceImage[] {
    const trees: DeviceImage[] = DeviceImage.createTrees(nodes);

    for (const tree of trees) {
      if (tree.summary != null) {
        if (tree.summary.parentId === this.did) {
          tree.parentFound = true;
          this.children.set(tree.did, tree);
        }
      }
    }

    const result: DeviceImage[] = [];

    for (const tree of trees) {
      if (tree.parentFound) {
        const all: DeviceImage[] = tree.getAll();

        for (const item of all) {
          result.push(item);
        }
      }
    }

    return result;
  }

  private getAll(): DeviceImage[] {
    const list: DeviceImage[] = [];

    list.push(this);

    for (const value of this.children.values()) {
      list.push(...value.getAll());
    }

    return list;
  }

  public addNode(node: DeviceImage): boolean {
    const parent = this.getParent(node);
    if (parent != null) {
      parent.children.set(node.did, node);
      return true;
    }

    return false;
  }

  public removeNode(nodeId: string): DeviceImage | null {
    const node = this.children.get(nodeId);
    if (node != null) {
      this.children.delete(nodeId);
      return node;
    }

    for (const child of this.children.values()) {
      const removed = child.removeNode(nodeId);
      if (removed != null) {
        return removed;
      }
    }

    return null;
  }

  getNode(did: string): DeviceImage | null {
    if (did == null) {
      return null;
    }

    if (this.did === did) {
      return this;
    }

    const child = this.children.get(did);
    if (child != null) {
      return child;
    }

    for (const device of this.children.values()) {
      const node = device.getNode(did);
      if (node != null) {
        return node;
      }
    }

    return null;
  }

  private getParent(node: DeviceImage): DeviceImage | null {
    if (node.did == null) {
      return null;
    }

    if (node.did.length === 0) {
      return null;
    }

    if (node.summary == null) {
      return null;
    }

    if (node.summary.parentId == null) {
      return null;
    }

    if (node.summary.parentId.length === 0) {
      return null;
    }

    if (node.did === node.summary.parentId) {
      return null;
    }

    return this.getNode(node.summary.parentId);
  }

  override getServices(): ServiceImage[] {
    return super
        .getServices()
        .filter(x => x instanceof ServiceImage)
        .map(x => <ServiceImage>x);
  }
}
