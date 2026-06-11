
export class IotError extends Error {
  status: number;
  description: string;

  constructor(status: number, description: string) {
    super();
    this.name = 'IotError';
    this.status = status;
    this.description = description;
    this.message = `${this.name}: {status:${this.status}, description:"${this.description}"}`;
  }
}
