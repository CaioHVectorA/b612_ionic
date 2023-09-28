//@ts-nocheck
import {
  IonContent,
  IonInput,
  IonPage,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { ColumnContainer } from "../components/styled/container";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../components/AppContext";
import { useHistory } from "react-router";
import { LOCAL_STORAGE } from "../utils/envariables";

const Initial: React.FC = () => {
  const hist = useHistory();
  const { turma, setTurma, name, setName } = useContext(AppContext);
  function handleTurma(val: string) {
    setTurma(parseInt(val));
    console.log(val);
    localStorage.setItem(
      LOCAL_STORAGE.USER_DATA,
      JSON.stringify({
        user: name,
        turma: parseInt(val),
      })
    );
  }
  useEffect(() => {
    const hasUser = localStorage.getItem(LOCAL_STORAGE.USER_DATA);
    if (hasUser) {
      const infos = JSON.parse(hasUser);
      console.log(infos.turma);
      console.log("jklsadjkldsajkld");
      if (
        ![
          1001, 1002, 1003, 1004, 2001, 2002, 2003, 2004, 3001, 3002, 3003,
          3004,
        ].includes(infos.turma)
      ) {
        return;
      }
      console.log("jklsadjkldsajkld");
      setName(infos.user);
      setTurma(infos.turma);
      hist.push("/home");
    }
  }, []);
  return (
    <IonPage>
      <IonContent fullscreen>
        <ColumnContainer className=" px-10 h-screen gap-1 justify-center">
          <label htmlFor="name">Nome</label>
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
            id="name"
            className="px-4 py-2 mb-5 bg-white border-2 border-gray-300 rounded-md text-base text-gray-600 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            type="text"
            placeholder="Enter text here"
          />
          <IonSelect
            onIonChange={(e) => handleTurma(e.detail.value)}
            className=" border px-2"
            labelPlacement="fixed"
            fill="solid"
            label="Turma"
          >
            <IonSelectOption value={"1001"}>1001</IonSelectOption>
            <IonSelectOption value={"1002"}>1002</IonSelectOption>
            <IonSelectOption value={"1003"}>1003</IonSelectOption>
            <IonSelectOption value={"1004"}>1004</IonSelectOption>
            <IonSelectOption value={"2001"}>2001</IonSelectOption>
            <IonSelectOption value={"2002"}>2002</IonSelectOption>
            <IonSelectOption value={"2003"}>2003</IonSelectOption>
            <IonSelectOption value={"2004"}>2004</IonSelectOption>
            <IonSelectOption value={"3001"}>3001</IonSelectOption>
            <IonSelectOption value={"3002"}>3002</IonSelectOption>
            <IonSelectOption value={"3003"}>3003</IonSelectOption>
            <IonSelectOption value={"3004"}>3004</IonSelectOption>
          </IonSelect>
          <button
            onClick={() => hist.push("/home")}
            type="button"
            className=" mt-5 bg-main rounded-3xl py-2 text-white w-fit mx-auto px-8"
            style={turma !== 0 && name ? {} : { opacity: ".4" }}
          >
            Entrar
          </button>
        </ColumnContainer>
      </IonContent>
    </IonPage>
  );
};
export default Initial;
