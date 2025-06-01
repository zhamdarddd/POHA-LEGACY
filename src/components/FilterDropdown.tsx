import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function FilterDropdown({
  title,
  options,
  selectedValues,
  onApply,
}: {
  title: string;
  options: { label: string; value: string }[];
  selectedValues: string[];
  onApply: (values: string[]) => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [tempSelected, setTempSelected] = useState(selectedValues || []);

  // Get the label for the selected value(s)
  const getDisplayLabel = () => {
    if (selectedValues.length === 1) {
      const found = options.find((item) => item.value === selectedValues[0]);
      return found ? found.label : title;
    }
    return title;
  };

  // Show badge if more than one selected
  const showBadge = selectedValues.length > 1;

  const handleOption = (value: string) => {
    let updated: string[];
    if (tempSelected.includes(value)) {
      updated = tempSelected.filter((v) => v !== value);
    } else {
      updated = [...tempSelected, value];
    }
    setTempSelected(updated);
    // Immediately apply and close modal on select
    onApply(updated);
    setModalVisible(false);
  };

  const handleClear = () => {
    setTempSelected([]);
    onApply([]);
    setModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => {
          setTempSelected(selectedValues || []);
          setModalVisible(true);
        }}
      >
        <Text style={styles.triggerText}>{getDisplayLabel()}</Text>
        {showBadge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{selectedValues.length}</Text>
          </View>
        )}
        <Ionicons name="chevron-down" size={16} color="#888" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <Pressable style={styles.modalContent} onPress={() => {}}>
            <Text style={styles.modalTitle}>Select {title}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    tempSelected.includes(item.value) && styles.selectedOption,
                  ]}
                  onPress={() => handleOption(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      tempSelected.includes(item.value) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                  {tempSelected.includes(item.value) && (
                    <Ionicons name="checkmark" size={16} color="#C50000" />
                  )}
                </TouchableOpacity>
              )}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
                <Text style={styles.clearText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 4,
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,

    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#e5e5e5",
    height: 36,
  },
  triggerText: {
    fontSize: 14,
    color: "#222",
    marginRight: 4,
  },
  badge: {
    backgroundColor: "#C50000",
    borderRadius: 8,
    paddingHorizontal: 6,
    marginRight: 6,
    marginLeft: 2,
    minWidth: 18,
    minHeight: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 280,
    maxHeight: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    elevation: 8,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
    color: "#222",
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  selectedOption: {
    backgroundColor: "#fbeeee",
  },
  optionText: {
    fontSize: 15,
    color: "#333",
  },
  selectedOptionText: {
    color: "#C50000",
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 12,
    gap: 12,
  },
  clearBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  clearText: {
    color: "#333",
  },
});
