import { useEffect, useState } from "react";
import api from "../../services/api";
import profileImg from "../../assets/images/Profile Photo.png";

interface ProfileData {
  first_name: string;
  last_name: string;
}

const ProfileCard = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setProfile(response.data.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <img 
        src={profileImg}
        alt="Profile" 
        className="w-12 h-12 md:w-16 md:h-16 rounded-full"
      />
      <p className="text-sm md:text-lg">Selamat datang,</p>
      <h2 className="text-xl md:text-3xl font-bold">
        {profile ? `${profile.first_name} ${profile.last_name}` : "Loading..."}
      </h2>
    </div>
  );
};

export default ProfileCard;
