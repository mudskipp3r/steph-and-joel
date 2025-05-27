import React from "react";
import Image from "next/image";

function Calendar() {
  const calendarData = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun',
    '26', '27', '28', '29', '30', '31', '1',
    '2', '3', '4', '5', '6', '7', '8',
    '9', '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22',
    '23', '24', '25', '26', '27', '28', '01',
    '02', '03', '04', '05', '06', '07', '08'
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: 'clamp(0.75rem, 2vw, 1rem)',
      boxShadow: 'rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
      width: 'clamp(280px, 90vw, 600px)',
      maxWidth: '100%'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'clamp(100px, 30%, 140px) 1fr',
        padding: 'clamp(1.5rem, 4vw, 2.5rem)',
        gap: 'clamp(1rem, 3vw, 2rem)'
      }}>
        {/* Calendar Left - Date Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            margin: '0',
            lineHeight: '1',
            fontWeight: '700',
            color: '#2c3e50'
          }}>
            Feb
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            margin: '0',
            color: '#666',
            fontWeight: '500'
          }}>
            2026
          </p>
        </div>

        {/* Calendar Right - Grid */}
        <div style={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gridTemplateRows: 'repeat(7, 1fr)',
          gap: 'clamp(2px, 0.5vw, 4px)',
          minHeight: 'clamp(140px, 25vw, 200px)'
        }}>
          {/* Wedding Date Circle */}
          <div style={{
            position: 'absolute',
            top: 'clamp(56px, 12vw, 80px)',
            right: 'clamp(72px, 15vw, 100px)',
            zIndex: 999,
            width: 'clamp(35px, 8vw, 50px)',
            height: 'clamp(35px, 8vw, 50px)',
            pointerEvents: 'none'
          }}>
            <Image 
              alt="Wedding date circle" 
              width={50} 
              height={50} 
              src="/images/circle.png"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Calendar Grid Items */}
          {calendarData.map((item, index) => (
            <div 
              key={index} 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: index < 7 
                  ? 'clamp(0.7rem, 2vw, 0.875rem)'  // Day headers
                  : 'clamp(0.9rem, 2.5vw, 1.125rem)', // Date cells
                fontWeight: index < 7 ? 'bold' : 'normal',
                textAlign: 'center',
                padding: 'clamp(0.25rem, 1vw, 0.5rem)',
                minHeight: 'clamp(20px, 4vw, 40px)',
                color: '#2c3e50'
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;