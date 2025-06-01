import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FilterIcon from "../assets/icons/filterIcon.svg";
import SearchIcon from "../assets/icons/searchIconsvg.svg";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search courses...",
  value,
  onChangeText,
  onFilterPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, isFocused && styles.containerFocused]}>
      <SearchIcon width={20} height={20} />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor="#aaa"
        returnKeyType="search"
        underlineColorAndroid="transparent"
      />

      <TouchableOpacity
        onPress={onFilterPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <FilterIcon width={26} height={26} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === "ios" ? 10 : 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    borderColor: "#e5e5e5",
    borderWidth: 1.5,
    width: "100%",
  },
  containerFocused: {
    borderColor: "#C50000",
  },
  input: {
    flex: 1,
    fontSize: 18,
    marginHorizontal: 8,
    color: "#2c3e50",
    paddingVertical: 0, // vertically center text input on Android
  },
});
