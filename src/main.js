import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'


gsap.registerPlugin(ScrollTrigger)

// ==========================================
        // CONFIGURATION
        // ==========================================
        const CONFIG = {
            lang: 'ar',
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            isTouch: window.matchMedia('(hover: none) and (pointer: coarse)').matches
        };

        // ==========================================
        // CUSTOM CURSOR
        // ==========================================
        if (!CONFIG.isTouch && !CONFIG.reducedMotion) {
            document.body.classList.add('custom-cursor');
            const cursor = document.getElementById('cursor');
            const cursorDot = document.getElementById('cursorDot');
            const cursorLabel = document.getElementById('cursorLabel');

            let mouseX = 0, mouseY = 0;
            let cursorX = 0, cursorY = 0;
            let dotX = 0, dotY = 0;

            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
            });

            function animateCursor() {
                cursorX += (mouseX - cursorX) * 0.12;
                cursorY += (mouseY - cursorY) * 0.12;
                cursor.style.left = cursorX + 'px';
                cursor.style.top = cursorY + 'px';

                dotX += (mouseX - dotX) * 0.35;
                dotY += (mouseY - dotY) * 0.35;
                cursorDot.style.left = dotX + 'px';
                cursorDot.style.top = dotY + 'px';

                cursorLabel.style.left = cursorX + 'px';
                cursorLabel.style.top = (cursorY + 40) + 'px';

                requestAnimationFrame(animateCursor);
            }
            animateCursor();

            const hoverElements = document.querySelectorAll('a, button, .hero-cta, .material-panel, .story-cta, .bento-tile, .progress-dot');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.classList.add('hover');
                    if (el.classList.contains('hero-cta')) {
                        cursorLabel.textContent = CONFIG.lang === 'ar' ? 'عرض' : 'View';
                        cursorLabel.classList.add('visible');
                    }
                    if (el.classList.contains('material-panel')) {
                        cursorLabel.textContent = CONFIG.lang === 'ar' ? 'عرض' : 'View';
                        cursorLabel.classList.add('visible');
                    }
                    if (el.classList.contains('story-cta')) {
                        cursorLabel.textContent = CONFIG.lang === 'ar' ? 'اكتشف' : 'Discover';
                        cursorLabel.classList.add('visible');
                    }
                    if (el.classList.contains('bento-tile')) {
                        cursorLabel.textContent = CONFIG.lang === 'ar' ? 'تفاصيل' : 'Details';
                        cursorLabel.classList.add('visible');
                    }
                    if (el.classList.contains('progress-dot')) {
                        cursorLabel.textContent = CONFIG.lang === 'ar' ? 'انتقل' : 'Go';
                        cursorLabel.classList.add('visible');
                    }
                });
                el.addEventListener('mouseleave', () => {
                    cursor.classList.remove('hover');
                    cursorLabel.classList.remove('visible');
                });
            });
        }

        // ==========================================
        // LOADING SEQUENCE
        // ==========================================
        const loadingScreen = document.getElementById('loadingScreen');
        const loadingBar = document.getElementById('loadingBar');

        function startLoading() {
            const tl = gsap.timeline({
                onComplete: () => {
                    gsap.to(loadingScreen, {
                        opacity: 0,
                        duration: 0.8,
                        ease: 'power2.inOut',
                        onComplete: () => {
                            loadingScreen.style.display = 'none';
                            initHeroAnimations();
                            initMaterialStrip();
                            initAboutSection();
                            initBentoGrid();
                            initPortfolio();
                            initProcessTimeline();
                            initSocialStrip();
                            initContactSection();
                            // Inside startLoading() onComplete:
                        }
                    });
                }
            });

            tl.to(loadingBar, {
                width: '100%',
                duration: 1.2,
                ease: 'power2.inOut'
            });
        }

        // ==========================================
        // HERO ANIMATIONS (Part 01 — UNCHANGED)
        // ==========================================
        function initHeroAnimations() {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.fromTo('#mainNav .logo', 
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 1.2 },
                0.2
            );

            if (!CONFIG.reducedMotion) {
                gsap.fromTo('#heroBg',
                    { scale: 1.15 },
                    { scale: 1, duration: 2.5, ease: 'power2.out' }
                );

                gsap.to('#heroBg', {
                    yPercent: 15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#hero',
                        start: 'top top',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }

            tl.to('#heroEyebrow', { opacity: 1, y: 0, duration: 0.8 }, 0.6);

            const headlineLines = document.querySelectorAll('#heroHeadline .line-inner');
            headlineLines.forEach((line, i) => {
                tl.fromTo(line,
                    { y: '110%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out' },
                    0.8 + (i * 0.18)
                );
            });

            tl.to('#heroSubheadline', { opacity: 1, y: 0, duration: 0.9 }, 1.4);
            tl.to('#heroCta', { opacity: 1, y: 0, duration: 0.8 }, 1.7);
            tl.fromTo('#cornerTR', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, 1.2);
            tl.fromTo('#cornerBL', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 }, 1.4);
            tl.to('#heroStats', { opacity: 1, y: 0, duration: 0.8 }, 1.9);

            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, i) => {
                const target = parseInt(stat.dataset.target);
                tl.to(stat, {
                    innerText: target,
                    duration: 1.5,
                    snap: { innerText: 1 },
                    ease: 'power2.out'
                }, 2.0 + (i * 0.1));
            });

            tl.fromTo('#scrollCue', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 2.2);

            if (!CONFIG.reducedMotion) {
                gsap.to('#scrollCueLine', {
                    scaleY: 0.3,
                    transformOrigin: 'top',
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }

            if (!CONFIG.reducedMotion) {
                const veinPath = document.getElementById('veinPath');
                const veinPath2 = document.getElementById('veinPath2');
                const veinLength = veinPath.getTotalLength();
                const veinLength2 = veinPath2.getTotalLength();

                gsap.set([veinPath, veinPath2], {
                    strokeDasharray: (i) => i === 0 ? veinLength : veinLength2,
                    strokeDashoffset: (i) => i === 0 ? veinLength : veinLength2
                });

                tl.to(veinPath, { strokeDashoffset: 0, duration: 2.5, ease: 'power2.inOut' }, 1.0);
                tl.to(veinPath2, { strokeDashoffset: 0, duration: 2.0, ease: 'power2.inOut' }, 1.5);

                gsap.to('#marbleVein', {
                    opacity: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: '#hero',
                        start: '20% top',
                        end: '60% top',
                        scrub: true
                    }
                });
            }

            tl.fromTo('#whatsappBtn', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, 2.4);
            // menuTrigger visibility handled by ScrollTrigger on mobile only
        }

        // ==========================================
        // NAVIGATION BEHAVIOR
        // ==========================================
        const mainNav = document.getElementById('mainNav');
        const menuTrigger = document.getElementById('menuTrigger');
        let navVisible = false;

        const isMobile = () => window.innerWidth <= 768;

        ScrollTrigger.create({
            trigger: '#hero',
            start: '10% top',
            onEnter: () => {
                mainNav.classList.add('scrolled');
                if (isMobile()) {
                    mainNav.classList.remove('visible-nav');
                    mainNav.classList.add('hidden-nav');
                    menuTrigger.classList.add('visible');
                }
            },
            onLeaveBack: () => {
                mainNav.classList.remove('scrolled');
                if (isMobile()) {
                    mainNav.classList.remove('hidden-nav');
                    mainNav.classList.add('visible-nav');
                    menuTrigger.classList.remove('visible');
                }
            }
        });

        menuTrigger.addEventListener('click', () => {
            mainNav.classList.remove('hidden-nav');
            mainNav.classList.add('visible-nav');
            menuTrigger.classList.remove('visible');
        });

        // ==========================================
        // HERO SCROLL-DRIVEN FADE-OUT
        // ==========================================
        if (!CONFIG.reducedMotion) {
            gsap.to('.hero-content', {
                opacity: 0, y: -60, ease: 'none',
                scrollTrigger: { trigger: '#hero', start: '30% top', end: '80% top', scrub: true }
            });
            gsap.to('#heroStats', {
                opacity: 0, ease: 'none',
                scrollTrigger: { trigger: '#hero', start: '40% top', end: '70% top', scrub: true }
            });
            gsap.to('#scrollCue', {
                opacity: 0, ease: 'none',
                scrollTrigger: { trigger: '#hero', start: '5% top', end: '25% top', scrub: true }
            });
        }

        // ==========================================
        // MATERIAL STRIP (Part 02 — UNCHANGED)
        // ==========================================
        let materialStripTween = null;
