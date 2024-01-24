import { Attributes } from "./models/Attributes";
import { Eventing } from "./models/Eventing";
import { Sync } from "./models/Sync";
import { User, UserProps } from "./models/User";

async function init() {
  const eventing = new Eventing();
  const syncing = new Sync<UserProps>();

  const userAttributes = new Attributes<UserProps>({ id: "4ff8" });
  const user = new User(userAttributes, eventing, syncing);

  user.on("change", () => {
    console.log(`User with ID ${user.get("id")} changed!`);
  });

  await user.fetch();

  const existingUserAttributes = new Attributes<UserProps>({ id: "4f25", name: "David", age: 37 });
  const existingUser = new User(existingUserAttributes, eventing, syncing);

  existingUser.on("save", () => {
    console.log(`User with ID ${existingUser.get("id")} saved!`);
  });

  await existingUser.save();

  const newUserAttributes = new Attributes<UserProps>({ name: "Perico", age: 21 });
  const newUser = new User(newUserAttributes, eventing, syncing);

  newUser.on("save", () => {
    console.log(`User with ID ${newUser.get("id")} saved!`);
  });

  await newUser.save();
}

init();
