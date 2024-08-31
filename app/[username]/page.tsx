'use client'
import { use } from 'react';
import { useEffect, useState } from 'react';

interface ProfilePageProps {
  params: {
    username: string;
  };
}

const ProfilePage = ({ params }: ProfilePageProps) => {
  const { username } = params;

  // State to simulate fetching user data
  const [profileData, setProfileData] = useState<any>(null);

  useEffect(() => {
    if (username) {
      // Simulate an API call to fetch user data
      const fetchProfileData = async () => {
        // Replace this with your actual API call
        const data = {
          name: "John Doe",
          bio: "Photographer and traveler.",
          profilePic: "https://via.placeholder.com/150",
          location: "Earth",
        };
        setProfileData(data);
      };

      fetchProfileData();
    }
  }, [username]);

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'left' }}>
        <img 
          src={profileData.profilePic} 
          alt={`${username}'s profile picture`} 
          style={{ borderRadius: '50%', width: '150px', height: '150px' }} 
        />
        <h1>@{username}</h1>
        <h2>{profileData.name}</h2>
        <p>{profileData.bio}</p>
        <p>Location: {profileData.location}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
