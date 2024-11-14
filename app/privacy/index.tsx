// rnloop/app/privacy/index.tsx
import React from "react";
import { ScrollView, View, Text } from "react-native";
import { router } from "expo-router";
import { PageView } from "@/components/PageView";

export default function PrivacyPolicy() {
  return (
    <PageView
      header={{
        title: "Privacy Policy",
        icon: "arrow-left",
        onLeft: () => router.back(),
      }}
    >
      <ScrollView className="flex-1 p-4">
        <View className="max-w-4xl mx-auto">
          <Text className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
            Privacy Policy
          </Text>

          <Section title="Introduction">
            This privacy policy outlines how "React Native Loop" collects, uses,
            and protects information when you use our mobile application. Our
            app is a simple puzzle game that focuses on providing an
            entertaining experience while respecting user privacy.
          </Section>

          <Section title="Information Collection and Use">
            Our app is designed to be privacy-focused and collects minimal data.
            We do not collect any personal information or usage data. The app
            functions entirely offline and does not require any internet
            connection to operate.
          </Section>

          <Section title="Types of Data Stored">
            The following information may be stored locally on your device:

          </Section>
            <List
              items={[
                "Sound settings and preferences",
                "Theme preferences",
                "Volume settings",
              ]}
            />
            <View className="h-8" />

          <Section title="Data Storage">
            All game data and settings are stored locally on your device. We do
            not transmit or store any data on external servers. Your game
            progress and settings remain private on your device.
          </Section>

          <Section title="Media Content">
            The app includes music tracks from orangefreesounds.com, used with
            appropriate attribution. These audio files are included within the
            app package and do not require any external downloads or data
            collection.
          </Section>

          <Section title="Data Security">
            Since all data is stored locally on your device, its security is
            managed by your device's built-in security features. We do not have
            access to any of your game data or settings.
          </Section>

          <Section title="Children's Privacy">
            Our app is suitable for all ages and does not collect any personal
            information from children or adults. The game can be played safely
            by users of any age without privacy concerns.
          </Section>

          <Section title="Changes to This Privacy Policy">
            We may update our Privacy Policy from time to time. Thus, you are
            advised to review this page periodically for any changes. These
            changes are effective immediately after they are posted on this
            page.
          </Section>

          <Section title="Contact Us">
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us. Developer: Hamza Iqbal Email:
            hmziqrs@gmail.com
          </Section>

          <Text className="text-sm italic text-zinc-600 dark:text-zinc-400 mt-6">
            This privacy policy is effective as of Aug, 2024
          </Text>
        </View>
      </ScrollView>
    </PageView>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mb-6">
      <Text className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
        {title}
      </Text>
      <Text className="text-base text-zinc-700 dark:text-zinc-300">
        {children}
      </Text>
    </View>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <View className="mt-2">
      {items.map((item, index) => (
        <Text
          key={index}
          className="text-base text-zinc-700 dark:text-zinc-300 ml-4"
        >
          • {item}
        </Text>
      ))}
    </View>
  );
}
