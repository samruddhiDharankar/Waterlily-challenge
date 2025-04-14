import React, { useEffect, useState } from 'react'

type ReviewDetailsProps = {
    email: String
}

function ReviewDetails({ email }: ReviewDetailsProps) {
    const [userData, setUserData] = useState({
        email: "",
        fullname: "",
        age: "",
        gender: "",
        maritalStatus: "",
        employmentStatus: "",
        zipcode: ""
    })
    const [userHealthData, setUserHealthData] = useState({
        chronicCondition: "",
        healthInsurance: ""
    })
    const [userFinanceData, setUserFinanceData] = useState({
        income: "",
        savingAndRetirementFunds: "",
        debt: ""
    })

    useEffect(() => {

        const fetchUserDetails = async () => {
            const userDetails = await fetch(`http://localhost:5000/api/users?email=${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const response = await userDetails.json()
            setUserData(response)
            console.log(response)
        }

        const fetchHealthDetails = async () => {
            const userHealth = await fetch(`http://localhost:5000/api/user-health?email=${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const response = await userHealth.json()
            setUserHealthData(response)
            console.log(response)
        }

        const fetchFinanceDetails = async () => {
            const userFinance = await fetch(`http://localhost:5000/api/user-finance?email=${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const response = await userFinance.json();
            setUserFinanceData(response)
            console.log(response)
        }

        fetchUserDetails();
        fetchHealthDetails();
        fetchFinanceDetails();
    }, [])

    return (
        <>
            <div className='flex flex-col items-center mt-10 gap-10'>
                <p className="text-blue-600 text-[30px]">Review Details</p>
                <div className='flex flex-col gap-5 bg-blue-50 rounded-lg px-25 p-10'>
                    <h2 className='text-emerald-700 font-bold'>User Details</h2>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Full name:</strong> {userData.fullname}</p>
                    <p><strong>Age:</strong> {userData.age}</p>
                    <p><strong>Gender:</strong> {userData.gender}</p>
                    <p><strong>Marital status:</strong> {userData.maritalStatus}</p>
                    <p><strong>Employment status:</strong> {userData.employmentStatus}</p>
                    <p><strong>Zipcode:</strong> {userData.zipcode}</p>

                    <h2 className='text-emerald-700 font-bold'>Health Details</h2>
                    <p><strong>Chronic condition:</strong> {userHealthData.chronicCondition}</p>
                    <p><strong>Health insurance:</strong> {userHealthData.healthInsurance}</p>

                    <h2 className='text-emerald-700 font-bold'>Finance Details</h2>
                    <p><strong>Income:</strong> {userFinanceData.income}</p>
                    <p><strong>Saving/Retirement Funds:</strong> {userFinanceData.savingAndRetirementFunds}</p>
                    <p><strong>Debt:</strong> {userFinanceData.debt}</p>
                </div>
            </div>
        </>
    )
}

export default ReviewDetails
