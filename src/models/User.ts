import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  id?: string;
  name?: string;
  age?: number;
  [key: string]: string | number | undefined;
}

export class User {
  constructor(public props: UserProps, public events: Eventing, public sync: Sync<UserProps>) {}

  get(propName: string): number | string | undefined {
    return this.props[propName];
  }

  set(updatedProps: UserProps): void {
    Object.assign(this.props, updatedProps);
  }
}
