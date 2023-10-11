import RecentGoals from "./RecentGoals";

export default function Goals({setPage}){

    return(
    <div className="flex flex-col">
        <RecentGoals></RecentGoals>

        <div className="flex flex-row justify-center mt-10">
            <button className="button button-e-blue" onClick={()=>{setPage(1)}}>Make New</button>
            <button className="button button-e-blue" onClick={()=>{setPage(2)}}>View Old</button>
        </div>
        
    </div>)
    }