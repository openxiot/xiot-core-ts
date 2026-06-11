

export class EventControlledCodec {

    private EventControlledCodec() {
    }

    // public static Event decode(JsonObject object) {
    //     int iid = object.getInteger(Spec.IID, -1);
    //     EventType type = EventType.parse(object.getString(Spec.TYPE, ""));
    //     Map<String, String> description = DescriptionCodec.decode(object.getValue(Spec.DESCRIPTION));
    //     List<Argument> arguments = ArgumentCodec.decode(object.getJsonArray(Spec.ARGUMENTS));
    //     return new EventControlled(iid, type, description, arguments);
    // }
    //
    // public static List<Event> decode(JsonArray array) {
    //     List<Event> events = new ArrayList<>();
    //
    //     if (array != null) {
    //         for (int i = 0; i < array.size(); ++i) {
    //             events.add(decode(array.getJsonObject(i)));
    //         }
    //     }
    //
    //     return events;
    // }
}
