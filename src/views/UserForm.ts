import { User } from "../models/User";

type EventsMapper = { [key: string]: () => void };

export class UserForm {
  constructor(public parent: HTMLElement, public model: User) {}

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <ul>
          <li>Name: ${this.model.get("name")}</li>
          <li>Age: ${this.model.get("age")}</li>
        </ul>
        <input type="text" />
        <button>Save</Button>
      </div>
    `;
  }

  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }

  eventsMap(): EventsMapper {
    return {
      "click:button": this.onClickButton,
      "mouseenter:h1": this.onMouseEnterHeader,
    };
  }

  onClickButton(): void {
    console.log("Click on button registered!");
  }

  onMouseEnterHeader(): void {
    console.log("Hover on h1 registered!");
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
