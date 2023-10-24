/*  */
export default function ExtendoBody({toggleContent,children}){
    return (
        <div className={(toggleContent ? "block" : "hidden")}>
            {children}
        </div>
    )
}