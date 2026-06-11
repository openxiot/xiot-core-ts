import { PropertyOperation, Status, PropertyID } from '@loach/xiot-core-spec-ts'

const services: any = [
  {
    iid: 0,
    properties: [
      {
        iid: 0,
        value: 100 // [0, 100, 1]
      },
      {
        iid: 1,
        value: false
      },
      {
        iid: 2,
        value: false
      }
    ]
  },
  {
    iid: 1,
    properties: [
      {
        iid: 0,
        value: 97 // [0, 100, 1]
      },
      {
        iid: 1,
        value: 100
      },
      {
        iid: 2,
        value: true
      }
    ]
  },
  {
    iid: 2,
    properties: [
      {
        iid: 0,
        value: false
      },
      {
        iid: 1,
        value: 87 // [0, 100, 1]
      },
      {
        iid: 2,
        value: 0
      }
    ]
  }
]

export function getProperty(o: PropertyOperation) {
  if (o.pid === null) {
    return
  }
  console.log(o)
  const s = services.find((service: any) => service.iid === o.pid.siid)
  if (s) {
    const property = s.properties.find((p: any) => p.iid === o.pid.iid)
    if (property) {
      o.value = property.value
    } else {
      o.status = Status.PROPERTY_NOT_FOUND
    }
  } else {
    o.status = Status.SERVICE_NOT_FOUND
  }
}

export function setProperty(o: PropertyOperation) {
  if (o.pid === null) return

  const s = services.find((service: any) => service.iid === o.pid.siid)
  if (s) {
    const propertyIndex = s.properties.findIndex((p: any) => p.iid === o.pid.iid)
    if (s.properties[propertyIndex]) {
      s.properties[propertyIndex].value = o.value
    } else {
      o.status = Status.PROPERTY_NOT_FOUND
    }
  } else {
    o.status = Status.SERVICE_NOT_FOUND
  }
}
