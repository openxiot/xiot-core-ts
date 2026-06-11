import {Status} from "./Status";

export class AbstractStatus {

    status: number = Status.COMPLETED;
    description: string = '';

    public isError(): boolean {
        return (this.status < 0);
    }

    public isNotError(): boolean {
        return (this.status >= 0);
    }

    public isCompleted(): boolean {
        return (this.status == 0);
    }

    public isNotCompleted(): boolean {
        return (this.status == Status.TO_BE_EXECUTE);
    }
}
