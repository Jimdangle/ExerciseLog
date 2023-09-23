import { useContext, useState } from "react";
import { TokenContext } from "../../views/Home";
import { TranslateMuscle } from "../../utils/muscle";


// Open a little window for people to create new motions 
export default function MotionAdder({update,refresh}){
    const token = useContext(TokenContext);

    const [formContent, setFormContent] = useState({name:"",pg:0,desc:""});

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
                    ...formContent,
                    sg:[]
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
        <div className="flex flex-col bg-slate-200">

            <div className="flex flex-row mt-4 place-items-center">
                <p className="font-semibold">Name</p>
                <input className=" ml-auto mr-2" type="text" name="name" placeholder="" onChange={handleFormUpdate}></input>
            </div>

            <div className="flex flex-row mt-4 justify-center">
                <p className="font-semibold">{TranslateMuscle(formContent.pg)}</p>
                <input className="ml-auto mr-2" type="range" name="pg"  min="0" max="7" onChange={handleFormUpdate}></input>
            </div>

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