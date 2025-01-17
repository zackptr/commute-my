import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/line/:id", "routes/line.tsx"),
] satisfies RouteConfig;
