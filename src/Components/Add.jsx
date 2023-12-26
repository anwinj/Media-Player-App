import React,{useState} from 'react'
import { Button, Modal,Form,FloatingLabel } from 'react-bootstrap'
import {uploadNewVideoAPI} from '../services/allAPI'

function Add({setUploadVideoResponse}) {

  const[uploadVideo,setUploadVideo] = useState({
    id:"",caption:"",url:"",link:""
  })

  console.log(uploadVideo)

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // youtube link and embed code example
  // https://www.youtube.com/watch?v=aGdeihaDayU
  // https://www.youtube.com/embed/aGdeihaDayU

  const getYoutubeEmbedLink = (e) =>{
    const {value} = e.target
    if(value.includes("v=")){
      let vID = value.split("v=")[1].slice(0,11)
      // console.log(`https://www.youtube.com/embed/${vID}`);
      setUploadVideo({...uploadVideo,link:`https://www.youtube.com/embed/${vID}`})
    }
    else{
      setUploadVideo({...uploadVideo,link:""})
    }
  }

  const handleUpload = async()=>{
    const {id,caption,url,link} = uploadVideo
    if(!id || !caption || !url || !link){
      alert("Form incomplete!! Please fill the form completely...")
    }
    else{
      const result = await uploadNewVideoAPI(uploadVideo)
      console.log(result);

      if(result.status>=200 && result.status<300){
        // success
        handleClose()
        // reset state
        setUploadVideo({
          id:"",caption:"",url:"",link:""
        })
        // share result.data to view component
        setUploadVideoResponse(result.data)
      }
      else{
        alert(result.message)
      }
    }
  }

  return (
    <>
      <div className="d-flex align-items-center">
        <h5>Upload New Videos</h5>
        <button onClick={handleShow} className='btn' style={{color:'white'}} ><i class="fa-solid fa-photo-film fa-2xl"></i></button>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload New Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <FloatingLabel
        controlId="floatingInput"
        label="Uploading Video Id"
        className="mb-3"
      >
        <Form.Control className='mb-3' type="text" placeholder="Uploading Video Id " onChange={e=>setUploadVideo({...uploadVideo,id:e.target.value})}/>

      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Uploading Video Caption"
        className="mb-3"
      >
        <Form.Control className='mb-3' type="text" placeholder="Uploading Video Caption" onChange={e=>setUploadVideo({...uploadVideo,caption:e.target.value})} />

      </FloatingLabel>


      <FloatingLabel
        controlId="floatingInput"
        label="Uploading Video Image URL"
        className="mb-3"
      >
        <Form.Control className='mb-3' type="text" placeholder="Uploading Video Image URL" onChange={e=>setUploadVideo({...uploadVideo,url:e.target.value})}/>

      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Uploading Video Youtube Link"
        className="mb-3"
      >
        <Form.Control className='mb-3' type="text" placeholder="Uploading Video Youtube Link" onChange={getYoutubeEmbedLink} />

      </FloatingLabel>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpload} variant="primary">Upload</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Add