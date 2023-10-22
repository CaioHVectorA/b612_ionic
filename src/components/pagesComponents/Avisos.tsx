import { useContext, useEffect, useState } from "react";
import { ColumnContainer } from "../styled/container";
import { LOCAL_STORAGE, URL } from "../../utils/envariables";
import { AppContext } from "../AppContext";
import { getFilterAvisos } from "../../utils/getFilterAvisos";

type AvisoProps = {
  author: string;
  img: string;
  title: string;
  body: string;
  category: string;
};

function Aviso({
  author,
  body,
  title,
  index,
  img,
  category,
  length,
}: AvisoProps & { index: number; length: number }) {
  return (
    <ColumnContainer
      className=" flex-1 gap-2 py-3 w-full"
      style={{
        height: "100%",
        marginLeft: index === length - 1 ? "16px" : "0px",
        marginRight: index === 0 ? "16px" : "0px",
      }}
    >
      <div className=" rounded-3xl bg-light h-1/5 w-56 flex gap-2 px-2 items-center py-4">
        <img
          src={img}
          className=" rounded-full max-w-full aspect-square object-center object-cover" // IMAGEM SERÁ QUADRADOS
          style={{ width: "12vh" }}
        />
        <h1 className="uppercase text-3xl align-baseline text-bg">{author}</h1>
      </div>
      <div className=" rounded-3xl bg-dark text-white shadow-xl px-3 py-2 h-4/5 w-56">
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
  const [avisos, setAvisos] = useState<AvisoProps[]>(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE.AVISOS_DATA) || "[]")
  );
  const { turma } = useContext(AppContext)
  const filteredAvisos = avisos.filter((aviso) => getFilterAvisos(aviso,turma))
  console.log(filteredAvisos, turma)
  useEffect(() => {
    fetch(URL + "/aviso/")
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem(LOCAL_STORAGE.AVISOS_DATA, JSON.stringify(data));
        setAvisos(data);
      })
      .catch((err) => console.log(err, true));
  }, []);
  return (
    <div className=" flex flex-row-reverse overflow-x-auto scroll-smooth gap-3 snap-x snap-mandatory h-4/5">
      {filteredAvisos.map((item, index) => (
        <Aviso
          category={item.category}
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
