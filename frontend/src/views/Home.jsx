import lsPrefix from "../config/cfUtil"

export default function Home(){
    const logout = () => {
        localStorage.removeItem(lsPrefix+"actk");
        location.reload();
    }

    return(<>
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-4xl font-bold text-blue-900">You are logged in!</h1>
        <button className="rounded-3xl bg-slate-100 p-5 font-semibold hover:bg-green-400" onClick={logout}>Sign out</button>
    </>)
}