let materialStripCtx = null;
let materialStripDirObserver = null;

function initMaterialStrip() {
    const section = document.getElementById('materialStrip');
    const track = document.getElementById('stripTrack');
    if (!section || !track) return;

    // FIX: tear down previous instance (language switch / re-init)
    if (materialStripCtx) {
        materialStripCtx.revert();
        materialStripCtx = null;
    }

    // FIX: auto re-init when the language direction changes
    if (!materialStripDirObserver) {
        materialStripDirObserver = new MutationObserver(() => {
            initMaterialStrip();
            setTimeout(() => ScrollTrigger.refresh(), 700);
        });
        materialStripDirObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['dir']
        });
    }

    materialStripCtx = gsap.context(() => {
        const panels = gsap.utils.toArray('.material-panel');
        const progressBar = document.getElementById('stripProgressBar');
        const counterCurrent = document.getElementById('stripCounterCurrent');
        const header = document.getElementById('stripHeader');
        const hint = document.getElementById('stripHint');

        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

        // FIX: #materialStrip is forced to direction:ltr in CSS, so scrollWidth /
        // offsetLeft are identical in both languages. Travel direction lives ONLY here:
        //   LTR (English): x goes 0 -> -maxScroll  (panels enter from RIGHT, move LEFT)
        //   RTL (Arabic):  x goes -maxScroll -> 0  (panels enter from LEFT, move RIGHT)
        const getMaxScroll = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const getXStart = () => (isRTL ? -getMaxScroll() : 0);
        const getXEnd = () => (isRTL ? 0 : -getMaxScroll());

        if (counterCurrent) counterCurrent.textContent = '01';

        // Reduced motion: simple vertical reveal, no horizontal scroll
        if (CONFIG.reducedMotion) {
            panels.forEach((panel, i) => {
                gsap.fromTo(panel, { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1,
                      scrollTrigger: { trigger: panel, start: 'top 85%', toggleActions: 'play none none reverse' }
                    }
                );
            });
            return;
        }

        gsap.fromTo(header, { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
            }
        );

        if (CONFIG.isTouch && hint) {
            gsap.fromTo(hint, { opacity: 0, y: 10 }, { opacity: 0.7, y: 0, duration: 0.6, delay: 0.5 });
            gsap.to(hint, { opacity: 0, y: -10, duration: 0.5, delay: 3.5, ease: 'power2.in' });
        }

        const setters = panels.map(panel => {
            const title = panel.querySelector('.panel-title');
            const subtitle = panel.querySelector('.panel-subtitle');
            const desc = panel.querySelector('.panel-desc');
            const line = panel.querySelector('.panel-line');
            const overlay = panel.querySelector('.panel-overlay');
            const image = panel.querySelector('.panel-image');

            return {
                scale: gsap.quickTo(panel, 'scale', { duration: 0.5, ease: 'power2.out' }),
                opacity: gsap.quickTo(panel, 'opacity', { duration: 0.5, ease: 'power2.out' }),
                overlayOpacity: gsap.quickTo(overlay, 'opacity', { duration: 0.5, ease: 'power2.out' }),
                titleY: gsap.quickTo(title, 'y', { duration: 0.5, ease: 'power2.out' }),
                titleOpacity: gsap.quickTo(title, 'opacity', { duration: 0.5, ease: 'power2.out' }),
                subtitleY: gsap.quickTo(subtitle, 'y', { duration: 0.55, ease: 'power2.out' }),
                subtitleOpacity: gsap.quickTo(subtitle, 'opacity', { duration: 0.55, ease: 'power2.out' }),
                descY: gsap.quickTo(desc, 'y', { duration: 0.6, ease: 'power2.out' }),
                descOpacity: gsap.quickTo(desc, 'opacity', { duration: 0.6, ease: 'power2.out' }),
                lineScaleX: gsap.quickTo(line, 'scaleX', { duration: 0.6, ease: 'power2.out' }),
                imageX: gsap.quickTo(image, 'x', { duration: 0.8, ease: 'power2.out' }),
            };
        });

        // Initial hidden state
        panels.forEach((panel, i) => {
            setters[i].scale(0.88); setters[i].opacity(0.45); setters[i].overlayOpacity(0.65);
            setters[i].titleY(45); setters[i].titleOpacity(0);
            setters[i].subtitleY(30); setters[i].subtitleOpacity(0);
            setters[i].descY(25); setters[i].descOpacity(0);
            setters[i].lineScaleX(0); setters[i].imageX(0);
        });

        gsap.set(track, { x: getXStart() });

        materialStripTween = gsap.fromTo(track, { x: getXStart }, {
            x: getXEnd,
            ease: 'none',
            scrollTrigger: {
                trigger: section,
                pin: true,
                scrub: 1,
                start: 'top top',
                end: () => '+=' + getMaxScroll(), // FIX: recalculated on every refresh
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const currentX = Number(gsap.getProperty(track, 'x'));
                    gsap.set(progressBar, { scaleX: progress });

                    let closestPanel = 0;
                    let closestDistance = Infinity;

                    panels.forEach((panel, i) => {
                        const panelCenter = panel.offsetLeft + panel.offsetWidth / 2 + currentX;
                        const viewportCenter = window.innerWidth / 2;
                        const distance = Math.abs(panelCenter - viewportCenter);

                        if (distance < closestDistance) {
                            closestDistance = distance;
                            closestPanel = i;
                        }

                        const maxDistance = window.innerWidth * 0.55;
                        const closeness = Math.max(0, 1 - distance / maxDistance);

                        setters[i].scale(0.88 + closeness * 0.12);
                        setters[i].opacity(0.45 + closeness * 0.55);
                        setters[i].overlayOpacity(0.65 - closeness * 0.35);

                        const titleReveal = closeness > 0.15 ? Math.min(1, (closeness - 0.15) / 0.55) : 0;
                        setters[i].titleY(45 * (1 - titleReveal));
                        setters[i].titleOpacity(titleReveal);

                        const subtitleReveal = closeness > 0.25 ? Math.min(1, (closeness - 0.25) / 0.5) : 0;
                        setters[i].subtitleY(30 * (1 - subtitleReveal));
                        setters[i].subtitleOpacity(subtitleReveal);

                        const descReveal = closeness > 0.35 ? Math.min(1, (closeness - 0.35) / 0.45) : 0;
                        setters[i].descY(25 * (1 - descReveal));
                        setters[i].descOpacity(descReveal);

                        const lineReveal = closeness > 0.4 ? Math.min(1, (closeness - 0.4) / 0.45) : 0;
                        setters[i].lineScaleX(lineReveal);

                        const parallaxX = (panelCenter - viewportCenter) * -0.025;
                        setters[i].imageX(parallaxX);
                    });

                    if (counterCurrent) {
                        counterCurrent.textContent = String(closestPanel + 1).padStart(2, '0');
                    }
                }
            }
        });
    });

    // FIX: recalc after pin-spacer/layout settles (and once images/fonts load).
    // sort() first: when the strip trigger is RE-created (language switch) it lands
    // last in creation order, so about/portfolio would refresh against a layout
    // without the strip's pin-spacer and overlap each other.
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
}

