/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import {FormControl, Input} from 'native-base';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import EnIcon from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getChatRoom} from '../redux/actions/chats';
import {sendMessage} from '../redux/actions/chats';
import { sendMessageWithImage } from '../redux/actions/chats';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8080');
import AwesomeAlert from 'react-native-awesome-alerts';
import { deleteChatRoom } from '../redux/actions/chats';
import { clearMessage } from '../redux/actions/chats';
import Message from '../components/Message';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      sort: '',
      chatroom: [],
      sendingMessage: '',
      sendImg: null,
      msgInput : React.createRef(),
      showAlert: false,
    };
  }

  componentDidMount() {
    const {token} = this.props.auth;
    this.props
      .getChatRoom(token, this.props.route.params.phoneNumber)
      .then(() => {
        this.setState({chatroom: this.props.chats.chatroom});
      });

    socket.on(this.props.profile?.data?.user.phoneNumber, (data) => {
        this.onGetChat(data.sender);
      });
    console.log('ini chatroom', this.state.chatroom);
    const {user} = this.props.profile?.data;
  }

  onGetChat = async (recipient) =>{
    const {token} = this.props.auth;
    await this.props.getChatRoom(token, recipient).then(()=> {
      this.setState({chatroom : this.props.chats.chatroom},
        () => {this.props.navigation.navigate('chatroom', {
            phoneNumber: this.props.route.params.phoneNumber,
            img: this.props.route.params.img,
            name: this.props.route.params.name,
          });}
        );
    });
    // console.log('ini chatroom',this.state.chatroom);
  }

  renderDataItem = ({item}) => {
    if (item.sender !== this.props.profile?.data?.user.phoneNumber) {
      return (
        <Message styleMsgCard = {styles.messageCard2}
        ItemIMG= {item.img}
        styleImgMsg= {styles.imagesMsg}
        styleMsgText= {styles.Message2}
        ItemMsg= {item.message} />
      );
    } else {
      return (
        <Message styleMsgCard = {styles.messageCard}
        ItemIMG= {item.img}
        styleImgMsg= {styles.imagesMsg2}
        styleMsgText= {styles.Message2}
        ItemMsg= {item.message} />
      );
    }
  };

  onSendMessage = async (e) => {
    await e.preventDefault();
    const {token} = this.props.auth;
    const {sendingMessage, sendImg} = this.state;
    if (this.props.chats?.chatroom?.length < 1 || this.props.chats?.chatroom === undefined){
      this.props.sendMessageWithImage(token, this.props.route.params.phoneNumber, sendingMessage, sendImg).then(()=> {
        this.onGetChat(this.props.route.params.phoneNumber);
        return Keyboard.dismiss();
      });
    } else if (
      this.props.chats.chatroom[0].sender !==
      this.props.profile?.data?.user.phoneNumber
    ) {
      this.props
        .sendMessageWithImage(token, this.props.chats.chatroom[0].sender, sendingMessage, sendImg)
        .then(() => {
          this.onGetChat(this.props.chats.chatroom[0].sender);
          return Keyboard.dismiss();
        });
    } else {
      this.props
        .sendMessageWithImage(
          token,
          this.props.chats.chatroom[0].recipient,
          sendingMessage, sendImg
        )
        .then(() => {
          this.onGetChat(this.props.chats.chatroom[0].recipient);
          return Keyboard.dismiss();

        });
      }
      this.msgInput.clear();
      this.setState({sendImg: null});
      this.setState({sendingMessage: ''});

  };

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  onDelete = () => {
    const {token} = this.props.auth;
    this.props.deleteChatRoom(token, this.props.route.params.phoneNumber).then(() => {
      this.setState({
        showAlert: false,
      });
      return this.props.navigation.navigate('chatlist');
    });
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
    let options = {
      mediaType: 'photo',
      maxWidth: 150,
      maxHeight: 150,
    };
    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        const maxSize = 1024 * 1024;
        if (response.assets[0].fileSize < maxSize) {
          this.setState({sendImg: response.assets[0].uri});
        } else {
          showMessage({
            message: 'Selected Image is to Large!',
            type: 'info',
            backgroundColor: 'red',
            color: 'white',
            duration: 100,
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
          this.setState({sendImg: response.assets[0].uri});
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



  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.userCard}>
          <Image
            style={styles.images2}
            source={{uri: this.props.route.params.img}}
          />
          <View style={styles.textWrapper2}>
            <Text style={styles.UserName}>{this.props.route.params.name}</Text>
            <Text style={styles.UserMessage}>Custommer</Text>
          </View>
          <View style={styles.textWrapper3}>
            <TouchableOpacity onPress={() => {this.showAlert();}}>
              <EnIcon name="dots-three-vertical" size={30} color="black" />
            </TouchableOpacity>
            <AwesomeAlert
            show={this.state.showAlert}
            titleStyle={styles.title}
            messageStyle={styles.message}
            showProgress={false}
            title="Warning"
            message="Are you sure you want to delete this chat room ?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="Yes, delete it"
            confirmButtonColor="#FFBA33"
            cancelButtonStyle={styles.cancel}
            confirmButtonStyle={styles.confirm}
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.onDelete();
            }}
          />
          </View>
        </View>
        <View style={styles.separator} />
        <FlatList
          showsHorizontalScrollIndicsator={false}
          style={styles.boxWrapper}
          data={this.props.chats.chatroom}
          renderItem={this.renderDataItem}
          inverted
          keyExtractor={(item, index) => String(index)}
        />
        <Text style={styles.inputimg}>{this.state.sendImg}</Text>
        <View style={styles.inputwrapper}>
          <Input
            style={styles.input}
            w="82%"
            p={3}
            placeholder="Type your message"
            placeholderTextColor="gray"
            color="black"
            variant="filled"
            ref={(ref) => { this.msgInput = ref; }}
            value={this.state.email}
            onChangeText={value => this.setState({sendingMessage: value})}
          />
          <TouchableOpacity
            style={styles.buttoncamera}
            onPress={this.onSelectImageFrom}>
            <FaIcon name="camera" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonsend}
            onPress={this.onSendMessage}>
            <FaIcon name="send" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
  },
  userCard: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
  images2: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'gray',
  },
  imagesMsg: {
    width: 130,
    height: 130,
  },
  imagesMsg2: {
    width: 130,
    height: 130,
    marginLeft: 120,
  },
  textWrapper2: {
    height: 80,
    marginLeft: 10,
    justifyContent: 'center',
  },
  textimg: {
    width: '80%',
    height: 'auto',
    marginLeft: 20,
  },
  textWrapper3: {
    height: 80,
    marginRight: -80,
    justifyContent: 'center',
    marginLeft: 60,
  },
  UserName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  UserMessage: {
    fontSize: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
  },
  boxWrapper: {
    flex: 1,
    marginBottom: 10,
    marginTop: 20,
  },
  messageCard: {
    flexDirection: 'column',
    width: '70%',
    height: 'auto',
    padding: 10,
    backgroundColor: '#FFBA33',
    marginBottom: 4,
    borderRadius: 10,
    marginLeft: 95,
    marginBottom: 20,
  },
  messageCard2: {
    flexDirection: 'column',
    width: '70%',
    height: 'auto',
    padding: 10,
    backgroundColor: '#6A4029',
    marginBottom: 4,
    borderRadius: 10,
    marginLeft: 10,
    marginBottom: 20,
  },
  inputwrapper: {
    width: '90%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 20,
  },
  input: {
    borderRadius: 30,
    color: 'black',
  },
  inputimg: {
    width: '90%',
    marginLeft: 20,
  },
  buttonsend: {
    backgroundColor: '#FFBA33',
    height: 45,
    width: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 6,
    marginLeft: 4,
  },
  buttoncamera: {
    backgroundColor: '#FFBA33',
    height: 45,
    width: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancel: {
    marginRight: 60,
  },
  Message2: {
    color: 'white',
  },
});
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  chats: state.chats,
});
const mapDispatchToProps = {getChatRoom, sendMessage, deleteChatRoom, sendMessageWithImage, clearMessage};
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
