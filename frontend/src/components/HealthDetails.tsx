import React, { ChangeEvent, FormEvent, useState } from 'react'
import FinanceDetails from './FinanceDetails'

type HealthDetailsProps = {
    email: String
}

function HealthDetails({ email }: HealthDetailsProps) {
    const [isHealthDataSubmitted, setIsHealthDataSubmitted] = useState(false)
    const [userHealthData, setUserHealthData] = useState({
        chronicCondition: "",
        healthInsurance: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserHealthData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            email,
            chronicCondition: userHealthData.chronicCondition,
            healthInsurance: userHealthData.healthInsurance
        }

        const response = await fetch(`http://localhost:5000/api/user-health`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        console.log("user health data created", response, userHealthData)
        setIsHealthDataSubmitted(true)
    }

    return (
        <>
            {!isHealthDataSubmitted ? (
                <div className='flex flex-col items-center mt-10 gap-10'>
                    <p className="text-blue-600 text-[30px]">Health Details</p>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-5 bg-blue-50 rounded-lg px-25 p-10'>
                            <input
                                type="text"
                                name="chronicCondition"
                                placeholder="Any chronic condition?"
                                value={userHealthData.chronicCondition}
                                required
                                onChange={handleChange}
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <input
                                type="text"
                                name="healthInsurance"
                                placeholder="Have health insurance?"
                                value={userHealthData.healthInsurance}
                                required
                                onChange={handleChange}
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <button type="submit" className='bg-blue-200 px-5 rounded-lg mt-5'>Submit</button>
                        </div>
                    </form>
                </div>
            ) : (<FinanceDetails email={email} />)}

        </>
    )
}

export default HealthDetails
