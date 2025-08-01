// DOM 콘텐츠가 완전히 로드된 후 스크립트를 실행합니다.
window.addEventListener("DOMContentLoaded", () => {
    // 커버 애니메이션
    $(function () {
        CustomEase.create("myEase", "0.96, 0.02, 0.22, 0.96");
        const coverTimeline = gsap.timeline({
            delay: 0.5
        });
        coverTimeline
            .to(".cover_start_bg", {
                xPercent: -100,
                duration: 0.8,
                ease: "myEase"
            })
            .fromTo("#cover_ani .txt_box p span",
                { yPercent: 100, opacity: 0 },
                { yPercent: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.1 }
            )
            .to("#cover_ani", {
                delay: 0.5,
                width: 0,
                duration: 1,
                ease: "myEase"
            })
            .set(["#cover_ani"], {
                display: "none"
            });
    });
    // 커버 애니메이션

    // 레니스 스크롤
    $(function () {

        // --- Lenis  스크롤 ---
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.05,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // --- ScrollTrigger 및 Lenis 연동 ---
        gsap.ticker.add(() => {
            ScrollTrigger.update();
        });
        ScrollTrigger.defaults({ scroller: window });

        const T = document.querySelector('#to_top');
        T.addEventListener('click', () => {
            lenis.scrollTo(0, {
                duration: 1.0, // 초 단위 (기본값은 1)
            });
        });
    });
    // 레니스 스크롤

    // 프로젝트 섹션 gsap
    $(function () {
        const items = document.querySelectorAll("#project_sec .itm");

        // 모든 itm 초기값 height: 100%
        gsap.set(items, { height: '100%' });

        items.forEach((item, index) => {
            // 마지막 항목은 애니메이션 제외
            if (index === items.length - 1) return;

            const triggerStart = index * window.innerHeight;
            const triggerEnd = (index + 1) * window.innerHeight;

            gsap.to(item, {
                height: '0%',
                scrollTrigger: {
                    trigger: '#project_sec',
                    start: () => `${triggerStart} top`,
                    end: () => `${triggerEnd} top`,
                    scrub: true,
                    invalidateOnRefresh: true
                }
            });
        });

        // 스크롤 위치 강제 초기화 + 트리거 강제 새로고침
        window.addEventListener("load", () => {
            window.scrollTo(0, 0); // ✅ 진입 시 위치 초기화
            ScrollTrigger.refresh();
        });
    });
    // 프로젝트 섹션 gsap

    $(function () {
        ScrollTrigger.create({
            trigger: "#work_list",
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: false,

            onEnter: () => {
                document.querySelector("#work_list").classList.add("on");
                document.querySelector("#header .logo").classList.add("on");
                document.querySelector("#to_top").classList.add("on");
                document.querySelector("#scroll_down").classList.add("on");
            },
            onLeaveBack: () => {
                document.querySelector("#work_list").classList.remove("on");
                document.querySelector("#header .logo").classList.remove("on");
                document.querySelector("#to_top").classList.remove("on");
                document.querySelector("#scroll_down").classList.remove("on");
            }
        });

        ScrollTrigger.create({
            trigger: "#profile",
            start: "top top",
            end: "bottom top",
            pin: true,
            pinSpacing: true,
            onEnter: () => document.querySelector("#profile").classList.add("on"),
            onLeaveBack: () => document.querySelector("#profile").classList.remove("on"),
        });

    });

    // to_top
    $(function () {



    });


});


