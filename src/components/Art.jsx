import React from 'react'
import gsap from 'gsap'
import { useMediaQuery } from 'react-responsive';
import { useGSAP } from '@gsap/react';

const Art = () => {
  const isMob = useMediaQuery({ maxWidth: 768 }); // check if viewport is under 768px

  useGSAP(() =>{
    const start = isMob ? 'top 20%' : 'top top';

    const maskTimeline = gsap.timeline({
        scrollTrigger: {
            trigger : '#art',
            start,
            end:'bottom center',
            scrub : 1.5,
            pin: true //fix thing in place while scrolling

        }
    })

    maskTimeline.to('.will-fade',{opacity:0,stagger:0.2,ease:'power1.inOut'})
    .to('.masked-img', {scale:1.3, maskPosition:"center", maskSize:'400%',duration:1,ease:"power1.inOut"})
    .to("#masked-content", { opacity:1,duration:1,ease:"power1.inOut"})
  })
  return (
    <div id="art">
      <div className="container mx-auto h-full pt-20">
        <h2 className="will-fade">The ART</h2>

        <div className="content">
          <div className="cocktail-img">
            <img
              src="/images/under-img.jpg"
              alt="cocktail"
              className="abs-center masked-img size-full object-contain"
            />
          </div>
        </div>

        <div className="masked-container">
          <h2 className="will-fade">Sip-Worthy Perfection</h2>
          <div id="masked-content">
            <p>
              This isnt just a drink. It’s a carefully crafted moment made just
              for you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Art