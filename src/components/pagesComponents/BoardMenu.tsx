import { IonIcon } from '@ionic/react'
import logo from '../../../public/logo.png'
import { Link } from 'react-router-dom'
import {home, chevronBack} from 'ionicons/icons'
export default function BoardMenu() {
    return (
        <div className=" w-screen absolute bottom-0 bg-dark rounded-t-3xl h-20">
            <div className=' relative'>
            <img className=' absolute w-24 left-6' style={{bottom: '-64px'}} src={logo} />
            </div>
            <Link to={"/home"} className=' absolute right-6 h-20 flex gap-1' style={{top: '50%', transform: 'translateY(-25%)', color:'white'}}>
                <IonIcon style={{fontSize: '40px'}} ios={chevronBack} md={chevronBack} />
                <IonIcon style={{fontSize: '40px'}} ios={home} md={home} />
            </Link>
        </div>
    )
}