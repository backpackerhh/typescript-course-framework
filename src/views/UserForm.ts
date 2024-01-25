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
        <p><input type="text" class="name" /> <button class="set-name">Change name</button></p>
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
      "click:button.set-name": this.onClickSetNameButton,
    };
  }

  onClickSetRandomAgeButton = (): void => {
    this.model.set({ age: Math.floor(Math.random() * 100) });
  };

  onClickSetNameButton = (): void => {
    const input = this.parent.querySelector("input.name") as HTMLInputElement;

    this.model.set({ name: input.value });
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
