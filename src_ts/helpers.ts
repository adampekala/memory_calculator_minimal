const randomNumber = (min: number = 1, max: number = 10) => {
  return Math.floor(Math.random() * (max - min + 1) + 1);
};

export const calculateNumberHelper = (difficulty: number): number => {
  switch (difficulty) {
    case 1: {
      return randomNumber();
    }
    case 2: {
      return randomNumber(2, 10);
    }
    case 3: {
      return randomNumber(5, 10);
    }
    case 4: {
      return randomNumber(2, 12);
    }
    case 5: {
      return randomNumber(5, 15);
    }
    default: {
      return randomNumber();
    }
  }
};
