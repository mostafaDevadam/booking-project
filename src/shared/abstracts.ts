// abstract classes
export abstract class Specification {
    public abstract isValid(room: any): boolean
}

export abstract class Specification_G<T> {
    public abstract isValid(t: T): boolean
}


