// actions.ts
export const move = () => ({
  type: 'MOVE',
});

export const moveOrbs = () => ({
  type: 'MOVE_ORBS',
});

export const generateRandomOrb = () => ({
  type: 'GENERATE_RANDOM_ORB',
});

export const setSpacebarPressed = (isPressed: any) => ({
  type: 'SET_SPACEBAR_PRESSED',
  payload: isPressed,
});

export const setGameOver = (isGameOver: any) => ({
  type: 'SET_GAME_OVER',
  payload: isGameOver,
});

export const setScore = () => ({
  type: 'SET_SCORE',
});

export const setOrbScore = () => ({
  type: 'SET_ORB_SCORE',
});

export const restartGame = () => ({
  type: 'RESTART_GAME',
});

export const collisionDetected = () => ({
  type: 'COLLISION_DETECTED',
});

  