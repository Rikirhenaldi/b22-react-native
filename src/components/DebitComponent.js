/* eslint-disable prettier/prettier */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

export default function DebitComponent() {
  return (
    <View>
      <View>
        <View style={styles.parentCard}>
          <Image style={styles.card}
          source={require('../assets/card.png')}
          />
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
        height: 190,
        marginLeft: 8,
        backgroundColor: 'grey',
        marginBottom: 20,
        borderRadius: 10,
      },
});
