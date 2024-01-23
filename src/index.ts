import { User } from "./models/User";

async function init() {
  const user = new User({ id: "4ff8" });
  await user.fetch();

  console.log(user);

  const existingUser = new User({ id: "4f25", name: "David", age: 37 });
  await existingUser.save();

  // const newUser = new User({ name: "Steph", age: 35 });
  // await newUser.save();
}

init();
