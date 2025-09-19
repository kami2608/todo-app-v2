import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Login.module.css";
import { type FC } from "react";
import { LoginSchema } from "../../schemas/UserInfoSchema";
import { Input } from "../../components/common/input/Input";
import ErrorMessage from "../../components/common/errorMessage/ErrorMessage";
import { Button } from "../../components/common/button/Button";
import { AuthURLs } from "../../constants/Auth.paths";
import { AppURLs } from "../../constants/App.paths";
import { login } from "../../api/auth/Login";

type LoginUser = z.infer<typeof LoginSchema>;

const Login: FC = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginUser>({
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<LoginUser> = async (data) => {
    try {
      const isAuthenticated = await login(data);
      if (isAuthenticated) {
        navigate(AppURLs.home);
      }
    } catch (error) {
      alert(error);
      console.log(error);
      return;
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.loginHeader}>Welcome to Todo App</h1>
      <div className={styles.loginContainer}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
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
            {errors.root && (
              <div>
                <ErrorMessage error={errors.root} />
              </div>
            )}
            <div className={styles.loginBtn}>
              <Button type="submit">Login</Button>
              <p>
                Don't have an account?{" "}
                <Link to={AuthURLs.signup} className={styles.loginLink}>
                  Register here.
                </Link>
              </p>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Login;
