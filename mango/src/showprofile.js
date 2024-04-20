import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShowProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [editedFields, setEditedFields] = useState({
    _id: "",
    username: "",
    name: "",
    email: "",
    skills: [],
    rating: 0,
    project_ids: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        if (localStorage.getItem("user") === id) {
          navigate("/myprofile/"+id);
          return;
        }

        const response = await fetch(`http://localhost:5000/myprofile/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const data = await response.json();
        if (data.flag == 2) {
            console.log('dfiojofsd');
            // throw new Error("Failed to fetch user data");
          navigate("/login");
        }
        setEditedFields(data.result);
      } catch (error) {
        console.error(error);
        alert("Could not fetch user data");
      }
    };

    fetchData();
  }, []);

 

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedFields),
      });
      console.log("asdfdiuihgandfg");

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Could not submit data");
    }
  };

  return (
    <div className="h-screen bg-gray-800 flex justify-center items-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-5/12">
        <h2 className="text-2xl mb-4 font-bold text-gray-800">Edit Profile</h2>

        <div className="mb-4 flex items-center">
          <label
            className="text-gray-700 text-sm font-bold mr-2"
            htmlFor="username"
          >
            Username:
          </label>

          <div className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
            {editedFields.username}
          </div>
        </div>
        <hr className="mb-4" />

        <div className="mb-4 flex items-center">
          <label
            className="text-gray-700 text-sm font-bold mr-2"
            htmlFor="name"
          >
            Name:
          </label>
            <div className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
              {editedFields.name}
            </div>
          
        </div>
        <hr className="mb-4" />

        <div className="mb-4 flex items-center">
          <label
            className="text-gray-700 text-sm font-bold mr-2"
            htmlFor="email"
          >
            Email:
          </label>
            <div className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
              {editedFields.email}
            </div>
          
        </div>
        <hr className="mb-4" />

        <div className="mb-4 flex items-center">
          <label
            className="text-gray-700 text-sm font-bold mr-2"
            htmlFor="skills"
          >
            Skills:
          </label>
         
            <div className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
              {editedFields.skills}
            </div>
         
        </div>

        <hr className="mb-4" />

        <div className="mb-4 flex items-center">
          <label
            className="text-gray-700 text-sm font-bold mr-2"
            htmlFor="rating"
          >
            Rating:
          </label>
          <div className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
            {editedFields.rating}
          </div>
        </div>

        <hr className="mb-4" />
        <div className="mb-4 flex items-center">
          <label
            className="text-gray-700 text-sm font-bold mr-2"
            htmlFor="projectID"
          >
            Project ID:
          </label>

            <div className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
              {editedFields.project_id}
            </div>
        </div>

        <hr className="mb-4" />

        
      </div>
    </div>
  );
};

export default ShowProfile;
