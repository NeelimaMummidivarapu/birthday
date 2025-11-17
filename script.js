/* ========= script.js ========== */
/* Works with your index.html as-is.
   Adds:
   - loader hide
   - music play/pause (button toggles text)
   - falling hearts
   - smooth scroll reveal for .card
   - show big final full-screen scene with glitter + hearts + floating text
*/

(() => {
  // --- loader ---
  window.addEventListener('load', () => {
    setTimeout(() => {
      const l = document.getElementById('loader');
      if (l) l.style.display = 'none';
    }, 1200);
  });

  // --- music control ---
  const music = document.getElementById('bgMusic');
  const musicBtn = document.getElementById('musicBtn');

  function setBtnPlaying(isPlaying){
    if(!musicBtn) return;
    if(isPlaying){
      musicBtn.classList.add('pause');
      musicBtn.textContent = 'Pause Music ♡';
    } else {
      musicBtn.classList.remove('pause');
      musicBtn.textContent = 'Play Music ♡';
    }
  }

  // ensure music won't try to autoplay: user must press
  musicBtn && musicBtn.addEventListener('click', () => {
    if (!music) return;
    if (music.paused){
      music.play().catch(()=>{}); // play
      setBtnPlaying(true);
    } else {
      music.pause();
      setBtnPlaying(false);
    }
  });

  // allow first touch to enable audio on mobile (if user taps anywhere)
  function enableMusicOnce() {
    if (!music) return;
    music.play().then(()=> {
      setBtnPlaying(true);
      music.pause(); // pause immediately so button controls start
      setBtnPlaying(false);
    }).catch(()=>{});
    document.body.removeEventListener('touchstart', enableMusicOnce);
  }
  document.body.addEventListener('touchstart', enableMusicOnce, { once: true });

  // --- falling hearts (background) ---
  const heartsContainer = document.querySelector('.hearts-container');
  function spawnHeart(){
    if(!heartsContainer) return;
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = ['💗','💖','💞','💕'][Math.floor(Math.random()*4)];
    const size = Math.random()*18 + 12;
    heart.style.fontSize = size + 'px';
    heart.style.left = Math.random()*100 + 'vw';
    heart.style.opacity = (Math.random()*0.5 + 0.5).toString();
    heart.style.animationDuration = (Math.random()*3 + 3)+'s';
    heart.style.transform = `translateY(-10vh) rotate(${(Math.random()*60)-30}deg)`;
    heartsContainer.appendChild(heart);
    setTimeout(()=> heart.remove(), (parseFloat(heart.style.animationDuration) * 1000) + 300);
  }
  // spawn many slowly
  setInterval(spawnHeart, 300);

  // --- smooth reveal for cards using IntersectionObserver ---
  const cards = document.querySelectorAll('.card');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) {
          ent.target.classList.add('show');
          // once shown, unobserve for performance
          obs.unobserve(ent.target);
        }
      });
    }, { threshold: 0.18 });
    cards.forEach(c => obs.observe(c));
  } else {
    // fallback: show all
    cards.forEach(c => c.classList.add('show'));
  }

  // --- FINAL FULL-SCREEN reveal logic ---
  const finalSection = document.getElementById('finalMessage');
  const finalText = finalSection ? finalSection.querySelector('.finalText') : null;

  // helper to create random floating mini text overlays on final screen
  function spawnFloatingText(){
    if(!finalSection) return;
    const phrases = ["Party time!","Cake!!","Make a wish","Love you","More fun!","Yayyy","Hugsss"];
    const el = document.createElement('div');
    el.className = 'floating-text';
    el.textContent = phrases[Math.floor(Math.random()*phrases.length)];
    // random start horizontal position
    el.style.left = (10 + Math.random()*80) + '%';
    el.style.top = (60 + Math.random()*30) + '%';
    el.style.fontSize = (12 + Math.random()*8) + 'px';
    el.style.animationDuration = (3 + Math.random()*4) + 's';
    finalSection.appendChild(el);
    setTimeout(()=> el.remove(), 7000);
  }

  // helper to spawn glitter particles around final text
  function spawnGlitterBurst(x=null,y=null, count=18){
    if(!finalSection) return;
    for(let i=0;i<count;i++){
      const g = document.createElement('div');
      g.className = 'glitter';
      // random position near center if no coords provided
      const left = (50 + (Math.random()*220 - 110)) + '%';
      const top = (40 + (Math.random()*180 - 90)) + '%';
      g.style.left = left;
      g.style.top = top;
      g.style.width = (6 + Math.random()*8) + 'px';
      g.style.height = g.style.width;
      g.style.animationDuration = (0.9 + Math.random()*1.2) + 's';
      finalSection.appendChild(g);
      setTimeout(()=> g.remove(), 1400 + Math.random()*800);
    }
  }

  // floating heart elements over final screen
  function spawnFinalHearts(){
    if(!finalSection) return;
    const fh = document.createElement('div');
    fh.className = 'floatingHearts';
    finalSection.appendChild(fh);
    // create few hearts that float upward
    for(let i=0;i<10;i++){
      const h = document.createElement('div');
      h.innerHTML = ['💗','💖','💕'][Math.floor(Math.random()*3)];
      h.style.position='absolute';
      h.style.left = (10 + Math.random()*80) + '%';
      h.style.bottom = (5 + Math.random()*20) + '%';
      h.style.fontSize = (18 + Math.random()*22) + 'px';
      h.style.opacity = 0.95;
      h.style.transition = `transform ${(4 + Math.random()*4)}s linear, opacity ${(4 + Math.random()*4)}s`;
      fh.appendChild(h);
      // trigger float
      setTimeout(()=> { h.style.transform = `translateY(-120vh) rotate(${Math.random()*60-30}deg)`; h.style.opacity=0; }, 120 + Math.random()*400);
      // remove later
      setTimeout(()=> h.remove(), 6000 + Math.random()*2000);
    }
    // remove container after a while
    setTimeout(()=> fh.remove(), 9000);
  }

  // observe when user reaches bottom / after last card -> show final section
  const lastCard = document.querySelector('.container .card:last-of-type');
  if (lastCard && finalSection){
    const showFinalObserver = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if(en.isIntersecting){
          // reveal final section
          finalSection.classList.add('show');
          // animate final text
          if(finalText) finalText.classList.add('bigIn');
          // spawn sparkle, floating text and hearts
          spawnGlitterBurst();
          spawnFinalHearts();
          // spawn some floating small texts repeatedly
          const ftInterval = setInterval(spawnFloatingText, 700);
          const glitterInterval = setInterval(()=> spawnGlitterBurst(null,null,8), 900);
          // stop after some time to save CPU
          setTimeout(()=> { clearInterval(ftInterval); clearInterval(glitterInterval); }, 14000);
          // once triggered, unobserve
          showFinalObserver.unobserve(lastCard);
          // scroll the final section into view smoothly (nice effect)
          setTimeout(()=> {
            finalSection.scrollIntoView({behavior:'smooth'});
          }, 400);
        }
      });
    }, { threshold: 0.28 });
    showFinalObserver.observe(lastCard);
  }

  // also add some automatic subtle bursts when final loads
  if(finalSection){
    finalSection.addEventListener('transitionend', ()=> {
      // small final glitter bursts
      spawnGlitterBurst();
      setTimeout(spawnGlitterBurst, 500);
      setTimeout(spawnGlitterBurst, 1100);
    }, { once: true });
  }

  // small accessibility: press 'm' to toggle music
  document.addEventListener('keydown', (e) => {
    if(e.key.toLowerCase() === 'm'){
      if (music.paused) { music.play().catch(()=>{}); setBtnPlaying(true); }
      else { music.pause(); setBtnPlaying(false); }
    }
  });

  // initial set button text
  setBtnPlaying(false);

})();
