import { ColumnContainer } from "../styled/container"

type Author = {
    name: string,
    img: string
}
type AvisoProps = {
    author: Author,
    title: string
    body: string,
}

function Aviso({author, body, title, index}: AvisoProps & {index: number}) {
    return (
        <ColumnContainer className=" flex-1 gap-2 py-3 w-full" style={{height: '100%', marginLeft: index === 0 ? '16px' : '0px'}}>
            <div className=" rounded-3xl bg-main h-1/5 w-72 flex gap-2 px-2 items-center py-4">
                <img src={author.img} className=" rounded-full max-w-full" style={{width: '12vh'}}/>
                <h1 className="uppercase text-3xl align-baseline text-bg">{author.name}</h1>
            </div>
            <div className=" rounded-3xl bg-light shadow-xl px-3 py-2 h-4/5 w-72">
                <h1 className=" w-full text-center text-2xl font-bold mb-3 uppercase">{title}</h1>
                <p>{body}</p>
            </div>
        </ColumnContainer>
    )
}

export default function Avisos({avisos}: { avisos: AvisoProps[] }) {
    return (
        <div style={{WebkitOverflowScrolling: 'touch'}} className=" flex overflow-x-auto scroll-smooth gap-3 snap-x snap-mandatory h-4/5">
            {avisos.map((item, index) => (
                <Aviso title={item.title} index={index} author={item.author} body={item.body} key={index}/>
            ))}
        </div>
    )
}