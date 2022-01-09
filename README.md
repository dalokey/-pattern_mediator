# @patterns/mediator
Mediator design pattern

## Installation
listed as an [npm](https://www.npmjs.com/package/@pattern/mediator) package, and can be installed by running:

```bash
npm i -S @patterns/mediator
```

## Summary
The purpose of this design patten is to reduce complicated dependencies and to allow communication between objects in an organised way.

For instance, in any given case scenario where a client makes a request to a program; the program then handles this specific case requested by the client to return a response.

There are many ways for the program to handle the requested case scenario. However, the mediator design pattern can be used to handle different scenarios consistently, which follows a Domain Design Development approach (DDD), and even allow the option of a Command Query Responsibility Segregation (CQRS) architecture to be enforced when developing a program.

## Usage
To better understand the usage of this package, a use case scenario from a shopping application will be used as an example.

### Example
A request has been made to return an item by it's id.

First create the query class, which implements this package's `IRequest<TResponse>` interface.
This calss is either a query or command, but for this example it is a query.
```ts
class GetItemByIdQuery implements IRequest<string> {
    // note: the handler must be instantiated here
    public handlerInstance = new GetItemByIdQueryHandler();

    public Id: number;

    constructor(id: number){
        this.Id = id;
    }

    // called by the mediator send(request) method, and will throw a ValidationError if false 
    public validate = (): boolean => {
        if (this.Id < 0){
            return false
        }

        return true;
    }
}
```

The next step is to create the handler class for this request.

This will implement the `IRequestHandler<T extends IRequest<TResponse>, TResponse>` interface.
```ts
class GetItemByIdQueryHandler implements IRequestHandler<GetCartItemQuery, Item> {
    // this method is also called by the mediator send(request) method
    handle(request: myCommand): Item {
        let response = "";

        switch (request.Id){
            case 1:
                response = "apple";
            break;
            case 2:
                response = "orange";
            break;
            default:
                response = "";
            break;
        }

        return response;
    }
}
```

Now to make the request the following is used to call the `send(request)` method
```ts
let id = 1;
let item = Mediator.send(new GetCartItemQuery(id));
```

The Mediator class can also be instantiated so it may be used as dependency injection (which is great when it comes to testing)
```ts
let id = 1;
const mediator = new Mediator();
let item = mediator.send(new GetCartItemQuery(id));
```