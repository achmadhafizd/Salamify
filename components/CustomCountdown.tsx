import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

interface ShalatTimerProps {
  schedules: {
    subuh?: string;
    dzuhur?: string;
    ashar?: string;
    maghrib?: string;
    isya?: string;
  };
  iqamahTimes: {
    subuh?: number; // IQAMAH time in minutes after prayer
    dzuhur?: number;
    ashar?: number;
    maghrib?: number;
    isya?: number;
  };
  isPrayerTime?: boolean;
}

const ShalatTimer = ({
  schedules = {},
  iqamahTimes = {},
  isPrayerTime,
}: ShalatTimerProps) => {
  const [seconds, setSeconds] = useState<number>(60);
  const [nextPrayer, setNextPrayer] = useState<string | null>(null);

  useEffect(() => {
    const updateCountdown = () => {
      const now = dayjs();
      let upcomingPrayerTime: dayjs.Dayjs | null = null;
      let iqamahTime: dayjs.Dayjs | null = null;

      console.log("Schedules:", schedules);
      console.log("Iqamah Times:", iqamahTimes);

      // Iterate through each prayer time
      for (const [prayer, time] of Object.entries(schedules)) {
        if (time) {
          const prayerTime = dayjs(time, "HH:mm");

          console.log(
            `Checking prayer ${prayer}: ${prayerTime.format(
              "HH:mm"
            )}, now: ${now.format("HH:mm")}, Valid: ${prayerTime.isValid()}`
          );

          if (prayerTime.isSame(now, "minute")) {
            const iqamahMinutes = iqamahTimes[prayer];
            if (iqamahMinutes !== undefined) {
              iqamahTime = prayerTime.add(iqamahMinutes, "minute");
              console.log(
                `Iqamah Time for ${prayer}: ${iqamahTime.format("HH:mm")}`
              );
            } else {
              console.warn(`Iqamah time for ${prayer} is not defined.`);
            }
          }

          // Update the next prayer time
          if (
            prayerTime.isAfter(now) &&
            (!upcomingPrayerTime || prayerTime.isBefore(upcomingPrayerTime))
          ) {
            upcomingPrayerTime = prayerTime;
          }
        }
      }

      if (iqamahTime) {
        setNextPrayer(iqamahTime.format("HH:mm"));
        setSeconds(iqamahTime.diff(now, "seconds"));
      } else if (upcomingPrayerTime) {
        setNextPrayer(upcomingPrayerTime.format("HH:mm"));
        setSeconds(upcomingPrayerTime.diff(now, "seconds"));
      } else {
        console.warn("No upcoming prayer time or iqamah time found.");
        setSeconds(0);
      }
    };

    // Initial countdown setup
    updateCountdown();

    // Update countdown every second
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      }
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, [schedules, iqamahTimes, seconds]);

  useEffect(() => {
    if (isPrayerTime) {
      setSeconds(0);
    }
  }, [isPrayerTime]);

  const formatTime = (sec: number) => {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View className="flex flex-1 justify-center items-center">
      <Text className="font-bold text-6xl">
        {isPrayerTime ? `Iqamah Time: ${nextPrayer}` : formatTime(seconds)}
      </Text>
    </View>
  );
};

export default ShalatTimer;
