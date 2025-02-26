import React, { useState } from "react";
import Link from "next/link";
import styles from "../../styles/Auth.module.css";
import type { Platform } from "../../types";
import { useRouter } from "next/router";

export default function Register() {
  const router = useRouter();

  return (
    <div>
      <h1>Register</h1>
      <p>Select your role:</p>
      <button onClick={() => router.push("/register/student")}>
        Register as Student
      </button>
      <button onClick={() => router.push("/register/teacher")}>
        Register as Teacher
      </button>
    </div>
  );
}
