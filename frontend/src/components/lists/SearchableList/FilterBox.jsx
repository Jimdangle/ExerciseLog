/**Filter box that makes a bunch of buttons and each button sets a particular filter */
import { useState } from "react"

export default function FilterBox({filter,filters,setFilter}){
    const onChange = (event) => {
        setFilter(filters[event.target.value])}
    return(
        <div>
            {
                filters ? 
                <p>Filters</p>
                :
                <></>
            }
            <select id="filters" name="filters" className="w-2/3" onChange={onChange} >
            {
                filters ? 
                filters.map((filter,index)=>
                {
                    return (
                        <option className="" value={index} key={"filter"+index+filter.name}>{filter.name}</option>
                    )
                })
                :
                <></>
            }
            </select>
            <button disabled={!filter} className="button button-e-red disabled:button-d" onClick={()=>{setFilter(null)}}>Clear Filter</button>
            
        </div>
    )
}