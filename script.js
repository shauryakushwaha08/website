const html = document.documentElement;
const canvas = document.querySelector(".scrollsequence");
const context = canvas.getContext("2d");

const frameCount = 419;
const currentFrame = index => (
    `image/imagerocket${index.toString()}.png`
);

let done = false;
function preloadImages() {
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
    }
    done = true;
}

const img = new Image()
img.src = currentFrame(1);
canvas.width=1920;
canvas.height=1080;
img.onload=function(){
    context.drawImage(img, 0, 0);
}

const updateImage = index => {
    img.src = currentFrame(index);
    context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
    const scrollTop = html.scrollTop;
    const maxScrollTop = html.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    const frameIndex = Math.min(
        frameCount - 1,
        Math.max(Math.ceil(scrollFraction * frameCount),3)
    );
    requestAnimationFrame(() => updateImage(frameIndex+1))
});

preloadImages();

var lastScrollTop = 0;

function pageScroll() {
    if(done && (document.readyState === "complete" || document.readyState === "interactive")){
        window.scrollBy(0,1);
        scrolldelay = setTimeout(pageScroll,10);
        if(html.scrollHeight - html.clientHeight == html.scrollTop){
            clearTimeout(scrolldelay);
        }
    }
}
window.addEventListener("scroll", function(){
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st < lastScrollTop) {
        clearTimeout(scrolldelay)
    }
    lastScrollTop = st <= 0 ? 0 : st;
}, false);


var windowHeight = window.innerHeight;
var speakElements = document.querySelectorAll('.section');

function updateParallax() {
    for (var i = 0; i < speakElements.length; i++) {
    var scrollY = window.scrollY - (i*windowHeight);
    var offsetY = scrollY / windowHeight;
    speakElements[i].style.opacity = 1 - offsetY;
  }
}

window.addEventListener('scroll', updateParallax);