import {Notice, NoticeCodec} from "@gkct/xiot-core-spec-ts";

export class XcpEventHandler {

    constructor(
        private codec: NoticeCodec<Notice, any>,
        private handler: (notice: Notice) => void,
    ) {
    }

    handle = (e: MessageEvent<any>) => {
        const json = JSON.parse(e.data);
        const notice = this.codec.decodeObject(json);
        if (notice !== null) {
            this.handler(notice);
        }
    }
}