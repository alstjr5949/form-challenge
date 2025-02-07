import { notFound, redirect } from "next/navigation";
import getSession from "../../lib/session";
import db from "../../lib/db";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    if (user) {
      return user;
    }
  }

  notFound();
}

export default async function Profile() {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();

    await session.destroy();
    redirect("/");
  };

  return (
    <div>
      <h1>Welcome! {user?.username}</h1>
      <form action={logout}>
        <button>로그아웃</button>
      </form>
    </div>
  );
}
