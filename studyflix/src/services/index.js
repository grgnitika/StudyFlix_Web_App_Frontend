// import axiosInstance from "@/api/axiosInstance";

// // ✅ Registration Service
// export async function registerService(formData) {
//   const { data } = await axiosInstance.post("/auth/register", {
//     ...formData,
//     role: "user",
//   });
//   return data;
// }

// // ✅ Login Service
// export async function loginService(formData) {
//   const { data } = await axiosInstance.post("/auth/login", formData);
//   return data;
// }

// // ✅ Auth Check (Ensuring Token is Passed in Headers)
// export async function checkAuthService() {
//   const token = localStorage.getItem("accessToken");
//   if (!token) {
//     console.error("❌ No token found in localStorage");
//     return { success: false, message: "No token available" };
//   }

//   try {
//     const { data } = await axiosInstance.get("/auth/check-auth", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return data;
//   } catch (error) {
//     console.error("❌ Auth Check Error:", error);
//     return error.response ? error.response.data : { success: false };
//   }
// }

// // ✅ Upload Media
// export async function mediaUploadService(formData, onProgressCallback) {
//   const { data } = await axiosInstance.post("/media/upload", formData, {
//     onUploadProgress: (progressEvent) => {
//       const percentCompleted = Math.round(
//         (progressEvent.loaded * 100) / progressEvent.total
//       );
//       onProgressCallback(percentCompleted);
//     },
//   });

//   return data;
// }

// // ✅ Delete Media
// export async function mediaDeleteService(id) {
//   const { data } = await axiosInstance.delete(`/media/delete/${id}`);
//   return data;
// }

// // ✅ Fetch Instructor Courses
// export async function fetchInstructorCourseListService() {
//   const token = localStorage.getItem("accessToken");
//   if (!token) {
//     console.error("❌ No access token found. Cannot fetch courses.");
//     return { success: false, message: "No token available" };
//   }

//   try {
//     const { data } = await axiosInstance.get(`/instructor/course/get`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return data;
//   } catch (error) {
//     console.error("❌ Error fetching instructor courses:", error);
//     return error.response ? error.response.data : { success: false };
//   }
// }

// // ✅ Add New Course
// export async function addNewCourseService(formData) {
//   const token = localStorage.getItem("accessToken");
//   if (!token) {
//     console.error("❌ No JWT token found in localStorage");
//     return { success: false, message: "User is not authenticated" };
//   }

//   try {
//     const { data } = await axiosInstance.post("/instructor/course/add", formData, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return data;
//   } catch (error) {
//     console.error("❌ Add Course Error:", error.response?.data || error.message);
//     return error.response ? error.response.data : { success: false };
//   }
// }

// // ✅ Delete Course (🔹 Fixed Delete Issue)
// export async function deleteCourseByIdService(courseId) {
//   const token = localStorage.getItem("accessToken");
//   if (!token) {
//     console.error("❌ No JWT token found in localStorage");
//     return { success: false, message: "User is not authenticated" };
//   }

//   try {
//     const { data } = await axiosInstance.delete(`/instructor/course/delete/${courseId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`, 
//       },
//     });
//     return data;
//   } catch (error) {
//     console.error("❌ Delete Course Error:", error.response?.data || error.message);
//     return error.response ? error.response.data : { success: false };
//   }
// }

// // ✅ Fetch Course Details
// export async function fetchInstructorCourseDetailsService(id) {
//   const token = localStorage.getItem("accessToken");
//   if (!token) {
//     console.error("❌ No token found");
//     return { success: false, message: "No token available" };
//   }

//   try {
//     const { data } = await axiosInstance.get(
//       `/instructor/course/get/details/${id}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.error("❌ Fetch Course Details Error:", error);
//     return error.response ? error.response.data : { success: false };
//   }
// }

// // ✅ Update Course
// export async function updateCourseByIdService(id, formData) {
//   const token = localStorage.getItem("accessToken");
//   if (!token) {
//     console.error("❌ No token found");
//     return { success: false, message: "No token available" };
//   }

