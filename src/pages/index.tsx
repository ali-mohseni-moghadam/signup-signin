import Link from "next/link";

export default function Home() {
  return (
    <div className="p-5">
      <h1>Authorization & Authentication</h1>
      <button className="bg-lime-700 rounded p-3">
        <Link href="/dashboard">Dashboard</Link>
      </button>
      <button className="bg-lime-700 rounded p-3 ml-2 mr-2">
        <Link href="/signup">Sign Up</Link>
      </button>
      <button className="bg-lime-700 rounded p-3">
        <Link href="/signin">Sign In</Link>
      </button>
    </div>
  );
}
