import { useState, useEffect } from 'react';
import './CountdownTimer.css';

interface CountdownTimerProps {
  targetDate: Date;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownTimer = ({ targetDate }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }
      
      // Only redirect once when countdown reaches zero
      if (!hasRedirected) {
        setHasRedirected(true);
        localStorage.removeItem('countdownTarget'); // Clear stored date
        window.location.href = 'https://reloadweb.netlify.app/';
      }
      
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    };

    // Set initial time
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(timer);
  }, [targetDate, hasRedirected]);

  // Helper function to add leading zero
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="countdown-container">
      <div className="countdown-units">
        <div className="countdown-unit">
          <div className="countdown-value">{formatNumber(timeLeft.days)}</div>
          <div className="countdown-label">Jours</div>
        </div>
        
        <div className="countdown-separator">:</div>
        
        <div className="countdown-unit">
          <div className="countdown-value">{formatNumber(timeLeft.hours)}</div>
          <div className="countdown-label">Heures</div>
        </div>
        
        <div className="countdown-separator">:</div>
        
        <div className="countdown-unit">
          <div className="countdown-value">{formatNumber(timeLeft.minutes)}</div>
          <div className="countdown-label">Minutes</div>
        </div>
        
        <div className="countdown-separator">:</div>
        
        <div className="countdown-unit">
          <div className="countdown-value">{formatNumber(timeLeft.seconds)}</div>
          <div className="countdown-label">Secondes</div>
        </div>
      </div>
      
      <div className="countdown-message">
        avant le lancement
      </div>
    </div>
  );
};

export default CountdownTimer;