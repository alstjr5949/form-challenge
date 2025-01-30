"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { handleLoginFormSubmit } from "./action";
import { useActionState } from "react";

export default function Login() {
  const [state, formAction] = useActionState(handleLoginFormSubmit, null);

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center px-10">
      <form
        action={formAction}
        className="w-full flex flex-col gap-2 justify-center items-center"
      >
        <div className="w-16 h-16 rounded-full bg-lime-300 mb-10" />
        <FormInput
          type="email"
          placeholder="이메일"
          errors={[]}
          required
          name="email"
        />
        <FormInput
          type="text"
          placeholder="아이디"
          errors={[]}
          required
          name="id"
        />
        <FormInput
          type="password"
          placeholder="비밀번호"
          errors={state?.errors ?? []}
          required
          name="password"
        />
        <FormButton text="로그인" />
      </form>
      {state?.success && (
        <div className="w-full p-2 text-center font-bold rounded-lg mt-2 bg-green-500 text-sm">
          {state.success}
        </div>
      )}
    </div>
  );
}
