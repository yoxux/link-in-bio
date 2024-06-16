"use client";

import Link from "next/link";
import Image from "next/image";

import { Fragment, useEffect, useRef } from "react";

import $ from "jquery";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const main = useRef(null);
  const menuBtn = useRef(null);
  const mainWrap = useRef(null);
  const animatedParagraph = useRef(null);

  const scroll = useRef(null);

  const { contextSafe } = useGSAP();

  useEffect(() => {
    scroll.current = new Lenis();

    const raf = (time) => {
      scroll.current.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Magnetic Buttons
    // Found via: https://codepen.io/tdesero/pen/RmoxQg
    const magnets = document.querySelectorAll(".magnetic");

    magnets.forEach((magnet) => {
      magnet.addEventListener("mousemove", moveMagnet);
      magnet.addEventListener("mouseleave", leaveMagnet);
    });

    const $clickMagnetic = $(".btn-click.magnetic");
    $clickMagnetic.on("mouseenter", enterClickMagnet);
    $clickMagnetic.on("mouseleave", leaveClickMagnet);

    return () => {
      if (scroll.current) scroll.current.destroy();
      magnets.forEach((magnet) => {
        magnet.removeEventListener("mousemove", moveMagnet);
        magnet.removeEventListener("mouseleave", leaveMagnet);
      });
      $clickMagnetic.off("mouseenter", enterClickMagnet);
      $clickMagnetic.off("mouseleave", leaveClickMagnet);
    };
  });

  useGSAP((context, contextSafe) => {
    const triggerElement = $(animatedParagraph.current);
    const targetElement = $(".span-line-inner", triggerElement);

    const showSpans = contextSafe(() => {
      gsap.to(targetElement, {
        y: 0,
        stagger: 0.01,
        ease: "power3.out",
        duration: 1,
      });
    });

    window.addEventListener("scroll", showSpans, { once: true });

    return () => window.removeEventListener("scroll", showSpans);
  });

  const moveMagnet = contextSafe((event) => {
    if (window.innerWidth > 540) {
      var magnetButton = event.currentTarget;
      var bounding = magnetButton.getBoundingClientRect();
      var magnetsStrength = magnetButton.getAttribute("data-strength");

      gsap.to(magnetButton, {
        x:
          ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
          magnetsStrength,
        y:
          ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
          magnetsStrength,
        duration: 1.5,
        ease: "power4.out",
      });
    }
  });

  const leaveMagnet = contextSafe((event) => {
    if (window.innerWidth > 540) {
      gsap.to(event.currentTarget, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "elastic.out",
      });
      gsap.to($(event.currentTarget).find(".btn-text"), {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: "elastic.out",
      });
    }
  });

  const enterClickMagnet = contextSafe((event) => {
    if ($(event.currentTarget).find(".btn-fill").length) {
      gsap.to($(event.currentTarget).find(".btn-fill"), {
        startAt: { y: "76%" },
        y: "0%",
        duration: 0.6,
        ease: "power2.inOut",
      });
    }
    if ($(event.currentTarget).find(".btn-text-inner.change").length) {
      gsap.to($(event.currentTarget).find(".btn-text-inner.change"), {
        startAt: { color: "#1C1D20" },
        color: "#FFFFFF",
        duration: 0.3,
        ease: "power3.in",
      });
    }
  });

  const leaveClickMagnet = contextSafe((event) => {
    if ($(event.currentTarget).find(".btn-fill").length) {
      gsap.to($(event.currentTarget).find(".btn-fill"), {
        y: "-76%",
        duration: 0.6,
        ease: "power2.inOut",
      });
    }
    if ($(event.currentTarget).find(".btn-text-inner.change").length) {
      gsap.to($(event.currentTarget).find(".btn-text-inner.change"), {
        color: "#1C1D20",
        ease: "power3.out",
        duration: 0.3,
        delay: 0.3,
      });
    }
  });

  const toggleMenu = (event) => {
    if ($(menuBtn.current).hasClass("active")) {
      $(menuBtn.current).removeClass("active");
      $(main.current).removeClass("nav-active");
      if (scroll.current) scroll.current.start();
    } else {
      $(menuBtn.current).addClass("active");
      $(main.current).addClass("nav-active");
      if (scroll.current) scroll.current.stop();
    }
  };

  return (
    <main className="main" ref={main}>
      <div
        className="btn-menu magnetic"
        data-strength={20}
        ref={menuBtn}
        onClick={toggleMenu}
      >
        <span className="btn-menu-inner">Menu</span>
      </div>

      <div className="overlay fixed-nav-back" onClick={toggleMenu}></div>

      <div className="fixed-nav theme-dark">
        <div className="fixed-nav-rounded-div">
          <div className="rounded-div-wrap">
            <div className="rounded-div"></div>
          </div>
        </div>
        <div className="fixed-nav-inner">
          <div className="row nav-row">
            <h5>Navigazione</h5>
            <div className="stripe"></div>
            <ul className="links-wrap">
              <li className="btn btn-link">
                <a
                  href="/"
                  className="btn-click magnetic"
                  data-strength="24"
                  data-strength-text="12"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">Home</span>
                  </span>
                </a>
              </li>
              <li className="btn btn-link">
                <a
                  href="/case-studies"
                  className="btn-click magnetic"
                  data-strength="24"
                  data-strength-text="12"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">Casi Studio</span>
                  </span>
                </a>
              </li>
              <li className="btn btn-link">
                <a
                  href="/about"
                  className="btn-click magnetic"
                  data-strength="24"
                  data-strength-text="12"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">About</span>
                  </span>
                </a>
              </li>
              <li className="btn btn-link">
                <a
                  href="/contact"
                  className="btn-click magnetic"
                  data-strength="24"
                  data-strength-text="12"
                >
                  <span className="btn-text">
                    <span className="btn-text-inner">Contatti</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="row social-row">
            <div className="stripe"></div>
            <div className="socials">
              <h5>Social</h5>
              <ul>
                <li className="btn btn-link btn-link-external">
                  <a
                    href="https://www.instagram.com/itsjiayi.dev/"
                    target="_blank"
                    className="btn-click magnetic"
                    data-strength="20"
                    data-strength-text="10"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">Instagram</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a
                    href="https://tiktok.com/@itsjiayi.dev"
                    target="_blank"
                    className="btn-click magnetic"
                    data-strength="20"
                    data-strength-text="10"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">Tiktok</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a
                    href="https://www.linkedin.com/in/jiayizhan/"
                    target="_blank"
                    className="btn-click magnetic"
                    data-strength="20"
                    data-strength-text="10"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">LinkedIn</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="main-wrap" ref={mainWrap}>
        <section className="section hero">
          <div className="container">
            <Image
              src={"/jiayi.svg"}
              alt="Jiayi"
              height={177}
              width={369}
              className="jiayi-svg"
            ></Image>

            <h4>
              Designer &<span>Sviluppatore Web</span>
            </h4>

            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 3.76923V13H3.76923"
                stroke="#1c1d20"
                strokeWidth="1.5"
              />
              <path d="M13 13L1 1" stroke="#1c1d20" strokeWidth="1.5" />
            </svg>

            <div className="picture">
              <div className="image">
                <Image src={"/img/me-nobg.png"} alt="Jiayi's face" fill></Image>
              </div>
              <div className="base"></div>
            </div>
          </div>
        </section>

        <section className="section calendly">
          <div className="container">
            <p ref={animatedParagraph}>
              {"Se hai bisogno di un sito web, prenota una chiamata gratuita con me per capire se ci sono i presupposti per collaborare."
                .split(" ")
                .map((word, index) => (
                  <Fragment key={`word_${index}`}>
                    <span
                      key={`word_${index}`}
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        overflow: "hidden",
                      }}
                    >
                      <span
                        style={{
                          position: "relative",
                          display: "block",
                          transform: "translateY(100%)",
                        }}
                        className="span-line-inner"
                      >
                        {word}
                      </span>
                    </span>{" "}
                  </Fragment>
                ))}
            </p>

            <div className="btn" data-scroll data-speed="1.5">
              <div className="btn-round btn-click magnetic" data-strength="100">
                <div className="btn-fill"></div>
                <span className="btn-text">
                  <span className="btn-text-inner">Fissala ora</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section footer">
          <div className="container">
            <div className="btn btn-normal">
              <a
                href="mailto:hello.itsjiayi@gmail.com"
                className="btn-click magnetic"
                data-strength="25"
                data-strength-text="15"
              >
                <div
                  className="btn-fill"
                  style={{ transform: "translate(0px, -76%)" }}
                ></div>
                <span className="btn-text">
                  <span className="btn-text-inner change">
                    hello.itsjiayi@gmail.com
                  </span>
                </span>
              </a>
            </div>

            <div className="socials">
              <h5>Socials</h5>
              <ul>
                <li className="btn btn-link btn-link-external">
                  <a
                    href="https://www.instagram.com/itsjiayi.dev/"
                    target="_blank"
                    className="btn-click magnetic"
                    data-strength="20"
                    data-strength-text="10"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">Instagram</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a
                    href="https://www.tiktok.com/@itsjiayi.dev"
                    target="_blank"
                    className="btn-click magnetic"
                    data-strength="20"
                    data-strength-text="10"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">Tiktok</span>
                    </span>
                  </a>
                </li>
                <li className="btn btn-link btn-link-external">
                  <a
                    href="https://www.linkedin.com/in/jiayizhan/"
                    target="_blank"
                    className="btn-click magnetic"
                    data-strength="20"
                    data-strength-text="10"
                  >
                    <span className="btn-text">
                      <span className="btn-text-inner">LinkedIn</span>
                    </span>
                  </a>
                </li>
              </ul>
              <div className="stripe"></div>
            </div>

            <svg
              width="369"
              height="516"
              viewBox="0 0 369 516"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="final-pic"
            >
              <rect width="369" height="516" rx="184.5" fill="#334BD3" />
            </svg>
          </div>
        </section>
      </div>
    </main>
  );
}
