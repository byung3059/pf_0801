// DOM 콘텐츠가 완전히 로드된 후 스크립트를 실행합니다.
window.addEventListener("DOMContentLoaded", () => {
    const coverTimeline = gsap.timeline({
        delay: 0.5
    });

    coverTimeline
        .fromTo(
            "#cover_ani .txt_box p span",
            { yPercent: -100 },
            { yPercent: 0, duration: 0.6, ease: "power2.out", stagger: 0.1 }
        )
        .to(
            "#cover_ani .txt_box p span",
            { yPercent: 100, duration: 0.6, ease: "power2.in", delay: 0.5, stagger: 0.1 }
        )
        .to(
            "#cover_ani",
            {
                delay: 0.5,
                xPercent: 100,
                duration: 1,
                ease: "power1.out",
                onComplete: () => {
                    // 선택 사항: 애니메이션 완료 후 커버 요소 숨기기.
                    document.getElementById("cover_ani").style.display = "none";
                }
            }
        );

    // --- Lenis  스크롤 ---
    // const lenis = new Lenis({
    //     smooth: true,
    //     lerp: 0.03,
    // });

    // function raf(time) {
    //     lenis.raf(time);
    //     requestAnimationFrame(raf);
    // }
    // requestAnimationFrame(raf);

    // // --- ScrollTrigger 및 Lenis 연동 ---
    // gsap.ticker.add(() => {
    //     ScrollTrigger.update();
    // });
    // ScrollTrigger.defaults({ scroller: window });
    const Pages = gsap.utils.toArray("#main .itm"); // 기존 panels 이름 대신 Pages 사용
    const T = document.querySelector('#to_top');

    // 각 섹션 반복 처리
    Pages.forEach((it, idx, arr) => {
        // zIndex 설정
        it.style.zIndex = idx + 1;

        // 마지막 요소는 pin 생략
        if (idx !== Pages.length - 1) {
            ScrollTrigger.create({
                trigger: it,
                start: "top top",
                end: "bottom top",
                pin: true,
                pinSpacing: false, // 스크롤 간격 없이 붙이기 (원하는 경우 true로 변경 가능)
                markers: true,
                onEnter: () => {
                    Pages.forEach(pg => pg.classList.remove('on'));
                    it.classList.add('on');
                },
                onLeaveBack: () => {
                    Pages.forEach(pg => pg.classList.remove('on'));
                    it.classList.add('on');
                }
            });
        }

        // to_top 버튼 처리
        T.addEventListener("click", (e) => {
            e.preventDefault();
            gsap.to(window, {
                scrollTo: 0,
                duration: 1
            });
        });
    });

    // 마우스 포인터

    const mouseEffect = document.querySelector('.mouse-default');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX - 10; // 중심 맞추기
        const y = e.clientY - 10;
        mouseEffect.style.left = `${x}px`;
        mouseEffect.style.top = `${y}px`;
    });


    if (toTopButton) {
        toTopButton.addEventListener("click", (e) => {
            e.preventDefault();
            lenis.scrollTo(0);
        });
    }

    // --- 모바일 뷰포트 높이(vh) 보정 ---
    // 동적 주소 표시줄 크기 때문에 모바일 브라우저에서 `vh` 단위를 보정합니다.
    const setFullHeight = () => {
        const svh = window.innerHeight * 0.01; // 뷰포트 높이의 1% 계산
        document.documentElement.style.setProperty('--svh', `${svh}px`); // CSS 사용자 정의 속성 설정
    };

    window.addEventListener('resize', setFullHeight); // 창 크기 변경 시 업데이트
    setFullHeight(); // 페이지 로드 시 한 번 실행
});


$(function () {
    VANTA.WAVES({
        el: "#vanta_bg",      // 애니메이션을 적용할 요소
        mouseControls: true,   // 마우스 컨트롤 활성화
        touchControls: false,   // 터치 컨트롤 활성화
        gyroControls: false,   // 자이로 컨트롤 비활성화
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x0,            // 파도 색상 (검정색)
        shininess: 8.00,       // 파도의 반짝임
        waveHeight: 40.00,     // 파도 높이
        waveSpeed: 0.5,        // 파도 속도
        zoom: 0.65             // 줌 레벨
    });

});