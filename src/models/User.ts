interface UserProps {
  id?: string;
  name?: string;
  age?: number;
  [key: string]: string | number | undefined;
}

type Callback = () => void;

export class User {
  events: { [key: string]: Callback[] } = {};

  constructor(private props: UserProps) {}

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

  async fetch(apiUrl: string = "http://localhost:3000"): Promise<void> {
    const response = await fetch(`${apiUrl}/users/${this.get("id")}`);
    const userData = await response.json();

    this.set(userData);
  }
}
