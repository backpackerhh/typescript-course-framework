import { ModelEvents } from "../models/Model";

export type EventsMapper = { [key: string]: () => void };

// Alternative -> export abstract class View<T extends Model<K>, K>
// From the caller -> export class UserForm extends View<User, UserProps>
export abstract class View<T extends ModelEvents> {
  constructor(public parent: HTMLElement, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.parent.replaceChildren(templateElement.content);
  }

  abstract eventsMap(): EventsMapper;

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");
      const elements = fragment.querySelectorAll(selector);

      for (const element of elements) {
        element.addEventListener(eventName, eventsMap[eventKey]);
      }
    }
  }
}
