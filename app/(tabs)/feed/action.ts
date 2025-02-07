"use server";

import db from "@/app/lib/db";

export async function getMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: page * 1,
    take: 1,
  });

  return tweets;
}
