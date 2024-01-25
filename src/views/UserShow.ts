import { View } from "./View";
import { User } from "../models/User";

export class UserShow extends View<User> {
  constructor(public parent: HTMLElement, public model: User) {
    super(parent, model);
  }

  template(): string {
    return `
      <div>
        <ul>
          <li>Name: ${this.model.get("name")}</li>
          <li>Age: ${this.model.get("age")}</li>
        </ul>
      </div>
    `;
  }
}
