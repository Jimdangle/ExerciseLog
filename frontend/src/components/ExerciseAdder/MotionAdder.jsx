import { useContext, useState } from "react";
import { TokenContext } from "../../views/Home";
import { TranslateMuscle, muscles } from "../../utils/muscle";


// Open a little window for people to create new motions 
export default function MotionAdder({update,refresh}){
    const token = useContext(TokenContext);

    const [formContent, setFormContent] = useState({name:"",desc:""});
    const [muscleMap, setMuscleMap] = useState({0:0,1:0,2:0,3:0,4:0,5:0,6:0}) // default to empty
    const [type, setType] = useState(0); // default to lift

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
                console.log(bod);
                update(false);
                refresh();
            }
        }
        catch(e){
            console.log(e);
        }
    }

    return (<>
    <div className="z-5">
        <div className="flex flex-col bg-slate-200 h-124">

            <div className="flex flex-row mt-4 place-items-center">
                <p className="font-semibold">Name</p>
                <input className=" ml-auto mr-2" type="text" name="name" placeholder="" onChange={handleFormUpdate}></input>
            </div>

            <select onChange={(e)=>{setType(Number(e.target.value))}}>
                <option value="0">Lift</option>
                <option value="1">Cardio</option>
                <option value="2">Hold</option>
            </select>

            {muscles.map((muscle,index)=> {
                return(
                <div className="flex flex-row mt-4 justify-center" key={"abcdefhijklmnop"+index}>
                    <p className="font-semibold">{muscle} {muscleMap[index] ? muscleMap[index]*100 : 0}%</p>
                    <input className="inline ml-auto mr-2" type="range" name={index}  min="0" max="1" step="0.1" value={muscleMap[index] ? muscleMap[index] : 0} onChange={handleSliderUpdate}></input>
                </div>)
            })}

            

            <div className="flex flex-row mt-4 justify-center">
                <input className="" type="text" name="desc" placeholder="description" onChange={handleFormUpdate}></input>
            </div>

            <div className="flex flex-row justify-center">
                <button className="general-button mx-auto bg-red-300" onClick={()=>{update(false)}}>Cancel</button>
                <button className="general-button mx-auto bg-green-300" onClick={AddUserMotion}>Add</button>
            </div>
            
            
        </div>
    </div>

    </>)
}