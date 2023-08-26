import { IonContent, IonPage, IonSelect, IonSelectOption } from "@ionic/react"
import { ColumnContainer } from "../components/styled/container"
import { useContext, useState } from "react"
import { AppContext } from "../components/AppContext"
import { useHistory } from "react-router"

const Initial: React.FC = () => {
    const hist = useHistory()
    const { setTurma } = useContext(AppContext)
    const [turmaSetted, setTurmaSetted] = useState(false)
    function handleTurma(val: string) {
        setTurma(parseInt(val));
        hist.push('/home')
    }
    return (
        <IonPage>
            <IonContent fullscreen>
                <ColumnContainer className=" px-10 h-screen justify-center">
                    <IonSelect onIonChange={(e) => handleTurma(e.detail.value)} className=" border px-2" labelPlacement="fixed" fill="solid" label="Turma">
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
                </ColumnContainer>
            </IonContent>
        </IonPage>
    )
}
export default Initial