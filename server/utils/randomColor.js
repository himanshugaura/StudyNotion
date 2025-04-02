const getRandomHexColor = () => {
    return Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
  };
  
export const getRandomColors = () => {
    const color1 = getRandomHexColor();
    const color2 = getRandomHexColor();
    return `${color1},${color2}`;
  };