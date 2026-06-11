import { PropertyOperation, Status } from '@gkct/xiot-core-spec-ts'
import { S0_AccessoryInformation_doSet } from './S0_AccessoryInformation_doSet'
import { S0_Switch_doSet } from './S1_Switch_doSet'

export function setProperty(o: PropertyOperation): void {
  if (o.pid == null) {
    return
  }

  switch (o.pid.siid) {
    case 0:
      S0_AccessoryInformation_doSet(o)
      break

    case 1:
      S0_Switch_doSet(o)
      break

    default:
      o.status = Status.SERVICE_NOT_FOUND
      break
  }
}
