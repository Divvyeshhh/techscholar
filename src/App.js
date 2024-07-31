import React, { useState, useEffect } from 'react';
import './App.css';
import CardComponent from './components/card';
import data from './components/data.json'

function App() {

  const loadInitialState = () => {
    const savedAllEvents = localStorage.getItem('allEvents');
    const savedSelectedEvents = localStorage.getItem('selectedEvents');
    
    if (savedAllEvents && savedSelectedEvents) {
      return {
        allEvents: JSON.parse(savedAllEvents),
        selectedEvents: JSON.parse(savedSelectedEvents),
      };
    }
    
    return { allEvents: data, selectedEvents: [] };
  };

  const [allEvents, setAllEvents] = useState(loadInitialState().allEvents);
  const [selectedEvents, setSelectedEvents] = useState(loadInitialState().selectedEvents);

  const parseDateTime = (dateTimeString) => {
    const [date, time] = dateTimeString.split(' ');
    return { date, time };
  };

  const hasTimingClash = (event) => {
    const { date: eventDate, time: eventTime } = parseDateTime(event.start_time);
    const { date: eventEndDate, time: eventEndTime } = parseDateTime(event.end_time);

    return selectedEvents.some(selectedEvent => {
      const { date: selectedDate, time: selectedTime } = parseDateTime(selectedEvent.start_time);
      const { date: selectedEndDate, time: selectedEndTime } = parseDateTime(selectedEvent.end_time);

      const isSameDate = eventDate === selectedDate;
      const isOverlap = (eventTime < selectedEndTime && eventEndTime > selectedTime) || 
                        (eventDate < selectedEndDate && eventEndDate > selectedTime);

      return isSameDate && isOverlap;
    });
  };


  const handleSelect = (event) => {
    if(selectedEvents.length < 3 && !hasTimingClash(event)){
      setAllEvents(prevAllEvents => prevAllEvents.filter(item => item.id !== event.id));
      setSelectedEvents(prevSelectedEvents => [...prevSelectedEvents, event]);
    }
  };

  const handleDeselect = (event) => {
    setSelectedEvents(prevSelectedEvents => prevSelectedEvents.filter(item => item.id !== event.id));
    setAllEvents(prevAllEvents => [...prevAllEvents, event]);
  };

  useEffect(() => {
    localStorage.setItem('allEvents', JSON.stringify(allEvents));
    localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
  }, [allEvents, selectedEvents]);
  

  return (
    <div className="app-container">
      <div className='column'>
        <p>All events</p>
        <div className="card-container">
        {allEvents.map((item) => (
          <CardComponent
            name={item.event_name}
            category={item.event_category}
            startTime={item.start_time}
            endTime={item.end_time}
            onSelect={() => handleSelect(item)}
            isSelectable={selectedEvents.length < 3 && !hasTimingClash(item)}
            deselect={false}
          />
        ))}
        </div>
      </div>

      <div className='column'>
        <p>Selected</p>
        {selectedEvents.map((item) => (
          <CardComponent
            name={item.event_name}
            category={item.event_category}
            startTime={item.start_time}
            endTime={item.end_time}
            onSelect={() => handleDeselect(item)}
            isSelectable={true}
            deselect={true}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from 'react';
// import './App.css';
// import CardComponent from './components/card';
// import data from './components/data.json'; // Ensure the path is correct

// function App() {
//   // Load initial state from local storage or use default data
//   const loadInitialState = () => {
//     const savedAllEvents = localStorage.getItem('allEvents');
//     const savedSelectedEvents = localStorage.getItem('selectedEvents');
    
//     if (savedAllEvents && savedSelectedEvents) {
//       return {
//         allEvents: JSON.parse(savedAllEvents),
//         selectedEvents: JSON.parse(savedSelectedEvents),
//       };
//     }
    
//     return { allEvents: data, selectedEvents: [] };
//   };

//   const [allEvents, setAllEvents] = useState(loadInitialState().allEvents);
//   const [selectedEvents, setSelectedEvents] = useState(loadInitialState().selectedEvents);

//   useEffect(() => {
//     // Save state to local storage whenever it changes
//     localStorage.setItem('allEvents', JSON.stringify(allEvents));
//     localStorage.setItem('selectedEvents', JSON.stringify(selectedEvents));
//   }, [allEvents, selectedEvents]);

//   const parseDateTime = (dateTimeString) => {
//     const [date, time] = dateTimeString.split(' ');
//     return { date, time };
//   };

//   const hasTimingClash = (event) => {
//     const { date: eventDate, time: eventTime } = parseDateTime(event.start_time);
//     const { date: eventEndDate, time: eventEndTime } = parseDateTime(event.end_time);

//     return selectedEvents.some(selectedEvent => {
//       const { date: selectedDate, time: selectedTime } = parseDateTime(selectedEvent.start_time);
//       const { date: selectedEndDate, time: selectedEndTime } = parseDateTime(selectedEvent.end_time);

//       const isSameDate = eventDate === selectedDate;
//       const isOverlap = (eventTime < selectedEndTime && eventEndTime > selectedTime) || 
//                         (eventDate < selectedEndDate && eventEndDate > selectedTime);

//       return isSameDate && isOverlap;
//     });
//   };

//   const handleSelect = (event) => {
//     if (selectedEvents.length < 3 && !hasTimingClash(event)) {
//       setAllEvents(prevAllEvents => prevAllEvents.filter(item => item.id !== event.id));
//       setSelectedEvents(prevSelectedEvents => [...prevSelectedEvents, event]);
//     } else {
//       alert('Cannot select this event due to a timing clash or maximum limit reached.');
//     }
//   };

//   const handleDeselect = (event) => {
//     setSelectedEvents(prevSelectedEvents => prevSelectedEvents.filter(item => item.id !== event.id));
//     setAllEvents(prevAllEvents => [...prevAllEvents, event]);
//   };

//   return (
//     <div className="app-container">
//       <div className='column'>
//         <p>All events</p>
//         {allEvents.map((item) => (
//           <CardComponent
//             key={item.id}
//             name={item.event_name}
//             category={item.event_category}
//             startTime={item.start_time}
//             endTime={item.end_time}
//             onSelect={() => handleSelect(item)}
//             isSelectable={selectedEvents.length < 3 && !hasTimingClash(item)}
//             deselect={false}
//           />
//         ))}
//       </div>

//       <div className='column'>
//         <p>Selected</p>
//         {selectedEvents.map((item) => (
//           <CardComponent
//             key={item.id}
//             name={item.event_name}
//             category={item.event_category}
//             startTime={item.start_time}
//             endTime={item.end_time}
//             onSelect={() => handleDeselect(item)}
//             isSelectable={false}
//             deselect={true}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
