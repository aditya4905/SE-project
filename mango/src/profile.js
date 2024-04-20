
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const [editedFields, setEditedFields] = useState({
    _id : '',
    password : '',
    username: "",
    name: "",
    email: "",
    skills: [],
    rating : 0,
    project_ids : []
  });
  if(id != localStorage.getItem('user'))
  {
     alert('dont');
     navigate('404.html');
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/myprofile/${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {

          throw new Error("Failed to fetch user data");
        }
        
        const data = await response.json();
        setEditedFields(data.result);
      } catch (error) {
        console.error(error);
        alert("Could not fetch user data");
      }
    };

    fetchData();
  }, []);

  const handleFieldChange = (e) => {
    const fieldName = e.target.id;
    const fieldValue = e.target.value;
    setEditedFields({ ...editedFields, [fieldName]: fieldValue });
  };

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
           {edit ? (
             <input
               type="text"
               id="name"
               className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
               value={editedFields.name}
               onChange={handleFieldChange}
             />
           ) : (
             <div className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
               {editedFields.name}
             </div>
           )}
         </div>
         <hr className="mb-4" />

         <div className="mb-4 flex items-center">
           <label
             className="text-gray-700 text-sm font-bold mr-2"
             htmlFor="email"
           >
             Email:
           </label>
           {edit ? (
             <input
               type="text"
               id="email"
               className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
               value={editedFields.email}
               onChange={handleFieldChange}
             />
           ) : (
             <div className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
               {editedFields.email}
             </div>
           )}
         </div>
         <hr className="mb-4" />

         <div className="mb-4 flex items-center">
           <label
             className="text-gray-700 text-sm font-bold mr-2"
             htmlFor="skills"
           >
             Skills:
           </label>
           {edit ? (
             <input
               type="text"
               id="skills"
               className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
               value={editedFields.skills}
               onChange={handleFieldChange}
             />
           ) : (
             <div className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
               {editedFields.skills}
             </div>
           )}
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
           {edit ? (
             <input
               type="text"
               id="project_id"
               className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
               value={editedFields.project_id}
               onChange={handleFieldChange}
             />
           ) : (
             <div className="border-none bg-transparent py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full">
               {editedFields.project_id}
             </div>
           )}
         </div>

         <hr className="mb-4" />

         <div className="flex items-center justify-between">
           {edit ? (
             <button
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               type="button"
               onClick={(e) => handleClick(e)}
               // Placeholder for saveChanges function
             >
               Save Changes
             </button>
           ) : (
             <button
               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
               type="button"
               onClick={() => setEdit(!edit)}
               // Placeholder for saveChanges function
             >
               Edit
             </button>
           )}
         </div>
       </div>
     </div>
   );

};

export default Profile;
