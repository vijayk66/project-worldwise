import styles from "./Login.module.css";
import { useContext, useEffect, useState } from "react";
import PageNav from "../Components/PageNav";
import Button from "../Components/Button";
import { AuthContext } from "../Components/FakeUserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const {isAuthenticated, login } = useContext(AuthContext);
  const navigateTo = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    login(email, password);
  }


  useEffect(function(){
    if(isAuthenticated) {
      navigateTo("/app", {replace : true})
   }
  },[isAuthenticated, navigateTo])
 

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleClick}>
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
          {/* <button>Login</button> */}
          <Button type={"primary"}> Login</Button>
        </div>
      </form>
    </main>
  );
}
