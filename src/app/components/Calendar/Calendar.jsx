import React from "react";
import styles from "./Calendar.module.css";
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.calendarLeft}>
          <h1>Feb</h1>
          <p>2026</p>
        </div>
        <div className={styles.calendarRight}>
            <Image alt="circle" width={50} height={50} src="/images/circle.png"></Image>
          {calendarData.map((item, index) => (
            <div key={index} className={index < 7 ? styles.dayHeader : styles.dateCell}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calendar;
