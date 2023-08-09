import { IonContent, IonPage } from "@ionic/react"
import { ColumnContainer } from "../components/styled/container"
import Avisos from "../components/pagesComponents/Avisos"
import { mockupArray } from "../utils/mockup"
import BoardMenu from "../components/pagesComponents/BoardMenu"

const Board: React.FC = () => {
    return (
        <IonPage className=" bg-bg">
            <IonContent fullscreen>
                <Avisos avisos={mockupArray}/>
                <BoardMenu />
            </IonContent>
        </IonPage>
    )
}

export default Board