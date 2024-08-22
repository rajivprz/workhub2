import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

import getCurrentUser from "../../utils/getCurrentUser";
import newRequest from "../../utils/newRequest";

const App = () => {
  const backendURL = "http://localhost:8800";
  const currentUser = getCurrentUser();
  const userId = currentUser.userId;

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    createdAt: "",
    username: "",
    country: "",
    phonenumber: "",
    desc: "",
    img: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editProfile, setEditProfile] = useState({
    name: "",
    email: "",
    username: "",
    country: "",
    phonenumber: "",
    desc: "",
    img: "",
  });

  const [newProfilePicture, setNewProfilePicture] = useState(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const fetchUserProfile = async () => {
    try {
      console.log("Fetching user profile for UserId:", userId);

      const response = await newRequest.get(`/user/${userId}`);
      console.log("Response from server:", response);

      if (response.data.success) {
        const userProfile = response.data.user;
        console.log("User Profile Data:", userProfile);

        setProfile({
          ...userProfile,
          img: userProfile.img || "",
        });
        console.log("Updated Profile State:", {
          ...userProfile,
          img: userProfile.img || "",
        });

        setEditProfile({
          email: userProfile.email,
          username: userProfile.username,
          country: userProfile.country,
          phonenumber: userProfile.phonenumber,
          desc: userProfile.desc,
          img: userProfile.img || "",
        });
        console.log("Updated Edit Profile State:", {
          email: userProfile.email,
          username: userProfile.username,
          country: userProfile.country,
          phonenumber: userProfile.phonenumber,
          desc: userProfile.desc,
          img: userProfile.img || "",
        });
      } else {
        console.error("Error fetching profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePicture(URL.createObjectURL(file));
      setEditProfile((prevProfile) => ({
        ...prevProfile,
        img: file,
      }));
    }
  };

  const handleUpdate = async () => {
    try {
      console.log("Starting profile update...");

      const formData = new FormData();
      formData.append("email", editProfile.email);
      formData.append("username", editProfile.username);
      formData.append("country", editProfile.country);
      formData.append("phonenumber", editProfile.phonenumber);
      formData.append("desc", editProfile.desc);

      // Log formData contents
      console.log("Form Data being sent to server:");
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await newRequest.put(`/user/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Server response after update request:", response);

      if (response.data.success) {
        console.log("Profile updated successfully on the server.");

        // Ensure the response includes the updated profile data
        const updatedProfile = response.data.user || {};
        setProfile({
          ...profile,
          ...updatedProfile,
        });

        console.log("Updated local profile state:", updatedProfile);

        closeModal();
      } else {
        console.error("Error updating profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const profileImgSrc = profile.img
    ? `${backendURL}/uploads/${profile.img}`
    : "";

  return (
    <div className="profile-App">
      <header className="profile-App-header">
        <div className="profile-App-profile-box">
          <div className="profile-App-profilepic">
            {profile.img && (
              <img
                className="profile-App-profile-picture"
                src={profileImgSrc}
                alt="Profile"
              />
            )}
          </div>
          <h2>{profile.name}</h2>
          <div className="profile-App-details">
            <p>Email: {profile.email}</p>
            <p>Joined on: {formatDate(profile.createdAt)}</p>
            <p>Username: {profile.username}</p>
            <p>Country: {profile.country}</p>
            <p>Phone Number: {profile.phonenumber}</p>
          </div>
          <button className="profile-App-edit-button" onClick={openModal}>
            Edit Profile
          </button>
        </div>
        <div className="profile-App-editable-details">
          <div className="profile-App-edit-icon" onClick={openModal}>
            <i className="fas fa-pen"></i>
          </div>
          <div className="profile-App-details-box">
            <h3>Description</h3>
            <p>{profile.desc}</p>
          </div>
          <div className="profile-App-details-box">
            <h3>Languages</h3>
            <ul className="profile-App-details-content-list">
              <li>English</li>
              <li>Spanish</li>
              <li>French</li>
            </ul>
          </div>
        </div>
      </header>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="profile-Modal"
        overlayClassName="profile-Overlay"
      >
        <h2>Edit Profile</h2>
        <div className="profile-Modal-form-group">
          <label htmlFor="profilePictureInput">
            <img
              className="profile-Modal-modal-profile-picture"
              src={profileImgSrc}
              alt="Profile"
            />
          </label>
          <input
            id="profilePictureInput"
            type="file"
            style={{ display: "none" }}
            onChange={handleProfilePictureChange}
          />
        </div>
        <form>
          <div className="profile-Modal-form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={editProfile.username}
              onChange={handleChange}
            />
          </div>
          <div className="profile-Modal-form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={editProfile.country}
              onChange={handleChange}
            />
          </div>
          <div className="profile-Modal-form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              value={editProfile.phonenumber}
              onChange={handleChange}
            />
          </div>
          <div className="profile-Modal-form-group">
            <label>Description</label>
            <textarea
              name="desc"
              value={editProfile.desc}
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="profile-Modal-update-button"
            onClick={handleUpdate}
          >
            Update
          </button>
        </form>
      </Modal>
    </div>
  );
};

Modal.setAppElement("#root");

export default App;
