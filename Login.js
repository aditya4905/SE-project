import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState("");
    const [passw, setPassw] = useState("");

    return (
        <div className="h-screen flex justify-center items-center  bg-white-300">
            <div className="bg-black p-20 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-8">Login</h2>
                <div className="m-2">
                    <label htmlFor="email" className="block text-blue-700 mb-2">Email:</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className=" mt-1  rounded-md border-gray-300" />
                </div>
                <div className="m-2">
                    <label htmlFor="passw" className="block text-blue-700 mb-2">Password:</label>
                    <input type="password" id="passw" value={passw} onChange={(e) => setPassw(e.target.value)} className=" mt-1 rounded-md border-gray-300" />
                </div>
                <div className="flex justify-center">
                    <button className="bg-blue-500 m-5 px-2 py-1 text-white font-bold rounded focus:outline-none focus:shadow-outline">Login</button>
                </div>
            </div>
        </div>
    );
}

export default Login;
