import { PropertyOperation, Status } from '@gkct/xiot-core-spec-ts'

function P0_Hardware_Revision(o: PropertyOperation) {
  o.value = '硬件版本XXX'
  console.log('P0_Hardware_Revision: ', o.value)
}

function P1_Accessory_Flags(o: PropertyOperation) {
  o.value = '配件属性XXX'
  console.log('P1_Accessory_Flags: ', o.value)
}

function P2_Identify_doGet(o: PropertyOperation) {
  o.value = '辨认XXX'
  console.log('P2_Identify_doGet: ', o.value)
}

function P3_Manufacturer_doGet(o: PropertyOperation) {
  o.value = '制造商XXX'
  console.log('P3_Manufacturer_doGet: ', o.value)
}

function P4_Model_doGet(o: PropertyOperation) {
  o.value = 'ld02'
  console.log('P4_Model_doGet: ', o.value)
}

function P5_Name_doGet(o: PropertyOperation) {
  o.value = 'switch'
  console.log('P5_Name_doGet: ', o.value)
}

function P6_SerialNumber_doGet(o: PropertyOperation) {
  o.value = '1'
  console.log('P6_SerialNumber_doGet: ', o.value)
}

function P7_FirmwareRevision_doGet(o: PropertyOperation) {
  o.value = '0.0.9'
  console.log('P7_FirmwareRevision_doGet: ', o.value)
}

function P8_Product_Data_doGet(o: PropertyOperation) {
  o.value = '产品数据XXX'
  console.log('P8_Product_Data_doGet: ', o.value)
}

export function S0_AccessoryInformation_doGet(o: PropertyOperation) {
  if (o.pid == null) {
    return
  }

  switch (o.pid.iid) {
    case 0:
      P0_Hardware_Revision(o)
      break

    case 1:
      P1_Accessory_Flags(o)
      break

    case 2:
      P2_Identify_doGet(o)
      break

    case 3:
      P3_Manufacturer_doGet(o)
      break

    case 4:
      P4_Model_doGet(o)
      break

    case 5:
      P5_Name_doGet(o)
      break

    case 6:
      P6_SerialNumber_doGet(o)
      break

    case 7:
      P7_FirmwareRevision_doGet(o)
      break

    case 8:
      P8_Product_Data_doGet(o)
      break

    default:
      o.status = Status.PROPERTY_NOT_FOUND
      break
  }
}
