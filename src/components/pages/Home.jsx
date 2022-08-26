import React, { useState } from 'react'
import data from '../data'
import { useNavigate, Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="row mt-5">
      <h2 className='text-center'>Doctos List</h2>
      <div className="col">
        {data.map((item, idx) => (
          <Link to={`/doclist/${idx}`} >
            <div className="card mt-4 ">
              <div className="card-body ">
                <h5 className="card-title text-center">{item.name}</h5>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  )
}

export default Home