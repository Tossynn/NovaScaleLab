document.querySelectorAll('.scroll-cue').forEach(link=>link.addEventListener('click',event=>{
    const target=document.querySelector('#services-preview');
    if(target){
        event.preventDefault();
        target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})
    }
}));

const ticker=document.querySelector('.service-ticker .ticker-track');
if(ticker&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
    const originalItems=Array.from(ticker.children);
    ticker.style.width='max-content';
    ticker.style.justifyContent='flex-start';
    originalItems.forEach(item=>{
        const clone=item.cloneNode(true);
        clone.setAttribute('aria-hidden','true');
        ticker.appendChild(clone)
    });

    const cycleWidth=ticker.children[originalItems.length].offsetLeft-ticker.children[0].offsetLeft;
    let position=0;
    let previousTime;
    const speed=45;

    function moveTicker(time){
        if(previousTime!==undefined){
            position=(position+speed*(time-previousTime)/1000)%cycleWidth;
            ticker.style.transform=`translate3d(${-position}px,0,0)`
        }
        previousTime=time;
        requestAnimationFrame(moveTicker)
    }
    requestAnimationFrame(moveTicker)
}
