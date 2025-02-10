"use client";

import { useActionState } from "react";
import FormButton from "../form-button";
import FormInput from "../form-input";
import { addTweet } from "./action";

export default function AddTweet() {
  const [state, action] = useActionState(addTweet, null);

  console.log(state);

  return (
    <form action={action} className="flex flex-col gap-2">
      <FormInput
        name="tweet"
        placeholder="What's happening?"
        errors={state?.fieldErrors?.tweet ?? []}
        type="textarea"
      />
      <FormButton text="Tweet" />
    </form>
  );
}
