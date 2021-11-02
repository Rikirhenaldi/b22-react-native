/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import {connect} from 'react-redux';
import {getProfile} from '../redux/actions/profile';
import {getChatList} from '../redux/actions/chats';

class ChatList extends Component {
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
      ],
      search: '',
      sort: '',
      id: '',
      senderName: '',
      senderMessage: '',
      senderImg: '',
      senderNumber: '',
      recipientNumber: '',
      recipientName: '',
      recipientImg: '',
      recipientMessage: '',
      phoneNumber: '',
      finaldata: [],
      chatroom: [],
      sendingMessage: '',
    };
  }

  async componentDidMount() {
    const {token} = this.props.auth;
    await this.props.getProfile(token);
    const {user} = this.props.profile?.data;
    this.setState({phoneNumber: user[0].phoneNumber});
    // socket.on(this.state.phoneNumber, data => {
    //   this.onGetChat(data.sender);;
    // })
    this.props
      .getChatList(token)
      .then(() => {
        this.props.chats.chatlist.map(item => {
          if (this.state.phoneNumber !== item.sender) {
            this.setState(
              {
                id: item.id,
                senderName: item.senderName,
                senderNumber: item.sender,
                senderImg: item.senderImg,
                message: item.message,
              },
              () => {
                const result1 = {
                  id: this.state.id,
                  name: this.state.senderName,
                  phoneNumber: this.state.senderNumber,
                  img: this.state.senderImg,
                  message: this.state.message,
                };
                const data1 = this.state.finaldata.push(result1);
              },
            );
          } else if (this.state.phoneNumber !== item.recipient) {
            this.setState(
              {
                id: item.id,
                recipientName: item.recipientName,
                recipientNumber: item.recipient,
                recipientImg: item.recipientImg,
                message: item.message,
              },
              () => {
                const result2 = {
                  id: this.state.id,
                  name: this.state.recipientName,
                  phoneNumber: this.state.recipientNumber,
                  img: this.state.recipientImg,
                  message: this.state.message,
                };
                const data2 = this.state.finaldata.push(result2);
              },
            );
          }
        });
        console.log('ini state finaldata', this.state.finaldata);
        console.log('ini apa', typeof this.props.chats.chatroom === 'object');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.titlebox}>
          <Text style={styles.title}> Chat </Text>
        </View>
        <View style={styles.titlebox2}>
          <Text style={styles.subTitle}>
            Choose someone you want to talk with
          </Text>
        </View>
        <View style={styles.inputBoxWraper}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.boxWrapper1}
            data={this.state.finaldata}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('chatroom', {
                    phoneNumber: item.phoneNumber,
                    img: item.img,
                    name: item.name,
                  })
                }
                style={styles.productCard}>
                <Image style={styles.images2} source={{uri: item.img}} />
                <View style={styles.textWrapper}>
                  <Text style={styles.productName}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => String(index)}
          />
          <SearchBar
            placeholder="Search"
            onChangeText={value => this.setState({search: value})}
            onSubmitEditing={this.onSearch}
            value={this.state.search}
            platform="android"
            containerStyle={styles.inputBoxParent}
            inputStyle={styles.inputBox}
          />
        </View>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.boxWrapper}
            data={this.state.finaldata}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('chatroom', {
                    phoneNumber: item.phoneNumber,
                    img: item.img,
                    name: item.name,
                  })
                }
                style={styles.userCard}>
                <Image style={styles.images} source={{uri: item.img}} />
                <View style={styles.textWrapper2}>
                  <Text style={styles.UserName}>{item.name}</Text>
                  <Text style={styles.UserMessage}>{item.message}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => String(index)}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    width: 310,
    marginTop: 30,
  },
  boxWrapper1: {
    marginHorizontal: 10,
  },
  titlebox: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titlebox2: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    width: 310,
    textAlign: 'center',
  },
  inputBoxParent: {
    width: 290,
    height: 55,
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 20,
    elevation: 3,
    marginHorizontal: 30,
    padding: 10,
  },
  inputBoxWraper: {
    marginBottom: 20,
  },
  inputBox: {
    margin: 'auto',
    fontSize: 14,
    position: 'relative',
  },
  productCard: {
    marginHorizontal: 20,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userCard: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  images: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gray',
  },
  images2: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: 'gray',
  },
  textWrapper2: {
    width: 185,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  UserName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  chats: state.chats,
});
const mapDispatchToProps = {getProfile, getChatList};

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);
