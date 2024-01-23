import { Eventing } from "./models/Eventing";
import { Sync } from "./models/Sync";
import { User, UserProps } from "./models/User";

async function init() {
  const eventing = new Eventing();
  const syncing = new Sync<UserProps>();

  const userId = "4ff8";
  const user = new User({ id: userId }, eventing, syncing);
  const userData = await user.sync.fetch(userId);
  user.set(userData as unknown as UserProps);

  console.log(user.props);

  user.events.on("change", () => {
    console.log("changed!");
  });

  user.events.trigger("change");

  const existingUserData = { id: "4f25", name: "David", age: 37 };
  const existingUser = new User(existingUserData, eventing, syncing);
  await existingUser.sync.save(existingUserData.id, existingUserData);
}

init();
