const area = document.querySelector("#area");
const circle = document.querySelector("#circle");


area.addEventListener("click", (event) => {
    const circleRadius = circle.getBoundingClientRect().width / 2
    const areaWidth = area.getBoundingClientRect().right - area.getBoundingClientRect().x;
    const areaHeight = area.getBoundingClientRect().bottom - area.getBoundingClientRect().y;
    const areaBorderWidth = getComputedStyle(area).getPropertyValue('border-left-width').replace(/\D+$/g, "");
    const translateVector = {
        x: Math.min(areaWidth - (2 * circleRadius) - areaBorderWidth, Math.max(0, event.clientX - area.getBoundingClientRect().x - circleRadius)),
        y: Math.min(areaHeight - (2 * circleRadius) - areaBorderWidth, Math.max(0, event.clientY - area.getBoundingClientRect().y - circleRadius)) 
    }
    const clickBound = {
        x: {
            left: circleRadius,
            right: circleRadius
        },
        y: {
            left: areaWidth - circleRadius,
            right: areaHeight - circleRadius
        }
    }

    if(clickBound.x.left <= translateVector.x <= clickBound.x.right 
        && clickBound.y.left <= translateVector.y <= clickBound.y.right) {
        circle.style.transform = `translate(${translateVector.x}px, ${translateVector.y}px)`;
    }
});