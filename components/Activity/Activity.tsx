import React, { useEffect, useRef, useState, useCallback, useReducer } from 'react';
import Image from 'next/image';
import styles from './Activity.module.css';
import { MediaRenderer} from "@thirdweb-dev/react";

interface GameProps {
  groundHeight: number;
  petImage: any;
}

const orbsReducer = (prevOrbs: any[], action: any) => {
  switch (action.type) {
    case 'MOVE_ORBS':
      const petX = action.position.x;
      const petY = action.position.y;
      const petWidth = 50;
      const petHeight = 50;
      const petBoundingBox = {
        left: petX,
        right: petX + petWidth,
        top: petY,
        bottom: petY + petHeight,
      };

      const filteredOrbs = [];

      for (let i = 0; i < prevOrbs.length; i++) {
        const orb = prevOrbs[i];
        const orbWidth = 10;
        const orbHeight = 10;
        const orbBoundingBox = {
          left: orb.x,
          right: orb.x + orbWidth,
          top: orb.y,
          bottom: orb.y + orbHeight,
        };
      
        const isColliding =
          petBoundingBox.left < orbBoundingBox.right &&
          petBoundingBox.right > orbBoundingBox.left &&
          petBoundingBox.top < orbBoundingBox.bottom &&
          petBoundingBox.bottom > orbBoundingBox.top;
      
        if (isColliding) {
          action.setOrbScore((prevScore: number) => prevScore + 1);
        } else if (orb.x - 2 > 0) {
          const updatedOrb = {
            ...orb,
            x: orb.x - 2,
            y: orb.y,
          };
          filteredOrbs.push(updatedOrb);
        }
      }
      
      return filteredOrbs;


    case 'GENERATE_RANDOM_ORB':
      const min = 10;
      const max = action.groundHeight - 10;
      const randomY = Math.floor(Math.random() * (max - min + 1)) + min;
      const orb = {
        x: 360,
        y: randomY,
      };
      return [...prevOrbs, orb];

    default:
      return prevOrbs;
  }
};

export default function Activity({ groundHeight, petImage}: GameProps) {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 20, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [youWin, setYouWin] = useState(false);
  const [isSpacebarPressed, setIsSpacebarPressed] = useState(false);
  const [orbs, dispatchOrbs] = useReducer(orbsReducer, []);
  const [orbScore, setOrbScore] = useState(0);


  const move = useCallback(() =>  {
    setPosition((prevPosition) => ({
      ...prevPosition,
      y: isSpacebarPressed ? prevPosition.y - 4 : prevPosition.y + 2,
    }));
  }, [isSpacebarPressed]);

    const moveOrbs = useCallback(() => {
      dispatchOrbs({ type: 'MOVE_ORBS', position, setOrbScore });
    }, [position, setOrbScore]);

    const generateRandomOrb = useCallback(() => {
      dispatchOrbs({ type: 'GENERATE_RANDOM_ORB', groundHeight: groundHeight });
    }, [dispatchOrbs, groundHeight]);
    

    // Touch Controls
    const handleTouchStart = (event: any) => {
      event.preventDefault && event.preventDefault();
      event.stopPropagation && event.stopPropagation();
      setIsSpacebarPressed(true);
    };

    const handleTouchEnd = (event: any) => {
      event.preventDefault && event.preventDefault();
      event.stopPropagation && event.stopPropagation();
      setIsSpacebarPressed(false);
    };
      

  useEffect(() => {

    const moveOrbs = () => {
      dispatchOrbs({ type: 'MOVE_ORBS', position, setOrbScore });
    };
  
    const generateRandomOrb = () => {
      dispatchOrbs({ type: 'GENERATE_RANDOM_ORB', groundHeight });
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !isSpacebarPressed) {
        setIsSpacebarPressed(true);
        
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        setIsSpacebarPressed(false);
      }
    };

    if (!gameOver) {
      const interval = setInterval(() => {
        moveOrbs();
        move();
        setScore((prevScore) => prevScore + 1);
      }, 50);

      const orbInterval = setInterval(() => {
        generateRandomOrb();
      }, 1000);

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        clearInterval(interval);
        clearInterval(orbInterval);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [gameOver, isSpacebarPressed, move, groundHeight]);



  useEffect(() => {
    if (position.y >= groundHeight-30 || position.y < -30) {
      setGameOver(true);
    }
  }, [ position.y, groundHeight]);
  

  const restartGame = () => {
    setIsSpacebarPressed(false);
    setPosition({ x: 20, y: 0 });
    setScore(0);
    setGameOver(false);
    setYouWin(false);
    dispatchOrbs({ type: 'RESET' });
    setOrbScore(0);
  };

  const handleContextMenu = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className={styles.gameContainer} ref={gameContainerRef}>
      <div className={styles.gameScore}>Score: {score}</div>
      <div className={styles.orbScore}>Orbs: {orbScore}</div>
      {gameOver && (
        <div className={styles.gameOver}>
          Game Over
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
      {youWin && (
        <div>
          You Win!
          <button onClick={restartGame}>Restart</button>
        </div>
      )}
      <div className={styles.ground} style={{ bottom: `-${groundHeight}px` }} />
      {
      (() => {
        const orbElements = [];
        for (let i = 0; i < orbs.length; i++) {
          const orb = orbs[i];
          const orbElement = (
            <Image
              key={i}
              className={styles.orb}
              style={{
                left: `${orb.x}px`,
                bottom: `${orb.y}px`,
              }}
              src="/orb.png"
              alt="Orb"
              width={10}
              height={10}
            />
          );
          orbElements.push(orbElement);
        }
        return orbElements;
      })()
    }
      <div
        className={`${styles.pet} ${gameOver ? 'gameOver' : ''}`}
        style={{
          bottom: `${position.y}px`,
        }}
      >
        <MediaRenderer
          src={petImage}
          alt="Pet"
          width={"80px"}
          height={"80px"}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scaleX(-1)`,
          }}
        />
      </div>
    
      <Image
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onContextMenu={handleContextMenu}
      src="/upward.png"
      width={80}
      height={100}
      className={styles.upward}
      alt="Up"/>
            
    </div>
  );
}
