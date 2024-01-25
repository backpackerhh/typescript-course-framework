import { View, EventsMapper } from "./View";
import { User } from "../models/User";

export class UserForm extends View<User> {
  constructor(public parent: HTMLElement, public model: User) {
    super(parent, model);
  }

  template(): string {
    return `
      <div>
        <p>
          <input type="text" class="name" placeholder="${this.model.get("name")}" />
          <button class="set-name">Change name</button>
        </p>
        <p>
          <button class="set-random-age">Set random age</button>
          <button class="save-model">Save</button>
        </p>
      </div>
    `;
  }

  eventsMap(): EventsMapper {
    return {
      "click:button.set-random-age": this.onClickSetRandomAgeButton,
      "click:button.set-name": this.onClickSetNameButton,
      "click:button.save-model": this.onClickSaveButton,
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

  onClickSaveButton = (): void => {
    this.model.save();
  };
}
