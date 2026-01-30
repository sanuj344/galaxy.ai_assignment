import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl">
            <span className="text-4xl font-bold text-white">W</span>
          </div>
        </div>
        <h1 className="mb-4 text-5xl font-bold text-white">Weavy Workflow Builder</h1>
        <p className="mb-8 text-xl text-slate-300">
          Build and execute AI-powered workflows with LLM nodes
        </p>
        <Link
          href="/sign-in"
          className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 font-semibold text-white shadow-lg transition-transform hover:scale-105"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
