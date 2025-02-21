import { useRouter } from "next/router";

export default function Logo() {
  const router = useRouter();

  return (
    <div className="logo" onClick={() => router.push("/")}>
      ESL Explorers
    </div>
  );
}
