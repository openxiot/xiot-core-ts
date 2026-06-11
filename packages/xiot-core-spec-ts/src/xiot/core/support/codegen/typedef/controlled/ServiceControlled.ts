import {Service} from "../../../../spec/typedef/instance/Service";
import {ServiceType} from "../../../../spec/typedef/definition/urn/ServiceType";
import {PropertyController} from "../controller/PropertyController";
import {ActionController} from "../controller/ActionController";
import {EventController} from "../controller/EventController";
import {PropertyOperation} from "../../../../spec/typedef/operation/PropertyOperation";

export class ServiceControlled extends Service {

    constructor(
        iid: number,
        type: ServiceType,
        description: Map<string, string>,
        properties: PropertyController[],
        actions: ActionController[],
        events: EventController[]
    ) {
        super(iid, type, description, properties, actions, events)
    }

    // public getReadableProperties(did: string): Promise<PropertyOperation[]> {
    //     List<Future<PropertyOperation>> futures = new ArrayList<>();
    //
    //     for (Property<?> property : properties().values()) {
    //         if (property instanceof PropertyControlled) {
    //             if (property.readable()) {
    //                 futures.add(((PropertyControlled<?>) property).get(new PropertyOperation(did, siid, property.iid())));
    //             }
    //         }
    //     }
    //
    //     return FutureMerger.merge(futures);
    // }
    //
    // public Future<PropertyOperation> get(PropertyOperation operation) {
    //     Property<?> property = properties().get(operation.iid());
    //     if (property != null) {
    //         if (property instanceof PropertyControlled) {
    //             return ((PropertyControlled<?>) property).get(operation);
    //         } else {
    //             operation.status(Status.INTERNAL_ERROR).description(TAG + ": property not PropertyControlled");
    //         }
    //     } else {
    //         operation.status(Status.PROPERTY_NOT_FOUND).description(TAG + ": property not found");
    //     }
    //
    //     return Future.succeededFuture(operation);
    // }
    //
    // public Future<PropertyOperation> set(PropertyOperation operation) {
    //     Property<?> property = properties().get(operation.iid());
    //     if (property != null) {
    //         if (property instanceof PropertyControlled) {
    //             return ((PropertyControlled<?>) property).set(operation);
    //         } else {
    //             operation.status(Status.INTERNAL_ERROR).description(TAG + ": property not PropertyControlled");
    //         }
    //     } else {
    //         operation.status(Status.PROPERTY_NOT_FOUND).description(TAG + ": property not found");
    //     }
    //
    //     return Future.succeededFuture(operation);
    // }
    //
    // public Future<ActionOperation> invoke(ActionOperation operation) throws IotError {
    //     logger.debug("invoke: " + operation.toString());
    //
    //     Action action = actions().get(operation.iid());
    //     if (action != null) {
    //         if (action instanceof ActionControlled) {
    //             return ((ActionControlled) action).invoke(operation);
    //         } else {
    //             operation.status(Status.INTERNAL_ERROR).description(TAG + ": action not ActionControlled");
    //         }
    //     } else {
    //         operation.status(Status.ACTION_NOT_FOUND).description(TAG + ": action not found");
    //     }
    //
    //     return Future.succeededFuture(operation);
    // }
    //
    // public void addPropertyObserver(BiConsumer<PropertyID, Object> observer) {
    //     properties().forEach((piid, property) -> {
    //         if (property instanceof PropertyControlled) {
    //             ((PropertyControlled<?>) property).observer(observer);
    //         } else {
    //             throw new RuntimeException("property not instanceof PropertyControlled: " + property.getClass().getName());
    //         }
    //     });
    // }
    //
    // public void addEventObserver(BiConsumer<EventID, Collection<ArgumentOperation>> observer) {
    //     events().forEach((eiid, event) -> {
    //         if (event instanceof EventControlled) {
    //             ((EventControlled) event).observer(observer);
    //         } else {
    //             throw new RuntimeException("event not instanceof EventControlled: " + event.getClass().getName());
    //         }
    //     });
    // }
}