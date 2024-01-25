import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const user = User.build({ name: "Mary", age: 30 });
const rootElement = document.getElementById("root") as HTMLElement;
const userForm = new UserForm(rootElement, user);
userForm.render();
