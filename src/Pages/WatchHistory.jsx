import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {getHistoryAPI, removeHistoryAPI} from '../services/allAPI'

function WatchHistory() {

  const [history,setHistory] = useState([])

  useEffect(()=>{
    getHistory()
  },[])

  const getHistory = async()=>{
    const result = await getHistoryAPI()
    if(result.status==200){
      setHistory(result.data)
    }
    else{
      console.log("API failed");
      console.log(result.message);
    }
  }

  const removeHistoryItem = async (id) =>{
    await removeHistoryAPI(id)
    getHistory()
  }

  return (
    <>
      <div className='container mt-5 mb-5 d-flex justify-content-between '>
        <h2>Watch History</h2>
        <Link to='/home' style={{color:'white',textDecoration:'none',fontSize:'20px'}}><i class="fa-solid fa-arrow-left"></i>Back to Home</Link>
      </div>

      <table className="container table mb-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Video Caption</th>
            <th>URL</th>
            <th>TimeStamp</th>
            <th><i class="fa-solid fa-ellipsis"></i></th>
          </tr>
        </thead>

        <tbody>
          {
            history?.length>0?history?.map((video,index)=>(
              <tr>
                <td>{index+1}</td>
                <td>{video.caption}</td>
                <td><a href={video.link} target="_blank">{video.link}</a></td>
                <td>{video.timeStamp}</td>
                <td><button className='btn' onClick={()=>removeHistoryItem(video.id)}><i class="fa-solid fa-trash text-danger"></i></button></td>
              </tr>
            )):<p className='text-danger fs-4 fw-bolder'>Your WatchHistory is Empty!!!!</p>
          }
        </tbody>
      </table>
    </>
  )
}

export default WatchHistory