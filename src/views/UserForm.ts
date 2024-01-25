import { View, EventsMapper } from "./View";
import { User } from "../models/User";

export class UserForm extends View<User> {
  constructor(public parent: HTMLElement, public model: User) {
    super(parent, model);
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
    const name = input.value.trim();

    if (name !== "") {
      this.model.set({ name });
    }
  };
}
