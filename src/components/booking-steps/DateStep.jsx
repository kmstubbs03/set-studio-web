import React from 'react';
import CustomCalendar from '../CustomCalendar';
import useBookingStore from '../../store/useBookingStore';

export default function DateStep({ isSubscription = false }) {
  const { selectedDate, selectedTimes, setField } = useBookingStore();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left', width: '100%' }}>
      <p style={{ opacity: 0.8, fontSize: '0.85rem', lineHeight: '1.4' }}>
        {isSubscription 
          ? "Select your preferred day of the month for your monthly subscription appointment."
          : "Select your preferred date for your appointment."}
      </p>
      <CustomCalendar 
        selectedDate={selectedDate} 
        setSelectedDate={(date) => setField('selectedDate', date)} 
        selectedTimes={selectedTimes}
        setSelectedTimes={(times) => setField('selectedTimes', times)}
        maxSelectableDates={1}
      />
    </div>
  );
}