window.addEventListener('load', () => ScrollTrigger.refresh());
        // ==========================================
        // SPLIT-SCREEN ABOUT (Part 03 — UNCHANGED)
        // ==========================================
        function initAboutSection() {
            if (CONFIG.reducedMotion) {
                gsap.utils.toArray('#about .story-eyebrow, #about .story-headline, #about .story-body p, #about .story-quote, #about .story-stat, #about .story-cta, #about .image-caption').forEach((el, i) => {
                    gsap.fromTo(el, { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08,
                          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
                        }
                    );
                });
                return;
            }

            const section = document.getElementById('about');
            const pinnedWrap = document.getElementById('pinnedImageWrap');
            const textSide = document.getElementById('splitTextSide');
            const pinnedImage = document.getElementById('aboutPinnedImage');

            const getPinDuration = () => Math.max(textSide.offsetHeight - window.innerHeight + 240, window.innerHeight * 0.5);

            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => '+=' + getPinDuration(),
                pin: pinnedWrap,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            });

            gsap.fromTo('#aboutTransitionLine', { scaleY: 0, transformOrigin: 'top' },
                { scaleY: 1, duration: 1.2, ease: 'power2.inOut',
                  scrollTrigger: { trigger: section, start: 'top 90%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo(pinnedImage, { scale: 1.08 },
                { scale: 1.0, ease: 'none',
                  scrollTrigger: { trigger: section, start: 'top top', end: () => '+=' + getPinDuration(), scrub: true }
                }
            );

            gsap.fromTo('#imageCaption', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
                  scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo('#storyEyebrow', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                  scrollTrigger: { trigger: '#storyEyebrow', start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );

            const headlineLines = document.querySelectorAll('#storyHeadline .headline-inner');
            headlineLines.forEach((line, i) => {
                gsap.fromTo(line, { y: '110%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 1.0, ease: 'power3.out',
                      scrollTrigger: { trigger: '#storyHeadline', start: 'top 80%', toggleActions: 'play none none reverse' },
                      delay: i * 0.12
                    }
                );
            });

            const bodyParagraphs = document.querySelectorAll('#storyBody > p');
            bodyParagraphs.forEach((p) => {
                gsap.fromTo(p, { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                      scrollTrigger: { trigger: p, start: 'top 88%', toggleActions: 'play none none reverse' }
                    }
                );
            });

            gsap.fromTo('#storyQuote', { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.9, ease: 'power2.out',
                  scrollTrigger: { trigger: '#storyQuote', start: 'top 85%', toggleActions: 'play none none reverse' }
                }
            );

            const storyStats = document.querySelectorAll('.story-stat');
            storyStats.forEach((stat, i) => {
                const numberEl = stat.querySelector('.story-stat-number');
                const target = parseInt(numberEl.dataset.target);
                const suffix = numberEl.dataset.suffix || '';

                gsap.fromTo(stat, { opacity: 0, y: 25 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                      scrollTrigger: { trigger: '#storyStats', start: 'top 85%', toggleActions: 'play none none reverse' },
                      delay: i * 0.1,
                      onStart: () => {
                          gsap.to(numberEl, {
                              innerText: target,
                              duration: 1.8, delay: i * 0.12,
                              snap: { innerText: 1 }, ease: 'power2.out',
                              onUpdate: function() {
                                  const val = Math.round(parseFloat(numberEl.innerText));
                                  numberEl.innerHTML = val + '<span class="suffix">' + suffix + '</span>';
                              }
                          });
                      }
                    }
                );
            });

            gsap.fromTo('#storyCta', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                  scrollTrigger: { trigger: '#storyCta', start: 'top 90%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo('.text-side-accent', { scaleY: 0, transformOrigin: 'top' },
                { scaleY: 1, duration: 1.0, ease: 'power2.out',
                  scrollTrigger: { trigger: section, start: 'top 70%', toggleActions: 'play none none reverse' }
                }
            );
        }

        // ==========================================
        // BENTO GRID (Part 04 — UNCHANGED)
        // ==========================================
        function initBentoGrid() {
            const section = document.getElementById('services');
            const tiles = gsap.utils.toArray('.bento-tile');

            if (CONFIG.reducedMotion) {
                gsap.utils.toArray('#services .services-eyebrow, #services .services-headline, #services .services-subheadline').forEach((el, i) => {
                    gsap.fromTo(el, { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1,
                          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
                        }
                    );
                });
                tiles.forEach((tile, i) => {
                    gsap.fromTo(tile, { opacity: 0, y: 30 },
                        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08,
                          scrollTrigger: { trigger: tile, start: 'top 90%', toggleActions: 'play none none reverse' }
                        }
                    );
                });
                return;
            }

            gsap.fromTo('#servicesEyebrow', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                  scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            const headlineLines = document.querySelectorAll('#servicesHeadline .headline-inner');
            headlineLines.forEach((line, i) => {
                gsap.fromTo(line, { y: '110%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 1.0, ease: 'power3.out',
                      scrollTrigger: { trigger: '#servicesHeadline', start: 'top 80%', toggleActions: 'play none none reverse' },
                      delay: i * 0.12
                    }
                );
            });

            gsap.fromTo('#servicesSubheadline', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                  scrollTrigger: { trigger: '#servicesSubheadline', start: 'top 88%', toggleActions: 'play none none reverse' }
                }
            );

            tiles.forEach((tile, i) => {
                const imageWrap = tile.querySelector('.tile-image-wrap');
                const content = tile.querySelector('.tile-content');
                const isImageTile = tile.classList.contains('has-image');

                gsap.fromTo(tile, { opacity: 0, y: 50, rotateX: 8 },
                    { opacity: 1, y: 0, rotateX: 0, duration: 0.9, ease: 'power2.out',
                      scrollTrigger: { trigger: tile, start: 'top 88%', toggleActions: 'play none none reverse' },
                      delay: i * 0.08
                    }
                );

                if (isImageTile && imageWrap) {
                    gsap.fromTo(imageWrap,
                        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
                        { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 1.2, ease: 'power3.inOut',
                          scrollTrigger: { trigger: tile, start: 'top 80%', toggleActions: 'play none none reverse' },
                          delay: i * 0.08 + 0.15
                        }
                    );
                }

                if (content) {
                    gsap.utils.toArray(content.children).forEach((child, j) => {
                        gsap.fromTo(child, { opacity: 0, y: 20 },
                            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
                              scrollTrigger: { trigger: tile, start: 'top 75%', toggleActions: 'play none none reverse' },
                              delay: i * 0.08 + 0.3 + (j * 0.08)
                            }
                        );
                    });
                }
            });

            if (!CONFIG.isTouch) {
                tiles.forEach(tile => {
                    const glow = tile.querySelector('.tile-glow');
                    tile.addEventListener('mousemove', (e) => {
                        const rect = tile.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = ((y - centerY) / centerY) * -3;
                        const rotateY = ((x - centerX) / centerX) * 3;

                        gsap.to(tile, { rotateX: rotateX, rotateY: rotateY, duration: 0.4, ease: 'power2.out', transformPerspective: 1200 });
                        if (glow) {
                            glow.style.setProperty('--mouse-x', x + 'px');
                            glow.style.setProperty('--mouse-y', y + 'px');
                        }
                    });
                    tile.addEventListener('mouseleave', () => {
                        gsap.to(tile, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power2.out' });
                    });
                });
            }
        }

        // ==========================================
        // PORTFOLIO SHOWCASE (Part 05 — UNCHANGED)
        // ==========================================
        function initPortfolio() {
            const section = document.getElementById('projects');
            const slideshow = document.getElementById('portfolioSlideshow');
            const slides = gsap.utils.toArray('.project-slide');
            const dots = gsap.utils.toArray('.progress-dot');
            const fractionCurrent = document.querySelector('#portfolioFraction .current');

            if (CONFIG.reducedMotion) {
                gsap.utils.toArray('#projects .portfolio-eyebrow, #projects .portfolio-headline, #projects .portfolio-subheadline').forEach((el, i) => {
                    gsap.fromTo(el, { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1,
                          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
                        }
                    );
                });
                return;
            }

            gsap.fromTo('#portfolioEyebrow', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                  scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            const headlineLines = document.querySelectorAll('#portfolioHeadline .headline-inner');
            headlineLines.forEach((line, i) => {
                gsap.fromTo(line, { y: '110%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 1.0, ease: 'power3.out',
                      scrollTrigger: { trigger: '#portfolioHeadline', start: 'top 80%', toggleActions: 'play none none reverse' },
                      delay: i * 0.12
                    }
                );
            });

            gsap.fromTo('#portfolioSubheadline', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                  scrollTrigger: { trigger: '#portfolioSubheadline', start: 'top 88%', toggleActions: 'play none none reverse' }
                }
            );

            const totalSlides = slides.length;
            const scrollDistance = window.innerHeight * (totalSlides - 1);

            slides.forEach((slide, i) => {
                if (i > 0) {
                    gsap.set(slide, { opacity: 0, visibility: 'hidden' });
                }
                const captionNum = slide.querySelector('.project-caption-number');
                const captionName = slide.querySelector('.project-caption-name');
                const captionLoc = slide.querySelector('.project-caption-location');
                const captionStone = slide.querySelector('.project-caption-stone');
                const captionLine = slide.querySelector('.project-caption-line');
                const img = slide.querySelector('img');

                if (i > 0) {
                    gsap.set([captionNum, captionName, captionLoc, captionStone], { opacity: 0, y: 20 });
                    gsap.set(captionLine, { scaleX: 0 });
                    gsap.set(img, { scale: 1.15 });
                } else {
                    gsap.fromTo(captionNum, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power2.out' });
                    gsap.fromTo(captionName, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power2.out' });
                    gsap.fromTo(captionLoc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.55, ease: 'power2.out' });
                    gsap.fromTo(captionStone, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.65, ease: 'power2.out' });
                    gsap.fromTo(captionLine, { scaleX: 0 }, { scaleX: 1, duration: 0.8, delay: 0.75, ease: 'power2.out' });
                    gsap.fromTo(img, { scale: 1.15 }, { scale: 1.08, duration: 1.5, ease: 'power2.out' });
                }
            });

            const slideshowTl = gsap.timeline({
                scrollTrigger: {
                    trigger: slideshow,
                    pin: true,
                    scrub: 1,
                    start: 'top top',
                    end: '+=' + scrollDistance,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const currentSlideIndex = Math.min(Math.floor(progress * totalSlides), totalSlides - 1);
                        const slideProgress = (progress * totalSlides) - currentSlideIndex;

                        dots.forEach((dot, i) => {
                            dot.classList.toggle('active', i === currentSlideIndex);
                        });

                        if (fractionCurrent) {
                            fractionCurrent.textContent = String(currentSlideIndex + 1).padStart(2, '0');
                        }

                        slides.forEach((slide, i) => {
                            const img = slide.querySelector('img');

                            if (i < currentSlideIndex) {
                                gsap.set(slide, { opacity: 0, visibility: 'hidden' });
                            } else if (i === currentSlideIndex) {
                                const fadeOutStart = 0.7;
                                const opacity = slideProgress < fadeOutStart ? 1 : 1 - ((slideProgress - fadeOutStart) / (1 - fadeOutStart));
                                gsap.set(slide, { opacity: Math.max(0, opacity), visibility: 'visible' });

                                if (slideProgress < fadeOutStart) {
                                    const zoomProgress = slideProgress / fadeOutStart;
                                    gsap.set(img, { scale: 1.08 - (zoomProgress * 0.03) });
                                }
                            } else if (i === currentSlideIndex + 1) {
                                const fadeInEnd = 0.3;
                                const opacity = slideProgress < fadeInEnd ? slideProgress / fadeInEnd : 1;
                                gsap.set(slide, { opacity: opacity, visibility: 'visible' });
                                const scale = 1.15 - (opacity * 0.07);
                                gsap.set(img, { scale: scale });

                                if (slideProgress > 0.15 && !slide.dataset.animated) {
                                    slide.dataset.animated = 'true';
                                    const captionNum = slide.querySelector('.project-caption-number');
                                    const captionName = slide.querySelector('.project-caption-name');
                                    const captionLoc = slide.querySelector('.project-caption-location');
                                    const captionStone = slide.querySelector('.project-caption-stone');
                                    const captionLine = slide.querySelector('.project-caption-line');

                                    gsap.fromTo(captionNum, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
                                    gsap.fromTo(captionName, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.08, ease: 'power2.out' });
                                    gsap.fromTo(captionLoc, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.18, ease: 'power2.out' });
                                    gsap.fromTo(captionStone, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.28, ease: 'power2.out' });
                                    gsap.fromTo(captionLine, { scaleX: 0 }, { scaleX: 1, duration: 0.7, delay: 0.35, ease: 'power2.out' });
                                }
                            } else {
                                gsap.set(slide, { opacity: 0, visibility: 'hidden' });
                            }
                        });
                    }
                }
            });

            dots.forEach((dot, i) => {
                dot.addEventListener('click', () => {
                    const targetScroll = slideshowTl.scrollTrigger.start + (slideshowTl.scrollTrigger.end - slideshowTl.scrollTrigger.start) * (i / totalSlides);
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                });
            });
        }

        // ==========================================
        // PROCESS TIMELINE (Part 06 — NEW)
        // ==========================================
        function initProcessTimeline() {
            const section = document.getElementById('process');
            const pathActive = document.getElementById('timelinePathActive');
            const nodes = gsap.utils.toArray('.timeline-node');
            const rings = [
                document.getElementById('nodeRing1'),
                document.getElementById('nodeRing2'),
                document.getElementById('nodeRing3'),
                document.getElementById('nodeRing4')
            ];
            const endDiamond = document.getElementById('timelineEndDiamond');

            if (CONFIG.reducedMotion) {
                gsap.utils.toArray('#process .process-eyebrow, #process .process-headline, #process .process-subheadline').forEach((el, i) => {
                    gsap.fromTo(el, { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1,
                          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
                        }
                    );
                });
                nodes.forEach((node, i) => {
                    gsap.fromTo(node.querySelector('.timeline-node-content'), { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1,
                          scrollTrigger: { trigger: node, start: 'top 90%', toggleActions: 'play none none reverse' }
                        }
                    );
                });
                return;
            }

            // 1. Header animations
            gsap.fromTo('#processEyebrow', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                  scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            const headlineLines = document.querySelectorAll('#processHeadline .headline-inner');
            headlineLines.forEach((line, i) => {
                gsap.fromTo(line, { y: '110%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 1.0, ease: 'power3.out',
                      scrollTrigger: { trigger: '#processHeadline', start: 'top 80%', toggleActions: 'play none none reverse' },
                      delay: i * 0.12
                    }
                );
            });

            gsap.fromTo('#processSubheadline', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                  scrollTrigger: { trigger: '#processSubheadline', start: 'top 88%', toggleActions: 'play none none reverse' }
                }
            );

            // 2. SVG path draw animation
            const pathLength = pathActive.getTotalLength();
            gsap.set(pathActive, {
                strokeDasharray: pathLength,
                strokeDashoffset: pathLength
            });

            gsap.to(pathActive, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#timelineContainer',
                    start: 'top 70%',
                    end: 'bottom 50%',
                    scrub: 1
                }
            });

            // 3. Node reveal animations — staggered as path reaches them
            nodes.forEach((node, i) => {
                const content = node.querySelector('.timeline-node-content');
                const ring = rings[i];
                const card = node.querySelector('.node-card');
                const cardChildren = card.querySelectorAll('.node-step-label, .node-icon, .node-title, .node-desc');

                // Content fade + rise
                gsap.fromTo(content,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: node,
                            start: 'top 75%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );

                // Card children stagger
                cardChildren.forEach((child, j) => {
                    gsap.fromTo(child,
                        { opacity: 0, y: 15 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: node,
                                start: 'top 70%',
                                toggleActions: 'play none none reverse'
                            },
                            delay: 0.1 + (j * 0.08)
                        }
                    );
                });

                // Ring activation
                ScrollTrigger.create({
                    trigger: node,
                    start: 'top 70%',
                    onEnter: () => ring.classList.add('active'),
                    onLeaveBack: () => ring.classList.remove('active')
                });
            });

            // 4. End diamond activation
            ScrollTrigger.create({
                trigger: endDiamond,
                start: 'top 80%',
                onEnter: () => endDiamond.classList.add('active'),
                onLeaveBack: () => endDiamond.classList.remove('active')
            });
        }

        // ==========================================
        // LANGUAGE TOGGLE
        // ==========================================
        const langToggle = document.getElementById('langToggle');
        const langText = document.getElementById('langText');
        const html = document.documentElement;

        const translations = {
            ar: { dir: 'rtl', lang: 'ar', toggleText: 'EN' },
            en: { dir: 'ltr', lang: 'en', toggleText: 'AR' }
        };

        function updateContent(lang) {
            document.querySelectorAll('[data-ar][data-en]').forEach(el => {
                gsap.to(el, { opacity: 0, y: -10, duration: 0.2,
                    onComplete: () => {
                        el.textContent = el.getAttribute(`data-${lang}`);
                        gsap.to(el, { opacity: 1, y: 0, duration: 0.3 });
                    }
                });
            });

            // Generic: every element with data-ar-text/data-en-text swaps its inner <span>
            // (hero CTA, story CTA, social CTAs, contact CTA, ...)
            document.querySelectorAll('[data-ar-text][data-en-text]').forEach(el => {
                const span = el.querySelector('span');
                if (!span) return;
                gsap.to(span, { opacity: 0, duration: 0.2,
                    onComplete: () => {
                        span.textContent = el.getAttribute(`data-${lang}-text`);
                        gsap.to(span, { opacity: 1, duration: 0.3 });
                    }
                });
            });

            gsap.to(menuTrigger, { opacity: 0, duration: 0.2,
                onComplete: () => {
                    menuTrigger.textContent = lang === 'ar' ? 'القائمة' : 'Menu';
                    gsap.to(menuTrigger, { opacity: menuTrigger.classList.contains('visible') ? 1 : 0, duration: 0.3 });
                }
            });

            const cursorLabel = document.getElementById('cursorLabel');
            if (cursorLabel) cursorLabel.textContent = lang === 'ar' ? 'عرض' : 'View';

            const stripHeadline = document.querySelector('.strip-headline');
            if (stripHeadline) stripHeadline.style.fontStyle = lang === 'en' ? 'italic' : 'normal';
        }

        langToggle.addEventListener('click', () => {
            const newLang = CONFIG.lang === 'ar' ? 'en' : 'ar';
            const t = translations[newLang];

            html.setAttribute('dir', t.dir);
            html.setAttribute('lang', t.lang);
            langText.textContent = t.toggleText;
            CONFIG.lang = newLang;

            updateContent(newLang);

            const headline = document.getElementById('heroHeadline');
            headline.style.fontStyle = newLang === 'en' ? 'italic' : 'normal';
        });

        // ==========================================
        // RESIZE HANDLER
        // ==========================================
        window.addEventListener('resize', () => {
            if (!isMobile()) {
                // Desktop: always show nav, hide menu trigger
                mainNav.classList.remove('hidden-nav');
                mainNav.classList.add('visible-nav');
                menuTrigger.classList.remove('visible');
            }
        });

        // ==========================================
        // KEYBOARD NAVIGATION
        // ==========================================
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') document.body.classList.add('keyboard-nav');
        });
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });


        // ==========================================
        // SOCIAL STRIP (Part 08 — NEW)
        // ==========================================
        function initSocialStrip() {
            const section = document.getElementById('social');
            if (!section) return;

            if (CONFIG.reducedMotion) {
                gsap.utils.toArray('#social .social-eyebrow, #social .social-headline, #social .social-subheadline').forEach((el, i) => {
                    gsap.fromTo(el, { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1,
                          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
                        }
                    );
                });
                return;
            }

            gsap.fromTo('#socialEyebrow', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                  scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
                }
            );

            const headlineLines = document.querySelectorAll('#socialHeadline .headline-inner');
            headlineLines.forEach((line, i) => {
                gsap.fromTo(line, { y: '110%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 1.0, ease: 'power3.out',
                      scrollTrigger: { trigger: '#socialHeadline', start: 'top 80%', toggleActions: 'play none none reverse' },
                      delay: i * 0.12
                    }
                );
            });

            gsap.fromTo('#socialSubheadline', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                  scrollTrigger: { trigger: '#socialSubheadline', start: 'top 88%', toggleActions: 'play none none reverse' }
                }
            );

            const tiles = gsap.utils.toArray('.social-tile');
            tiles.forEach((tile, i) => {
                gsap.fromTo(tile, { opacity: 0, y: 40, scale: 0.96 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out',
                      scrollTrigger: { trigger: '#socialStrip', start: 'top 85%', toggleActions: 'play none none reverse' },
                      delay: i * 0.1
                    }
                );
            });

            const ctas = gsap.utils.toArray('.social-cta');
            ctas.forEach((cta, i) => {
                gsap.fromTo(cta, { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                      scrollTrigger: { trigger: '.social-cta-row', start: 'top 90%', toggleActions: 'play none none reverse' },
                      delay: i * 0.12
                    }
                );
            });
        }


        // ==========================================
        // CONTACT / CLOSING (Part 09 — NEW)
        // ==========================================
        function initContactSection() {
            const section = document.getElementById('contact');
            if (!section) return;

            if (CONFIG.reducedMotion) {
                gsap.utils.toArray('#contact .contact-eyebrow, #contact .contact-headline, #contact .contact-body, #contact .contact-cta-primary, #contact .contact-cta-secondary, #contact .contact-divider, #contact .contact-detail-item, #contact .contact-scroll-top').forEach((el, i) => {
                    gsap.fromTo(el, { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.6, delay: i * 0.08,
                          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' }
                        }
                    );
                });
                return;
            }

            // Background parallax
            gsap.to('#contactBg', {
                yPercent: 10,
                ease: 'none',
                scrollTrigger: {
                    trigger: '#contact',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });

            // Eyebrow
            gsap.fromTo('#contactEyebrow', { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                  scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none reverse' }
                }
            );

            // Headline lines
            const headlineLines = document.querySelectorAll('#contactHeadline .headline-inner');
            headlineLines.forEach((line, i) => {
                gsap.fromTo(line, { y: '120%', opacity: 0 },
                    { y: '0%', opacity: 1, duration: 1.2, ease: 'power3.out',
                      scrollTrigger: { trigger: '#contactHeadline', start: 'top 80%', toggleActions: 'play none none reverse' },
                      delay: i * 0.15
                    }
                );
            });

            // Body text
            gsap.fromTo('#contactBody', { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
                  scrollTrigger: { trigger: '#contactBody', start: 'top 88%', toggleActions: 'play none none reverse' }
                }
            );

            // CTAs
            gsap.fromTo('#contactCtaPrimary', { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                  scrollTrigger: { trigger: '.contact-actions', start: 'top 90%', toggleActions: 'play none none reverse' }
                }
            );

            gsap.fromTo('#contactCtaSecondary', { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                  scrollTrigger: { trigger: '.contact-actions', start: 'top 90%', toggleActions: 'play none none reverse' },
                  delay: 0.12
                }
            );

            // Divider line
            gsap.fromTo('#contactDivider', { opacity: 0, scaleX: 0 },
                { opacity: 1, scaleX: 1, duration: 1.0, ease: 'power2.out',
                  scrollTrigger: { trigger: '#contactDivider', start: 'top 92%', toggleActions: 'play none none reverse' }
                }
            );

            // Detail items
            const details = document.querySelectorAll('.contact-detail-item');
            details.forEach((item, i) => {
                gsap.fromTo(item, { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
                      scrollTrigger: { trigger: '.contact-details', start: 'top 90%', toggleActions: 'play none none reverse' },
                      delay: i * 0.1
                    }
                );
            });

            // Scroll to top button
            const scrollTopBtn = document.getElementById('scrollTopBtn');
            if (scrollTopBtn) {
                gsap.fromTo(scrollTopBtn, { opacity: 0 },
                    { opacity: 0.6, duration: 0.8, ease: 'power2.out',
                      scrollTrigger: { trigger: '#contact', start: 'top 50%', toggleActions: 'play none none reverse' }
                    }
                );

                scrollTopBtn.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });
            }
        }

        // ==========================================
        // INIT
        // ==========================================
        let appStarted = false;
        function startAppOnce() {
            if (appStarted) return; // load + readyState can both fire -> double pins/spacers
            appStarted = true;
            startLoading();
        }
        window.addEventListener('load', startAppOnce);
        if (document.readyState === 'complete') startAppOnce();