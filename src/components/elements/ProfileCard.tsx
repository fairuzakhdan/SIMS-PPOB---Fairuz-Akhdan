import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProfile } from "../../store/profileSlice";
import profileDefaultImg from "../../assets/images/Profile Photo.png";

const ProfileCard = () => {
  const dispatch = useAppDispatch();
  const { data: profile, loading } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

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
