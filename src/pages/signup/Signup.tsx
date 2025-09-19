import { Link, useNavigate } from "react-router-dom";
import type z from "zod";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Signup.module.css";
import type { FC } from "react";
import { SignupSchema } from "../../schemas/UserInfoSchema";
import { Input } from "../../components/common/input/Input";
import { Button } from "../../components/common/button/Button";
import { AuthURLs } from "../../constants/Auth.paths";
import { signup } from "../../api/auth/Signup";
import { AppURLs } from "../../constants/App.paths";

type SignupUser = z.infer<typeof SignupSchema>;

const Signup: FC = () => {
  const navigate = useNavigate();
  const methods = useForm<SignupUser>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignupSchema),
  });

  const { handleSubmit } = methods;
  const onSubmit: SubmitHandler<SignupUser> = async (data) => {
    try {
      const isAuthenticated = await signup(data);
      if (isAuthenticated) {
        navigate(AppURLs.home);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  return (
    <div className={styles.signup}>
      <h1 className={styles.signupHeader}>Welcome to Todo App</h1>
      <div className={styles.signupContainer}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.signupForm}>
            <Input
              name="username"
              label="Enter your username:"
              type="text"
              placeholder="Your username..."
            />
            <Input
              name="password"
              label="Enter your password:"
              type="password"
              placeholder="Your password..."
            />
            <Input
              name="confirmPassword"
              label="Confirm your password:"
              type="password"
              placeholder="Confirm your password"
            />
            <div className={styles.signupBtn}>
              <Button type="submit">Sign up</Button>
              <p>
                Already have an account?{" "}
                <Link to={AuthURLs.login} className={styles.signupLink}>
                  Login
                </Link>
              </p>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Signup;
