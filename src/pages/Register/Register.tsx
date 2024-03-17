import { FormEvent, useEffect } from "react";
import styles from "./Register.module.scss";

import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import { Headling } from "../../components/Headling";
import { Input } from "../../components/Input";
import { Label } from "../../components/Label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/userSlice";

export interface RegisterForm {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
  name: {
    value: string;
  };
}
export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector((s: RootState) => s.user);

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(userActions.clearLoginError());
    dispatch(userActions.clearRegisterError());
    const target = e.target as typeof e.target & RegisterForm;
    const { email, password, name } = target;
    await sendRegister(email.value, password.value, name.value);
  };

  const sendRegister = async (
    email: string,
    password: string,
    name: string
  ) => {
    dispatch(register({ email, password, name }));
  };

  return (
    <div className={`${styles["register__wrapper"]}`}>
      <Headling>Sing in</Headling>
      {registerErrorMessage && (
        <h3 className={`${styles["error"]}`}>{registerErrorMessage}</h3>
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
        <div className={`${styles["form__fields"]}`}>
          <Label htmlFor="password">Your name</Label>
          <Input id="name" name="name" placeholder="Name" />
        </div>
        <Button appearance="big">Sing in</Button>
      </form>
      <div className={`${styles["link"]}`}>
        <div className={`${styles["link__text"]}`}>Do you have account?</div>
        <NavLink to="/auth/login" className={`${styles["link__btn"]}`}>
          Enter
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
