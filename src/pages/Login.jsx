import { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import Button from "./Button";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

import Logo from "./Logo";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("shivu@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isauthenticated } = useAuth();
  const navigate = useNavigate();
  function handler(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }
  useEffect(
    function () {
      if (isauthenticated) navigate("/app", { replace: true });
    },
    [isauthenticated, navigate]
  );
  return (
    <main className={styles.login}>
      <Logo />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={(e) => handler(e)}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
