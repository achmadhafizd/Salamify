import axios from "axios";
import { useState, useEffect } from "react";

const fetchPrayerTimes = async (city, year, month, day) => {
  try {
    const response = await axios.get(
      `https://api.myquran.com/v2/sholat/jadwal/${city}/${year}-0${month}-${day}`
    );
    return response?.data?.data?.jadwal;
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return null;
  }
};

export const CityTimes = ({ city, year, month, day }) => {
  const [cityTimes, setCityTimes] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const timesPrayer = await fetchPrayerTimes(city, year, month, day);
      setCityTimes(timesPrayer);
    };

    fetchData();
  }, []);
  return cityTimes;
};

export const getCityId = async (cityName) => {
  try {
    const response = await axios.get(
      `https://api.myquran.com/v2/sholat/kota/cari/${cityName}`
    );
    const cityData = response?.data?.data[0]?.id;
    return cityData;
  } catch (err) {
    console.error(err);
    setError("An error occurred while fetching the data");
  }
};
