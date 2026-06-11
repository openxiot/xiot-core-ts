import { ActionOperation, Status } from '@gkct/xiot-core-spec-ts'

export function invokeActions(actions: ActionOperation[]) {
  actions.forEach(o => {
    o.status = Status.SERVICE_NOT_FOUND
    o.description = 'service not found'
  })
}
