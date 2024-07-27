import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ControlerTimer = ({ subuh, dzuhur, ashar, maghrib, isya }: any) => {
  return (
    <View className="flex flex-col">
      <View>
        <Text>Subuh : {subuh}</Text>
        <TouchableOpacity>
          <Text className="text-white">Start</Text>
        </TouchableOpacity>
        <Text className="text-white">{0}</Text>
        <TouchableOpacity>
          <Text className="text-white">End</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Dzuhur : {dzuhur}</Text>
        <TouchableOpacity>
          <Text className="text-white">Start</Text>
        </TouchableOpacity>
        <Text className="text-white">{0}</Text>
        <TouchableOpacity>
          <Text className="text-white">End</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Ashar : {ashar}</Text>
        <TouchableOpacity>
          <Text className="text-white">Start</Text>
        </TouchableOpacity>
        <Text className="text-white">{0}</Text>
        <TouchableOpacity>
          <Text className="text-white">End</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Maghrib : {maghrib}</Text>
        <TouchableOpacity>
          <Text className="text-white">Start</Text>
        </TouchableOpacity>
        <Text className="text-white">{0}</Text>
        <TouchableOpacity>
          <Text className="text-white">End</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>Isya : {isya}</Text>
        <TouchableOpacity>
          <Text className="text-white">Start</Text>
        </TouchableOpacity>
        <Text className="text-white">{0}</Text>
        <TouchableOpacity>
          <Text className="text-white">End</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ControlerTimer;
