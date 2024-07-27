import React, { useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import TextTicker from "react-native-text-ticker";
import { CityTimes } from "@/lib/city";
import CustomCountdown from "./CustomCountdown";

interface HeaderContent {
  masjidName?: string;
  masjidCity?: string;
  idCity?: any;
}

interface ImagesContent {
  vimagesContent?: any;
}

interface ScreenTVContent {
  textMotion?: string;
}

const ScreenTV = ({
  masjidName,
  masjidCity,
  vimagesContent,
  textMotion,
  idCity,
}: HeaderContent & ImagesContent & ScreenTVContent) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isPrayerTime, setIsPrayerTime] = useState<boolean>(false);

  const now = new Date();
  const day = now.getDay();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  // Simulate fetching city times from the database or API
  const cityTimes = CityTimes({
    city: idCity,
    year: year,
    month: month,
    day: date,
  });

  const schedules = {
    subuh: cityTimes?.subuh,
    dzuhur: cityTimes?.dzuhur,
    ashar: cityTimes?.ashar,
    maghrib: cityTimes?.maghrib,
    isya: "20:54",
  };
  const iqamahTimes = {
    subuh: 5,
    dzuhur: 10,
    ashar: 20,
    maghrib: 15,
    isya: 5,
  };

  useEffect(() => {
    // Set initial current time and check if it's prayer time
    const intervalId = setInterval(() => {
      const time = getTime();
      setCurrentTime(time);
      checkPrayerTime(time);
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getDate = () => {
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];

    const dayNames = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    return `${dayNames[day]}, ${date} ${monthNames[month]} ${year}`;
  };

  const getTime = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  };

  const checkPrayerTime = (currentTime: string) => {
    const timesToCheck = cityTimes || schedules;
    setIsPrayerTime(Object.values(timesToCheck).includes(currentTime));
  };

  return (
    <View className="bg-lime-300 divide-y rounded-xl pb-4 px-2">
      <View className="flex-row justify-between items-center py-3">
        <Text className="w-[70px] text-center font-pbold">{getDate()}</Text>
        <View className="flex-col justify-between items-center">
          <Text className="w-[200px] text-center font-psemibold text-lg">
            {masjidName}
          </Text>
          <Text className="w-[200px] text-center font-pmedium text-base">
            {masjidCity}
          </Text>
        </View>
        <Text className="w-[73px] text-2xl font-pbold">{currentTime}</Text>
      </View>
      <View className="flex-row justify-center items-center h-48 w-full">
        <CustomCountdown
          schedules={schedules}
          isPrayerTime={isPrayerTime}
          iqamahTimes={iqamahTimes}
        />
        {/* <Image
          source={vimagesContent}
          className="w-full h-full"
          resizeMode="cover"
        /> */}
      </View>
      <View className="flex-row justify-center items-center my-2 pt-1">
        <TextTicker
          duration={10000}
          loop
          bounce
          repeatSpacer={50}
          marqueeDelay={1000}
          className="text-base font-pmedium"
        >
          {textMotion}
        </TextTicker>
      </View>
      <View className="flex-row justify-between items-center grid grid-rows-6 divide-x pt-2">
        <View className="flex-col items-center w-20">
          <Text className="text-base font-pmedium">Subuh</Text>
          {cityTimes && (
            <Text className="text-lg font-psemibold">{cityTimes.subuh}</Text>
          )}
        </View>

        <View className="flex-col justify-between items-center w-20">
          <Text className="text-base font-pmedium">Dzuhur</Text>
          {cityTimes && (
            <Text className="text-lg font-psemibold">{cityTimes.dzuhur}</Text>
          )}
        </View>
        <View className="flex-col justify-between items-center w-20">
          <Text className="text-base font-pmedium">Ashar</Text>
          {cityTimes && (
            <Text className="text-lg font-psemibold">{cityTimes.ashar}</Text>
          )}
        </View>
        <View className="flex-col justify-between items-center w-20">
          <Text className="text-base font-pmedium">Maghrib</Text>
          {cityTimes && (
            <Text className="text-lg font-psemibold">{cityTimes.maghrib}</Text>
          )}
        </View>
        <View className="flex-col justify-between items-center w-20">
          <Text className="text-base font-pmedium">Isya</Text>
          {cityTimes && (
            <Text className="text-lg font-psemibold">{cityTimes.isya}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ScreenTV;
