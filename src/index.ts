import { User } from "./models/User";

const user = User.build({ id: "4ff8" });

user.on("change", () => {
  console.log(`User with ID ${user.get("id")} fetched! -> ${user.get("name")}`);
});

user.fetch();

const existingUser = User.build({ id: "4f25", name: "David", age: 37 });

existingUser.on("save", () => {
  console.log(`User with ID ${existingUser.get("id")} saved! -> ${existingUser.get("name")}`);
});

existingUser.save();

// const newUser = User.build({ name: "Perico", age: 21 });

// newUser.on("save", () => {
//   console.log(`New user saved!`);
// });

// newUser.save();
