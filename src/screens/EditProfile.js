/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, View, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity, Alert} from 'react-native';
import {
    FormControl,
    Radio,
    NativeBaseProvider,
  } from 'native-base';
import { getProfile } from '../redux/actions/profile';
import { connect } from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { editPutProfile } from '../redux/actions/profile';
import ButtonAction from '../components/ButtonAction';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state =  {img: null, name: '', email: '', phoneNumber: '', address : '' };
  }
  async componentDidMount(){
    const {token} = this.props.auth;
    await this.props.getProfile(token);
    // await this.props.getHistoryProducts(token);
    const {user} = this.props.profile?.data;
    this.setState({email: user.email});
    this.setState({name: user.name});
    this.setState({img: user.img});
    this.setState({phoneNumber: user.phoneNumber});
    this.setState({address: user.address});
    console.log('ini email setstate', this.state);
  }

  onSelectImageFrom = () => {
    Alert.alert('Option', 'Choose your Picture By :', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Camera',
        onPress: () => this.selectImageByTakeCamera(),
      },
      {
        text: 'Storage',
        onPress: () => this.selectFromGalery(),
      },
    ]);
  };

  selectFromGalery = (e) => {
    launchImageLibrary({}, response => {
      if (!response.didCancel) {
        const maxSize = 1024 * 1024;
        if (response.assets[0].fileSize < maxSize) {
          this.setState({img : response.assets[0].uri});
        } else {
          showMessage({
            message: 'Selected Image is to Large!',
            type: 'info',
            backgroundColor: 'red',
            color: 'white',
            duration: 1000,
          });
        }
      }
    });
  };

  selectImageByTakeCamera= (e) => {
    let options = {
      mediaType: 'photo',
      maxWidth: 150,
      maxHeight: 150,
    };
    launchCamera(options, response => {
      if (!response.didCancel) {
        const maxSize = 1024 * 1024;
        if (response.assets[0].fileSize < maxSize) {
          this.setState({img: response.assets[0].uri});
        } else {
          showMessage({
            message: 'Size of Taken Image is to Large',
            type: 'success',
            backgroundColor: 'red',
            color: 'white',
            duration: 100,
          });
        }
      }
    });
  };

  onEditProfile = (e) => {
    e.preventDefault();
    const {img, name, email, phoneNumber, address} = this.state;
    const {token} = this.props.auth;
    this.props.editPutProfile({img, name, email, phoneNumber, address}, token).then(() => {
      if (this.props.profile.message === 'Profile Updated Sucsessfully') {
        showMessage({
          message: 'Profile Updated Sucsessfully',
          type: 'info',
          backgroundColor: '#6A4029',
          duration: 1,
        });
      }
      this.props.getProfile(this.props.auth.token);
      return this.props.navigation.navigate('user');
    });
  }

  render() {
    return (
      <NativeBaseProvider style={styles.BigParent}>
        <View style={styles.parent}>
        <Text style={styles.title}> Edit Profile </Text>
        </View>
        <ScrollView style={styles.scrollWrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.boxWrapper}>
            <Image style={styles.imageWrapper}
            source={{uri: this.state.img}}
            />
           <TouchableOpacity  style={styles.imageEditor} onPress={this.onSelectImageFrom}>
             <FaIcon name="camera" size={15} color={'white'} />
           </TouchableOpacity>
        </View>
        <FormControl style={styles.FormBox}>
            <Text>Name:</Text>
            <TextInput style={styles.BoxText}
             placeholder={this.state.name}
             underlineColorAndroid="transparent"
             editable={true}
             selectTextOnFocus={false}
             value={this.state.name}
             onChangeText={value=>this.setState({name:value})}
             placeholderTextColor={'black'}
             />
             <View style={styles.separator} />
             <View>
                <Radio.Group
                style={styles.Radio}
                defaultValue="1"
                name="myRadioGroup"
                accessibilityLabel="gender"
                >
                <Radio accessibilityLabel="male" style={styles.RadioChild} value="1" my={1}>
                <Text style={styles.BoxText2}>Male</Text>
                </Radio>
                <Radio accessibilityLabel="female" style={styles.RadioChild} value="2" my={1}>
                <Text style={styles.BoxText2}>Female</Text>
                </Radio>
                </Radio.Group>
             </View>
             <Text>Email Adress:</Text>
            <TextInput style={styles.BoxText}
             placeholder={this.state.email}
             underlineColorAndroid="transparent"
             editable={true}
             selectTextOnFocus={false}
             value={this.state.email}
             onChangeText={value=>this.setState({email:value})}
             placeholderTextColor={'black'}/>
             <View style={styles.separator} />
             <Text>Phone Number:</Text>
            <TextInput style={styles.BoxText}
             placeholder={this.state.phoneNumber}
             underlineColorAndroid="transparent"
             editable={true}
             selectTextOnFocus={false}
             value={this.state.phoneNumber}
             onChangeText={value=>this.setState({phoneNumber:value})}
             placeholderTextColor={'black'}/>
             <View style={styles.separator} />
             <Text>Date of Birth</Text>
            <TextInput style={styles.BoxText}
             placeholder="December 21th 1998"
             underlineColorAndroid="transparent"
             editable={false}
             selectTextOnFocus={false}
             placeholderTextColor={'black'}/>
             <View style={styles.separator} />
             <Text>Delivery Adress :</Text>
            <TextInput style={styles.BoxText}
             placeholder={this.state.address}
             multiline = {true}
            numberOfLines = {2}
             underlineColorAndroid="transparent"
             editable={true}
             selectTextOnFocus={false}
             value={this.state.address}
             onChangeText={value=>this.setState({address:value})}
             placeholderTextColor={'black'}/>
             <View style={styles.separator} />
             <View style={styles.Button} >
              <ButtonAction buttonName="Save and Update" action={this.onEditProfile} />
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
        justifyContent: 'center',
        alignItems: 'center',
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

const mapStateToProps = state => ({
  profile : state.profile,
  auth: state.auth,
});
const mapDispatchToProps = {getProfile, editPutProfile};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
