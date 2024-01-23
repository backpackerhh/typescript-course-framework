import { User } from "./models/User";

async function init() {
  const user = new User({ id: "4ff8" });
  await user.fetch();

  console.log(user);
}

init();
