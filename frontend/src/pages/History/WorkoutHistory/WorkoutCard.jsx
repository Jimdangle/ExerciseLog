import { useEffect, useContext } from "react";
import ExtendoCard from "../../../components/cards/ExtendoCard/ExtendoCard";
import { useRequest } from "../../../hooks/requests/useRequest";
import MuscleOverlayContainer from "../../Summary/MuscleOverlayContainer";
import { PageContext } from "../../PageSelector";
import { setLog } from "../../../utility/storage";
export default function WorkoutCard({_id,name,createdAt,exercises}){
    const setPage = useContext(PageContext);
    function setRecent(){
        setLog(_id);
        setPage(1);
    }
    return <ExtendoCard header={<Header name={name}/>} body={<Body createdAt={createdAt} setRecent={setRecent}/>} footer={<Footer createdAt={createdAt}/>} styles='bg-white text-gun mx-2 my-2 rounded-md'/>
}

/**
 * Display the name and maybe other shit
 * @param {*} param0 
 */
function Header({name}){
    return(
        <div className="flex justify-center">
            <p className="font-bold relative left-[12.5%] text-lg">{name}</p>
        </div>
    )
}

/**
 * Should display a muscle overlay for a summary from this workout as well as some other information
 * @param {*} param0 
 */
function Body({createdAt, setRecent}){
    const {data:sumData,isLoading,error,fetchData:summaryFetch} = useRequest('/user/wsum', 'p', {start:createdAt,end:createdAt});
    useEffect(()=>{
        if(!sumData){
            summaryFetch();
        }
    },[])

    return(
        <div>
            <div className="flex justify-center">
                <button className="button button-e-blue" onClick={setRecent}>Jump In</button>
            </div>
            {sumData && sumData.summary ? 
            <MuscleOverlayContainer sumData={sumData}/>
            :
            <></>
            }
        </div>
    )
}

/**
 * display when it was created and maybe how many exercises or something
 * @param {*} param0 
 */
function Footer({createdAt}){
    return(
        <div>
            <p>{new Date(createdAt).toLocaleDateString()}</p>
        </div>
    )
}