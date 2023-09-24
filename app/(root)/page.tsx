import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="px-8">
      <h1 className="text-center text-4xl">HOME</h1>
      <div className="flex flex-wrap gap-4">
        <div className="bg-gray-500 w-[320px] h-[320px] border-red-900 border-2" />
        <div className="bg-gray-500 w-[320px] h-[320px] border-red-900 border-2" />
        <div className="bg-gray-500 w-[320px] h-[320px] border-red-900 border-2" />
        <div className="bg-gray-500 w-[320px] h-[320px] border-red-900 border-2" />
        <div className="bg-gray-500 w-[320px] h-[320px] border-red-900 border-2" />
        <div className="bg-gray-500 w-[320px] h-[320px] border-red-900 border-2" />
        <div className="bg-gray-500 w-[320px] h-[320px] border-red-900 border-2" />
        <div className="bg-gray-500 w-[320px] h-[320px] border-red-900 border-2" />
      </div>
    </main>
  );
}
