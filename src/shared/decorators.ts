
// decorators

function color(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDecorator) {
        console.log("color(): called")
        descriptor['prototype'].color = value
    }
}

function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    };
}


function logger(originalMethod: any, _context: any) {
    function replacementMethod(this: any, ...args: any[]) {
        console.log("start:", originalMethod);
        const result = originalMethod.call(this, ...args);
        console.log("end:", originalMethod.name);
        return result;
        //return
    }

    return replacementMethod;
}



class DecoClass {


    @logger({ name: 'myGreet' }, '')
    greet() {
        console.log("hallo")
    }

}

new DecoClass().greet()


@BaseEntity
class User_Deco {
    [x: string]: any;
    private _x: number
    constructor(x: number, public name: string) {
        this._x = x
    }

    @configurable(false) //(new User_Deco(1, 'mostafa')._x)
    get x_() {
        return this._x
    }
}

function BaseEntity(ctr: Function) {
    ctr.prototype.created = new Date().toISOString();
    ctr.prototype.updated = new Date().toISOString();

}

function configurable(value: any) {
    console.log("configurable")
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value ? true : false;
        console.log(" descriptor configurable: ", descriptor.configurable, value)
    };
}



const user = new User_Deco(2, 'John')
console.log(user, user.name, user.created, user.updated, user.x_)


function WithFuel(target: any, context: any): any {
    if (context.kind === "class") {
        return class extends target {
            fuel: number = 40
            isEmpty(): boolean {
                return this.fuel == 0
            }
        }
    }
}


function fill(value: number) {
    return function (_: any, context: any) {
        if (context.kind === "field") {
            return function (initialValue: number) {
                return value + initialValue
            }
        }
    }
}


