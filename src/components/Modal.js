import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View, Alert } from "react-native";

export default class ModalExample extends Component {
  render() {
    const { modalVisible, modalData, onRequestClose } = this.props;
    console.log("modalVisible", modalVisible);
    console.log("modalData", modalData);
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => onRequestClose()}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
