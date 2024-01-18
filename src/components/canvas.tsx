'use client'
import { useEffect, useRef } from "react"
import githubSvg from '@/github.svg'
import linkedinSvg from '@/linkedin.svg'
import { loadImage, overlap } from "@/lib/tools"
import { links } from '@/lib/data'

const __scaleRate = 2;
const __center = {x: 200, y: 200};
const __imgSize = {h:32, w:32};
const __r1 = 75;
const __r2 = 150
const __startedAngele1 = 0;
const __startedAngele2 = .5;
const __arcShift1 = .35;
const __arcShift2 = .2;
const __githubImg = loadImage(githubSvg.src);
const __linkedinImg = loadImage(linkedinSvg.src);

const draw = async function(ctx: CanvasRenderingContext2D, angle: number, clientX?: number, clientY?: number) {
    const [githubImg, linkedinImg] = await Promise.all<HTMLImageElement>([__githubImg, __linkedinImg]);
    let imgSize1 = __imgSize, imgSize2 = __imgSize;
    let imgShift1 = {x: 0, y: 0}, imgShift2 = {x: 0, y: 0};
    let arcShift1 = __arcShift1;
    let arcShift2 = __arcShift2;
    const coordX1 = __center.x + __r1 * Math.cos(angle+__startedAngele1) - __imgSize.h/2;
    const coordY1 = __center.y + __r1 * Math.sin(angle+__startedAngele1) - __imgSize.w/2;
    const coordX2 = __center.x + __r2 * Math.cos(angle+__startedAngele2) - __imgSize.h/2;
    const coordY2 = __center.y + __r2 * Math.sin(angle+__startedAngele2) - __imgSize.w/2;
    const isOverlap1 = overlap(coordX1 - __imgSize.w/2, coordY1 - __imgSize.h/2, __imgSize.w*2, __imgSize.h*2, clientX, clientY);
    const isOverlap2 = overlap(coordX2 - __imgSize.w/2, coordY2 - __imgSize.h/2, __imgSize.w*2, __imgSize.h*2, clientX, clientY);
    
    if(isOverlap1){
        imgSize1 = {h:__imgSize.h*__scaleRate, w:__imgSize.w*__scaleRate};
        imgShift1 = {x: imgSize1.h/__scaleRate/2, y: imgSize1.w/__scaleRate/2};
        arcShift1 *= __scaleRate;
    }  
    if(isOverlap2){
        imgSize2 = {h:__imgSize.h*__scaleRate, w:__imgSize.w*__scaleRate};
        imgShift2 = {x: imgSize2.h/__scaleRate/2, y: imgSize2.w/__scaleRate/2};
        arcShift2 *= __scaleRate;
    }       
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.beginPath();
    ctx.arc(__center.x, __center.y, __r1, __startedAngele1+angle+arcShift1, __startedAngele1+angle-arcShift1);
    ctx.stroke(); 
    ctx.beginPath();
    ctx.arc(__center.x, __center.y, __r2, __startedAngele2+angle+arcShift2, __startedAngele2+angle-arcShift2);
    ctx.stroke();
    ctx.drawImage(githubImg, coordX1-imgShift1.x, coordY1-imgShift1.y, imgSize1.h, imgSize1.w);
    ctx.drawImage(linkedinImg, coordX2-imgShift2.x, coordY2-imgShift2.y, imgSize2.h, imgSize2.w);

    return [isOverlap1, isOverlap2];
}


export default function Canvas(){
    const canvasRef = useRef(null);
    const rotationSpeed = .005;
    let isOverlapLinks = [false, false];
    let angle = 0;
    let animationFrameId: number;
    let mousePos = { x: undefined, y: undefined };

    useEffect(()=>{
        const canvas = canvasRef.current as HTMLCanvasElement;
        const context = canvas.getContext('2d');
        const render = async () => {
            angle = (angle+rotationSpeed)%(Math.PI*2);
            const canvasPos = canvas.getBoundingClientRect();
            isOverlapLinks = await draw(context, angle, mousePos.x-canvasPos.x, mousePos.y-canvasPos.y);
            updateCursor(canvas, isOverlapLinks);
            animationFrameId = window.requestAnimationFrame(render);
        }
        render();
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        }
    }, [draw])

    
    function addListener(){
        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('click', redirect);
    }
    function removeListener(){
        window.removeEventListener('mousemove', updateMousePosition);
        window.removeEventListener('click', redirect);
    }
    function updateMousePosition(event){
        mousePos = { x: event.clientX, y: event.clientY };
    }
    function redirect() {
        if(isOverlapLinks[0]){
            window.open(links.git);
        }
        if(isOverlapLinks[1]){
            window.open(links.linkedIn);
        }
    }
    function updateCursor(el: HTMLElement, params: boolean[]){
        el.style.cursor = params.some(v => v === true)?'pointer':'auto';
    }


    return (
        <canvas ref={canvasRef} width={400} height={400} onMouseEnter={addListener} onMouseLeave={removeListener}>

        </canvas>
    )
}