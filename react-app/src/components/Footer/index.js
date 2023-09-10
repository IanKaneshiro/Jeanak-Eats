

import "./Footer.css"
import { notImplemented } from "../../Resources/helperFunctions";

const Footer = () => {
    return (

    <div className="entireFooter">
        <div className="one">The team behind Jeanak Eats</div>
        <div className="two">Check out our github repositories below</div>
        <div className="confusion">
        <div className="allButtons">
            <a className="HelloWorld" href="https://github.com/Kourani">Malak</a>
            <a className="HelloWorld" href="https://github.com/IanKaneshiro">Ian</a>
            <a className="HelloWorld" href="https://github.com/jhalton">Jeanette</a>
        </div>
        </div>
        <div className="copyRight">  © 2023 Jeanak Eats Inc.</div>
    </div>
    )
}


export default Footer
