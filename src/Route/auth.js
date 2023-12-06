import Login from "../Pages/Authentication/SignIn";
import Logout from "../Pages/Authentication/Logout";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import RestPassword from "../Pages/Authentication/RestPassword";

const route = [
  { path: "/", exact: true, name: "Login", component: Login, title: "Login" },
  {
    path: "/login",
    exact: true,
    name: "Login",
    component: Login,
    title: "LOGIN",
  },
  {
    path: "/forgot-password",
    exact: true,
    name: "ForgotPassword",
    component: ForgotPassword,
    title: "FORGOT_PASSWORD_MS",
  },
  {
    path: "/reset-password",
    exact: true,
    name: "Reset Password",
    component: RestPassword,
    title: "RESET_PASSWORD",
  },
  {
    path: "/logout",
    exact: true,
    name: "Logout",
    component: Logout,
    title: "Logout",
  },
];

export default route;
