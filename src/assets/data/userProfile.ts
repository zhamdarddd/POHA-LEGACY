export interface UserProfile {
  name: string;
  fullName: string;
  avatar: string;
  email: string;
  bio: string;
  points: number;
  localRank: string;
  lessons: number;
}

export const userProfile: UserProfile = {
  name: "Hamdard",
  fullName: "Zahidullah Hamdard",
  avatar: "https://i.pravatar.cc/150?img=3",
  email: "zahi.hamdard@gmail.com",
  bio: "Compete with learners around the world for most earned pts. The more you learn, the more pts you earn!",
  points: 150,
  localRank: "#40",
  lessons: 40,
};
