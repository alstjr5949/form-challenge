import Link from "next/link";
import { test } from "./lib/db";

test();
export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen px-10">
      <Link
        href="/login"
        className="w-full py-3 bg-blue-500 rounded-md flex justify-center items-center hover:bg-blue-600 transition-colors"
      >
        로그인 하러가기
      </Link>
    </div>
  );
}
