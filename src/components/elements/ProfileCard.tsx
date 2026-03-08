import { useEffect, useState } from "react";
import api from "../../services/api";
import profileDefaultImg from "../../assets/images/Profile Photo.png";

interface ProfileData {
  first_name: string;
  last_name: string;
  profile_image: string;
}

const ProfileCard = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setProfile(response.data.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const getProfileImage = () => {
    if (!profile?.profile_image || profile.profile_image.includes("/null")) {
      return profileDefaultImg;
    }
    return profile.profile_image;
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-200 animate-pulse" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <img 
        src={getProfileImage()}
        alt="Profile" 
        className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
      />
      <p className="text-sm md:text-lg">Selamat datang,</p>
      <h2 className="text-xl md:text-3xl font-bold">
        {profile ? `${profile.first_name} ${profile.last_name}` : "Loading..."}
      </h2>
    </div>
  );
};

export default ProfileCard;
