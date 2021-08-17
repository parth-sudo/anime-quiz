import React, {useState, useEffect} from 'react'
// import axios from 'axios';
import '../styles/Ladder.css';

function Ladder(props) {
    const {worths, worthID} = props;
    const [prevWorthID, setPrevWorthID] = useState(worthID);

    function isCheckPoint(id, price) {
        if(id === 5 || id === 10) {
            return (<button style={{background:'black', color:'yellow'}}> {id}. ₹{price} </button>);
        }
        return (<button className="button_style"> {id}. ₹{price} </button>);
    }
  
    return (
        <div className="ladder">
            <div className="title">
                <p> KBC LADDER </p>
            </div>
            <div style={{textAlign: 'center'}}>
                <div>
                    <h3> Lifelines </h3>
                </div>

            {/* cover the checkpoint. */}
            { (prevWorthID !== worthID && prevWorthID > 0) ? setPrevWorthID(worthID) : null}
             {  worths.slice(0).reverse().map((w) => {
                   return (
                    
                       <div key={w.id} className="checkpoints">
                         {(prevWorthID === worthID && prevWorthID > 0)
                                    ?  <button className="crossed-line"> {w.id}. ₹{w.cost} </button>  
                                    : isCheckPoint(w.id, w.cost) }
                       </div>
                   )
                 }) 
             }        

            </div>
        </div>
    )
}

export default Ladder
