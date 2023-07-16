interface Component {
    operation(): string;
}

class ConcreteComponent implements Component {
    public operation(): string {
        return 'ConcreteComponent'
    }
}

class Decorator implements Component {
    protected component: Component
    
    constructor(component: Component) {
        this.component = component
    }
    
    public operation(): string {
        return this.component.operation()
    }
}

class ConcreteDecoratorA extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`
    }
}

class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`
    }
}

const simple = new ConcreteComponent()
const decorator1 = new ConcreteDecoratorA(simple)
const decorator2 = new ConcreteDecoratorB(decorator1)
console.log(decorator2.operation())
