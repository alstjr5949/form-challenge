"use client";

import { useState } from "react";
import ListTweet from "./list-tweet";
import { getMoreTweets } from "@/app/(tabs)/feed/action";

interface TweetListProps {
  initialTweets: {
    id: number;
    tweet: string;
    createdAt: Date;
  }[];
}

export default function TweetList({ initialTweets }: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreTweets(page + 1);

    if (newProducts.length !== 0) {
      setTweets((prev) => [...prev, ...newProducts]);
      setPage((prev) => prev + 1);
    } else {
      setIsLast(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="py-5 flex flex-col gap-8">
      {tweets.map((tweet) => (
        <ListTweet key={tweet.id} {...tweet} />
      ))}
      {!isLast && (
        <button
          onClick={onLoadMoreClick}
          disabled={isLoading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "로딩 중" : "Load more"}
        </button>
      )}
    </div>
  );
}
