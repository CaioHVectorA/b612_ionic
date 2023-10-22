type AvisoProps = {
    author: string;
    img: string;
    title: string;
    body: string;
    category: string;
  };
  type Identifier = "SERIE_1" | "SERIE_2" | "SERIE_3" | "TURMA_XXXX" | "MULTIMIDIA" | "PROGRAMACAO";
// SERIE_1
// SERIE_2
// SERIE_3
// TURMA_XXXX
// MULTIMIDIA
// PROGRAMACAO
export function getFilterAvisos(aviso: AvisoProps, turma: number): boolean {
    // if (!aviso.category) return true
    // console.log(aviso.category.startsWith('SERIE'),  aviso.category.split('_')[1], turma.toString()[0])
    if (aviso.category.startsWith('TURMA')) return aviso.category.split('_')[1] === turma.toString();
    if (aviso.category.startsWith('SERIE')) return !!(aviso.category.split('_')[1] === turma.toString()[0]);
    if (aviso.category === 'MULTIMIDIA') return parseInt(turma.toString()[3]) < 3;
    if (aviso.category === 'PROGRAMACAO') return parseInt(turma.toString()[3]) > 2;
    return true;
}