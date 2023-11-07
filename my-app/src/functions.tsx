export const percentage = (total: number, partial: number) : number => {
    if (total === 0){
        return 0
    } else {
        return Math.round((partial / total) * 100);
    }
}

export function getRandomColor() {
  const h = Math.floor(Math.random() * 360); // Random hue (0-360)
  const s = Math.floor(Math.random() * 30) + 70; // Random saturation (70-100)
  const l = Math.floor(Math.random() * 30) + 70; // Random lightness (70-100)

  const color = `hsl(${h}, ${s}%, ${l}%)`;
  return color;
  }