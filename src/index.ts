import { User } from "./models/User";

async function init() {
  const user = User.build({ id: "4ff8" });

  user.on("change", () => {
    console.log(`User with ID ${user.get("id")} changed!`);
  });

  await user.fetch();

  const existingUser = User.build({ id: "4f25", name: "David", age: 37 });

  existingUser.on("save", () => {
    console.log(`User with ID ${existingUser.get("id")} saved!`);
  });

  await existingUser.save();

  const newUser = User.build({ name: "Perico", age: 21 });

  newUser.on("save", () => {
    console.log(`New user saved!`);
  });

  await newUser.save();
}

init();
