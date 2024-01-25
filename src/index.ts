import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserShow } from "./views/UserShow";
import { UserForm } from "./views/UserForm";

const user = User.build({ name: "Mary", age: 30 });
const rootElement = document.getElementById("root") as HTMLElement;

const userEdit = new UserEdit(rootElement, user);
userEdit.render();

const userShowElement = document.getElementById("user-show") as HTMLElement;
const userShow = new UserShow(userShowElement, user);
userShow.render();

const userFormElement = document.getElementById("user-form") as HTMLElement;
const userForm = new UserForm(userFormElement, user);
userForm.render();
