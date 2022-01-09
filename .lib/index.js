"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mediator = exports.ValidationError = void 0;
/**
 * Validation Error
 */
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "ValidationError";
    }
}
exports.ValidationError = ValidationError;
/**
 * The Mediator class, responsible for handling communication between objects
 * @example
 * let response = Mediator.send(new myCommand()); /* passing arguments to the IRequest implementation will allow a CQRS design pattern
 */
class Mediator {
    constructor() {
        /**
         * Similar to the above method. However, it is no static to allow a dependency injection if used instead
         * @param request The request to be handled
         * @returns The response which is specified on the request
         */
        this.send = (request) => {
            Mediator.validate(request);
            return request.handlerInstance.handle(request);
        };
    }
}
exports.Mediator = Mediator;
_a = Mediator;
/**
 * A static method used by the emitter to return a response based on the request passed
 * @param request The request to be handled
 * @returns The response which is specified on the request
 */
Mediator.send = (request) => {
    _a.validate(request);
    return request.handlerInstance.handle(request);
};
/**
 * Method used to validate the request before the handler handle() method is called
 * @param request The request to be validated
 */
Mediator.validate = (request) => {
    let message = "ValidationError: ";
    let isValid = false;
    try {
        isValid = request.validate();
        if (!isValid) {
            message += "request validation is false";
        }
    }
    catch (e) {
        if (typeof e === "string") {
            message += e;
        }
        else if (e instanceof Error) {
            message += e.message;
        }
        else {
            message += "unable to validate request due unknown error";
        }
    }
    if (!isValid) {
        throw new ValidationError(message);
    }
};
