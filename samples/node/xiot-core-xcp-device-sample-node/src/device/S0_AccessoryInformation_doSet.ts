import { PropertyOperation, Status } from '@gkct/xiot-core-spec-ts'

export function S0_AccessoryInformation_doSet(o: PropertyOperation) {
  if (o.pid == null) {
    return
  }

  switch (o.pid.iid) {
    case 2:
      break

    case 0:
    case 1:
    case 3:
    case 4:
    case 5:
    case 6:
    case 7:
    case 8:
      o.status = Status.PROPERTY_CANNOT_WRITE
      break

    default:
      o.status = Status.PROPERTY_NOT_FOUND
      break
  }
}
