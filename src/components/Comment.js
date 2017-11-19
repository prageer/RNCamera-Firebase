import React, {Component} from 'react';
import ReactNative from 'react-native';

import {
  Platform,
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  Alert
} from 'react-native';

import {
  Icon,
  Button,
  Form,
  Input,
  Label,
  Item
} from "native-base";

import Modal from 'react-native-modal';

class Comment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      commentText: ''
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal 
          isVisible={true}
        >
          <View style={styles.cameraModal}>
            <View style={{flex: 1}}>
              <View style={{flex: 1}}>
                <Form style={{}}>
                  <Label style={{marginLeft: 20, marginTop: 40}}>Comment:</Label>
                  <Item>
                    <Input
                      style={{height: 250}}
                      multiline={true} 
                      placeholder='Type your comment here'
                      onChangeText={(text)=>{
                        this.setState({
                          commentText: text
                        });
                      }} 
                    />
                  </Item>
                </Form>
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', paddingTop: 30, paddingBottom: 10, paddingLeft: 20, paddingRight: 20}}>
             <Button info onPress={()=>{                
                this.props.closeCommentModal();
              }}>
               <Icon name='close' />
              </Button>
              <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
                <Button info onPress={() => {
                  this.props.addComment(this.state.commentText);
                }}>
                  <Icon name="text" />
                </Button>
              </View>
            </View>

          </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    alignItems: 'center'
  },
  cameraModal: {
    flex: 1, backgroundColor: 'white'
  }
});

export default Comment;