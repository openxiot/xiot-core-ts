import {Notice, NoticeCodec} from "@gkct/xiot-core-spec-ts";


export interface XcpEventClient {

    connect(url: string): void;

    disconnect(): void;

    addExceptionHandler(handler: () => void): void;

    addEventHandler(topic: string, codec: NoticeCodec<Notice, any>, handler: (notice: Notice) => void ): void;
}