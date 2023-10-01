import { TokenContext } from "../../views/Home";
import { useContext, useEffect, useState } from "react";
import SummaryCanvas from "../UserInfo/SummaryCanvas";
import SummaryView from "../UserInfo/SummaryView";
export default function WorkoutSummary({summary}){
    const token = useContext(TokenContext);//get token
    console.log(summary)
    return(
        <div>
            <SummaryView Summary={summary}></SummaryView>
        </div>
    )
}
