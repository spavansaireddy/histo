import React, { useState } from "react";
import Plot from 'react-plotly.js';
import { CSVLink} from "react-csv";
import './histo.css';

const csvData = [
    ["frequency"],
["27"],
["23"],
["21"],
["15"],
["13"],
["13"],
["13"],
["11"],
["10"],
["10"],
["10"],
["9"],
["9"],
["8"],
["8"],
["8"],
["7"],
["6"],
["6"],
["6"]
  ];
  
function Histogram(){
    const [ploting,setPloting] = useState();
    const [baring,setBaring] = useState();

    const fetchData = async()=>{
        const response = await fetch('https://www.terriblytinytales.com/test.txt');
        const text = await response.text();
        const words = text.split(/\s+/);
        const frequency= {};

        for(let i=0; i<words.length;i++){
            frequency[words[i]] = (frequency[words[i]] || 0 ) + 1;
        }
        const sortedFrequency = Object.entries(frequency).sort((a,b)=> b[1] -a[1]).slice(0,20);
        const x = sortedFrequency.map(([word])=> word);
        const y = sortedFrequency.map(([_,frequen])=> frequen);

        setPloting([{x,y,type:'bar'}]);
        setBaring({title:'Histogram of 20 most occurring words'})
    }
    return(
        <>
           <Plot data={ploting} layout={baring} id="id1"/>
           <div className="footer">
            <button onClick={fetchData}>Submit</button>
            <CSVLink data={csvData}><button>Export</button></CSVLink>
           </div>
        </>
    )
}
export default Histogram