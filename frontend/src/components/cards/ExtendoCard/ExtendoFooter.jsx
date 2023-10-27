/**
 * Footer for the ExtendoCard
 * @param {{components}} props
 * @param {components} props.children - pass content between tags 
 * @returns 
 */
export default function ExtendoFooter({children}){
   return (
    <div className="flex justify-center w-full">
        {children}
    </div>
   ) 
}