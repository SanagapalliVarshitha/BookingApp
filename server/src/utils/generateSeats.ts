type Seat = { seatNumber: string; isBooked: boolean; };
export const generateSeats = () => {
  const seats: Seat[] = [];
  const rows = ["A", "B", "C"];
  rows.forEach((row) => { for (let i = 1; i <= 10; i++) { seats.push({ seatNumber: `${row}${i}`, isBooked: false }); } });
  return seats;
};