//   try {
//     const { data } = await axiosInstance.put(
//       `/instructor/course/update/${id}`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     return data;
//   } catch (error) {
//     console.error("❌ Update Course Error:", error);
//     return error.response ? error.response.data : { success: false };
//   }
// }

// // ✅ Bulk Upload Media
// export async function mediaBulkUploadService(formData, onProgressCallback) {
//   const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
//     onUploadProgress: (progressEvent) => {
//       const percentCompleted = Math.round(
//         (progressEvent.loaded * 100) / progressEvent.total
//       );
//       onProgressCallback(percentCompleted);
//     },
//   });

//   return data;
// }

// // ✅ Fetch Student Course List
// export async function fetchStudentViewCourseListService(query) {
//   const { data } = await axiosInstance.get(`/student/course/get?${query}`);
//   return data;
// }

// // ✅ Fetch Student Course Details
// export async function fetchStudentViewCourseDetailsService(courseId) {
//   const { data } = await axiosInstance.get(
//     `/student/course/get/details/${courseId}`
//   );
//   return data;
// }

// // ✅ Check Course Purchase Info
// export async function checkCoursePurchaseInfoService(courseId, studentId) {
//   const { data } = await axiosInstance.get(
//     `/student/course/purchase-info/${courseId}/${studentId}`
//   );
//   return data;
// }

// // ✅ Create Payment
// export async function createPaymentService(formData) {
//   const { data } = await axiosInstance.post(`/student/order/create`, formData);
//   return data;
// }

// // ✅ Capture Payment
// export async function captureAndFinalizePaymentService(
//   paymentId,
//   payerId,
//   orderId
// ) {
//   const { data } = await axiosInstance.post(`/student/order/capture`, {
//     paymentId,
//     payerId,
//     orderId,
//   });

//   return data;
// }

// // ✅ Fetch Student Bought Courses
// export async function fetchStudentBoughtCoursesService(studentId) {
//   const { data } = await axiosInstance.get(
//     `/student/courses-bought/get/${studentId}`
//   );
//   return data;
// }

// // ✅ Get Current Course Progress
// export async function getCurrentCourseProgressService(userId, courseId) {
//   const { data } = await axiosInstance.get(
//     `/student/course-progress/get/${userId}/${courseId}`
//   );
//   return data;
// }

// // ✅ Mark Lecture as Viewed
// export async function markLectureAsViewedService(userId, courseId, lectureId) {
//   const { data } = await axiosInstance.post(
//     `/student/course-progress/mark-lecture-viewed`,
//     {
//       userId,
//       courseId,
//       lectureId,
//     }
//   );

//   return data;
// }

// // ✅ Reset Course Progress
// export async function resetCourseProgressService(userId, courseId) {
//   const { data } = await axiosInstance.post(
//     `/student/course-progress/reset-progress`,
//     {
//       userId,
//       courseId,
//     }
//   );

//   return data;
// }


import axiosInstance from "@/api/axiosInstance";

// ✅ Registration Service
export async function registerService(formData) {
  const { data } = await axiosInstance.post("/auth/register", {
    ...formData,
    role: "user",
  });
  return data;
}

// ✅ Login Service
export async function loginService(formData) {
  const { data } = await axiosInstance.post("/auth/login", formData);
  return data;
}

// ✅ Auth Check (Ensuring Token is Passed in Headers)
export async function checkAuthService() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("❌ No token found in localStorage");
    return { success: false, message: "No token available" };
  }

  try {
    const { data } = await axiosInstance.get("/auth/check-auth", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Auth Check Error:", error);
    return error.response ? error.response.data : { success: false };
  }
}

// ✅ Upload Media
export async function mediaUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

// ✅ Delete Media
export async function mediaDeleteService(id) {
  const { data } = await axiosInstance.delete(`/media/delete/${id}`);
  return data;
}

