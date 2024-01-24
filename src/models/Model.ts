interface ModelAttributes<T> {
  get<K extends keyof T>(propName: K): T[K];
  set(value: T): void;
  getAll(): T;
}

interface ModelSync<T> {
  fetch(id: string): Promise<Response>;
  save(props: T): Promise<void>;
}

interface ModelEvents {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

interface ModelIdentity {
  id?: string;
}

export class Model<T extends ModelIdentity> {
  constructor(private attributes: ModelAttributes<T>, private events: ModelEvents, private sync: ModelSync<T>) {}

  // For short, as dependencies are being injected, could be simply -> get = this.attributes.get
  get get() {
    return this.attributes.get;
  }

  set(updatedProps: T) {
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

    this.set(userData as unknown as T);
  }

  async save(): Promise<void> {
    await this.sync.save(this.attributes.getAll());

    this.trigger("save");
  }
}
