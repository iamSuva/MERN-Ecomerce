import React from 'react'

function SlideShow() {
  return (
    <div>
<div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active" data-bs-interval="1000">
        <img src="images/banner4.jpg" class="d-block w-100" height="400px"alt="..."/>
      </div>
      <div class="carousel-item" data-bs-interval="1000">
        <img src="/images/bg.jpg" class="d-block w-100" height="400px"alt="..."/>
        
      </div>
      <div class="carousel-item" data-bs-interval="1000">
        <img src="images/banner2.jpg" class="d-block w-100" height="400px"alt="..."/>
        {/* <img src="/banner4.jpg" class="d-block w-100" height="400px" alt="..."/> */}
      </div>
      <div class="carousel-item" data-bs-interval="1000">
        <img src="images/banner3.jpg" class="d-block w-100" height="400px"alt="..."/>
        {/* <img src="/banner4.jpg" class="d-block w-100" height="400px" alt="..."/> */}
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>

    </div>
  )
}

export default SlideShow;