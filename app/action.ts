"use server";

import { z } from "zod";
import db from "./lib/db";
import bcrypt from "bcrypt";
import getSession from "./lib/session";
import { redirect } from "next/navigation";
const checkIdExist = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      username: id,
    },
    select: {
      id: true,
    },
  });

  return !!user;
};

const loginSchema = z.object({
  id: z
    .string({ required_error: "아이디를 입력해주세요" })
    .toLowerCase()
    .refine(checkIdExist, "존재하지 않는 아이디입니다"),
  password: z.string({ required_error: "비밀번호를 입력해주세요" }),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    id: formData.get("id"),
    password: formData.get("password"),
  };

  const result = await loginSchema.spa(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        username: result.data.id,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const isPasswordCorrect = await bcrypt.compare(
      result.data.password,
      user!.password ?? ""
    );

    if (isPasswordCorrect) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();

      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 일치하지 않습니다"],
          id: [],
        },
      };
    }
  }
}
