import React, { Component } from 'react'
import {
    View,
    StyleSheet
} from 'react-native';

import {
  Text,
  Icon
} from "native-base";

export default class CommentItemContainer extends Component {
    render() {
        const {comment} = this.props;
        return (
            <View style={styles.GuestItemContainer}>
                <View style={styles.leftIcon}>
                    <Icon name='ios-text-outline' style={{fontSize: 20}}/>
                </View>
                <View style={{flex:0.9}}>
                    <Text>{comment}</Text>
                </View>
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    GuestItemContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    leftIcon: {
        flex:0.1,
        justifyContent: 'center'
    }
})
