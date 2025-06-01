import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type FiltersProps = {
  options: string[];
  activeIndex: number;
  onChange: (index: number) => void;
};

export const Filters: React.FC<FiltersProps> = ({
  options,
  activeIndex,
  onChange,
}) => {
  const indicatorX = useRef(new Animated.Value(0)).current;
  const buttonWidths = useRef<number[]>([]);
  const [containerWidth, setContainerWidth] = React.useState(0);

  useEffect(() => {
    // Animate indicator to the active button
    let offset = 0;
    for (let i = 0; i < activeIndex; i++) {
      offset += buttonWidths.current[i] || 0;
    }
    Animated.spring(indicatorX, {
      toValue: offset,
      useNativeDriver: true,
      speed: 25,
      bounciness: 8,
    }).start();
  }, [activeIndex, containerWidth]);

  // Called when a button's layout is measured
  const onBtnLayout = (i: number, e: LayoutChangeEvent) => {
    buttonWidths.current[i] = e.nativeEvent.layout.width;
  };

  return (
    <View
      style={styles.filtersContainer}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      {options.map((option, i) => {
        const isActive = i === activeIndex;
        return (
          <TouchableOpacity
            key={option}
            style={[
              styles.filterBtn,
              isActive ? styles.filterBtnActive : styles.filterBtnInactive,
            ]}
            onPress={() => onChange(i)}
            activeOpacity={0.88}
            onLayout={(e) => onBtnLayout(i, e)}
          >
            {isActive ? (
              <LinearGradient
                colors={["#EC407A", "#A770EF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientBorder}
              >
                <View style={styles.filterBtnContentActive}>
                  <Text style={styles.filterTextActive}>{option}</Text>
                </View>
              </LinearGradient>
            ) : (
              <View style={styles.filterBtnContentInactive}>
                <Text style={styles.filterTextInactive}>{option}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  filterBtn: {
    borderRadius: 999,
    overflow: "hidden",
    flex: 1,
  },
  filterBtnActive: {
    borderWidth: 0,
  },
  filterBtnInactive: {
    borderWidth: 1,
    borderColor: "#dadada",
    backgroundColor: "#fff",
  },
  gradientBorder: {
    borderRadius: 999,
    padding: 1.5,
  },
  filterBtnContentActive: {
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  filterBtnContentInactive: {
    backgroundColor: "#fff",
    borderRadius: 999,
    paddingVertical: 7,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  filterTextActive: {
    fontWeight: "700",
    color: "#EC407A",
    fontSize: 16,
  },
  filterTextInactive: {
    fontWeight: "600",
    color: "#B0B0B0",
    fontSize: 16,
  },
});
