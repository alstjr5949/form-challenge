import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function test() {
  const user = await db.user.create({
    data: {
      username: "test",
    },
  });
  console.log(user);
}

export default db;
