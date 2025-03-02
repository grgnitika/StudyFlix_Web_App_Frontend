// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { AuthContext } from "@/context/auth-context";
// import { StudentContext } from "@/context/student-context";
// import { fetchStudentBoughtCoursesService, captureAndFinalizePaymentService } from "@/services";
// import { Watch } from "lucide-react";
// import { useContext, useEffect } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { toast } from "react-toastify";

// function StudentCoursesPage() {
//   const { auth } = useContext(AuthContext);
//   const { studentBoughtCoursesList, setStudentBoughtCoursesList } = useContext(StudentContext);
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");

//   // Fetch student's bought courses
//   async function fetchStudentBoughtCourses() {
//     try {
//       const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
//       if (response?.success) {
//         setStudentBoughtCoursesList(response?.data);
//       } else {
//         toast.error("Failed to load purchased courses.");
//         setStudentBoughtCoursesList([]); // Ensure state is updated even on failure
//       }
//     } catch (error) {
//       console.error("Error fetching student courses:", error);
//       toast.error("Error fetching your courses. Please try again.");
//       setStudentBoughtCoursesList([]); // Prevent UI issues if request fails
//     }
//   }

//   // Finalize payment once sessionId is present
//   useEffect(() => {
//     if (auth?.user?._id) {
//       fetchStudentBoughtCourses();
//     }
//   }, [auth?.user?._id]); // ✅ Refetch when user logs in or changes

//   useEffect(() => {
//     if (sessionId) {
//       async function finalizePayment() {
//         try {
//           // Ensure we are sending sessionId and userId for backend verification
//           const response = await captureAndFinalizePaymentService(sessionId, auth?.user?._id);
//           if (response?.success) {
//             toast.success("Payment confirmed! Course added to your list.", { position: "top-right" });
//             fetchStudentBoughtCourses(); // ✅ Refresh purchased courses list after successful payment
//           } else {
//             toast.error("Payment verification failed. Please contact support.");
//           }
//         } catch (error) {
//           console.error("Payment Finalization Error:", error);
//           toast.error("An error occurred while verifying your purchase.");
//         }
//       }
//       finalizePayment();
//     }
//   }, [sessionId]); // ✅ Run only when sessionId is detected

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-8">My Learning Materials</h1>
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {studentBoughtCoursesList.length > 0 ? (
//           studentBoughtCoursesList.map((course) => (
//             <Card key={course.courseId} className="flex flex-col">
//               <CardContent className="p-4 flex-grow">
//                 <img
//                   src={course?.courseImage}
//                   alt={course?.title}
//                   className="h-52 w-full object-cover rounded-md mb-4"
//                 />
//                 <h3 className="font-bold mb-1">{course?.title}</h3>
//               </CardContent>
//               <CardFooter>
//                 <Button
//                   onClick={() => navigate(`/course-progress/${course?.courseId}`)}
//                   className="flex-1"
//                 >
//                   <Watch className="mr-2 h-4 w-4" /> Start Watching
//                 </Button>
//               </CardFooter>
//             </Card>
//           ))
//         ) : (
//           <h1 className="text-3xl font-bold">No Videos found</h1>
//         )}
//       </div>
//     </div>
//   );
// }

// export default StudentCoursesPage;


import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { fetchStudentBoughtCoursesService } from "@/services"; // Removed payment service
import { Watch } from "lucide-react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function StudentCoursesPage() {
  const { auth } = useContext(AuthContext);
  const { studentBoughtCoursesList, setStudentBoughtCoursesList } = useContext(StudentContext);
  const navigate = useNavigate();

  // Fetch student's bought courses
  async function fetchStudentBoughtCourses() {
    try {
      const response = await fetchStudentBoughtCoursesService(auth?.user?._id);
      if (response?.success) {
        setStudentBoughtCoursesList(response?.data);
      } else {
        toast.error("Failed to load purchased courses.");
        setStudentBoughtCoursesList([]); // Ensure state is updated even on failure
      }
    } catch (error) {
      console.error("Error fetching student courses:", error);
      toast.error("Error fetching your courses. Please try again.");
      setStudentBoughtCoursesList([]); // Prevent UI issues if request fails
    }
  }

  // Fetch courses when the user logs in or user ID is available
  useEffect(() => {
    if (auth?.user?._id) {
      fetchStudentBoughtCourses();
    }
  }, [auth?.user?._id]); // ✅ Refetch when user logs in or changes

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8">My Learning Materials</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {studentBoughtCoursesList.length > 0 ? (
          studentBoughtCoursesList.map((course) => (
            <Card key={course.courseId} className="flex flex-col">
              <CardContent className="p-4 flex-grow">
                {/* Add fallback image or handle missing images */}
                <img
                  src={course?.courseImage || '/path/to/default-image.jpg'} // Add a default image
                  alt={course?.title}
                  className="h-52 w-full object-cover rounded-md mb-4"
                  style={{ objectFit: "cover", height: "200px" }} // Ensures the image fits well
                />
                <h3 className="font-bold mb-1">{course?.title}</h3>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => navigate(`/course-progress/${course?.courseId}`)}
                  className="flex-1"
                >
                  <Watch className="mr-2 h-4 w-4" /> Start Watching
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <h1 className="text-3xl font-bold">No Videos found</h1>
        )}
      </div>
    </div>
  );
}

export default StudentCoursesPage;

