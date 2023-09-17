import { useEffect, useState } from "react";
import { ColumnContainer } from "../styled/container";
import { LOCAL_STORAGE, URL } from "../../utils/envariables";


type AvisoProps = {
  author: string; 
  img: string;
  title: string;
  body: string;
  tags: string;
};

function Aviso({ author, body, title, index, img, tags, length }: AvisoProps & { index: number, length: number }) {
  return (
    <ColumnContainer
      className=" flex-1 gap-2 py-3 w-full"
      style={{ height: "100%", marginLeft: index === length - 1 ? "16px" : "0px", marginRight: index === 0 ? '16px' : '0px' }}
    >
      <div className=" rounded-3xl bg-main h-1/5 w-72 flex gap-2 px-2 items-center py-4">
        <img
          src={img}
          className=" rounded-full max-w-full aspect-square object-center object-cover" // IMAGEM SERÁ QUADRADOS
          style={{ width: "12vh" }}
        />
        <h1 className="uppercase text-3xl align-baseline text-bg">
          {author}
        </h1>
      </div>
      <div className=" rounded-3xl bg-light shadow-xl px-3 py-2 h-4/5 w-72">
        <h1 className=" w-full text-center text-2xl font-bold mb-3 uppercase">
          {title}
        </h1>
        <p>{body}</p>
      </div>
    </ColumnContainer>
  );
}

export default function Avisos() {
  //@ts-ignore
  const [avisos, setAvisos] = useState<AvisoProps[]>(JSON.parse(localStorage.getItem(LOCAL_STORAGE.AVISOS_DATA)) || [])
  useEffect(() => {
    fetch(URL+'/aviso/').then(res => res.json()).then(data => {
      localStorage.setItem(LOCAL_STORAGE.AVISOS_DATA, JSON.stringify(data))
      setAvisos(data)
    })
  }, [])
  return (
    <div className=" flex flex-row-reverse overflow-x-auto scroll-smooth gap-3 snap-x snap-mandatory h-4/5">
      {avisos.map((item, index) => (
        <Aviso
          tags={item.tags}
          img={item.img}
          length={avisos.length}
          title={item.title}
          index={index}
          author={item.author}
          body={item.body}
          key={index}
        />
      ))}
    </div>
  );
}
