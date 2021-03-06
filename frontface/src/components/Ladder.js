import React, {useState, useEffect} from 'react'
// import axios from 'axios';
import '../styles/Ladder.css';

function Ladder(props) {
    const {worths, worthID} = props;
    const [prevWorthID, setPrevWorthID] = useState(worthID);

    function ladderChecker(id, price) {
        if(id === 5 || id === 10 || id === 15) {
            if(worthID > id) {
                return(<button className="crossed-line-checkpoint"> {id}. ₹{price} </button>) 
            }
         return (<button className="checkpoint"> {id}. ₹{price} </button>);
        }

        if(worthID > id) {
            return(<button className="crossed-line"> {id}. ₹{price} </button>) 
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
                {worthID > 1 ? <h3 style={{color:'whitesmoke'}}> Currently winning - ₹{worths[worthID-2].cost} </h3> : <h3 style={{color:'whitesmoke'}}> Amount - 0 </h3> }
                </div>

            {/* cover the checkpoint. */}

            <div style={{textAlign: 'center'}} className="lcp">

                {  worths.slice(0).reverse().map((w) => {
                    return (
                        <div key={w.id} className="checkpoints">
                            {ladderChecker(w.id, w.cost)}
                        </div>
                    )
                    }) 
                }    
                
            </div>
              

            </div>
        </div>
    )
}

export default Ladder
