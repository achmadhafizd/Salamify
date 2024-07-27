import axios from "axios";
import { useState, useEffect } from "react";

const fetchPrayerTimes = async () => {
  try {
    const response = await axios.get(
      "http://api.aladhan.com/v1/calendarByCity",
      {
        params: {
          city: "Jakarta",
          country: "Indonesia",
          method: "2", // Metode perhitungan (2 untuk ISNA)
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          school: "1", // Madhab (1 untuk Shafi'i)
        },
      }
    );
    const timings = response.data.data[0].timings;
    for (const key in timings) {
      timings[key] = timings[key].replace("(WIB)", "");
    }

    return timings;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
};

export const PrayerTimes = () => {
  const [adzanTimes, setAdzanTimes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const times = await fetchPrayerTimes();
      setAdzanTimes(times);
    };

    fetchData();
  }, []);
  return adzanTimes;
};
