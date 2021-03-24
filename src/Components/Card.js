import React from 'react'
import {Link} from "react-router-dom"
import CardItem from './CardItem'


function Card() {
    return (
       <div className="cards">
           <h1>Check out</h1>
                <div className="cards_container">
                <div className="cards_wrapper">
                    <ul className="cards_items">
                        <CardItem></CardItem>
                    </ul>
                </div>
                </div>
       </div>
    )
}

export default Card;
