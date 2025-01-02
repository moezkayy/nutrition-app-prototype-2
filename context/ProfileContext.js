import React, { createContext, useState } from 'react';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    weight: '',
    height: '',
    dietaryPreference: '',
    activityLevel: '',
    targetGoal: '',
  });

  const [foodLogs, setFoodLogs] = useState([]);
  const [activityLogs, setActivityLogs] = useState([]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, foodLogs, setFoodLogs, activityLogs, setActivityLogs }}>
      {children}
    </ProfileContext.Provider>
  );
};