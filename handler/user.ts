import User from '../schemas/user';

export async function createUser(username: string) {
  const user = new User({ username });
  await user.save();
  return user;
}

export async function getUsers() {
  const users = await User.find().exec();
  return users;
}

export async function getUserById(userId: string) {
  const user = await User.findById(userId).exec();
  return user;
}

export async function updateUser(userId: string, username: string) {
  const user = await User.findByIdAndUpdate(
    userId,
    { username },
    { new: true }
  ).exec();
  return user;
}

export async function deleteUser(userId: string) {
  const user = await User.findByIdAndDelete(userId).exec();
  return user;
}
