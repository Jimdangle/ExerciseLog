import {createElement, useState} from 'react'
import { createContext } from 'react'
import Goals from './Goals'
import GoalMaker from './GoalMaker'
import GoalList from './GoalList'
import GoalPage from './GoalPage'
export const PageContext = createContext(null)
export const GoalContext = createContext(null)
export default function GoalHome(){

    const [goal, setGoal] = useState(null)
    const [page,setPage] = useState(0)
    function RenderPage(){
        switch(page){
            case 0:
                return <Goals setPage={setPage}></Goals>
            case 1:
                return <GoalMaker setGoal={setGoal} setPage={setPage}></GoalMaker>
            case 2:
                return <GoalList setPage={setPage} setGoal={setGoal}></GoalList>
            case 3:
                return <GoalPage goal={goal} setPage={setPage}></GoalPage>
        }
    }


    return(
        <PageContext.Provider value={setPage}>
            <GoalContext.Provider value={setGoal}>
                {RenderPage()}
            </GoalContext.Provider>
            
        </PageContext.Provider>
    )

}