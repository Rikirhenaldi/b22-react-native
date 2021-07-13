/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView} from 'react-native';
import {
    FormControl,
    Radio,
    NativeBaseProvider,
  } from 'native-base';
import Button from '../components/Button';

export default class EditProfile extends Component {
  render() {
    return (
      <NativeBaseProvider style={styles.BigParent}>
        <View style={styles.parent}>
        <Text style={styles.title}> Edit Profile </Text>
        </View>
        <ScrollView style={styles.scrollWrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.boxWrapper}>
            <View style={styles.imageWrapper} />
           <View style={styles.imageEditor} />
        </View>
        <FormControl style={styles.FormBox}>
            <Text>Name:</Text>
            <TextInput style={styles.BoxText}
             placeholder="zulaikha17@gmail.com"
             underlineColorAndroid="transparent"
             editable={false}
             selectTextOnFocus={false}/>
             <View style={styles.separator} />
             <View>
                <Radio.Group
                style={styles.Radio}
                defaultValue="1"
                name="myRadioGroup"
                accessibilityLabel="gender"
                >
                <Radio accessibilityLabel="female" style={styles.RadioChild} value="1" my={1}>
                <Text style={styles.BoxText2}>Female</Text>
                </Radio>
                <Radio accessibilityLabel="male" style={styles.RadioChild} value="2" my={1}>
                <Text style={styles.BoxText2}>Male</Text>
                </Radio>
                </Radio.Group>
             </View>
             <Text>Email Adress:</Text>
            <TextInput style={styles.BoxText}
             placeholder="Iskandar Street"
             underlineColorAndroid="transparent"
             editable={false}
             selectTextOnFocus={false}/>
             <View style={styles.separator} />
             <Text>Phone Number:</Text>
            <TextInput style={styles.BoxText}
             placeholder="+62 81348287878"
             underlineColorAndroid="transparent"
             editable={false}
             selectTextOnFocus={false}/>
             <View style={styles.separator} />
             <Text>Date of Birth</Text>
            <TextInput style={styles.BoxText}
             placeholder="December 21th 1998"
             underlineColorAndroid="transparent"
             editable={false}
             selectTextOnFocus={false}/>
             <View style={styles.separator} />
             <Text>Delivery Adress :</Text>
            <TextInput style={styles.BoxText}
             placeholder="Iskandar Street Block A Number 102"
             multiline = {true}
            numberOfLines = {2}
             underlineColorAndroid="transparent"
             editable={false}
             selectTextOnFocus={false}/>
             <View style={styles.separator} />
             <View style={styles.Button} >
              <Button buttonName="Save and Update"/>
             </View>
        </FormControl>
        </ScrollView>
      </NativeBaseProvider>
    );
  }
}

const styles = StyleSheet.create({
    parent: {
        alignItems: 'center',
        paddingBottom: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    imageWrapper: {
        backgroundColor: 'grey',
        width: 120,
        height: 120,
        borderRadius: 60,
        margin: 10,
      },
      imageEditor: {
        backgroundColor: '#6A4029',
        width: 30,
        height: 30,
        borderRadius: 20,
        marginTop: -50,
        marginRight: -88,
      },
      boxWrapper: {
        alignItems: 'center',
      },
      Radio: {
        flexDirection: 'row',
      },
      FormBox: {
        width: 280,
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 40,
      },
      RadioChild: {
        marginRight:20,
        marginBottom: 10,
      },
      separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#6A4029',
        marginVertical: 10,
      },
      scrollWrapper: {
        marginBottom: 70,
    },
    Button: {
      marginTop: 30,
    },
    BoxText2: {
      marginLeft: 8,
    },
});
