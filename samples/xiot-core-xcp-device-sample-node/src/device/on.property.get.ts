import { PropertyOperation, Status } from '@gkct/xiot-core-spec-ts'
import { S0_AccessoryInformation_doGet } from './S0_AccessoryInformation_doGet'
import { S1_Switch_doGet } from './S1_Switch_doGet'

export function getProperty(o: PropertyOperation): void {
  if (o.pid == null) {
    return
  }

  switch (o.pid.siid) {
    case 0:
      S0_AccessoryInformation_doGet(o)
      break

    case 1:
      S1_Switch_doGet(o)
      break

    default:
      o.status = Status.SERVICE_NOT_FOUND
      break
  }
}
