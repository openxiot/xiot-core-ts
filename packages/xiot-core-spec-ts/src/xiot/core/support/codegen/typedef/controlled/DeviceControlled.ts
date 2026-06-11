import {DeviceInstance} from "../../../../spec/typedef/instance/DeviceInstance";

export class DeviceControlled extends DeviceInstance {

    // private String did;
    // private Summary summary;
    //
    // public DeviceControlled(Urn type) {
    //     super(type);
    // }
    //
    // public DeviceControlled(Urn type, Map<String, String> description, List<ServiceControlled> services) {
    //     super(type, description, null);
    //     for (ServiceControlled service : services) {
    //         this.services().put(service.iid(), service);
    //     }
    // }
    //
    // public String did() {
    //     return did;
    // }
    //
    // public Summary summary() {
    //     return summary;
    // }
    //
    // public DeviceControlled did(String did) {
    //     this.did = did;
    //     return this;
    // }
    //
    // public DeviceControlled summary(Summary summary) {
    //     this.summary = summary;
    //     return this;
    // }
    //
    // public Future<List<PropertyOperation>> getReadableProperties() {
    //     List<Future<List<PropertyOperation>>> futures = new ArrayList<>();
    //
    //     for (Service service : this.services().values()) {
    //         if (service instanceof ServiceControlled) {
    //             futures.add(((ServiceControlled) service).getReadableProperties(did, service.iid()));
    //         }
    //     }
    //
    //     return FutureMerger.mergeList(futures);
    // }
    //
    // public Future<DeviceShadow> getShadow() {
    //     return this.getReadableProperties()
    //             .map(properties ->
    //                     new DeviceShadow(did, properties.stream()
    //                             .map(x -> new Shadow(did, x.siid(), x.iid(), x.value()).status(x.status()).description(x.description()))
    //                             .collect(Collectors.toList())
    //                     )
    //             );
    // }
    //
    // public <T extends AbstractOperation> Future<OperationIntent<T>> execute(OperationIntent<T> intent) {
    //     Promise<OperationIntent<T>> promise = Promise.promise();
    //
    //     if (intent.did().equals(did)) {
    //         List<Future<T>> futures = intent.operations().stream()
    //                 .map(x -> execute(intent.type(), x))
    //                 .collect(Collectors.toList());
    //
    //         FutureMerger.merge(futures)
    //                 .onComplete(ar -> {
    //                     if (ar.succeeded()) {
    //                         promise.complete(intent);
    //                     } else {
    //                         promise.fail(ar.cause());
    //                     }
    //                 });
    //     } else {
    //         intent.status(Status.DEVICE_ID_NOT_EXIST).description("did not matched");
    //         intent.operations().forEach(x -> x.status(Status.DEVICE_ID_NOT_EXIST).description("did not matched"));
    //         promise.complete(intent);
    //     }
    //
    //     return promise.future();
    // }
    //
    // public void addPropertyObserver(BiConsumer<PropertyID, Object> observer) {
    //     this.services().forEach((siid, service) -> {
    //         if (service instanceof ServiceControlled) {
    //             ((ServiceControlled) service).addPropertyObserver(observer);
    //         } else {
    //             throw new RuntimeException("service not instanceof ServiceControlled: " + service.getClass().getName());
    //         }
    //     });
    // }
    //
    // public void addEventObserver(BiConsumer<EventID, Collection<ArgumentOperation>> observer) {
    //     this.services().forEach((siid, service) -> {
    //         if (service instanceof ServiceControlled) {
    //             ((ServiceControlled) service).addEventObserver(observer);
    //         } else {
    //             throw new RuntimeException("service not instanceof ServiceControlled: " + service.getClass().getName());
    //         }
    //     });
    // }
    //
    // @SuppressWarnings("unchecked")
    // private <T extends AbstractOperation> Future<T> execute(OperationIntentType type, T operation) {
    //     Promise<T> promise = Promise.promise();
    //
    //     switch (type) {
    //         case GET_PROPERTIES:
    //             get((PropertyOperation)operation)
    //                     .onComplete(ar -> {
    //                         if (ar.succeeded()) {
    //                             promise.complete((T) ar.result());
    //                         } else {
    //                             promise.fail(ar.cause());
    //                         }
    //                     });
    //             break;
    //
    //         case SET_PROPERTIES:
    //             set((PropertyOperation)operation)
    //                     .onComplete(ar -> {
    //                         if (ar.succeeded()) {
    //                             promise.complete((T) ar.result());
    //                         } else {
    //                             promise.fail(ar.cause());
    //                         }
    //                     });
    //             break;
    //
    //         case INVOKE_ACTIONS:
    //             invoke((ActionOperation) operation)
    //                     .onComplete(ar -> {
    //                         if (ar.succeeded()) {
    //                             promise.complete((T) ar.result());
    //                         } else {
    //                             promise.fail(ar.cause());
    //                         }
    //                     });
    //             break;
    //         default:
    //             throw new IllegalStateException("Unexpected value: " + type);
    //     }
    //
    //     return promise.future();
    // }
    //
    // @Override
    // public boolean equals(Object o) {
    //     if (this == o) {
    //         return true;
    //     }
    //
    //     if (o == null || getClass() != o.getClass()) {
    //         return false;
    //     }
    //
    //     return type().equals(((DeviceControlled) o).type());
    // }
    //
    // @Override
    // public int hashCode() {
    //     return type().hashCode();
    // }
    //
    // private Future<PropertyOperation> get(PropertyOperation property) {
    //     Service service = services().get(property.siid());
    //     if (service != null) {
    //         if (service instanceof ServiceControlled) {
    //             return ((ServiceControlled) service).get(property);
    //         } else {
    //             property.status(Status.INTERNAL_ERROR).description(TAG + "service not ServiceControlled");
    //         }
    //     } else {
    //         property.status(Status.SERVICE_NOT_FOUND).description(TAG + ": service not found");
    //     }
    //
    //     return Future.succeededFuture(property);
    // }
    //
    // private Future<PropertyOperation> set(PropertyOperation property) {
    //     Service service = services().get(property.siid());
    //     if (service != null) {
    //         if (service instanceof ServiceControlled) {
    //             return ((ServiceControlled) service).set(property);
    //         } else {
    //             property.status(Status.INTERNAL_ERROR).description(TAG + "service not ServiceControlled");
    //         }
    //     } else {
    //         property.status(Status.SERVICE_NOT_FOUND).description(TAG + ": service not found");
    //     }
    //
    //     return Future.succeededFuture(property);
    // }
    //
    // private Future<ActionOperation> invoke(ActionOperation action) {
    //     logger.debug("invoke: " + action.toString());
    //
    //     Service service = services().get(action.siid());
    //     if (service != null) {
    //         if (service instanceof ServiceControlled) {
    //             try {
    //                 return ((ServiceControlled) service).invoke(action);
    //             } catch (IotError e) {
    //                 action.status(e.status()).description(e.description());
    //             }
    //         } else {
    //             action.status(Status.INTERNAL_ERROR).description(TAG + "service not ServiceControlled");
    //         }
    //     } else {
    //         action.status(Status.SERVICE_NOT_FOUND).description(TAG + ": service not found");
    //     }
    //
    //     return Future.succeededFuture(action);
    // }
    //
    // public void update(Collection<Shadow> shadows) {
    //     for (Shadow shadow : shadows) {
    //         Service s = services().get(shadow.siid());
    //         if (s != null) {
    //             Property<?> p = s.properties().get(shadow.piid());
    //             if (p != null) {
    //                 p.setValue(shadow.value());
    //             }
    //         }
    //     }
    // }
}