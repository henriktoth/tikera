function ActiveDayBadge(props){
    return(
        <div className="m-5 px-5 py-3 w-270 rounded-xl bg-gradient-to-r from-indigo-900 to-indigo-800">
            <h2 className="text-center font-bold uppercase  tracking-wide">{props.activeDay}</h2>
        </div>
    )
    
}
export default ActiveDayBadge