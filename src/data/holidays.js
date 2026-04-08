// Holiday markers
// Using current year dynamically
const YEAR = new Date().getFullYear();

const holidays = {
  [`${YEAR}-01-01`]: "New Year's Day",
  [`${YEAR}-01-26`]: "Republic Day (India)",
  [`${YEAR}-03-25`]: "Holi",
  [`${YEAR}-04-14`]: "Ambedkar Jayanti",
  [`${YEAR}-08-15`]: "Independence Day (India)",
  [`${YEAR}-10-02`]: "Gandhi Jayanti",
  [`${YEAR}-10-24`]: "Dussehra",
  [`${YEAR}-11-01`]: "Diwali",
  [`${YEAR}-12-25`]: "Christmas",
};

export default holidays;
