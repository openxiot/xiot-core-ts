import { PropertyOperation, Status } from '@gkct/xiot-core-spec-ts'

export function S0_Switch_doSet(o: PropertyOperation) {
  if (o.pid == null) {
    return
  }

  switch (o.pid.iid) {
    case 0:
      o.status = Status.PROPERTY_CANNOT_WRITE
      break

    default:
      o.status = Status.PROPERTY_NOT_FOUND
      break
  }
}
