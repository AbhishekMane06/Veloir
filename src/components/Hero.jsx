import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
const Hero = () => {
  const videoRef = useRef();
  const isMob = useMediaQuery({ maxWidth: 768 }); // check if viewport is under 768px
  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars , words" });
    const paragraphSplit = new SplitText(".subtitle", {
      type: "chars , lines",
    });

    // Title animation
    heroSplit.chars.forEach((char) => {
      char.classList.add("text-gradient");
    });

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.7,
      ease: "expo.Out",
      stagger: 0.08,
    });

    // Subtitle animation
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.7,
      ease: "expo.Out",
      stagger: 0.06,
      delay: 1,
    });

    // Leaf Scrolling animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          bottom: "bottom top",
          scrub: true, // - With scrub animation continuously updates as the user scrolls
        },
      })
      .to(".right-leaf", { y: 200 }, 0) //goes Down while scrolling
      .to(".left-leaf", { y: -200 }, 0); // goes Up while scrolling

    const startValue = isMob ? "top 50%" : "center 60%";
    const endValue = isMob ? "120% top" : "bottom top";

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: "video",
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });

    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  return (
    <>
      <section id="hero" className="noisy">
        <h1 className="title">MINTÉ</h1>

        <img src="/images/hero-left-leaf.png" className="left-leaf" />
        <img src="/images/hero-right-leaf.png" className="right-leaf" />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p></p>
              <p className="subtitle">
                Sip the spirit <br /> of summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Every cocktail on our menu is crafted with care ,creative flair
                and a touch of luxury - designed to delight every palate.
              </p>
                <a href="/cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className="video absolute inset-0">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </>
  );
};

export default Hero;
