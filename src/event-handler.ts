/**
 * Helper class for easier registering and deregistering of events
 *
 * This is especially great if you need to register/deregister ES6 arrow functions.
 * Those are pretty ugly to handle.
 *
 * Example:
 * Old:
 * const myMethod = () => {} // do anything
 * const myMethodListener = myMethod.bind(this);
 *
 * document.addEventListener('mousedown', myMethodListener);
 * document.removeEventListener('mousedown', myMethodListener);
 *
 * This does not look to bad, but again this is pretty simplified.
 * If it gets more complex and for example the registering happens in a different class method
 * than the deregistering it gets really noisy and you need to create a lot of extra variables
 *
 * With EventHandler Service:
 *
 * const myMethod = () => {} // do anything
 * EventHandler.addEventListener('myEvent', document, 'mousedown', myMethod.bind(this));
 * EventHandler.removeEventListener('myEvent');
 *
 * Notice the possibility to use inline .bind(this) which is not possible with the regular way
 * because the references get mixed up
 *
 * ============================
 * The last helper methods simply allows you to register a one time event. This event will
 * automatically deregister itself after being executed once
 */
type EventType = {node: Node, callback: any, eventName: string};
class EventHandler {
    /**
     * Stack that holds events until they are eventually deregistered
     */
    private static eventCallbacks: Map<string, EventType> = new Map();

    /**
     * Registers a new event listener and adds it to the stack.
     *
     * @param {string} name of the function. should be unique. otherwise there will be conflicts
     * @param {Node} node that registers the event. Usually something like document or element
     * @param {string} eventName of the DOM Event that triggers the action.
     * For example keydown, keyup, mousedown, etc.
     * @param callback that will eventually be executed.
     */
    public static addEventListener(name: string, node: Node, eventName: string, callback: any) {
        const callbackListener: any = (event: Event) => {
            return callback(event);
        };
        node.addEventListener(eventName, callbackListener);
        this.eventCallbacks.set(name, { node, eventName, callback: callbackListener });
    }

    /**
     * Removes an existing event listener
     *
     * @param {string} name of the event
     */
    public static removeEventListener(name: string) {
        const entry: EventType | undefined = this.eventCallbacks.get(name);
        if (entry) {
            entry.node.removeEventListener(entry.eventName, entry.callback);
            this.eventCallbacks.delete(name);
        }
    }

    /**
     * Registers a one time event that will automatically deregister itself after being executed once
     *
     * @param {Node} node that registers the event. Usually something like document or element
     * @param {string} eventName of the DOM Event that triggers the action.
     * For example keydown, keyup, mousedown, etc.
     * @param callback that will eventually be executed.
     */
    public static oneTimeEventListener(node: Node, eventName: string, callback: any) {
        const callbackListener: any = (event: Event) => {
            node.removeEventListener(eventName, callbackListener);

            return callback(event);
        };
        node.addEventListener(eventName, callbackListener);
    }
}

export { EventHandler };
