
import NavBar from "../../components/nav/NavBar"
import { useState } from "react"
import useAnimation from "../../hooks/animation/useAnimation"
import '../../styles/animations.css'

/**
 * Logical Navigation controller, used with PageSelector functions to control our navigation
 * @param {{number,function,boolean}} props 
 * @param {number} props.active - currently active page according to our PageSelector 
 * @param {function} props.setActive - function to set our active page 
 * @param {boolean} props.show - Boolean to determine if nav is showing or not 
 * @component
 */
export default function NavControl({active, setActive,show}){
   
    // Actually navigation control, items have a page number with them, parents have children items
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
            "History": {
                children: {
                    "All Workouts": 4,
                    "All Goals": 5,
                }
            },
        },
        setter: setActive,
    }

    return(
        <div className={"absolute top-3 w-full bg-gun h-[36vh] z-10 rounded-b-md " + (show ? " trickyDown" : " hidden" )}>
            <NavBar nav={Nav} active={active}></NavBar>
        </div>
         
        
    )

}