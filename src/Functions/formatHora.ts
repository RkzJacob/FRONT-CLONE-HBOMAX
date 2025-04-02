export const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    // Formatea la salida en HH:MM:SS
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
};