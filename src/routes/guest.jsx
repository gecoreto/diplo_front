// @material-ui/icons
import Login from "views/Login/Login.jsx";
import Register from "views/Register/Register.jsx";

const guestRoutes = [
  {
    path: "/login",
    component: Login
  },
  {
    path: "/register",
    component: Register
  },
  { redirect: true, path: "/", to: "/login", navbarName: "Redirect" }
];

export default guestRoutes;
