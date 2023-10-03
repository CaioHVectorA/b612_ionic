type mat = {
    materia: string,
    refs: string[],
    response: 'cj' | 'biolo' | 'filos' | 'fis' | 'geo' | 'hist' | 'mat' | 'port' | 'quim' | 'socio'
}
const materias: mat[] = [
    { materia: "Cultura de jogos", refs: ["CULT",'3D','OI','O.I','M.I','PAV','OFICINA'], response: 'cj' },
    { materia: "Química", refs: ["QUÍM", "QUIM"], response: 'quim' },
    { materia: "Matemática", refs: ["MATEM", "MAT", "LAB MAT"], response: 'mat' },
    { materia: "Física", refs: ["FÍSICA", 'FÍS'], response: 'fis' },
    { materia: "Geografia", refs: ["GEO"], response: 'geo' },
    { materia: "Filosofia", refs: ["FILO"], response: 'filos' },
    { materia: "História", refs: ["HIST"], response: 'hist' },
    { materia: "Sociologia", refs: ["SOCIO"], response: 'socio' },
    {materia: 'Português', refs: ["PORT", "LING"], response: 'port'},
    { materia: "Biologia", refs: ["BIOLO", "NATURE"], response: 'biolo' },
];
// const materias
export default function getMateriaImg(materia: string): string {
    const materiaFound = materias.find(mat => {
        return mat.refs.find((mat) => {
            if (materia.toUpperCase().includes(mat.toUpperCase())) {
            return true
        }})
    })
    if (!materiaFound) return '/iconlivro.png'
    return `/mat/${materiaFound.response}.png`
}