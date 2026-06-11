import {Injectable} from '@angular/core'

import {
    GET_PROPERTIES_METHOD,
    SET_PROPERTIES_METHOD,
    INVOKE_ACTIONS_METHOD,
    DeviceMessage,
    IQQuery,
    QueryGetProperties,
    QueryInvokeActions,
    QueryPing,
    QuerySetProperties,
    XcpDeviceClientBase,
} from '@gkct/xiot-core-xcps-ts'
import {EventID as EID} from '@gkct/xiot-core-spec-ts/dist/xiot/core/spec/typedef/xid/EventID'
import {PropertyID as PID} from '@gkct/xiot-core-spec-ts/dist/xiot/core/spec/typedef/xid/PropertyID'

import {
    Argument,
    DeviceNoticeType,
    EventOperation,
    DeviceImage,
    DeviceImageCodec,
    Status,
    PropertyOperation,
    DevicePropertiesChanged,
    DevicePropertyChanged,
    DeviceEventOccurred, ArgumentOperation
} from '@gkct/xiot-core-spec-ts'
import {SimulatorStatus} from './simulator.status'
import {HttpClient} from '@angular/common/http'
import XcpDeviceClientImpl from "./XcpDeviceClientImpl";

@Injectable()
export class SimulatorService {
    device: DeviceImage = null
    status: SimulatorStatus = SimulatorStatus.UNINITIALIZED

    private client: XcpDeviceClientBase
    private timer: any = null

    constructor(private http: HttpClient) {
    }

    uninitialized(): boolean {
        return this.status === SimulatorStatus.UNINITIALIZED
    }

    initialize(
        serialNumber: string,
        productId: string,
        deviceType: string,
    ) {
        console.log('SimulatorService.initialize')

        if (!this.uninitialized()) {
            this.disconnect()
            this.status = SimulatorStatus.UNINITIALIZED
        }

        this.status = SimulatorStatus.INITIALIZING
        this.client = new XcpDeviceClientImpl(serialNumber, productId, deviceType)
        this.client.addQueryHandler(GET_PROPERTIES_METHOD, query => this.getProperties(query))
        this.client.addQueryHandler(SET_PROPERTIES_METHOD, query => this.setProperties(query))
        this.client.addQueryHandler(INVOKE_ACTIONS_METHOD, query => this.invokeActions(query))
        this.loadInstance(deviceType)
    }

    connect(url: string, key: string, cert: string): Promise<void> {
        this.checkClient()
        this.status = SimulatorStatus.CONNECTING

        const options: any = {
            agent: false,
            key: key,
            cert: cert,
            rejectUnauthorized: false,
        }

        return this.client.connect(url, options).then(x => {
            console.log('connect to xcp server ok!')
            this.status = SimulatorStatus.CONNECTED
            if (this.timer == null) {
                this.timer = setInterval(() => this.doKeepalive(), 1000 * 30)
            }

            return x
        })
    }

    disconnect(): void {
        this.status = SimulatorStatus.DISCONNECTING
        this.checkClient()
        if (this.timer != null) {
            clearInterval(this.timer)
            this.timer = null
        }
        this.status = SimulatorStatus.DISCONNECTED
        return this.client.disconnect()
    }

    notifyService(iid: number) {
        const service = this.device.services.get(iid)
        const properties = service.getProperties().filter(x => x.value.isChanged)
        const operations = properties.map(x => {
            const o = new PropertyOperation()
            o.pid = PID.create(this.client.getDeviceId(), iid, x.iid)
            o.value = x.value.currentValue.getObjectValue()
            return o
        })

        if (operations.length === 0) {
            return
        }

        // 发送属性变化消息
        const record = new DevicePropertiesChanged(0, operations)
        const message = new DeviceMessage(this.client.getNextStanzaId(), DeviceNoticeType.PROPERTIES_CHANGED, record)
        this.client.sendMessage(message)

        // this.client.sendQuery(new QueryPropertiesChanged(this.client.getNextStanzaId(), '', operations))
        //   .then(result => {
        //     if (result instanceof ResultPropertiesChanged) {
        //       result.properties.forEach(x => {
        //         console.log(x.pid.toString() + ' => status: ' + x.status);
        //         const property = service.properties.get(x.pid.iid);
        //         property.result.status = x.status;
        //         property.result.description = x.description;
        //       });
        //     }
        //   })
        //   .catch(e => {
        //     console.log('send properties changed failed: ', e);
        //   });
    }

