import { useContext, useState } from "react";
import { TokenContext } from "../../../views/Home";
import { TranslateMuscle, muscles } from "../../../utils/muscle";
import { percentageColor, percentageColorRed } from "../../../utils/styleutil";

// Open a little window for people to create new motions 
export default function MotionAdder({update,refresh}){
    const token = useContext(TokenContext);

    const [formContent, setFormContent] = useState({name:"",desc:""});
    const [muscleMap, setMuscleMap] = useState({0:0,1:0,2:0,3:0,4:0,5:0,6:0}) // default to empty
    const [type, setType] = useState(0); // default to lift

    const [errorMessage, setErrorMessage] = useState("");

    // return the sum from the muscle maps
    function getSum(){
        const sum = Object.keys(muscleMap).reduce((total,key) => {return total+muscleMap[key];},0);
        console.log(`Sum ${sum}`)
        return sum
    }

    //Constrain the sliders to only sum to 1
    function handleSliderUpdate(event){
        const target = event.target;
        const map = muscleMap;
        const val = Number(target.value) + (getSum()-(map[target.name] ? map[target.name] : 0))
        console.log(`Target: ${Number(target.value)}\nCurrent Sum:${getSum()}\noldT:${map[target.name]}\tT+(Sum-oldT): ${val}`)
        if(val <= 1){ // we have stayed in the contstraint
            setMuscleMap({
                ...map,
                [target.name]: Number(target.value)
            })
        }
    }

    function handleFormUpdate(event){
        const tname = event.target.name;
        const val = event.target.value
        setFormContent({
            ...formContent,
            [tname]:val
        })
    }

    async function AddUserMotion(){
        try{
            const response = await fetch('http://localhost:3001/motion/add', {
                method: 'POST',
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json',
                    'authorization': token
                },
                mode:'cors',
                body: JSON.stringify({
                    name: formContent.name,
                    type: type,
                    muscles: Object.values(muscleMap),
                    desc: formContent.desc
                })
            })

            if(response.ok){
                const bod = await response.json();
                if(!bod.message){
                    console.log(bod);
                    update(false);
                    refresh();
                }
                else{
                    setErrorMessage(bod.message)
                }
                
            }
        }
        catch(e){
            console.log(e);
        }
    }


    // return a tailwind text color class based on a float between 0-1 that represents a percentage
    

    return (<>
    <div className="justify-center w-full rounded-md border-4 border-green-400">
        <div className="flex flex-col bg-slate-800 pl-2 text-white h-124">

            {/** Name of Exercise and type drop down*/}
            <div className="flex flex-row place-items-center">

                <p className="font-semibold text-lg">Name</p>
                <input className=" ml-2 mr-auto text-slate-800" type="text" name="name" placeholder="(Required)" onChange={handleFormUpdate}></input>

                <select name="type_select" className="w-24 bg-slate-600" onChange={(e)=>{setType(Number(e.target.value))}}>
                    <option value="0">Lift</option>
                    <option value="1">Cardio</option>
                    <option value="2">Hold</option>
                </select>
            </div>


            {/** Muscle impact sliders */}
            <div className='flex justify-center mt-3'>
                <h2 className={"font-semibold "+percentageColorRed(Object.values(muscleMap).reduce((t,v)=>{return t+v},0))}>Muscle Impact Distribution</h2>
            </div>
            
            {muscles.map((muscle,index)=> {
                return(
                <div className="flex flex-row mt-4 justify-center" key={"abcdefhijklmnop"+index}>
                    <p className={"font-semibold ml-4 " + percentageColor((muscleMap[index] ? muscleMap[index] : 0))}>{muscle} {muscleMap[index] ? muscleMap[index]*100 : 0}%</p>
                    <input className="inline ml-auto mr-2" type="range" name={index}  min="0" max="1" step="0.1" value={muscleMap[index] ? muscleMap[index] : 0} onChange={handleSliderUpdate}></input>
                </div>)
            })}

            
            {/** Description input*/}
            <div className="flex flex-row mt-4 justify-center">
                <input className="px-2 text-slate-800" type="text" name="desc" placeholder="description(optional)" onChange={handleFormUpdate}></input>
            </div>

            {/**Buttons on the bottom */}
            <div className="flex flex-row justify-center">
                <button className="button button-e-red" onClick={()=>{update(false)}}>Cancel</button>
                <button className="button button-e-green" onClick={AddUserMotion}>Add</button>
            </div>
            
            {/**Error message */}
            <p className="text-red-400 font-sans">{errorMessage ? errorMessage : ""}</p>
            
        </div>
    </div>

    </>)
}