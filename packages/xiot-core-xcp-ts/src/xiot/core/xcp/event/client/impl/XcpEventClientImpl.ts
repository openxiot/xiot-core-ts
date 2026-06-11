import { NoticeCodec, Notice } from "@gkct/xiot-core-spec-ts";
import {XcpEventClient} from "../XcpEventClient";
import {XcpEventHandler} from "./XcpEventHandler";

export class XcpEventClientImpl implements XcpEventClient {

    private static SSE_EVENT_HEARTBEAT = 'heartbeat';
    private static SSE_EVENT = 'event';
    private static SSE_ID = 'id';
    private static SSE_RETRY = 'retry';
    private static SSE_DATA = 'data';

    private es: EventSource | null = null;
    private handlers: Map<string, XcpEventHandler> = new Map<string, XcpEventHandler>();
    private exceptionHandler: () => void = () => {};

    addExceptionHandler(handler: () => void): void {
        this.exceptionHandler = handler;
    }

    addEventHandler(topic: string, codec: NoticeCodec<Notice, any>, handler: (notice: Notice) => void): void {
        const x = new XcpEventHandler(codec, handler);
        this.handlers.set(topic, x);
        if (this.es !== null) {
            this.es.addEventListener(topic, x.handle);
        }
    }

    connect(url: string): void {
        this.es = new EventSource(url);
        this.es.onopen = this.onOpen;
        this.es.onerror = this.onError;
        this.es.onmessage = this.onMessage;

        this.handlers.forEach((handler, topic) => {
            this.es?.addEventListener(topic, handler.handle)
        })
    }

    disconnect(): void {
        if (this.es !== null) {
            this.es.close();
            this.es = null;
        }
    }

    private onOpen = (e: Event) => {
        console.log('EventSource opened');
    }

    private onError = (e: Event) => {
        console.log('EventSource error: ', e);

        if (this.exceptionHandler) {
            this.exceptionHandler();
        }
    }

    private onMessage = (e: MessageEvent) => {
        console.log('onMessage');
    }
}