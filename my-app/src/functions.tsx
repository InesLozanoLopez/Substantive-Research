export const percentage = (total: number, partial: number) : number => {
    if (total === 0){
        return 0
    } else {
        return Math.round((partial / total) * 100);
    }
}