import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/:lang?", "routes/page.tsx"),
    route("/:lang?/signup", "routes/auth/SignupPage.tsx"),
    route("/:lang?/signin", "routes/auth/SigninPage.tsx"),
    route("/:lang?/user/dashboard", "routes/users/DashboardPage.tsx")

] satisfies RouteConfig;
