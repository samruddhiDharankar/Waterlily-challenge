import { useState } from 'react'
import UserDetails from './components/UserDetails';

function App() {
  const [isStart, setIsStart] = useState(false)

  const handleSubmit = () => {
    setIsStart(true);
  }

  return (
    <>
      {!isStart ? (
        <div className="flex flex-col items-center mt-40">
          <p className='text-blue-700 text-[50px]'>Hello Waterlily!</p>
          <p className="text-blue-600 text-[30px]">Let's start the survey</p>
          <button type="submit" onClick={handleSubmit} className='bg-blue-200 px-5 rounded-lg mt-5'>Start</button>
        </div>
      ) : (<UserDetails />)}

    </>
  )
}

export default App
