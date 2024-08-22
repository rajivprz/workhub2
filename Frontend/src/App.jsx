import React from "react";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home/Home";
import Gigs from "./pages/Gigs/Gigs";
import Gig from "./pages/Gig/Gig";
import Add from "./pages/Add/Add";
import Orders from "./pages/Orders/Orders";
import Profile from "./pages/profile/Profile";
import Messages from "./pages/Messages/Messages";
import Message from "./pages/Message/Message";
import MyGigs from "./pages/MyGigs/MyGigs";
import PaymentDo from "./pages/Paymentdo/Paymentdo";
import Otp from "./pages/otp/Otp";
import { Payment } from "./pages/payment/Payment";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Freelancerprofile from "./pages/freelancerprofile/Freelancerprofile";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => (
    <div className="app">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    </div>
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/Paymentdo", element: <PaymentDo /> },
        { path: "/gigs", element: <Gigs /> },
        { path: "/gig/:id", element: <Gig /> },
        { path: "/orders", element: <Orders /> },
        { path: "/otp", element: <Otp /> },
        { path: "/profile", element: <Profile /> },
        { path: "/payment", element: <Payment /> },
        { path: "/mygigs", element: <MyGigs /> },
        { path: "/add", element: <Add /> },
        { path: "/messages", element: <Messages /> },
        { path: "/message/:id", element: <Message /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/freelancerprofile", element: <Freelancerprofile /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
