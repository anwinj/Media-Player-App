import React from 'react'
import { Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'

function LandingPage() {
  return (
    <div className='container mt-5'>
      <div className="row m-5 mt-5">
        <div className="col-lg-4 mt-5">
          <h3>Welcome to <span className='text-warning'>Media Player</span></h3>
          <p style={{textAlign:'justify'}} className='mt-3'>Media player app will allow us to add and remove their uploaded videos, and helps us arrange them in different categories by providing drag and drop functionalities.</p>
          <Link to={'/home'} className='btn btn-info mt-5 fw-bolder'>Get Started</Link>
        </div>

        <div className="col-lg-2"></div>

        <div className="col-lg-6">
          <img src="https://i.pinimg.com/originals/33/a4/6f/33a46f727dbe790d436616a1f56fce9c.gif" alt="gif image" />
        </div>
      </div>

     <div className='features mt-5 '>
      <div className='d-flex justify-content-center '><h3 className='mb-5  '>Features</h3></div>
        <div className=" d-flex flex-row justify-content-between align-items-center">
          {/* card-1 */}
          <Card style={{ width: '24rem' }} >
            <Card.Img width={'300px'} height={'400px'} variant="top" src="https://clipart-library.com/images/pc7reEGKi.gif" />
            <Card.Body>
              <Card.Title>Managing Videos</Card.Title>
              <Card.Text>
                User can upload, watch and remove the videos
              </Card.Text>
            </Card.Body>
          </Card>
  
          {/* card-2 */}
          <Card style={{ width: '24rem' }}>
            <Card.Img width={'300px'} height={'400px'} variant="top" src="https://cdn.pixabay.com/animation/2022/11/02/10/53/10-53-39-437_512.gif" />
            <Card.Body>
              <Card.Title>Categorizing Videos</Card.Title>
              <Card.Text>
                User can categorize the videos according to their prefernce using darg and drop feature
              </Card.Text>
            </Card.Body>
          </Card>
  
          {/* card-3 */}
          <Card style={{ width: '24rem' }}>
            <Card.Img width={'300px'} height={'400px'} variant="top" src="https://cdn.dribbble.com/users/497438/screenshots/2084032/xtyf_1.gif" />
            <Card.Body>
              <Card.Title>Watch History</Card.Title>
              <Card.Text>
                User can manage watch history of the videos
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
     </div>

      <div className="row mt-5 border rounded align-items-center p-5 mb-5">

        <div className="col-lg-5">
          <h3 className='text-warning mb-5'>Simple, Fast and Powerful</h3>
          <p style={{textAlign:'justify'}}>Play everything: <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, odit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, temporibus.</span></p>
          <p style={{textAlign:'justify'}}>Categorize Videos: <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, odit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, temporibus.</span></p>
          <p style={{textAlign:'justify'}}>Watch History: <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia, odit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, temporibus.</span></p>
        </div>

        <div className="col-lg-1"></div>

        <div className="col-lg-6">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/RLzC55ai0eo?si=xpMc_K4HlLoZYrIM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default LandingPage