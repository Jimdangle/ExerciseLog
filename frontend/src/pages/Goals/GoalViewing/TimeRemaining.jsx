

export default function TimeRemaining({timeRemaining}){

    return(
        <div className="flex flex-col my-3 py-2 text-center">
            <p className='text-xl'>Time Remaining</p>
            <p className='text-lg'>{timeRemaining.days} Days</p>
            <p className='text-lg'>{timeRemaining.hours} Hours</p>
            <p className='text-lg'>{timeRemaining.minutes} {timeRemaining.minutes == 1 ? 'Minute' : 'Minutes'}</p>
        </div>
    )
}