export function loadImage(url) {
    return new Promise<HTMLImageElement>(resolve => {
      const image = new Image();
      image.addEventListener('load', () => {
        resolve(image);
      });
      image.src = url;
    });
}

export function overlap(left: number, top: number, h: number, w: number, clientX?: number, clientY?: number): boolean{
    if (clientY > top  && clientY < top + h && clientX > left && clientX < left + w) {
        return true;
    }
    return false;

}