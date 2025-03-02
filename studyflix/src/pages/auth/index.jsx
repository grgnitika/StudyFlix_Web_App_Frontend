import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CommonForm from "@/components/common-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context";
import logo from "@/assets/logo.png";

function AuthPage() {
  const [activeTab, setActiveTab] = useState("signin");
  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleLoginUser,
  } = useContext(AuthContext);

  function handleTabChange(value) {
    setActiveTab(value);
  }

  function checkIfSignInFormIsValid() {
    return signInFormData?.userEmail !== "" && signInFormData?.password !== "";
  }

  function checkIfSignUpFormIsValid() {
    return (
      signUpFormData?.userName !== "" &&
      signUpFormData?.userEmail !== "" &&
      signUpFormData?.password !== ""
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 px-4 lg:px-6 h-14 flex items-center border-b bg-black text-white z-50">
        <Link to="/" className="flex items-center justify-center">
          <img src={logo} alt="Site Logo" className="h-12 w-12 mr-4" />
          <span className="font-extrabold text-xl">STUDYFLIX</span>
        </Link>
      </header>

      {/* Main Content with padding to account for the fixed header */}
      <div className="flex items-center justify-center min-h-screen bg-background pt-14">
        <Tabs
          value={activeTab}
          defaultValue="signin"
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2 bg-white">
            <TabsTrigger
              value="signin"
              className={
                activeTab === "signin"
                  ? "!bg-[#45B1E8] !text-white"
                  : "bg-white text-gray-500"
              }
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className={
                activeTab === "signup"
                  ? "!bg-[#45B1E8] !text-white"
                  : "bg-white text-gray-500"
              }
            >
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <Card className="p-6 space-y-4 bg-white">
              <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signInFormControls}
                  buttonText="Sign In"
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormIsValid()}
                  handleSubmit={handleLoginUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card className="p-6 space-y-4 bg-white">
              <CardHeader>
                <CardTitle>Create a new account</CardTitle>
                <CardDescription>Enter your details to get started</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText="Sign Up"
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormIsValid()}
                  handleSubmit={handleRegisterUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default AuthPage;