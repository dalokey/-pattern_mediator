import { IRequestHandler, IRequest, Mediator } from '../src';
import { expect } from "chai";

describe("Mediator unit tests", (): void => {
    it("Return the expected response", ():void => {
        class myCommandHandler implements IRequestHandler<myCommand, number> {
            handle(request: myCommand): number {
                return request.MyProp;
            }
        }

        class myCommand implements IRequest<number>{
            constructor(public MyProp: number){ }
            public handlerInstance = new myCommandHandler();
            public validate = () => { return true; }
        }

        let myPropValue = Math.floor(Math.random() * 100);

        let actual = Mediator.send(new myCommand(myPropValue));

        expect(actual).is.equal(myPropValue);
    });
});