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
    handlerInstance: IRequestHandler<IRequest<T>, T>
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
    handle(request: T): TResponse,
}

/**
 * Validation Error
 */
export class ValidationError extends Error {
    constructor(public message: string){
        super(message);
        this.name = "ValidationError";
    }
}

/**
 * The Mediator class, responsible for handling communication between objects
 * @example
 * let response = Mediator.send(new myCommand()); /* passing arguments to the IRequest implementation will allow a CQRS design pattern
 */
export class Mediator {
    /**
     * A static method used by the emitter to return a response based on the request passed
     * @param request The request to be handled
     * @returns The response which is specified on the request
     */
    static send = <TResponse>(request: IRequest<TResponse>): TResponse => {
        this.validate(request);
        return request.handlerInstance.handle(request);
    }

    /**
     * Similar to the above method. However, it is no static to allow a dependency injection if used instead
     * @param request The request to be handled
     * @returns The response which is specified on the request
     */
    send = <TResponse>(request: IRequest<TResponse>): TResponse => {
        Mediator.validate(request);
        return request.handlerInstance.handle(request);
    }

    /**
     * Method used to validate the request before the handler handle() method is called
     * @param request The request to be validated
     */
    private static validate = <TResponse>(request: IRequest<TResponse>): void => {
        let message = "ValidationError: ";
        let isValid = false;

        try {
            isValid = request.validate();

            if (!isValid){
                message += "request validation is false";
            }
        } catch(e: unknown){
            if (typeof e === "string"){
                message += e;
            }
            else if (e instanceof Error){
                message += e.message;
            } else {
                message += "unable to validate request due unknown error";
            }
        }

        if (!isValid){
            throw new ValidationError(message);
        }
    }
}