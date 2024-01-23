import { User } from "./models/User";

const user = new User({ name: "David", age: 37 });

console.log(user.get("name"));
console.log(user.get("age"));

user.set({ name: "Perico" });
user.set({ age: 28 });

console.log(user.get("name"));
console.log(user.get("age"));

user.on("change", () => {
  console.log("Change #1");
});

user.on("change", () => {
  console.log("Change #2");
});

user.trigger("change");

user.on("test", () => {
  console.log(1 + 2);
});

user.trigger("test");
