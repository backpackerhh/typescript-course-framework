import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";

const user = User.build({ name: "Mary", age: 30 });
const rootElement = document.getElementById("root") as HTMLElement;

const userEdit = new UserEdit(rootElement, user);
userEdit.render();
