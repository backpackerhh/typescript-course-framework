import { User } from "./models/User";

const user = new User({ name: "David", age: 37 });

console.log(user.get("name"));
console.log(user.get("age"));

user.set({ name: "Perico" });
user.set({ age: 28 });

console.log(user.get("name"));
console.log(user.get("age"));
