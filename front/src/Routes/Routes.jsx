import React from "react";

const Home = React.lazy(() => import("../pages/Home/Home"));
const About = React.lazy(() => import("../pages/Home/About"));
const Cart = React.lazy(() => import("../pages/Cart"));
const Tablettes = React.lazy(() => import("../pages/Products/Tablettes"));
const Favourites = React.lazy(() => import("../pages/Favourites"));
const Laptops = React.lazy(() => import("../pages/Products/Laptops"));
const Mobiles = React.lazy(() => import("../pages/Products/Mobiles"));
//const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const ResetPassword = React.lazy(() => import("../pages/Aauth/ResetPassword"));
const Login = React.lazy(() => import("../pages/Aauth/Login"));
const SignUp = React.lazy(() => import("../pages/Aauth/Register"));
const ProductDetails = React.lazy(() =>
  import("../pages/Products/ProductDetail")
);
const ForgotPassword = React.lazy(() =>
  import("../pages/Aauth/ForgotPassword")
);

const components = {
  Home: {
    path: "/base/home",
    name: "home",
    element: <Home />,
  },
  About: {
    path: "/base/about",
    name: "about",
    element: <About />,
  },
  Login: {
    path: "/login",
    name: "Login",
    element: <Login />,
  },
  SignUp: {
    path: "/register",
    name: "SignUp",
    element: <SignUp />,
  },
  ForgotPassword: {
    path: "/forgot-password",
    name: "ForgotPassword",
    element: <ForgotPassword />,
  },
  ResetPassword: {
    path: "/resetPassword/:userId/:token",
    name: "ResetPassword",
    element: <ResetPassword />,
  },
  Mobiles: {
    path: "/base/Mobiles",
    name: "Mobiles",
    element: <Mobiles />,
  },
  ProductDetails: {
    path: "/base/ProductDetails/:id",
    name: "ProductDetails",
    element: <ProductDetails />,
  },
  Favourites: {
    path: "/base/Favourites",
    name: "Favourites",
    element: <Favourites />,
  },
  Cart: {
    path: "/base/cart",
    name: "cart",
    element: <Cart />,
  },
  Laptops: {
    path: "/base/Laptops",
    name: "Laptops",
    element: <Laptops />,
  },
  Tablettes: {
    path: "/base/tablettes",
    name: "Tablettes",
    element: <Tablettes />,
  },
};
const rolesConfig = {
  user: {
    routes: [
      components.Home,
      components.About,
      components.Profile,
      components.Login,
      components.SignUp,
      components.ForgotPassword,
      components.ResetPassword,
      components.Mobiles,
      components.ProductDetails,
      components.Favourites,
      components.Laptops,
      components.Tablettes,
      /*components.Laptops,
      components.Mobiles,
      components.Entertainment,
      components.PaymentFail,
      components.PaymentSucess,
    */
    ],
  },
};
const ProtectedRoutesConfig = { routes: [components.Cart] };

export { rolesConfig, ProtectedRoutesConfig };
