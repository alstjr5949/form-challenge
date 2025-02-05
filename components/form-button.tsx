"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="w-full p-3 bg-teal-400 rounded-lg hover:bg-teal-300 transition-colors text-white font-bold"
      disabled={pending}
    >
      {pending ? "로딩중..." : text}
    </button>
  );
}
