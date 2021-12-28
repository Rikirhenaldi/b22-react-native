/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, Image } from 'react-native';

const Message = ({styleMsgCard, ItemIMG, styleImgMsg, styleMsgText, ItemMsg}) => {
    return (
      <View
          style={styleMsgCard}>
          {ItemIMG !== null ?
          <>
          <Image
          style={styleImgMsg}
          source={{uri: ItemIMG}}
        />
        <Text style={styleMsgText}>{ItemMsg}</Text>
          </>
        :
        <Text style={styleMsgText}>{ItemMsg}</Text>
        }
        </View>
    );
};


export default Message;
