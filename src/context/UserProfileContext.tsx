import React, { createContext, useContext, useState } from "react";

export type UserProfile = {
  avatar: string;
  fullName: string;
  bio: string;
  email: string;
  phone: string;
  region: string;
  points: number;
  localRank: string;
  lessons: number;
};

const defaultProfile: UserProfile = {
  avatar: "https://i.pravatar.cc/150?img=3",
  fullName: "Zahidullah Hamdard",
  bio: "compete with  learners around the world for most earned pts. the more you learn, the more pts you earn!",
  email: "zahi.hamdard@gmail.com",
  phone: "+93 787 779 269",
  region: "Kabul",
  points: 150,
  localRank: "#40",
  lessons: 40,
};

type UserProfileContextType = {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  updateProfile: (fields: Partial<UserProfile>) => void;
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export const useUserProfile = () => {
  const ctx = useContext(UserProfileContext);
  if (!ctx)
    throw new Error("useUserProfile must be used within UserProfileProvider");
  return ctx;
};

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const updateProfile = (fields: Partial<UserProfile>) =>
    setProfile((prev) => ({ ...prev, ...fields }));

  return (
    <UserProfileContext.Provider value={{ profile, setProfile, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  );
};
