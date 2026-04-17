import React from "react";
import { View } from "react-native";
import { config } from "./config";
import { vars } from "nativewind";

type Mode = "light" | "dark";

const themes = {
  light: vars(
    Object.fromEntries(
      Object.entries(config.light).map(([k, v]) => [k, `rgb(${v})`])
    )
  ),
  dark: vars(
    Object.fromEntries(
      Object.entries(config.dark).map(([k, v]) => [k, `rgb(${v})`])
    )
  ),
};

export function GluestackUIProvider({
  mode = "light",
  children,
}: {
  mode?: Mode;
  children: React.ReactNode;
}) {
  return (
    <View style={[{ flex: 1 }, themes[mode]]}>
      {children}
    </View>
  );
}
