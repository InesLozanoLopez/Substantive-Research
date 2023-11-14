export const percentage = (total: number, partial: number): number => {
  if (total === 0) {
    return 0;
  } else {
    return Math.round((partial / total) * 100);
  }
};

export function getRandomColors(sectors: number) {
  const colorsArray = [];
  for (let i = 0; i < sectors; i++) {
    const h = Math.floor(Math.random() * 60 + 180);
    const s = Math.floor(Math.random() * 30) + 70;
    const l = Math.floor(Math.random() * 30) + 70;
    colorsArray.push(`hsl(${h}, ${s}%, ${l}%)`);
  }
  return colorsArray;
}
