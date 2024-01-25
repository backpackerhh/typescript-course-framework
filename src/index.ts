import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserList } from "./views/UserList";

const user = User.build({ name: "Mary", age: 30 });
const rootElement = document.getElementById("root") as HTMLElement;

const userEdit = new UserEdit(rootElement, user);
userEdit.render();

const users = User.buildCollection("http://localhost:3000/users");

users.on("change", () => {
  const rootElement = document.getElementById("root-list") as HTMLElement;

  new UserList(rootElement, users).render();
});

users.fetch();
