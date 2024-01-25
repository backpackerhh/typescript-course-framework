import { ModelEvents } from "../models/Model";

export type EventsMapper = { [key: string]: () => void };
export type RegionsMapper = { [key: string]: string };
export type Regions = { [key: string]: HTMLElement };

// Alternative -> export abstract class View<T extends Model<K>, K>
// From the caller -> export class UserForm extends View<User, UserProps>
export abstract class View<T extends ModelEvents> {
  regions: Regions = {};

  constructor(public parent: HTMLElement, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);

    this.onRender();

    this.parent.replaceChildren(templateElement.content);
  }

  onRender(): void {}

  eventsMap(): EventsMapper {
    return {};
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

  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }

  regionsMap(): RegionsMapper {
    return {};
  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (const regionKey in regionsMap) {
      const selector = regionsMap[regionKey];
      const element = fragment.querySelector(selector) as HTMLElement;

      if (element) {
        this.regions[regionKey] = element;
      }
    }
  }
}
