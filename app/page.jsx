"use client";

import Image from "next/image";

import { useEffect, useRef } from "react";

import LocomotiveScroll from "locomotive-scroll";
import $ from "jquery";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const mainWrap = useRef(null);

  const scroll = useRef(null);

  const { contextSafe } = useGSAP();

  useEffect(() => {
    scroll.current = new LocomotiveScroll({
      el: mainWrap.current,
      smooth: true,
    });

    initMagneticButtons();
  });

  const initMagneticButtons = () => {
    // Magnetic Buttons
    // Found via: https://codepen.io/tdesero/pen/RmoxQg
    var magnets = document.querySelectorAll(".magnetic");
    var strength = 100;

    // START : If screen is bigger as 540 px do magnetic
    if (window.innerWidth > 540) {
      const moveMagnet = contextSafe((event) => {
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
      });

      magnets.forEach((magnet) => {
        magnet.addEventListener("mousemove", moveMagnet);

        magnet.addEventListener(
          "mouseleave",
          contextSafe(function (event) {
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
          })
        );
      });
    } // END : If screen is bigger as 540 px do magnetic

    $(".btn-click.magnetic").on(
      "mouseenter",
      contextSafe(function (event) {
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
      })
    );

    $(".btn-click.magnetic").on(
      "mouseleave",
      contextSafe(function (event) {
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
      })
    );
  };

  return (
    <main className="main">
      <div className="btn-menu magnetic" data-strength={20}>
        <span className="btn-menu-inner">Menu</span>
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
                stroke-width="1.5"
              />
              <path d="M13 13L1 1" stroke="#1c1d20" stroke-width="1.5" />
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
            <p>
              Se hai bisogno di un sito web, prenota una chiamata gratuita con
              me per capire se ci sono i presupposti per collaborare.
            </p>

            <div className="btn" data-scroll data-scroll-speed="1.5">
              <div className="btn-round btn-click magnetic" data-strength="100">
                <div class="btn-fill"></div>
                <span class="btn-text">
                  <span class="btn-text-inner">Fissala ora</span>
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
          </div>
        </section>
      </div>
    </main>
  );
}