import { useContext, useState } from 'react';
import { Message, getMessages } from '../data/messages';
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
  useIonViewWillEnter
} from '@ionic/react';
import { ColumnContainer } from '../components/styled/container';
import 'react-calendar/dist/Calendar.css';
import { FirstSession, SecondSession, SessionsContainer } from '../components/pagesComponents/Home';
import { CalendarContainer, ModifiedCalendar } from '../components/Calendar';
import { AppContext } from '../components/AppContext';
import DrawerSlider from '../components/DrawerSlider';
import Horarios from '../components/pagesComponents/Horarios';
const Home: React.FC = () => {
  return (
    <IonPage id="home-page" className=' bg-bg'>
      <IonContent fullscreen>
        <ColumnContainer>
          <SessionsContainer />
          <CalendarContainer>
            <ModifiedCalendar />
          </CalendarContainer>
          <Horarios />
          <DrawerSlider />
        </ColumnContainer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
