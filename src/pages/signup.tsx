import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const signupHandler = async () => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (data.status === "success") router.push("/signin");
  };

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          window.location.href = "/dashboard";
        }
      });
  }, []);

  return (
    <div className="p-5">
      <h3>Registration Form :</h3>
      <input
        className="mr-2 mt-2 rounded p-1 text-gray-700"
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="rounded p-1 text-gray-700"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="bg-lime-700 p-1 ml-1 rounded" onClick={signupHandler}>
        Sign Up
      </button>
    </div>
  );
}

export default Signup;
