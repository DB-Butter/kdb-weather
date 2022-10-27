import React from 'react'
import { iconUrlfromCode } from '../services/weatherService'

function Forcast({title, items}) {
  return (
    <div>

        <div className='flex items-center justify-start my-6'>
            <p className='text-white font-medium uppercase'>{title}</p>
        </div>

        <hr className='my-2' />

        <div className='flex flex-row items-center justify-between text-white'>
            {items.map(item => (
                <div className='flex flex-col items-center justify-center'>
                <p className='font-light text-sm'>
                    {item.title}
                </p>
                <img src={iconUrlfromCode(item.icon)}
                    alt="weather"
                    className='w-12 my-1' 
                />
                <p className='font-medium'>{`${item.temp.toFixed()}°`}</p>
                </div>
            ))}

        </div>

    </div>
  )
}

export default Forcast