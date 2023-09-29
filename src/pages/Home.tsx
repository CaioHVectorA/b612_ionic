import { useContext, useEffect, useState } from "react";
import { Message, getMessages } from "../data/messages";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { ColumnContainer } from "../components/styled/container";
import "react-calendar/dist/Calendar.css";
import {
  FirstSession,
  SecondSession,
  SessionsContainer,
} from "../components/pagesComponents/Home";
import { CalendarContainer, ModifiedCalendar } from "../components/Calendar";
import { AppContext } from "../components/AppContext";
import DrawerSlider from "../components/DrawerSlider";
import Horarios from "../components/pagesComponents/Horarios";
import { LOCAL_STORAGE } from "../utils/envariables";
const Home: React.FC = () => {
  const { turma, setTurma, name, setName } = useContext(AppContext);
  useEffect(() => {
    const hasUser = localStorage.getItem(LOCAL_STORAGE.USER_DATA);
    if (hasUser) {
      const infos = JSON.parse(hasUser);
      console.log(infos.turma);
      // if (
      //   ![
      //     1001, 1002, 1003, 1004, 2001, 2002, 2003, 2004, 3001, 3002, 3003,
      //     3004,
      //   ].includes(infos.turma)
      // ) {
      //   return;
      // }
      setName(infos.user);
      setTurma(infos.turma);
    }
  }, []);
  return (
    <IonPage id="home-page" className=" bg-bg">
      <IonContent fullscreen>
        <ColumnContainer className=" -z-50 relative">
          <SessionsContainer />
          <CalendarContainer>
            <ModifiedCalendar />
          </CalendarContainer>
          <Horarios />
          <div className=" absolute bottom-0">
            <DrawerSlider isCalendar/>
          </div>
        </ColumnContainer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
