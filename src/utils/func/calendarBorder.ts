//@ts-nocheck
export default function calendarBorder(elements: HTMLCollection) {
    const arr = Array.from(elements)
    arr.forEach((item, index) => {
        if (index < 7) {
            // tirar a borda de cima 
            item.classList.add('calendar__borderTop')
        } else if (index > 27) {
            item.classList.add('calendar__borderBot')
            // tirar a borda de baixo
        }
        if (index === 0 || index / 7 === Math.floor(index / 7)) {
            item.classList.add('calendar__borderLeft')
        } else if (index === 6 || (index + 1) / 7 === Math.floor((index + 1) / 7)) {
            item.classList.add('calendar__borderRight')
        }
    })
}