import React, { useState } from "react";
import { FiUpload, FiFolderPlus, FiCopy, FiFilePlus } from "react-icons/fi"; 
import logo from "../assets/images/cloud.png"; 
import "../assets/css/home.css"; 

function Home() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [files, setFiles] = useState([]); // State for holding files

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Update files state
  };

  // Function to handle file upload with Axios
  const handleFileUpload = async () => {
    if (files.length === 0) {
      console.log("No files selected for upload");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data);
      // Clear files after successful upload
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  // Function to create a new document via API
  const handleCreateNewDoc = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/create-doc", {
        documentName: "New Document",
      });
      console.log("Document created successfully:", response.data);
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };


  return (
    <div className="container">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <ul className="sidebar-list">
          <li>All files</li>
          <li>Photos</li>
          <li>Shared</li>
          <li>Signatures</li>
          <li>File requests</li>
          <li>Deleted files</li>
        </ul>
        <div className="folders-section">
          <h4>Folders</h4>
        </div>
      </aside>

      <div className="main-content">
        <header className="top-navbar">
          <input type="search" placeholder="Search" className="search-input" />
          <div className="profile-container" onClick={toggleDropdown}>
            <div className="profile-icon">MK</div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item">Profile</div>
                <div className="dropdown-item">Logout</div>
              </div>
            )}
          </div>
        </header>

        <section className="files-section">
          <h2>All files</h2>

          <div className="file-action-buttons">
            <button className="btn" onClick={handleCreateNewDoc}>
              <FiFilePlus className="btn-icon" /> Create
            </button>
            <label className="btn" onClick={handleFileUpload}>
              <FiUpload className="btn-icon" /> Upload
              <input
                type="file"
                onChange={handleFileSelect}
                style={{ display: 'none' }} // Hide the default file input
                multiple
              />
            </label>
            <button className="btn" onClick={() => console.log("Create Folder")}>
              <FiFolderPlus className="btn-icon" /> Create Folder
            </button>
            <button className="btn" onClick={() => console.log("Transfer Copy")}>
              <FiCopy className="btn-icon" /> Transfer Copy
            </button>
          </div>

          <div className="file-upload-area">
            {files.length === 0 ? (
              <p>No files uploaded yet. Start by uploading files.</p>
            ) : (
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
