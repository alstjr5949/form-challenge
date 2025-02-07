import db from "@/app/lib/db";
import TweetList from "@/components/tweet-list";

async function getFeeds() {
  const feeds = await db.tweet.findMany({
    select: {
      id: true,
      tweet: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });

  return feeds;
}

export default async function Feed() {
  const feeds = await getFeeds();

  return (
    <div className="py-5 flex flex-col gap-8">
      <TweetList initialTweets={feeds} />
    </div>
  );
}
