import { TranslateType, TranslateMuscle } from "../../utils/muscle";
import {stdColorRed} from '../../utils/styleutil'
import { useEffect, useState } from "react";

export default function TypeSummary({imp_map, map_tot, ind}){
    const [percents,setPercents] = useState([]);
    const [scores,setScores] = useState([]);

    useEffect(()=>{
        const percents = imp_map.map((impact)=>{return Math.round((impact/map_tot*100))});
        const avg = imp_map.reduce((t,v)=>{return t+v},0)/imp_map.length;
        var stdev = imp_map.reduce((t,v)=>{return t+((v-avg)*(v-avg))},0)/(imp_map.length-1);
        stdev = Math.sqrt(stdev);
        setPercents(percents)
        console.log(percents)
        const std_scores = imp_map.map((item)=>{
            const zeta = (item-stdev)/avg // # of stdevs away from mean
            
            return zeta;
        })
        setScores(std_scores)
        console.log(std_scores)
    },[imp_map,map_tot])
    

    return (
    <div key={"reactishomophobic"+ind} className="flex flex-col">
        <h3 className="ml-2 text-start str-white underline">{TranslateType(ind)}{ind==0 || ind==2 ? "s" : ""}</h3>
        <div className="flex flex-col">
            {scores.map((score,subindex)=>{
               
                return (
                    score ?
                    <p className={"ml-4"} key={`i8anicecake${subindex}`}>{TranslateMuscle(subindex)} : <span className={stdColorRed(score)}>{percents[subindex]}%</span> </p>
                    :
                    <p key={"ppllasd"+subindex+"urMom"+ind}>{/*Weird that this one doesnt show up as a normal element */}</p>
                    )
                })}
        </div>
        
    </div>
)
}