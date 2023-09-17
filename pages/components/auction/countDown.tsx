import React, { useState, useEffect } from 'react';

interface Props {
  targetDate: string;
}

const Countdown: React.FC<Props> = ({ targetDate }) => {
  const calculateTimeLeft = (): {[unit: string]: number} => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      {timeLeft.days ? `${timeLeft.days}d ` : ""}
      {timeLeft.hours ? `${timeLeft.hours}h ` : ""}
      {timeLeft.minutes ? `${timeLeft.minutes}m ` : ""}
      {timeLeft.seconds ? `${timeLeft.seconds}s` : "Expired"}
    </div>
  );
};

export default Countdown;
