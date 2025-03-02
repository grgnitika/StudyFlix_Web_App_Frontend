import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Users, Video } from "lucide-react"; // Import Video icon
import axios from "axios";

function InstructorDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0); // State to store total videos
  const [usersList, setUsersList] = useState([]); // State to store all registered users
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch Total Registered Users
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/total-users")
      .then((response) => {
        setTotalUsers(response.data.data);
      })
      .catch((error) => {
        console.error("Failed to fetch total users:", error);
      });
  }, []);

  // ✅ Fetch All Registered Users
  useEffect(() => {
    axios
      .get("http://localhost:5000/auth/all-users") // Replace with your API endpoint
      .then((response) => {
        setUsersList(response.data.data); // Assuming the response contains an array of users
      })
      .catch((error) => {
        console.error("Failed to fetch users:", error);
      });
  }, []);

  // Fetch Total Number of Videos
  useEffect(() => {
    axios
      .get("http://localhost:5000/media/total-videos") // Updated endpoint
      .then((response) => {
        setTotalVideos(response.data.data); // Assuming the response contains the total number of videos
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch total videos:", error);
        setIsLoading(false);
      });
  }, []);

  const config = [
    {
      icon: Users,
      label: "Total Number of Learners",
      value: totalUsers,
      cardColor: "bg-[#45B1E8]", // Custom color for the learners card
      iconColor: "text-white", // Custom color for the icon
    },
    {
      icon: Video, // Use the Video icon
      label: "Total Number of Videos",
      value: totalVideos,
      cardColor: "bg-[#45B1E8]", // Custom color for the videos card
      iconColor: "text-white", // Custom color for the icon
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ">
        {config.map((item, index) => (
          <Card key={index} className={`${item.cardColor} text-white`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              <item.icon className={`h-4 w-4 ${item.iconColor}`} /> {/* Added icon color here */}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : usersList.length > 0 ? (
                  usersList.map((user, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {user.userName} {/* Use user.userName instead of user.username */}
                      </TableCell>
                      <TableCell>{user.userEmail}</TableCell> {/* Use user.userEmail instead of user.email */}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="text-center">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InstructorDashboard;
