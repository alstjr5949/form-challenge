"use client";

import FormButton from "@/components/form-button";
import FormInput from "@/components/form-input";
import { createAccount } from "./action";
import { useActionState } from "react";

export default function CreateAccount() {
  const [state, formAction] = useActionState(createAccount, null);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-3xl font-bold">회원가입</h1>
      <form
        action={formAction}
        className="w-full flex flex-col gap-2 justify-center items-center mt-10"
      >
        <FormInput
          type="text"
          placeholder="아이디"
          errors={state?.fieldErrors?.id ?? []}
          required
          name="id"
        />
        <FormInput
          type="email"
          placeholder="이메일"
          errors={state?.fieldErrors?.email ?? []}
          required
          name="email"
        />
        <FormInput
          type="password"
          placeholder="비밀번호"
          errors={state?.fieldErrors?.password ?? []}
          required
          name="password"
        />
        <FormInput
          type="password"
          placeholder="비밀번호 확인"
          errors={state?.fieldErrors?.passwordConfirm ?? []}
          required
          name="passwordConfirm"
        />
        <FormButton text="회원가입" />
      </form>
      {/* {state?.success && (
        <div className="w-full p-2 text-center font-bold rounded-lg mt-2 bg-green-500 text-sm">
          {state.success}
        </div>
      )} */}
    </div>
  );
}
