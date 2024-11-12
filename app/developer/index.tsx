import React from "react";
import { View, Image, Linking } from "react-native";
import { router } from "expo-router";
import { PageView } from "@/components/PageView";
import { Skills } from "@/components/developer/Skills";
import { ContactLinks } from "@/components/developer/ContactLinks";
import { SupportLinks } from "@/components/developer/SupportLinks";

export default function DeveloperScreen() {
  return (
    <PageView type="scroll" disableMaxContainer baseStyle="bg-primary">
      <View className="min-h-screen">
        {/* Header with Avatar */}
        <View className="h-32 bg-primary">
          <Pressable
            onPress={() => router.back()}
            className="absolute top-safe-top left-4"
          >
            <Icon name="arrow-back" size={24} color="white" />
          </Pressable>
        </View>

        {/* Content */}
        <View className="flex-1 bg-gray-900 rounded-t-3xl -mt-6">
          {/* Avatar */}
          <View className="absolute -top-16 left-1/2 -ml-16">
            <View className="w-32 h-32 rounded-full bg-primary p-1">
              <Image
                source={require("../assets/avatar.png")}
                className="w-full h-full rounded-full"
              />
            </View>
          </View>

          <View className="pt-20 px-4">
            <Text className="text-2xl font-bold text-white text-center mb-2">
              Full Stack Developer
            </Text>

            <Text className="text-gray-300 text-center mb-8">
              Hi, I am a full stack developer who has been developing end to end
              smart solutions for more than three years. I help throughout the
              life cycle of an assigned project with my experience and ensure
              quality solutions that meet objectives.
            </Text>

            <Skills />
            <ContactLinks />
            <SupportLinks />
          </View>
        </View>
      </View>
    </PageView>
  );
}
