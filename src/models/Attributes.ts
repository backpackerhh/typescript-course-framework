export class Attributes<T extends {}> {
  constructor(public props: T) {}

  get = <K extends keyof T>(propName: K): T[K] => {
    return this.props[propName];
  };

  set = (updatedProps: T): void => {
    Object.assign(this.props, updatedProps);
  };

  getAll = (): T => {
    return this.props;
  };
}
