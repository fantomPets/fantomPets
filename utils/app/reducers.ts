interface State {
  position: {
    x: number;
    y: number;
  };
  score: number;
  gameOver: boolean;
  youWin: boolean;
  isSpacebarPressed: boolean;
  orbs: { x: number; y: number; }[];
  orbScore: number;
  groundHeight: number;
}

const initialState: State = {
    position: { x: 20, y: 0 },
    score: 0,
    gameOver: false,
    youWin: false,
    isSpacebarPressed: false,
    orbs: [],
    orbScore: 0,
    groundHeight: 360,
  };

  let orbIdCounter = 0;  
  
  const rootReducer = (state: State=initialState, action: any) => {
    switch (action.type) {
      case 'MOVE':
        if (state.gameOver) {
          return state;
        }
        return {
          ...state,
          position: {
            ...state.position,
            y: state.isSpacebarPressed ? state.position.y - 4 : state.position.y + 2,
          },
        };
  
        case 'MOVE_ORBS':
          if (state.gameOver) {
            return state;
          }
          const updatedOrbs = state.orbs.reduce((filteredOrbs: any[], orb) => {

            if (orb.x - 2 > 0) {
              filteredOrbs.push({
                ...orb,
                x: orb.x - 2,
                y: orb.y,
              });
            } 

            return filteredOrbs;
          }, []);

          return {
            ...state,
            orbs: updatedOrbs,
          };

      
      
      case 'GENERATE_RANDOM_ORB':
        if (state.gameOver) {
          return state;
        }
        const min = 10;
        const max = state.groundHeight - 60;
        const randomY = Math.floor(Math.random() * (max - min + 1)) + min;
        const orb = {
          x: 360,
          y: randomY,
        };
        return {
          ...state,
          orbs: [...state.orbs, orb],
        };

     

    case 'SET_SPACEBAR_PRESSED':
      return {
        ...state,
        isSpacebarPressed: action.payload,
      };
  
      case 'SET_GAME_OVER':
        const pY = state.position.y;
        if (pY >= 230 || pY < -30) {
          console.log('game over')
          return {
            ...state,
            gameOver: action.payload,
          };
        }
        return state;
  
      case 'SET_SCORE':
        if (state.gameOver) {
          return state;
        }
        return {
          ...state,
          score: state.score + 1,
        };

      case 'COLLISION_DETECTED':
        const petX = state.position.x;
        const petY = state.position.y;
        const petWidth = 80;
        const petHeight = 80;
        const petCenterX = petX + petWidth / 2;
        const petCenterY = petY + petHeight / 2;
        const collisionThreshold = 20; // Adjust this value as needed
        

        const { orbs, orbScore } = state;


        const filteredOrbs = orbs.filter((orb, index) => {
          const orbWidth = 10;
          const orbHeight = 10;
          const orbCenterX = orb.x + orbWidth / 2;
          const orbCenterY = Math.abs(orb.y + orbHeight / 2 - 300);

          const distanceX = Math.abs(petCenterX - orbCenterX);
          const distanceY = Math.abs(petCenterY - orbCenterY);
          const distance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));  
      

          const isColliding = distance < collisionThreshold;

          if (isColliding) {
            return false;
          }

          return true;
        });

        const newOrbScore = orbScore + (orbs.length - filteredOrbs.length);

        return {
          ...state,
          orbs: filteredOrbs,
          orbScore: newOrbScore,
        };

  
        case 'RESTART_GAME':
          return {
            ...initialState,
            position: { x: 20, y: 0 },
            score: 0,
            gameOver: false,
            youWin: false,
            isSpacebarPressed: false,
            orbs: [],
            orbScore: 0,
            groundHeight: 360,
          };

      default:
        return state;
    }
  };
  
  export default rootReducer;
  