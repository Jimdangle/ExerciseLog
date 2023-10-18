
import NavBar from "../../components/nav/NavBar"
import { useState } from "react"
import useAnimation from "../../hooks/animation/useAnimation"
export default function NavControl({active, setActive}){
   
    const {animate, animations} = useAnimation()
    


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
        <div className={(animate ? 'slider' : 'slideh')}>
            <NavBar nav={Nav} active={active}></NavBar>
        </div>
         
        
    )

}