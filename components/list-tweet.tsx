import Image from "next/image";
import Link from "next/link";

interface ListTweetProps {
  id: number;
  tweet: string;
  createdAt: Date;
}

export default function ListTweet({ id, tweet, createdAt }: ListTweetProps) {
  return (
    <Link href={`/tweet/${id}`} className="flex flex-col gap-2">
      <div className="flex gap-2 items-center">
        <div className="relative size-12 rounded-full overflow-hidden">
          <Image fill src="/profile.jpg" alt="profile" />
        </div>
        <div>
          <p className="text-lg font-bold">{"username"}</p>
          <p className="text-sm text-gray-500">{"@userID"}</p>
        </div>
      </div>
      <div>
        <p>{tweet}</p>
        <p className="text-sm text-gray-500">{createdAt.toLocaleString()}</p>
      </div>
    </Link>
  );
}
