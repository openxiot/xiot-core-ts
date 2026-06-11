
export class ServiceControlledCodec {

    // private static ServiceControlled decode(JsonObject object) {
    //     int iid = object.getInteger(Spec.IID, -1);
    //     ServiceType type = ServiceType.parse(object.getString(Spec.TYPE, ""));
    //     Map<String, String> description = DescriptionCodec.decode(object.getValue(Spec.DESCRIPTION));
    //     List<Property<Object>> properties = PropertyControlledCodec.decode(object.getJsonArray(Spec.PROPERTIES));
    //     List<Action> actions = ActionControlledCodec.decode(object.getJsonArray(Spec.ACTIONS));
    //     List<Event> events = EventControlledCodec.decode(object.getJsonArray(Spec.EVENTS));
    //     return new ServiceControlled(iid, type, description, properties, actions, events);
    // }
    //
    // public static List<ServiceControlled> decode(JsonArray array) {
    //     List<ServiceControlled> services = new ArrayList<>();
    //
    //     if (array != null) {
    //         for (int i = 0; i < array.size(); ++i) {
    //             services.add(decode(array.getJsonObject(i)));
    //         }
    //     }
    //
    //     return services;
    // }
}
