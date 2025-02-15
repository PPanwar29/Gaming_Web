import { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollManager = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.1, // Adjust for smoothness
      smartphone: { smooth: true },
      tablet: { smooth: true },
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(scrollRef.current, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: scrollRef.current.style.transform ? "transform" : "fixed",
    });

    // 🚀 Update ScrollTrigger after Locomotive Scroll renders
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    return () => {
      locoScroll.destroy();
      ScrollTrigger.removeEventListener("refresh", () => locoScroll.update());
    };
  }, []);

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default ScrollManager;
