interface UserProps {
  id?: string;
  name?: string;
  age?: number;
  [key: string]: string | number | undefined;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private props: UserProps, private apiUrl: string = "http://localhost:3000") {}

  get(propName: string): number | string | undefined {
    return this.props[propName];
  }

  set(updatedProps: UserProps): void {
    Object.assign(this.props, updatedProps);
  }

  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);

    this.events[eventName] = handlers;
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName];

    if (!handlers || handlers.length === 0) {
      return;
    }

    for (const callback of handlers) {
      callback();
    }
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
