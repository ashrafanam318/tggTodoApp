import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export interface BottomSheetProps {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      animationType={Platform.select({ default: "slide", web: "fade" })}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.select({ ios: "padding" })}
        style={styles.modalContainer}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalTitleContainer}>
            <Text
              style={styles.modalTitle}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Ionicons
              name={"close"}
              size={20}
              color={Colors.border}
              onPress={onClose}
            />
          </View>

          <View style={styles.childrenContainer}>{children}</View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: Platform.select({ web: "center" }),
    justifyContent: Platform.select({ web: "center", default: "flex-end" }),
    backgroundColor: Colors.modalTintedBackground,
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: Colors.inputBackground,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      web: {
        minWidth: 360,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
    }),
  },
  modalTitleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginRight: 12,
    color: Colors.text,
  },
  childrenContainer: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    width: "100%",
    height: 180,
    padding: 20,
  },
});
