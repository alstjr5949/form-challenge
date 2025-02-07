import db from "@/app/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
        },
      },
    },
  });

  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const tweet = await getTweet(id);

  if (!tweet) {
    return notFound();
  }

  return (
    <div className="py-5 flex flex-col gap-8">
      <div className="flex gap-2 items-center">
        <div className="relative size-12 rounded-full overflow-hidden">
          <Image fill src="/profile.jpg" alt="profile" />
        </div>
        <div>
          <p className="text-lg font-bold">{tweet.user.username}</p>
          <p className="text-sm text-gray-500">@{tweet.userId}</p>
        </div>
      </div>
      <div>
        <p>{tweet.tweet}</p>
        <p className="text-sm text-gray-500">
          {tweet.createdAt.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
