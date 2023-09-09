

import "./Footer.css"
import { notImplemented } from "../../Resources/helperFunctions";

const Footer = () => {
    return (

    <div className="entireFooter">
        <div className="allButtons">
            <button className="buttoned" onClick={notImplemented}>Privacy Policy</button>
            <button className="buttoned" onClick={notImplemented}>Terms</button>
            <button className="buttoned" onClick={notImplemented}>Pricing</button>
            <button className="buttoned" onClick={notImplemented}>Do not sell or share my personal information</button>
        </div>
        <div className="copyRight">  © 2023 Jeanak Eats Inc.</div>
    </div>
    )
}


export default Footer