// ✅ Fetch Instructor Courses
export async function fetchInstructorCourseListService() {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("❌ No access token found. Cannot fetch courses.");
    return { success: false, message: "No token available" };
  }

  try {
    const { data } = await axiosInstance.get(`/instructor/course/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Error fetching instructor courses:", error);
    return error.response ? error.response.data : { success: false };
  }
}

// ✅ Add New Course
export async function addNewCourseService(formData) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("❌ No JWT token found in localStorage");
    return { success: false, message: "User is not authenticated" };
  }

  try {
    const { data } = await axiosInstance.post("/instructor/course/add", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Add Course Error:", error.response?.data || error.message);
    return error.response ? error.response.data : { success: false };
  }
}

// ✅ Delete Course
export async function deleteCourseByIdService(courseId) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("❌ No JWT token found in localStorage");
    return { success: false, message: "User is not authenticated" };
  }

  try {
    const { data } = await axiosInstance.delete(`/instructor/course/delete/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Delete Course Error:", error.response?.data || error.message);
    return error.response ? error.response.data : { success: false };
  }
}

// ✅ Fetch Course Details
export async function fetchInstructorCourseDetailsService(id) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("❌ No token found");
    return { success: false, message: "No token available" };
  }

  try {
    const { data } = await axiosInstance.get(`/instructor/course/get/details/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Fetch Course Details Error:", error);
    return error.response ? error.response.data : { success: false };
  }
}

// ✅ Update Course
export async function updateCourseByIdService(id, formData) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("❌ No token found");
    return { success: false, message: "No token available" };
  }

  try {
    const { data } = await axiosInstance.put(`/instructor/course/update/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("❌ Update Course Error:", error);
    return error.response ? error.response.data : { success: false };
  }
}

// ✅ Bulk Upload Media
export async function mediaBulkUploadService(formData, onProgressCallback) {
  const { data } = await axiosInstance.post("/media/bulk-upload", formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgressCallback(percentCompleted);
    },
  });

  return data;
}

// ✅ Fetch Student Course List
export async function fetchStudentViewCourseListService(query) {
  const { data } = await axiosInstance.get(`/student/course/get?${query}`);
  return data;
}

// ✅ Fetch Student Course Details
export async function fetchStudentViewCourseDetailsService(courseId) {
  const { data } = await axiosInstance.get(`/student/course/get/details/${courseId}`);
  return data;
}

// ✅ Check Course Purchase Info
export async function checkCoursePurchaseInfoService(courseId, studentId) {
  const { data } = await axiosInstance.get(`/student/course/purchase-info/${courseId}/${studentId}`);
  return data;
}

// ✅ Create Payment
export async function createPaymentService(formData) {
  const { data } = await axiosInstance.post(`/student/order/create`, formData);
  return data;
}

// ✅ Capture Payment
export async function captureAndFinalizePaymentService(sessionId, userId) {
  const { data } = await axiosInstance.post(`/student/order/capture`, {
    session_id: sessionId,
    userId,
  });

  return data;
}

// ✅ Fetch Student Bought Courses (🔹 Updated API Route)
export async function fetchStudentBoughtCoursesService(studentId) {
  const { data } = await axiosInstance.get(`/student/courses-bought/get/${studentId}`);
  return data;
}

// ✅ Get Current Course Progress
export async function getCurrentCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.get(`/student/course-progress/get/${userId}/${courseId}`);
  return data;
}

// ✅ Mark Lecture as Viewed
export async function markLectureAsViewedService(userId, courseId, lectureId) {
  const { data } = await axiosInstance.post(`/student/course-progress/mark-lecture-viewed`, {
    userId,
    courseId,
    lectureId,
  });

  return data;
}

// ✅ Reset Course Progress
export async function resetCourseProgressService(userId, courseId) {
  const { data } = await axiosInstance.post(`/student/course-progress/reset-progress`, {
    userId,
    courseId,
  });

  return data;
}
