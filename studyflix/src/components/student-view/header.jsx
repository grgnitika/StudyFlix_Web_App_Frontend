import { TvMinimalPlay } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import logo from "@/assets/logo.png"; // ✅ Ensure correct path

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const { resetCredentials } = useContext(AuthContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
    <header className="flex items-center justify-between p-4 border-b bg-black text-white">
      {/* Left Section - Logo and Title */}
      <div className="flex items-center space-x-4">
        <Link to="/home" className="flex items-center hover:text-gray-300">
          {/* ✅ Fixed Logo Styling */}
          <img
            src={logo}
            alt="StudyFlix Logo"
            className="h-12 w-auto object-contain mr-2" // ✅ Properly sized & positioned
          />
          <span className="font-extrabold md:text-xl text-[14px]">
            STUDYFLIX
          </span>
        </Link>

        {/* ✅ "Explore Learning Materials" Button - Black with White Text */}
        <Button
          onClick={() => {
            location.pathname.includes("/courses") ? null : navigate("/courses");
          }}
          className="bg-black text-white hover:bg-gray-800 border border-white px-4 py-2"
        >
          Explore Learning Materials
        </Button>
      </div>

      {/* Right Section - My Videos & Sign Out */}
      <div className="flex items-center space-x-4">
        <div className="flex gap-4 items-center">
          <div
            onClick={() => navigate("/student-courses")}
            className="flex cursor-pointer items-center gap-3 hover:text-gray-300"
          >
            <span className="font-extrabold md:text-xl text-[14px]">
              Watched Videos
            </span>
            <TvMinimalPlay className="w-8 h-8 cursor-pointer text-white" />
          </div>
          <Button
            onClick={handleLogout}
            className="bg-white text-black hover:bg-gray-300"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}

export default StudentViewCommonHeader;
