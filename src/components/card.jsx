import React from 'react';

const CardComponent = ({name, category, startTime, endTime, onSelect, isSelectable, deselect}) => {
    return(
        <div className='card'>
            <p className='card-name'>{name}</p>
            <p className='card-category'>{category}</p>
            <p className='card-timings'>{startTime}</p>
            <p className='card-timings'>{endTime}</p>
            {isSelectable &&  !deselect && (
                <button className='select-button' onClick={onSelect}>
                    Select
                </button>
            )}
            {deselect && (
                <button className='select-button' onClick={onSelect}>
                    Deselect
                </button>
            )}
            {!isSelectable && (
                <button className='select-button' disabled>
                    Select
                </button>
            )}
        </div>
    )
}

export default CardComponent;