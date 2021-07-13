/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function DebitComponent() {
  return (
    <View>
      <View>
        <View style={styles.parentCard}>
          <View style={styles.card} />
          <View style={styles.separator} />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
      parentCard: {
        justifyContent: 'center',
        width: 310,
      },
      separator: {
        borderBottomWidth: 2,
        borderBottomColor: '#6A4029',
        marginVertical: 5,
        width: 310,
      },
      card: {
        width: 300,
        height: 160,
        marginLeft: 8,
        backgroundColor: 'grey',
        marginBottom: 20,
        borderRadius: 10,
      },
});
