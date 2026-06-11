import { PropertyOperation, Status } from '@gkct/xiot-core-spec-ts'

function P0_On_doGet(o: PropertyOperation) {
  o.value = '开关'
  console.log('P0_On_doGet: ', o.value)
}

export function S1_Switch_doGet(o: PropertyOperation) {
  if (o.pid == null) {
    return
  }

  switch (o.pid.iid) {
    case 0:
      P0_On_doGet(o)
      break

    default:
      o.status = Status.PROPERTY_NOT_FOUND
      break
  }
}
