import { Eventing } from "./Eventing";

interface UserProps {
  id?: string;
  name?: string;
  age?: number;
  [key: string]: string | number | undefined;
}

export class User {
  constructor(private props: UserProps, public events: Eventing, private apiUrl: string = "http://localhost:3000") {}

  get(propName: string): number | string | undefined {
    return this.props[propName];
  }

  set(updatedProps: UserProps): void {
    Object.assign(this.props, updatedProps);
  }

  async fetch(): Promise<void> {
    const response = await fetch(`${this.apiUrl}/users/${this.get("id")}`);
    const userData = await response.json();

    this.set(userData);
  }

  async save(): Promise<void> {
    let response: Response;

    if (this.get("id")) {
      response = await fetch(`${this.apiUrl}/users/${this.get("id")}`, {
        method: "PUT",
        body: JSON.stringify(this.props),
      });
    } else {
      response = await fetch(`${this.apiUrl}/users`, {
        method: "POST",
        body: JSON.stringify(this.props),
      });
    }

    await response.json();
  }
}
