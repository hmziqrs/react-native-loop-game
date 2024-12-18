import React from "react";
import { View, Image, Text, ScrollView } from "react-native";
import { router } from "expo-router";
import * as Linking from "expo-linking";

import { FontAwesome6 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { PageView } from "@/components/PageView";
import * as data from "./data";
import { Contact, Support } from "./data";

export default function AboutDeveloperScreen() {
  function open(contact: Contact) {
    let url = '';
    switch (contact.platform) {
      case 'linkedin':
        url = `https://linkedin.com/in/${contact.username}`;
        break;
      case 'github':
        url = `https://github.com/${contact.username}`;
        break;
      case 'x':
        url = `https://x.com/${contact.username}`;
        break;
      case 'gmail':
        url = `mailto:${contact.username}`;
        break;
      case 'telegram':
        url = `https://t.me/${contact.username}`;
        break;
    }
    console.log(url);
    if (url) Linking.openURL(url);
  }

  return (
    <PageView
      header={{
        title: 'About developer',
        onLeft: router.back,
        icon: 'arrow-left',
      }}
    >
      <ScrollView className="flex-1 px-4">
        <View className="mx-auto my-8">
          <Image
            source={require('@/assets/goku.png')}
            className="rounded-full"
            style={{ width: 160, height: 160 }}
          />
        </View>
        <Text className="text-3xl font-bold text-primary">@Hmziqrs</Text>
        <Text className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Full stack engineer
        </Text>
        <View className="h-4" />

        {/* Skills */}
        <View className="flex-row flex-wrap gap-2.5 mb-6">
          {data.skills.map((skill) => (
            <View
              key={skill}
              className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-full"
            >
              <Text key={skill} className="text-zinc-700 dark:text-zinc-300">
                {skill}
              </Text>
            </View>
          ))}
        </View>

        {/* Contacts */}
        <Text className="text-xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">
          Let's Chat!
        </Text>

        <View className="gap-4">
          {data.contacts.map((contact: Contact) => (
            <TouchableOpacity
              key={contact.icon}
              className="flex-row items-center gap-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
              onPress={() => open(contact)}
            >
              <FontAwesome6
                name={contact.icon as any} // Type assertion since FontAwesome6 has its own icon types
                className="text-xl text-zinc-900 dark:text-zinc-50"
              />
              <Text className="text-zinc-700 dark:text-zinc-300 font-medium">
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
          If you like the project and want to appreciate my effort. Then please
          click any of these links and perform any action you may like.
        </Text>

        <View className="gap-4">
          {data.showSupport.map((support: Support) => (
            <TouchableOpacity
              key={support.link}
              className="flex-row items-center gap-4 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
              onPress={() => Linking.openURL(support.link)}
            >
              <FontAwesome6
                name={support.icon as any}
                className="text-2xl text-zinc-900 dark:text-zinc-50"
              />
              <Text className="text-zinc-700 dark:text-zinc-300 font-medium">
                {support.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View className="h-4" />
      </ScrollView>
    </PageView>
  );
}














