"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import Link from "next/link";
import { login } from "../action";
import { useActionState } from "react";

export default function Login() {
  const [state, formAction] = useActionState(login, null);

  return (
    <div className="flex flex-col justify-center items-center gap-6 h-full">
      <div className="flex flex-col items-center gap-2">
        <p className="text-3xl font-bold">작업하다 막힐 땐,</p>
        <p className="text-3xl font-bold">언제든 애스킷!</p>
      </div>
      <form action={formAction} className="flex flex-col gap-3 w-full mt-10">
        <FormInput
          type="text"
          placeholder="아이디를 입력해주세요"
          errors={state?.fieldErrors?.id ?? []}
          required
          name="id"
        />
        <FormInput
          type="password"
          placeholder="비밀번호를 입력해주세요"
          errors={state?.fieldErrors?.password ?? []}
          required
          name="password"
        />
        <FormButton text="로그인" />
      </form>
      <div className="flex justify-around items-center w-full gap-2">
        <Link href="/create-account" className="text-sm text-neutral-500">
          이메일로 회원가입
        </Link>
        <Link href="/find-account" className="text-sm text-neutral-500">
          아이디/비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}
