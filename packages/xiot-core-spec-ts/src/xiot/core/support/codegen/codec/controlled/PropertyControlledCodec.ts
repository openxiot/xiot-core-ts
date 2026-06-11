
export class PropertyControlledCodec {

    private PropertyControlledCodec() {
    }

    // public static <T> List<Property<T>> decode(JsonArray array) {
    //     List<Property<T>> properties = new ArrayList<>();
    //
    //     if (array != null) {
    //         for (int i = 0; i < array.size(); ++i) {
    //             properties.add(decode(array.getJsonObject(i)));
    //         }
    //     }
    //
    //     return properties;
    // }
    //
    // private static <T> PropertyControlled<T> decode(JsonObject object) {
    //     return new PropertyControlled<>(PropertyCodec.decode(object));
    // }
    //
    // public static JsonObject encode(PropertyControlled<?> property) {
    //     return PropertyCodec.encode(property);
    // }
}
