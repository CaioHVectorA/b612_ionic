export default function getRange(scroll: number): number {
    return ((window.innerHeight + scroll) / window.innerHeight) - 0.08
}