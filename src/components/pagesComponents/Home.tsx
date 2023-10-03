import { IonIcon } from "@ionic/react";
import { notifications } from "ionicons/icons";
import { Title } from "../styled/titles";
import logo from "../../../public/logo.png";
import logo2 from "../../../public/logo2.png";
import { ColumnContainer } from "../styled/container";
import { SimpleContainer } from "../../utils/types";
import {
  BaseSyntheticEvent,
  SyntheticEvent,
  Touch,
  useContext,
  useEffect,
  useState,
} from "react";
import { AppContext } from "../AppContext";
import getRange from "../../utils/func/getRange";
import DrawerSlider from "../DrawerSlider";
import { Link } from "react-router-dom";
export function FirstSession() {
  const { scrollValue, setScrollValue, name } = useContext(AppContext);
  const range = getRange(scrollValue);
  return (
    <div
      className={`justify-between w-screen px-5 pt-5 items-center ${
        range < 0.15 ? "hidden" : "flex"
      }`}
    >
      <Title>
        Olá <b>{name}</b>
      </Title>
      <Link to={"/avisos"}>
        <IonIcon
          ios={notifications}
          md={notifications}
          style={{ fontSize: "20px" }}
        />
      </Link>
    </div>
  );
}
// fazer com que quando atingir o breakpoint desejado, a imgzinha vá pro lado e o sino link pra pagina vá pra direita.
// também, conforme o drawerzinho for subindo, o calendário ir perdendo opacidade.
// explicando acima, serão duas páginas que irão coexistir, porém uma acima da outra, e quando o drawer subir, a página de baixo aparecerá.

export function SecondSession() {
  const { scrollValue, setScrollValue } = useContext(AppContext);
  const breakpoint = getRange(scrollValue) < 0.15;
  return (
    <>
      {!breakpoint ? (
        <div className=" flex w-screen bg-darkest px-3 py-1 justify-center rounded-3xl">
          <img
            style={{ height: `${window.innerHeight / 6 + scrollValue / 12}px` }}
            src={logo}
          />
        </div>
      ) : (
        <div className=" bg-light shadow-2xl pt-3 rounded-b-3xl fixed top-0 z-50">
          <div className=" flex w-screen px-3 justify-between rounded-b-3xl items-center">
            <img
              onClick={() => setScrollValue(0)}
              style={{
                height: `${window.innerHeight / 6 + scrollValue / 12}px`,
              }}
              src={logo2}
            />
            <Link to={"/avisos"}>
              <IonIcon
                ios={notifications}
                md={notifications}
                style={{ fontSize: "32px" }}
              />
            </Link>
          </div>
          <DrawerSlider />
        </div>
      )}
    </>
  );
}

export function SessionsContainer() {
  const { scrollValue, setScrollValue } = useContext(AppContext);
  const range = (window.innerHeight + scrollValue) / window.innerHeight - 0.08;
  return (
    <ColumnContainer
      style={{ gap: `${((window.innerHeight + scrollValue) * 1) / 9.5}px` }}
      className={`${range > 0.15 ? "bg-dark" : ""} rounded-b-3xl text-white`}
    >
      <FirstSession />
      <SecondSession />
    </ColumnContainer>
  );
}
