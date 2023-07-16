interface IMiddleware {
    next(middleware: IMiddleware): IMiddleware
    handle(request: any): any
}

abstract class AbstractMiddleware implements IMiddleware {
    private nextMiddleware: IMiddleware
    
    next(middleware: IMiddleware): IMiddleware {
        this.nextMiddleware = middleware
        return middleware
    }
    
    handle(request: any) {
        if (this.nextMiddleware) {
            return this.nextMiddleware.handle(request)
        }
    }
}

class AuthMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('AuthMiddleware')
        if (request.userId === 1) {
            return super.handle(request)
        }
        return { error: 'You are not authorized' }
    }
}

class ValidateMiddleware extends AbstractMiddleware {
    override handle(request: any) {
        console.log('ValidateMiddleware')
        if (request.body) {
            return super.handle(request)
        }
        return { error: 'No body' }
    }
}

class Controller extends AbstractMiddleware {
    override handle(request: any) {
        console.log('Controller')
        return { success: request }
    }
}

const controller = new Controller()
const validate = new ValidateMiddleware()
const auth = new AuthMiddleware()

auth.next(validate).next(controller)
console.log(auth.handle({ userId: 1, body: 'body' }))
