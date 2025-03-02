import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();

  console.log("Auth Status:", authenticated);
  console.log("User Data:", user);

  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (
    authenticated &&
    user?.role !== "instructor" &&
    (location.pathname.includes("instructor") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  if (
    authenticated &&
    user.role === "instructor" &&
    !location.pathname.includes("instructor") // ✅ Change admin to instructor
  ) {
    return <Navigate to="/instructor" />; // ✅ Redirects to /instructor instead of /admin-dashboard
  }

  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
