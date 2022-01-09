/**
 * Representation of a request (command/query)
 * @example
 * class myCommandHandler implements IRequestHandler<myCommand, number> {
 *  handle(request: myCommand): number {
 *    return 0;
 *  }
 * }
 */
export interface IRequest<T> {
    /**
     * The instance representing the handler for this request
     */
    handlerInstance: IRequestHandler<IRequest<T>, T>;
    /**
     * Method used to validate the request before the handler handle() method is emitted
     */
    validate(): boolean;
}
/**
 * Representation of a request handler
 * @example
 * class myCommand implements IRequest<number>{
 *  public handlerInstance = new myCommandHandler();
 *  public validate = () => { }
 * }
 */
export interface IRequestHandler<T extends IRequest<TResponse>, TResponse> {
    /**
     * Method used to handle the request
     * @param request The request being handled
     */
    handle(request: T): TResponse;
}
/**
 * Validation Error
 */
export declare class ValidationError extends Error {
    message: string;
    constructor(message: string);
}
/**
 * The Mediator class, responsible for handling communication between objects
 * @example
 * let response = Mediator.send(new myCommand()); /* passing arguments to the IRequest implementation will allow a CQRS design pattern
 */
export declare class Mediator {
    /**
     * A static method used by the emitter to return a response based on the request passed
     * @param request The request to be handled
     * @returns The response which is specified on the request
     */
    static send: <TResponse>(request: IRequest<TResponse>) => TResponse;
    /**
     * Similar to the above method. However, it is no static to allow a dependency injection if used instead
     * @param request The request to be handled
     * @returns The response which is specified on the request
     */
    send: <TResponse>(request: IRequest<TResponse>) => TResponse;
    /**
     * Method used to validate the request before the handler handle() method is called
     * @param request The request to be validated
     */
    private static validate;
}
