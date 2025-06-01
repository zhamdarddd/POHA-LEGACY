export type LeaderboardUser = {
  rank: number;
  name: string;

  avatar: string;
  course: string;
  badges: number;
  points: number;
  isCurrentUser?: boolean;
  location: string; // <-- Add this
};

export type LeaderboardDataByFilter = {
  region: LeaderboardUser[];
  month: LeaderboardUser[];
  week: LeaderboardUser[];
  day: LeaderboardUser[];
};

// Example data, replace with your real data
export const leaderboardData: LeaderboardDataByFilter = {
  region: [
    {
      rank: 1,
      name: "Hamdrad",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      course: "Graphic Design",
      badges: 13,
      points: 1500,
      location: "Kabul", // <-- Add this for each user
    },
    {
      rank: 2,
      name: "Hamdrad",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      course: "Graphic Design",
      badges: 13,
      points: 1500,
      location: "Kabul", // <-- Add this for each user
    },
    {
      rank: 3,
      name: "Hamdrad",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      course: "Graphic Design",
      badges: 13,
      points: 1500,
      location: "Kabul", // <-- Add this for each user
    },
    {
      rank: 4,
      name: "Zahidullah Hamdard",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      course: "Graphic Design",
      badges: 13,
      points: 1500,
      isCurrentUser: true,
      location: "Kabul", // <-- Add this for each user
    },
    {
      rank: 5,
      name: "Zahidullah Hamdard",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      course: "Graphic Design",
      badges: 13,
      points: 1500,
      location: "Kabul", // <-- Add this for each user
    },
    {
      rank: 6,
      name: "Zahidullah Hamdard",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      course: "Graphic Design",
      badges: 13,
      points: 1500,
      location: "Kabul", // <-- Add this for each user
    },
    {
      rank: 7,
      name: "Zahidullah Hamdard",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      course: "Graphic Design",
      badges: 13,
      points: 1500,
      location: "Kabul", // <-- Add this for each user
    },
    {
      rank: 8,
      name: "Zahidullah Hamdard",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      course: "Graphic Design",
      badges: 13,
      points: 1500,
      location: "Kabul", // <-- Add this for each user
    },
    {
      rank: 9,
      name: "Zahidullah Hamdard",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      course: "Graphic Design",
      badges: 13,
      points: 1500,
      location: "Kabul", // <-- Add this for each user
    },
  ],
  month: [
    // ...similar data for month
  ],
  week: [
    // ...similar data for week
  ],
  day: [
    // ...similar data for day
  ],
};
