import { Eventing } from "./Eventing";

export class ModelCollection<T, U> {
  constructor(
    public url: string,
    public deserialize: (json: U) => T,
    private events: Eventing,
    private models: T[] = []
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;

  async fetch(): Promise<void> {
    const response = await fetch(this.url);
    const fetchedModels = (await response.json()) as U[];

    for (const model of fetchedModels) {
      this.models.push(this.deserialize(model));
    }

    this.trigger("change");
  }
}
