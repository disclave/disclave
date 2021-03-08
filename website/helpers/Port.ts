
type Adapter<T> = new () => T

export class Port<T> {
  private readonly default: Adapter<T>
  private current: Adapter<T>

  public constructor(defaultAdapter: Adapter<T>) {
    this.default = defaultAdapter
    this.current = defaultAdapter
  }

  public get(): T {
    return new this.current()
  }

  public set(instance: Adapter<T>) {
    this.current = instance
  }

  public reset() {
    this.current = this.default
  }
}
