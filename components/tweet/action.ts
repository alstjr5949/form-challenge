"use server";

import db from "@/app/lib/db";
import getSession from "@/app/lib/session";
import { redirect } from "next/navigation";
import { z } from "zod";

const tweetSchema = z.object({
  tweet: z.string().min(1, "트윗을 입력해주세요."),
});

export async function addTweet(prevState: any, formData: FormData) {
  const data = {
    tweet: formData.get("tweet"),
  };

  const result = tweetSchema.safeParse(data);

  console.log(result);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const session = await getSession();

    if (session.id) {
      await db.tweet.create({
        data: {
          tweet: result.data.tweet,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
    }

    redirect("/feed");
  }
}
