import React,{useState,useEffect} from 'react'
import {Button,Modal,Form,FloatingLabel,Row,Col,Collapse} from 'react-bootstrap'
import { addCategoryAPI, getAllCategoryAPI, removeCategoryAPI, getAVideoAPI, updateCategoryAPI } from '../services/allAPI';
import VideoCard from '../Components/VideoCard'

function Category({dropResponse}) {

  const [show, setShow] = useState(false);
  const [categoryName,setCategoryName] = useState("")
  const [allCategories,setAllCategories] = useState("")
  const [open, setOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd =async ()=>{
    if(categoryName){
      const result = await addCategoryAPI({categoryName,allVideo:[]})
      if(result.status >= 200 &&result.status<300){
        handleClose()
        setCategoryName("")
        getAllCategories()
      }
      else{
        console.log(result.message);
      }
    }
    else{
      alert("Please fill the form completely!!!!")
    }
  }

  useEffect(()=>{
    getAllCategories()
  },[dropResponse])

  const getAllCategories = async ()=>{
    const {data} = await getAllCategoryAPI()
    setAllCategories(data)
  }

  const removeCategory = async (id)=>{
    await removeCategoryAPI(id)
    getAllCategories()
  }
  
  const dragOver = (e) =>{
    console.log("Draggging over Category");
    e.preventDefault()
  }

  const videoDrop = async (e,categoryId)=>{
    const videoId = e.dataTransfer.getData("videoId")
    console.log(`Video id: ${videoId} dropped at category: ${categoryId}`);
    const {data} = await getAVideoAPI(videoId)
    console.log(data);
    const selectedCategory = allCategories.find(item=>item.id===categoryId)
    console.log(selectedCategory);
    selectedCategory.allVideos.push(data)
    console.log(selectedCategory);
    await updateCategoryAPI(categoryId,selectedCategory)
    getAllCategories()
  }

  const videoDragStarted = (e,videoId,categoryId) =>{
    let dataShare = {videoId,categoryId}
    e.dataTransfer.setData("data",JSON.stringify(dataShare))
  }

  return (
    <>
      <div className='d-grid'>
        <Button className='btn btn-info' variant="primary" onClick={handleShow}>
          Add Category
        </Button>
      </div>

      {
        allCategories?.length>0?allCategories.map(category=>(
          <div className="border rounded p-3 mt-2" droppable="true" onDragOver={e=>dragOver(e)} onDrop={e=>videoDrop(e,category?.id)}>
            <div onClick={() => setOpen(!open)} className="d-flex justify-content-between align-items-center">
              <h6>{category.categoryName}</h6>
              <button className='btn' onClick={()=>removeCategory(category?.id)}><i class="fa-solid fa-trash text-danger"></i></button>
            </div>

            <Row>
              {
                category?.allVideos?.length>0?category?.allVideos.map(card=>(
                  <Col draggable onDragStart={e=>videoDragStarted(e,card.id,category.id)} sm={12} className='mb-2'>
                    <VideoCard video={card} insideCategory={true}/>
                  </Col>
                )):null
              }
            </Row>
          </div>
        )):<p className='text-danger fs-5 mt-2'>No categories are added</p>
      }


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Category Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel
          controlId="floatingInput"
          label="Category Name"
          className="mb-3"
          >
          <Form.Control className='mb-3' type="text" placeholder="Category Name" onChange={(e)=>setCategoryName(e.target.value)} />

          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Category