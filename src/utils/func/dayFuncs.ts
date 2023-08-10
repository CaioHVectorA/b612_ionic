export const weekDays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]
export const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

export function ReturnDayByISO(ISO: string): number {
    const date = new Date(ISO)
    return date.getDay()
}
export function ReturnDateByISO(ISO: string): number {
    const date = new Date(ISO)
    return date.getDate()
}

export function ReturnMonthByISO(ISO: string): number {
    const date = new Date(ISO)
    return date.getMonth()
}

export function arrayDateNums(iso: string): number[] {
    return [ReturnDateByISO(iso) - 2, ReturnDateByISO(iso) - 1, ReturnDateByISO(iso), ReturnDateByISO(iso) + 1, ReturnDateByISO(iso) + 2]
}