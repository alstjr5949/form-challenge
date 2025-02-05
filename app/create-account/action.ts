"use server";

import { z } from "zod";
import db from "../lib/db";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "../lib/constants";

const checkUniqueId = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !user;
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !user;
};

const checkPasswordConfirm = ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => {
  return password === passwordConfirm;
};

const createAccountSchema = z
  .object({
    id: z
      .string({
        invalid_type_error: "아이디는 문자열이어야 합니다",
        required_error: "아이디를 입력해주세요",
      })
      .toLowerCase()
      .trim()
      .refine(checkUniqueId, "이미 사용중인 아이디입니다"),
    email: z
      .string({
        required_error: "이메일을 입력해주세요",
      })
      .email("이메일 형식이 올바르지 않습니다")
      .refine(checkUniqueEmail, "이미 사용중인 이메일입니다"),
    password: z
      .string({
        required_error: "비밀번호를 입력해주세요",
      })
      .min(PASSWORD_MIN_LENGTH, "비밀번호는 최소 8자 이상이어야 합니다")
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    passwordConfirm: z.string({
      required_error: "비밀번호 확인을 입력해주세요",
    }),
  })
  .refine(checkPasswordConfirm, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    id: formData.get("id"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
  };

  const result = await createAccountSchema.safeParseAsync(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
};
