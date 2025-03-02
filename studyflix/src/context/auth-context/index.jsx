import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { checkAuthService, loginService, registerService } from "@/services";
import { createContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // ✅ Import Toastify for notifications
import "react-toastify/dist/ReactToastify.css"; // ✅ Import Toastify CSS

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  async function handleRegisterUser(event) {
    event.preventDefault();
    const data = await registerService(signUpFormData);

    if (data.success) {
      toast.success("Signed up successfully! ✅", { position: "top-right" }); // ✅ Show success message
    } else {
      toast.error("Signup failed. Please try again.", { position: "top-right" });
    }
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(signInFormData);
  
    console.log(data, "Response from API");
  
    if (data.success) {
      localStorage.setItem("accessToken", data.data.accessToken); // ✅ Store token
  
      setAuth({
        authenticate: true,
        user: data.data.user,
      });

      toast.success("Logged in successfully! ✅", { position: "top-right" }); // ✅ Show login success message

      // ✅ Redirect based on role
      setTimeout(() => {
        if (data.data.user.role === "instructor") {
          window.location.href = "/instructor"; 
        } else {
          window.location.href = "/home"; // ✅ Redirect students to Home Page
        }
      }, 1000); // ✅ Delay to allow toast to show
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });

      toast.error("Login failed. Invalid credentials.", { position: "top-right" }); // ✅ Show login error message
    }
  }
  
  async function checkAuthUser() {
    try {
      const token = localStorage.getItem("accessToken"); 
      if (!token) {
        console.log("No token found in localStorage");
        setAuth({ authenticate: false, user: null });
        setLoading(false);
        return;
      }

      const data = await checkAuthService(token);

      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      console.log(error);
      setAuth({ authenticate: false, user: null });
    }
    setLoading(false);
  }

  function resetCredentials() {
    localStorage.removeItem("accessToken");
    setAuth({
      authenticate: false,
      user: null,
    });

    toast.info("Logged out successfully!", { position: "top-right" }); // ✅ Show logout message
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials,
      }}
    >
      <ToastContainer /> {/* ✅ Add ToastContainer for notifications */}
      {loading ? <Skeleton /> : children}
    </AuthContext.Provider>
  );
}
