import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("pages/login/login.tsx"),
  route("/tasksBoard", "private_routes/private_routes_layout.tsx", [
    index("pages/tasks_board/tasks_board.tsx"),
  ]),
] satisfies RouteConfig;