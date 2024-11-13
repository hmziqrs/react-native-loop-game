import React from "react";
import { View, Image, Text } from "react-native";
import { router } from "expo-router";
import * as Linking from "expo-linking";

import { FontAwesome6 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { PageView } from "@/components/PageView";
import * as data from "./data";
import { Contact, Support } from "./data";

export default function AboutDeveloperScreen() {
  function open(contact: Contact) {
    let url = "";
    switch (contact.platform) {
      case "linkedin":
        url = `https://linkedin.com/in/${contact.username}`;
        break;
      case "github":
        url = `https://github.com/${contact.username}`;
        break;
      case "x":
        url = `https://x.com/${contact.username}`;
        break;
      case "gmail":
        url = `mailto:${contact.username}`;
        break;
      case "telegram":
        url = `https://t.me/${contact.username}`;
        break;
    }
    console.log(url);
    if (url) Linking.openURL(url);
  }

  return (
    <PageView
      header={{
        title: "About developer",
        onLeft: router.back,
        icon: "arrow-back",
      }}
    >
      {/* Body */}
      <View className="flex-1 px-4">
        <View className="max-w-4xl mx-auto w-full">
          <View className="mx-auto my-8">
            <Image
              source={require("@/assets/goku.png")}
              className="rounded-full"
              style={{ width: 160, height: 160 }}
            />
          </View>
          <Text className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Full stack engineer
          </Text>

          {/* Skills */}
          <View className="flex-row flex-wrap gap-2 mb-6">
            {data.skills.map((skill) => (
              <Text
                key={skill}
                className="px-3.5 py-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full text-zinc-700 dark:text-zinc-300"
              >
                {skill}
              </Text>
            ))}
          </View>

          {/* Contacts */}
          <Text className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
            Let's Chat!
          </Text>

          <View className="space-y-3">
            {data.contacts.map((contact: Contact) => (
              <TouchableOpacity
                key={contact.icon}
                className="flex-row items-center space-x-3 p-2"
                onPress={() => open(contact)}
              >
                <FontAwesome6
                  name={contact.icon as any} // Type assertion since FontAwesome6 has its own icon types
                  size={24}
                  className="text-zinc-900 dark:text-zinc-50"
                />
                <Text className="text-zinc-700 dark:text-zinc-300">
                  {contact.username}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Support Section */}
          <Text className="text-xl font-bold mt-6 mb-2 text-zinc-900 dark:text-zinc-50">
            Show support
          </Text>

          <Text className="text-base mb-4 text-zinc-700 dark:text-zinc-300">
            If you like the project and want to appreciate my effort. Then
            please click any of these links and perform any action you may like.
          </Text>

          <View className="space-y-2">
            {data.showSupport.map((support: Support) => (
              <TouchableOpacity
                key={support.link}
                className="p-2"
                onPress={() => Linking.openURL(support.link)}
              >
                <Text className="text-zinc-700 dark:text-zinc-300">
                  * {support.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </PageView>
  );
}
