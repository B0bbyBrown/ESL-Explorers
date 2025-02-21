import { useRouter } from "next/router";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Login</h1>
      <p>Select your role:</p>
      <button onClick={() => router.push("/login/student")}>
        Student Login
      </button>
      <button onClick={() => router.push("/login/teacher")}>
        Teacher Login
      </button>
    </div>
  );
}
