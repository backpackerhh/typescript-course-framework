import { UserForm } from "./views/UserForm";

const rootElement = document.getElementById("root") as HTMLElement;
const userForm = new UserForm(rootElement);
userForm.render();
