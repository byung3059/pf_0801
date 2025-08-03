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
            lerp: 0.03,
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

            const nextItem = items[index + 1];

            const triggerStart = index * window.innerHeight;
            const triggerEnd = (index + 1) * window.innerHeight;

            gsap.to(item, {
                height: '0%',
                scrollTrigger: {
                    trigger: '#project_sec',
                    start: () => `${triggerStart} top`,
                    end: () => `${triggerEnd} top`,
                    scrub: true,
                    invalidateOnRefresh: true,
                    onUpdate: self => {
                        // height 애니메이션이 끝나갈 때 (progress가 거의 1에 가까울 때)
                        if (self.progress >= 0.60) {
                            nextItem.classList.add('on');
                        } else {
                            nextItem.classList.remove('on');
                        }
                    }
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

    // 네비게이션 //
    $(function () {
        const itemHeight = window.innerHeight;
        const baseOffset = document.querySelector('#project_sec').offsetTop;

        const targets = ['intro', 'pf01', 'pf02', 'pf03', 'work_list', 'profile'];

        targets.forEach((target, index) => {
            const el = document.querySelector(`[data-target="${target}"]`);
            if (el) {
                el.addEventListener('click', e => {
                    e.preventDefault();

                    const scrollToY = baseOffset + index * itemHeight;

                    gsap.to(window, {
                        scrollTo: scrollToY,
                        duration: 1,
                        ease: "power2.inOut"
                    });

                    history.replaceState(null, '', ' ');
                });
            }
        });
    });

    $(function () {

        $('#header .m_menu_btn').on('click', function () {

            $('#header #gnb').toggleClass('on');

        });

    });



});


