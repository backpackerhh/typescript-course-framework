import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export interface UserProps {
  id?: string;
  name?: string;
  age?: number;
  [key: string]: string | number | undefined;
}

export class User {
  constructor(public attributes: Attributes<UserProps>, public events: Eventing, public sync: Sync<UserProps>) {}
}
