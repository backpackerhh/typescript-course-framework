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

  get get() {
    return this.attributes.get;
  }

  set(updatedProps: UserProps) {
    this.attributes.set(updatedProps);
    this.trigger("change");
  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  async fetch(): Promise<void> {
    const id = this.get("id");

    if (typeof id !== "string") {
      throw new Error("Cannot fetch user without an ID");
    }

    const userData = await this.sync.fetch(id);

    this.set(userData as unknown as UserProps);
  }

  async save(): Promise<void> {
    const id = this.get("id");

    if (typeof id !== "string") {
      throw new Error("Cannot fetch user without an ID");
    }

    await this.sync.save(id, this.attributes.getAll());

    this.trigger("save");
  }
}
