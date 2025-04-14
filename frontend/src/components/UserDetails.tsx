import React, { ChangeEvent, FormEvent, useState } from 'react'
import HealthDetails from './HealthDetails';

function UserDetails() {
    const [isUserFormSubmitted, setIsUserFormSubmitted] = useState(false)
    const [userEmail, setUserEmail] = useState("");
    const [userData, setUserData] = useState({
        email: "",
        fullname: "",
        age: "",
        gender: "",
        maritalStatus: "",
        employmentStatus: "",
        zipcode: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevState) => ({ ...prevState, [name]: name === "age" || name === "zipcode" ? Number(value) : value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:5000/api/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        console.log("user created", response, userData)
        setIsUserFormSubmitted(true)
        setUserEmail(userData.email)
    }

    return (
        <>
            {!isUserFormSubmitted ? (
                <div className='flex flex-col items-center mt-10 gap-10'>
                    <p className="text-blue-600 text-[30px]">User Details</p>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-5 bg-blue-50 rounded-lg px-25 p-10'>
                            <input
                                type="text"
                                name="email"
                                placeholder="Enter email"
                                value={userData.email}
                                required
                                onChange={handleChange}
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Enter your name"
                                value={userData.fullname}
                                required
                                onChange={handleChange}
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <input
                                type="number"
                                name="age"
                                placeholder="Enter age"
                                value={userData.age}
                                required
                                onChange={handleChange}
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <input
                                type="text"
                                name="gender"
                                placeholder="Enter gender"
                                value={userData.gender}
                                onChange={handleChange}
                                required
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <input
                                type="text"
                                name="maritalStatus"
                                placeholder="Enter marital status"
                                value={userData.maritalStatus}
                                onChange={handleChange}
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <input
                                type="text"
                                name="employmentStatus"
                                placeholder="Enter employment status"
                                value={userData.employmentStatus}
                                onChange={handleChange}
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <input
                                type="number"
                                name="zipcode"
                                placeholder="Enter zipcode"
                                value={userData.zipcode}
                                required
                                onChange={handleChange}
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <button type="submit" className='bg-blue-200 px-5 rounded-lg mt-5'>Submit</button>
                        </div>
                    </form>
                </div>
            ) : (<HealthDetails email={userData.email} />)}

        </>
    )
}

export default UserDetails
