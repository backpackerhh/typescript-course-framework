import { User } from "../models/User";

type EventsMapper = { [key: string]: () => void };

export class UserForm {
  constructor(public parent: HTMLElement, public model: User) {
    this.bindModel();
  }

  template(): string {
    return `
      <div>
        <h1>User Form</h1>
        <ul>
          <li>Name: ${this.model.get("name")}</li>
          <li>Age: ${this.model.get("age")}</li>
        </ul>
        <input type="text" />
        <button>Save</button>
        <button class="set-random-age">Set random age</button>
      </div>
    `;
  }

  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();

    this.bindEvents(templateElement.content);
    this.parent.replaceChildren(templateElement.content);
  }

  eventsMap(): EventsMapper {
    return {
      "click:button.set-random-age": this.onClickSetRandomAgeButton,
    };
  }

  onClickSetRandomAgeButton = (): void => {
    this.model.set({ age: Math.floor(Math.random() * 100) });
    console.log(this.model.get("age"));
  };

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
