import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomCalendar = ({ selectedDate, setSelectedDate, selectedTimes, setSelectedTimes, bookingNote, setBookingNote }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Times available to choose from
  const availableTimes = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleDateSelect = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    // Reset times when date changes
    setSelectedTimes([]);
  };

  const handleTimeSelect = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter(t => t !== time));
    } else if (selectedTimes.length < 3) {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ padding: '10px' }}></div>);
    }

    const today = new Date();
    today.setHours(0,0,0,0);

    for (let d = 1; d <= daysInMonth; d++) {
      const thisDate = new Date(year, month, d);
      thisDate.setHours(0,0,0,0);
      
      const isSelected = selectedDate && 
                         selectedDate.getDate() === d && 
                         selectedDate.getMonth() === month && 
                         selectedDate.getFullYear() === year;

      days.push(
        <button
          key={d}
          onClick={() => handleDateSelect(d)}
          style={{
            padding: '10px 5px',
            background: isSelected ? 'var(--color-slate-plum)' : 'rgba(255, 255, 255, 0.65)',
            color: isSelected ? 'white' : 'var(--color-slate-plum)',
            border: isSelected ? 'none' : '1px solid rgba(0,0,0,0.1)',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: isSelected ? 'bold' : 'normal',
            aspectRatio: '1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s'
          }}
        >
          {d}
        </button>
      );
    }

    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', textAlign: 'center', fontSize: '0.9rem' }}>
        {weekDays.map((d, i) => <div key={i} style={{ fontWeight: 'bold', paddingBottom: '10px', opacity: 0.7 }}>{d}</div>)}
        {days}
      </div>
    );
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      
      {/* Calendar Area with Cheetah Background */}
      <div style={{ 
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
        border: '1px solid rgba(255,255,255,0.3)'
      }}>
        {/* Cheetah Background Image */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url(/leopard_print_medium.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'grayscale(100%) opacity(0.25)', // Monochromatic styling, slightly darker
          zIndex: 0
        }} />

        {/* Content on top of background */}
        <div style={{ 
          position: 'relative', 
          zIndex: 1, 
          padding: '20px',
          background: 'transparent'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <button onClick={prevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center' }}>
              <ChevronLeft size={20} color="var(--color-slate-plum)" />
            </button>
            <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--color-slate-plum)' }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <button onClick={nextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px', display: 'flex', alignItems: 'center' }}>
              <ChevronRight size={20} color="var(--color-slate-plum)" />
            </button>
          </div>

          {renderCalendar()}

          <AnimatePresence>
            {selectedDate && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ marginTop: '20px', overflow: 'hidden' }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '10px', color: 'var(--color-slate-plum)' }}>
                  Select up to 3 preferred times:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {availableTimes.map(time => {
                    const isSelected = selectedTimes.includes(time);
                    const isMax = selectedTimes.length >= 3 && !isSelected;
                    return (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        disabled={isMax}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '20px',
                          background: isSelected ? 'var(--color-slate-plum)' : 'rgba(255,255,255,0.8)',
                          color: isSelected ? 'white' : (isMax ? 'rgba(0,0,0,0.3)' : 'var(--color-slate-plum)'),
                          border: isSelected ? 'none' : '1px solid rgba(0,0,0,0.1)',
                          cursor: isMax ? 'not-allowed' : 'pointer',
                          fontWeight: 'bold',
                          fontSize: '0.85rem',
                          transition: 'all 0.2s'
                        }}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--color-slate-plum)' }}>
          Any specific booking instructions?
        </label>
        <textarea 
          placeholder="e.g. I prefer the first Monday of every month, or I can only do after 5pm."
          rows={2}
          value={bookingNote}
          onChange={(e) => setBookingNote(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.2)',
            background: 'rgba(255,255,255,0.1)',
            color: 'inherit',
            fontFamily: 'inherit',
            fontSize: '1rem',
            outline: 'none',
            resize: 'none',
            width: '100%',
            boxSizing: 'border-box'
          }}
        />
      </div>

    </div>
  );
};

export default CustomCalendar;
