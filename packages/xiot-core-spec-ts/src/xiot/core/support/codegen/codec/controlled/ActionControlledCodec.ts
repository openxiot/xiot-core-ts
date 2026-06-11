
export class ActionControlledCodec {

    private ActionControlledCodec() {
    }

    // private static Action decode(JsonObject object) {
    //     int iid = object.getInteger(Spec.IID, -1);
    //     ActionType type = ActionType.parse(object.getString(Spec.TYPE, ""));
    //     Map<String, String> description = DescriptionCodec.decode(object.getValue(Spec.DESCRIPTION));
    //     List<Argument> in = ArgumentCodec.decode(object.getJsonArray(Spec.IN));
    //     List<Argument> out = ArgumentCodec.decode(object.getJsonArray(Spec.OUT));
    //     return new ActionControlled(iid, type, description, in, out);
    // }
    //
    // public static List<Action> decode(JsonArray array) {
    //     List<Action> actions = new ArrayList<>();
    //
    //     if (array != null) {
    //         for (int i = 0; i < array.size(); ++i) {
    //             actions.add(decode(array.getJsonObject(i)));
    //         }
    //     }
    //
    //     return actions;
    // }
}
