import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import {connect} from 'react-redux';
import {getDetailHistory} from '../redux/actions/history';

class DetailHistory extends Component {
  componentDidMount() {
    const {token} = this.props.auth;
    this.props.getDetailHistory(this.props.route.params.id, token);
  }

  render() {
    return (
      <View style={styles.parent}>
        <View style={styles.Cart}>
          <Text style={styles.History}>Detail Product</Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={styles.boxWrapper}
          // ListHeaderComponent={}
          data={this.props.history?.detailhistory}
          renderItem={({item}) => (
            <View style={styles.productCard}>
              <Image style={styles.productImages} source={{uri: item.img}} />
              <View style={styles.textWrapper}>
                <Text style={styles.productName}>
                  Name :{item.name_product}
                </Text>
                <Text style={styles.price}>
                  Price: {item.price_product.toLocaleString('en')}
                </Text>
                <Text style={styles.price}>Amount: {item.amount}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  productCard: {
    width: '90%',
    backgroundColor: 'white',
    height: 100,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 5,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },
  History: {
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 60,
    marginHorizontal: 20,
  },
  Cart: {
    marginBottom: 20,
  },
  productImages: {
    width: 90,
    height: 90,
    backgroundColor: 'grey',
    borderRadius: 10,
  },
  textWrapper: {
    marginHorizontal: 20,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  products: state.products,
  history: state.history,
});

const mapDispatchToProps = {getDetailHistory};
export default connect(mapStateToProps, mapDispatchToProps)(DetailHistory);
