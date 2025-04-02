import './customMain.css'

import { CustomMainSlier } from './sliderMain/sliderMain'


export const CustomMain = () =>{
    return(
        <main>
            <div className="main__container">
                <CustomMainSlier/>
            </div>
        </main>
    )
}