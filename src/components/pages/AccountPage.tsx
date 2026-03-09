import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { HiPencil } from "react-icons/hi2";
import MainLayout from "../layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProfile, updateProfile, updateProfileImage, clearProfile } from "../../store/profileSlice";
import { logout } from "../../store/authSlice";
import { clearBalance } from "../../store/balanceSlice";
import profileDefaultImg from "../../assets/images/Profile Photo.png";

export default function AccountPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: profile } = useAppSelector((state) => state.profile);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: ""
  });

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    } else {
      setFormData({
        first_name: profile.first_name,
        last_name: profile.last_name
      });
    }
  }, [dispatch, profile]);

  const handleImageClick = () => {
    if (selectedImage) {
      handleSaveImage();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 100 * 1024) {
      alert("Ukuran file maksimal 100 KB");
      return;
    }

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Format file harus JPEG atau PNG");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    setSelectedImage(file);
  };

  const handleSaveImage = async () => {
    if (!selectedImage) return;

    try {
      await dispatch(updateProfileImage(selectedImage)).unwrap();
      setSelectedImage(null);
      setPreviewImage("");
      alert("Profile image berhasil diupdate");
    } catch (error: any) {
      alert(error.message || "Gagal upload image");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await dispatch(updateProfile(formData)).unwrap();
      setIsEditing(false);
    } catch (error: any) {
      console.error("Gagal update profile:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearBalance());
    dispatch(clearProfile());
    navigate("/login", { replace: true });
  };

  const getProfileImage = () => {
    if (previewImage) {
      return previewImage;
    }
    if (!profile?.profile_image || profile.profile_image.includes("/null")) {
      return profileDefaultImg;
    }
    return profile.profile_image;
  };

  if (!profile) {
    return (
      <MainLayout>
        <div className="text-center">Loading...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-sm mx-auto">
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative mb-2">
            <img
              src={getProfileImage()}
              alt="Profile"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-gray-200"
            />
            <button
              onClick={handleImageClick}
              className="absolute bottom-0 -right-8 border border-gray-300 rounded-full p-2 bg-white hover:bg-gray-50 transition-colors"
            >
              {selectedImage ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-black">
                  <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                </svg>
              ) : (
                <HiPencil className="w-4 h-4 text-black" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <h2 className="text-lg md:text-xl font-bold">
            {profile.first_name} {profile.last_name}
          </h2>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs md:text-sm text-gray-600 mb-1">Email</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <MdAlternateEmail size={18} />
              </span>
              <input
                type="email"
                value={profile.email}
                disabled
                className="w-full pl-10 pr-3 py-2 md:py-2.5 text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
              />
            </div>
          </div>

          {/* First Name */}
          <div>
            <label className="block text-xs md:text-sm text-gray-600 mb-1">Nama Depan</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <AiOutlineUser size={18} />
              </span>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                disabled={!isEditing}
                className={`w-full pl-10 pr-3 py-2 md:py-2.5 text-sm border border-gray-300 rounded-lg ${
                  isEditing ? "bg-white" : "bg-gray-100"
                } text-gray-700`}
              />
            </div>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-xs md:text-sm text-gray-600 mb-1">Nama Belakang</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <AiOutlineUser size={18} />
              </span>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                disabled={!isEditing}
                className={`w-full pl-10 pr-3 py-2 md:py-2.5 text-sm border border-gray-300 rounded-lg ${
                  isEditing ? "bg-white" : "bg-gray-100"
                } text-gray-700`}
              />
            </div>
          </div>

          {/* Buttons */}
          {!isEditing ? (
            <>
              <button
                onClick={handleEditClick}
                className="w-full bg-red-600 text-white py-2 md:py-2.5 text-sm rounded-lg font-semibold hover:bg-red-700 transition-colors mt-2"
              >
                Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full bg-white text-red-600 border-2 border-red-600 py-2 md:py-2.5 text-sm rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleSaveClick}
              className="w-full bg-red-600 text-white py-2 md:py-2.5 text-sm rounded-lg font-semibold hover:bg-red-700 transition-colors mt-2"
            >
              Simpan
            </button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
