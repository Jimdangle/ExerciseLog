
import NavBar from "../../components/nav/NavBar"
import { useState } from "react"
import useAnimation from "../../hooks/animation/useAnimation"
import '../../styles/animations.css'
export default function NavControl({active, setActive,show}){
   
    const {animate} = useAnimation(show)
    


    const Nav = {
        links: {
            "Home": 0,
            "Workout": 1,
            "Goals": {
                children: {
                    "Goal Maker" : 2,
                    "Goal View": 3,
                }
            },
            "Summary Generation": 4,
            "History": {
                children: {
                    "All Workouts": 5,
                    "All Goals": 6,
                }
            },
        },
        setter: setActive,
    }

    return(
        <div className={"absolute top-3 w-full bg-gun " + (show ? " trickyDown" : " hidden" )}>
            <NavBar nav={Nav} active={active}></NavBar>
        </div>
         
        
    )

}