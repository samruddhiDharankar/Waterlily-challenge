import React, { ChangeEvent, FormEvent, useState } from 'react'
import ReviewDetails from './ReviewDetails'

type FinanceDetailsProps = {
    email: String
}

function FinanceDetails({ email }: FinanceDetailsProps) {
    const [isFormSubmiited, setIsFormSubmitted] = useState(false)
    const [userFinanceData, setUserFinanceData] = useState({
        income: "",
        savingAndRetirementFunds: "",
        debt: ""
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserFinanceData((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = {
            email,
            income: Number(userFinanceData.income),
            savingAndRetirementFunds: Number(userFinanceData.savingAndRetirementFunds),
            debt: Number(userFinanceData.debt)
        }
        const createFinanceData = await fetch(`http://localhost:5000/api/user-finance`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        console.log("finance details create", createFinanceData, userFinanceData)
        setIsFormSubmitted(true)
    }

    return (
        <>
            {!isFormSubmiited ? (
                <div className='flex flex-col items-center mt-10 gap-10'>
                    <p className="text-blue-600 text-[30px]">Finance Details</p>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-5 bg-blue-50 rounded-lg px-25 p-10'>
                            <input
                                type="number"
                                name="income"
                                placeholder="Enter income"
                                value={userFinanceData.income}
                                onChange={handleChange}
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <input
                                type="number"
                                name="savingAndRetirementFunds"
                                placeholder="Enter saving/Retirement"
                                value={userFinanceData.savingAndRetirementFunds}
                                onChange={handleChange}
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <input
                                type="number"
                                name="debt"
                                placeholder="Enter debt"
                                value={userFinanceData.debt}
                                onChange={handleChange}
                                className='border-1 border-blue-200 rounded-sm p-1 px-10'
                            />
                            <button type="submit" className='bg-blue-200 px-5 rounded-lg mt-5'>Submit</button>
                        </div>
                    </form>
                </div>
            ) : (<ReviewDetails email={email} />)}

        </>
    )
}

export default FinanceDetails
