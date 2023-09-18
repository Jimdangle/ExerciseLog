import lsPrefix from "../config/cfUtil"
import LogList from "../components/LogList/LogList";
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
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-4xl font-bold text-blue-900">You are logged in!</h1>
        <button className="rounded-3xl bg-slate-100 p-5 font-semibold hover:bg-green-400" onClick={logout}>Sign out</button>
        <LogList list={[{name:"t1",created_at:"1",key:1},{name:"t2",created_at:"2",key:2},{name:"t3",created_at:"3",key:3}]} token={token}></LogList>
    </>)
}