import {Rule} from "../../../../spec/typedef/rule/Rule";
import {RuleStatus} from "./status/RuleStatus";
import {RuleReady} from "./status/impl/RuleReady";


export class RuleController {

    rule: Rule;
    status: RuleStatus = new RuleReady();

    // private Function<RuleController, Future<Void>> executor;
    // private Function<RuleController, Future<Void>> updater;
    // private final Map<String, Consumer<RuleStatus>> observers = new ConcurrentHashMap<>();

    constructor(
         rule: Rule
    ) {
        this.rule = rule;
    }

    // public Future<Void> execute() {
    //     if (executor != null) {
    //         return executor.apply(this);
    //     } else {
    //         return Future.failedFuture("not implemented");
    //     }
    // }
    //
    // public void executor(Function<RuleController, Future<Void>> executor) {
    //     this.executor = executor;
    // }
    //
    // public Future<Void> update() {
    //     if (updater != null) {
    //         return updater.apply(this);
    //     } else {
    //         return Future.failedFuture("not implemented");
    //     }
    // }
    //
    // public void updater(Function<RuleController, Future<Void>> updater) {
    //     this.updater = updater;
    // }
    //
    // public RuleStatus status() {
    //     return status;
    // }
    //
    // public void status(RuleStatus status) {
    //     this.status = status;
    //     this.observers.forEach((x, y) -> y.accept(status));
    // }
    //
    // public void addObserver(Consumer<RuleStatus> observer) {
    //     observers.put(observer.toString(), observer);
    // }
    //
    // public void removeObserver(Consumer<RuleStatus> observer) {
    //     observers.remove(observer.toString());
    // }
}
