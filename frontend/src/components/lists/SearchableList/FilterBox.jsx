/**Filter box that makes a bunch of buttons and each button sets a particular filter */
export default function FilterBox({filters,setFilter}){

    return(
        <div>
            {
                filters ? 
                <p>Filters</p>
                :
                <></>
            }
            {
                filters ? 
                filters.map((filter,index)=>
                {
                    return (
                        <button className="button button-e-green" onClick={()=>{setFilter(filter)}} key={"filter"+index+filter.name}>{filter.name}</button>
                    )
                })
                :
                <></>
            }
        </div>
    )
}