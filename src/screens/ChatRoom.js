/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard
} from 'react-native';
import {FormControl, Input} from 'native-base';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {getChatRoom} from '../redux/actions/chats';
import {sendMessage} from '../redux/actions/chats';
import { io } from 'socket.io-client';
const socket = io('http://localhost:8080');

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [
        {name: 'Favorite', id: 5},
        {name: 'Promo', id: 6},
        {name: 'Coffee', id: 1},
        {name: 'Non Coffee', id: 2},
        {name: 'Food', id: 3},
        {name: 'Add-on', id: 4},
        {name: 'Add-on', id: 4},
        {name: 'Add-on', id: 4},
        {name: 'Add-on', id: 4},
        {name: 'Add-on', id: 4},
        {name: 'Add-on', id: 4},
        {name: 'Add-on', id: 4},
      ],
      search: '',
      sort: '',
      chatroom: [],
      sendingMessage: '',
    };
  }

  componentDidMount() {
    const {token} = this.props.auth;
    this.props
      .getChatRoom(token, this.props.route.params.phoneNumber)
      .then(() => {
        this.setState({chatroom: this.props.chats.chatroom});
      });

    socket.on(this.props.profile?.data?.user[0].phoneNumber, (data) => {
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
    if (item.sender !== this.props.profile?.data?.user[0].phoneNumber) {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate()}
          style={styles.messageCard2}>
          <Text style={styles.Message2}>{item.message}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate()}
          style={styles.messageCard}>
          <Text style={styles.Message}>{item.message}</Text>
        </TouchableOpacity>
      );
    }
  };

  onSendMessage = async (e) => {
    await e.preventDefault();
    const {token} = this.props.auth;
    const {sendingMessage} = this.state;
    if (
      this.props.chats.chatroom[0].sender !==
      this.props.profile?.data?.user[0].phoneNumber
    ) {
      this.props
        .sendMessage(token, this.props.chats.chatroom[0].sender, sendingMessage)
        .then(() => {
          // const datasending1 = {
          //   sender: this.props.profile?.data?.user[0].phoneNumber,
          //   recipient: this.props.chats.chatroom[0].sender,
          //   message: this.state.sendingMessage,
          // };
          // this.state.chatroom.push(datasending1);
          // this.setState({sendingMessage: ''});
          // this.props.navigation.navigate('chatroom', {
          //   phoneNumber: this.props.chats.chatroom[0].sender,
          //   img: this.props.route.params.img,
          //   name: this.props.route.params.name,
          // });
          this.onGetChat(this.props.chats.chatroom[0].sender);
        });
    } else {
      this.props
        .sendMessage(
          token,
          this.props.chats.chatroom[0].recipient,
          sendingMessage,
        )
        .then(() => {
          // const datasending2 = {
          //   sender: this.props.profile?.data?.user[0].phoneNumber,
          //   recipient: this.props.chats.chatroom[0].recipient,
          //   message: this.state.sendingMessage,
          // };
          // this.state.chatroom.push(datasending2);
          // this.setState({sendingMessage: ''});
          // this.props.navigation.navigate('chatroom', {
          //   phoneNumber: this.props.chats.chatroom[0].recipient,
          //   img: this.props.route.params.img,
          //   name: this.props.route.params.name,
          // });
          this.onGetChat(this.props.chats.chatroom[0].recipient);
        });
    }
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
        <View style={styles.inputwrapper}>
          <Input
            style={styles.input}
            w="82%"
            p={3}
            placeholder="Type your message"
            placeholderTextColor="gray"
            color="black"
            variant="filled"
            value={this.state.email}
            onChangeText={value => this.setState({sendingMessage: value})}
          />
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
  textWrapper2: {
    height: 80,
    marginLeft: 10,
    justifyContent: 'center',
  },
  UserName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  UserMessage: {
    fontSize: 10,
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
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    borderRadius: 30,
    color: 'black',
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
  Message2: {
    color: 'white',
  },
});
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  chats: state.chats,
});
const mapDispatchToProps = {getChatRoom, sendMessage};
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);
