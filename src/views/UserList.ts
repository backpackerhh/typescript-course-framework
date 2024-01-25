import { ViewCollection } from "./ViewCollection";
import { UserShow } from "./UserShow";
import { User, UserProps } from "../models/User";

export class UserList extends ViewCollection<User, UserProps> {
  renderItem(itemParent: HTMLElement, model: User): void {
    new UserShow(itemParent, model).render();
  }
}
