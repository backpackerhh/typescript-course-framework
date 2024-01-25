import { View } from "./View";
import { User } from "../models/User";

export class UserEdit extends View<User> {
  constructor(public parent: HTMLElement, public model: User) {
    super(parent, model);
  }

  template(): string {
    return `
      <div>
        <h1>Edit user</h1>
        <div id="user-show"></div>
        <div id="user-form"></div>
      </div>
    `;
  }
}
