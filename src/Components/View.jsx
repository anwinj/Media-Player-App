import React, { useEffect, useState } from 'react'
import {Row,Col} from 'react-bootstrap'
import VideoCard from './VideoCard'
import {getAllCategoryAPI, getAllVideoAPI,updateCategoryAPI} from '../services/allAPI'

function View({uploadVideoResponse,setDropResponse}) {

  const [deleteVideoResponse,setDeleteVideoResponse] = useState(false)
  const [allVideos,setAllVideos] = useState([])

  useEffect(()=>{
    getallUploadedVideos()
    setDeleteVideoResponse(false)
  },[uploadVideoResponse,deleteVideoResponse])

  const getallUploadedVideos = async()=>{
    const result = await getAllVideoAPI()
    if(result.status==200){
      console.log("All Videos Fetched Successfully");
      console.log(result);
      setAllVideos(result.data)
    }
    else{
      console.log("API Failed");
      setAllVideos([])
    }
    
  }

  const dragOver = (e) =>{
    e.preventDefault()
  }

  const videoDropped = async(e) =>{
    const {videoId,categoryId} = JSON.parse(e.dataTransfer.getData("data"))
    console.log(videoId,categoryId);
    const {data} = await getAllCategoryAPI()
    const selectedCategory = data.find(item=>item.id==categoryId)
    let result = selectedCategory.allVideos.filter(video=>video.id!=videoId)
    let {id,categoryName} = selectedCategory
    let newCategory = {id,categoryName,allVideos:result}
    console.log(newCategory);
    const res = await updateCategoryAPI(categoryId,newCategory)
    setDropResponse(res)
  }


  return (
    <>
      <Row droppable="true" onDragOver={e=>dragOver(e)} onDrop={e=>videoDropped(e)} className='ms-2'>
          {
            allVideos?.length>0?allVideos.map(video=>(
              <Col className='mb-2 mt-3' sm={12} md={6} lg={4} xl={3}>
                <VideoCard setDeleteVideoResponse={setDeleteVideoResponse} video={video}/>
              </Col>
            )):<p className='text-danger'>No videos are Uploaded Yet!!!!</p>
          }
      </Row>
    </>
  )
}

export default View