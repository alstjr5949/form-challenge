"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full p-2 bg-lime-300 rounded-lg hover:bg-lime-400 transition-colors text-black font-bold mt-2"
      disabled={pending}
    >
      {pending ? "로딩중..." : text}
    </button>
  );
}
