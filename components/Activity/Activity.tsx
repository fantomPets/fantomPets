import React, { useEffect, useRef, useState, useCallback, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import styles from './Activity.module.css';
import { MediaRenderer} from "@thirdweb-dev/react";
import {
  move,
  moveOrbs,
  generateRandomOrb,
  setSpacebarPressed,
  setGameOver,
  setScore,
  setOrbScore,
  restartGame,
  collisionDetected,
} from '../../utils/app/actions';

interface GameProps {
  groundHeight: number;
  petImage: any;
}

export default function Activity({ groundHeight, petImage}: GameProps) {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [youWin, setYouWin] = useState(false);
  const dispatch = useDispatch();
  const position = useSelector((state: any) => state.position);
  const score = useSelector((state: any) => state.score);
  const gameOver = useSelector((state: any) => state.gameOver);
  const isSpacebarPressed = useSelector((state: any) => state.isSpacebarPressed);
  const orbs = useSelector((state:any) => state.orbs);
  const orbScore = useSelector((state:any) => state.orbScore);
  const orb = useSelector((state:any) => state.orb);



  const moveHandler = useCallback(() => {
    dispatch(move());
  }, [dispatch]);

  const moveOrbsHandler = useCallback(() => {
    dispatch(moveOrbs());
  }, [dispatch]);

  const generateRandomOrbHandler = useCallback(() => {
    dispatch(generateRandomOrb());
  }, [dispatch]);

  const collisionDetectedHandler = useCallback(() => {
    dispatch(collisionDetected());
  }, [dispatch]);

  const gameOverHandler = useCallback(() => {
    dispatch(setGameOver(true));
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveOrbsHandler();
      moveHandler();
      dispatch(setScore());
      dispatch(setGameOver(true));
    }, 50);

    const orbInterval = setInterval(() => {
      generateRandomOrbHandler();
    }, 2000);

    const moveInterval = setInterval(() => {
      collisionDetectedHandler();
    }, 1);


    return () => {
      clearInterval(interval);
      clearInterval(orbInterval);
      clearInterval(moveInterval);
     
    };
  }, [dispatch, moveHandler, generateRandomOrbHandler, collisionDetectedHandler, moveOrbsHandler, orb]);

  const restartGameHandler = () => {
    dispatch(restartGame());
  };

  const handleTouchStart = () => {
    dispatch(setSpacebarPressed(true));
  };

  const handleTouchEnd = () => {
    dispatch(setSpacebarPressed(false));
  };

  const handleGameOver = () => {
    dispatch(setGameOver(true));
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
          <button onClick={restartGameHandler}>Restart</button>
        </div>
      )}
      {youWin && (
        <div>
          You Win!
          <button onClick={restartGameHandler}>Restart</button>
        </div>
      )}
      <div className={styles.ground} style={{ bottom: `-${groundHeight}px` }} />
      {orbs.map((orb: any, index: number) => (
        <Image
          key={orb.id}
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
      ))}
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
