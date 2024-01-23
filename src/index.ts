import { Eventing } from "./models/Eventing";
import { User } from "./models/User";

async function init() {
  const eventing = new Eventing();
  const user = new User({ id: "4ff8" }, eventing);
  await user.fetch();

  console.log(user);

  user.events.on("change", () => {
    console.log("changed!");
  });

  user.events.trigger("change");

  const existingUser = new User({ id: "4f25", name: "David", age: 37 }, eventing);
  await existingUser.save();

  // const newUser = new User({ name: "Steph", age: 35 });
  // await newUser.save();
}

init();
