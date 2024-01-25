import { RegionsMapper, View } from "./View";
import { User } from "../models/User";
import { UserShow } from "./UserShow";
import { UserForm } from "./UserForm";

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

  regionsMap(): RegionsMapper {
    return {
      userShow: "#user-show",
      userForm: "#user-form",
    };
  }

  onRender = (): void => {
    const userShow = new UserShow(this.regions.userShow, this.model);
    userShow.render();

    const userForm = new UserForm(this.regions.userForm, this.model);
    userForm.render();
  };
}
