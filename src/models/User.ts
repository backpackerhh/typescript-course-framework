interface UserProps {
  name?: string;
  age?: number;
  [key: string]: string | number | undefined;
}

export class User {
  constructor(private props: UserProps) {}

  get(propName: string): number | string | undefined {
    return this.props[propName];
  }

  set(updatedProps: UserProps): void {
    Object.assign(this.props, updatedProps);
  }
}
