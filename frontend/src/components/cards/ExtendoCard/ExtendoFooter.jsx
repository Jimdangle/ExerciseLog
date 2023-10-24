/* A full box with centered contend at the bottom of the card */
export default function ExtendoFooter({children}){
   return (
    <div className="flex justify-center w-full">
        {children}
    </div>
   ) 
}