import { FormEvent, useEffect } from "react";
import styles from "./Login.module.scss";

import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Headling } from "../../components/Headling";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/userSlice";

export interface LoginForm {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
}
export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));
  };

  return (
    <div className={`${styles["login__wrapper"]}`}>
      <Headling>Login to</Headling>
      {loginErrorMessage && (
        <h3 className={`${styles["error"]}`}>{loginErrorMessage}</h3>
      )}
      <form className={`${styles["form"]}`} onSubmit={handleSubmit}>
        <div className={`${styles["form__fields"]}`}>
          <Label htmlFor="email">Your email</Label>
          <Input id="email" name="email" placeholder="Email" />
        </div>
        <div className={`${styles["form__fields"]}`}>
          <Label htmlFor="password">Your password</Label>
          <Input id="password" name="password" placeholder="Password" />
        </div>
        <Button appearance="big">Enter</Button>
      </form>
      <div className={`${styles["link"]}`}>
        <div className={`${styles["link__text"]}`}>No account?</div>
        <NavLink to="/auth/register" className={`${styles["link__btn"]}`}>
          Sign in
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
