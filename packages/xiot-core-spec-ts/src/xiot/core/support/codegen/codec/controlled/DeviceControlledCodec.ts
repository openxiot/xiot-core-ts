

export class DeviceControlledCodec {

    private DeviceControlledCodec() {
    }
    //
    // public static DeviceControlled decode(JsonObject object) {
    //     Urn type = new Urn(Arrays.asList(UrnType.DEVICE, UrnType.GROUP), object.getString(Spec.TYPE, ""));
    //     Map<String, String> description = DescriptionCodec.decode(object.getValue(Spec.DESCRIPTION));
    //     List<ServiceControlled> services = ServiceControlledCodec.decode(object.getJsonArray(Spec.SERVICES));
    //     return new DeviceControlled(type, description, services);
    // }
}
