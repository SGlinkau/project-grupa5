let calcScrollValue = () => {
  let scrollProgress = document.getElementById("progress");
  let progressValue = document.getElementById("progress-value");
  let pos = document.documentElement.scrollTop;
  let calcHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollValue = Math.round((pos * 100) / calcHeight);
  
  if (pos > 100) {
    scrollProgress.style.display = "grid";
  } else {
    scrollProgress.style.display = "none";
  }
  
  scrollProgress.addEventListener("click", () => {
    smoothScrollToTop(); 
  });
  
  scrollProgress.style.background = `conic-gradient(#03ca65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
};


function smoothScrollToTop() {
  const duration = 300; 
  const start = document.documentElement.scrollTop;
  const end = 0;
  const startTime = performance.now();
  
  function scrollStep(timestamp) {
    const currentTime = timestamp - startTime;
    const progress = Math.min(currentTime / duration, 1);
    document.documentElement.scrollTop = start + (end - start) * progress;
    
    if (currentTime < duration) {
      requestAnimationFrame(scrollStep);
    }
  }
  
  requestAnimationFrame(scrollStep);
}

window.onscroll = calcScrollValue;
window.onload = calcScrollValue;
