import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import "./SmoothScroll.css";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  useGSAP
);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({
  children,
}: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !wrapperRef.current ||
        !contentRef.current
      ) {
        return;
      }

      const smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,

        smooth: 1.5,

        effects: true,

        smoothTouch: 0.1,

        normalizeScroll: true,
      });

      ScrollTrigger.refresh();

      return () => {
        smoother.kill();
      };
    },
    {
      scope: wrapperRef,
    }
  );

  return (
    <div
      ref={wrapperRef}
      id="smooth-wrapper"
      className="smooth-wrapper"
    >
      <div
        ref={contentRef}
        id="smooth-content"
        className="smooth-content"
      >
        {children}
      </div>
    </div>
  );
}