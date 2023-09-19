import lsPrefix from "../config/cfUtil"
import LogList from "../components/LogList/LogList";
import LogView from "./LogView";
//Home Show recent workouts and let user edit items in the list
// Two Components I think
// 1) Log List : displays a list of workout logs with edit buttons and delete buttons
// 2) Log Adder : Let the user add a new workout log, name it and press some continue button
export default function Home({signout}){
    const logout = () => {
        localStorage.removeItem(lsPrefix+"actk");
        signout();
    }

    const token = localStorage.getItem(lsPrefix+"actk");

    return(<>
       
        <button className="rounded-3xl bg-slate-100 p-5 font-semibold hover:bg-green-400" onClick={logout}>Sign out</button>
        <LogView token={token}></LogView>
    </>)
}