
export class DependencyManager<T> {
  private default: T
  private current: T

  public constructor(instance: T) {
    this.default = instance
    this.current = instance
  }

  public get(): T {
    return this.current
  }

  public set(instance: T) {
    this.current = instance
  }

  public reset() {
    this.current = this.default
  }
}
