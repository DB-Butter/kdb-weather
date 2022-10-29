import React from 'react'

function TopButtons(props) {

    const cities = [
        {
            id: 1,
            title: "Los Angeles"
        },
        {
            id: 2,
            title: "Houston"
        },
        {
            id: 3,
            title: "Phoenix"
        },
        {
            id: 4,
            title: "Chicago"
        },
        {
            id: 5,
            title: "New York"
        },
    ]

  return (
    <div className='flex items-center justify-around my-6'>
        {cities.map((city) => (

            <button key={city.id} className='text-white text-lg font-medium' onClick={() => props.setQuery({ q: city.title })}>{city.title}</button>

        ))}
    </div>
  )
}

export default TopButtons