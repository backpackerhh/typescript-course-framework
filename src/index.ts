import { User } from "./models/User";
import { UserForm } from "./views/UserForm";
import { UserShow } from "./views/UserShow";

const user = User.build({ name: "Mary", age: 30 });
const rootElement = document.getElementById("root") as HTMLElement;
const userForm = new UserForm(rootElement, user);
userForm.render();

const userDetailsElement = document.getElementById("user-details") as HTMLElement;
const userShow = new UserShow(userDetailsElement, user);
userShow.render();
