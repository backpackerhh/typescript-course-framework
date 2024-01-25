import { Model } from "./Model";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { ModelCollection } from "./ModelCollection";

export interface UserProps {
  id?: string;
  name?: string;
  age?: number;
  [key: string]: string | number | undefined;
}

export class User extends Model<UserProps> {
  static build(attrs: UserProps): User {
    return new User(new Attributes(attrs), new Eventing(), new ApiSync());
  }

  static buildCollection(url: string): ModelCollection<User, UserProps> {
    return new ModelCollection<User, UserProps>(url, (json: UserProps) => User.build(json), new Eventing());
  }
}
