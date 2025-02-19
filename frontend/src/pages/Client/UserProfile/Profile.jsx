import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import MyReservations from "../../../components/MyReserv/MyReservations"

const Profile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <MyReservations userId={user._id} />
    </div>
  );
};

export default Profile;