    notifyProperty(siid: number, piid: number) {
        const service = this.device.services.get(siid)
        const property = service.properties.get(piid)

        const o = new PropertyOperation()
        o.pid = PID.create(this.client.getDeviceId(), siid, property.iid)
        o.value = property.value.currentValue.getObjectValue()

        // 发送属性变化消息
        const record = new DevicePropertyChanged(0, o)
        const message = new DeviceMessage(this.client.getNextStanzaId(), DeviceNoticeType.PROPERTIES_CHANGED, record)
        this.client.sendMessage(message)

        // this.client.sendQuery(new QueryPropertiesChanged(this.client.getNextStanzaId(), '', operations))
        //   .then(result => {
        //     if (result instanceof ResultPropertiesChanged) {
        //       result.properties.forEach(x => {
        //         console.log(x.pid.toString() + ' => status: ' + x.status);
        //         const property = service.properties.get(x.pid.iid);
        //         property.result.status = x.status;
        //         property.result.description = x.description;
        //       });
        //     }
        //   })
        //   .catch(e => {
        //     console.log('send properties changed failed: ', e);
        //   });
    }

    sendEvent(siid: number, eiid: number) {
        const service = this.device.services.get(siid)
        const event = service.events.get(eiid)
        const params: ArgumentOperation[] = event.getArguments().map(x => new ArgumentOperation(x.piid, x.values))
        params.forEach(x => {
            const p = service.properties.get(x.piid)
            x.values = [p.value.currentValue.getObjectValue()]
        })
        const operation = new EventOperation()
        operation.eid = EID.create(this.client.getDeviceId(), siid, eiid)
        operation.setArguments(params)

        // 发送事件消息
        const record = new DeviceEventOccurred(0, operation)
        const message = new DeviceMessage(this.client.getNextStanzaId(), DeviceNoticeType.EVENT_OCCURRED, record)
        this.client.sendMessage(message)

        // this.client.sendQuery(new QueryEventOccurred(this.client.getNextStanzaId(), operation))
        //   .then(result => {
        //     if (result instanceof ResultPropertiesChanged) {
        //       result.properties.forEach(x => {
        //         console.log(x.pid.toString() + ' => status: ' + x.status);
        //         const property = service.properties.get(x.pid.iid);
        //         property.result.status = x.status;
        //         property.result.description = x.description;
        //       });
        //     }
        //   })
        //   .catch(e => {
        //     console.log('send properties changed failed: ', e);
        //   });
    }

    private loadInstance(deviceType: string): void {
        const url = 'http://localhost:4200/assets/instances/' + encodeURIComponent(deviceType.replace(":", "_"))
        console.log('loadInstance: ', url)

        this.http.get(url).subscribe(data => {
            console.log('loadInstance: ', data)
            this.device = DeviceImageCodec.decode('aaa', data['content'])
            this.status = SimulatorStatus.INITIALIZED
            this.status = SimulatorStatus.DISCONNECTED
        })
    }

    private getProperties(query: IQQuery): void {
        if (query instanceof QueryGetProperties) {
            this.device.tryRead(query.properties)
            this.client.sendResult(query.result(query.properties))
        } else {
            this.client.sendError(query.error(Status.UNDEFINED, 'invalid query'))
        }
    }

    private setProperties(query: IQQuery): void {
        if (query instanceof QuerySetProperties) {
            this.device.tryWrite(query.properties, true)
            this.client.sendResult(query.result(query.properties))
        } else {
            this.client.sendError(query.error(Status.UNDEFINED, 'invalid query'))
        }
    }

    private invokeActions(query: IQQuery): void {
        if (query instanceof QueryInvokeActions) {
            this.device.tryInvoke(query.actions)
            this.client.sendResult(query.result(query.actions))
        } else {
            this.client.sendError(query.error(Status.UNDEFINED, 'invalid query'))
        }
    }

    private doKeepalive(): void {
        this.checkClient()
        this.client
            .sendQuery(new QueryPing(this.client.getNextStanzaId()))
            .then(x => {
                console.log('recv pong: ', x.id)
            })
            .catch(e => {
                console.log('ping failed: ', e)
            })
    }

    private checkClient() {
        if (this.client == null) {
            throw new Error('client not create!')
        }
    }
}
