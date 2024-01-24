import { Attributes } from "./models/Attributes";
import { Eventing } from "./models/Eventing";
import { Sync } from "./models/Sync";
import { User, UserProps } from "./models/User";

async function init() {
  const eventing = new Eventing();
  const syncing = new Sync<UserProps>();

  const userId = "4ff8";
  const userAttributes = new Attributes<UserProps>({ id: userId });
  const user = new User(userAttributes, eventing, syncing);
  const userData = await user.sync.fetch(userId);
  user.attributes.set(userData as unknown as UserProps);

  console.log(user.attributes.props);

  user.events.on("change", () => {
    console.log("changed!");
  });

  user.events.trigger("change");

  const existingUserData = { id: "4f25", name: "David", age: 37 };
  const existingUserAttributes = new Attributes<UserProps>(existingUserData);
  const existingUser = new User(existingUserAttributes, eventing, syncing);
  await existingUser.sync.save(existingUserData.id, existingUserData);
}

init();
