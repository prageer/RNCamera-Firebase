import React, { Component } from 'react';
import ReactNative from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../modules/event';

import {
	PhotoListItemContainer,
	Camera
} from '../../components';

import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  H1,
  Item,
  Input
} from "native-base";

import { Col, Row, Grid } from 'react-native-easy-grid';
import {recordsRef} from '../../utils/firebase';

const {  
	View,
	StyleSheet,
	TouchableOpacity,
	TextInput,
	Image
} = ReactNative;

/**
 * PhotoList component
 */

function renderHeader(navigation) {
	const isSearch = 
		navigation.state.params && navigation.state.params.isSearch ? true : false;

	return (		
		<Header style={{backgroundColor: 'black'}}>
			<Left style={{flex: 1}}>
			</Left>
			<Body style={{flexDirection: 'column', alignItems: 'center'}}>
				<Title style={{marginTop: 5}}>Photos</Title>
			</Body>
			<Right>
			 	<Icon name="camera" style={{color: 'white'}} onPress={() => {
					navigation.state.params.goCamera();
				}} />
			</Right>
		</Header>
	);
}


class PhotoList extends Component {

	static navigationOptions = ({ navigation }) => ({		
		header: (
			renderHeader(navigation)
		)
	});	

	constructor(props) {
		super(props);

		this.state = {
			isCamera: false
		}
	}	
	componentWillMount() {
		this.props.navigation.setParams({
            goCamera: this.goCamera.bind(this)
        });
    }

    componentDidMount() {
  		this.props.eventActions.initLoadFlag({flag: true});
  		recordsRef.on('value', (snap) => {
  		  let itemArray = [];
	      var item = {};
	      snap.forEach((child) => {
	      	
	        let commentArr = [];
	        for (let commentKey in child.val().comments) {
	        	commentArr.push(child.val().comments[commentKey]);
	        }

	        item = {
	          id: child.val().id,
	          url: child.val().url,
	          comments: commentArr
	        };
	        itemArray.push(item);	        
	      });
	      this.props.eventActions.initLoad({item: itemArray});
	  });
  	}
  	
  	componentWillReceiveProps(nextProps) {
	}

	goCamera() {
		this.setState({
			isCamera: true
		});
	}
    
  /**
   * Render PhotoList
   * @return {jsxresult} result in jsx format
   */
	render() {
		const {events, initLoading, eventActions} = this.props;
		const {isCamera} = this.state;
		const listData = events;

		let eventCount = listData.length;
		let eventList = listData.map((item, index)=>{
			return (	          				
  				<View style={[styles.listItem, styles.lastItem]} key={index}>
        			<TouchableOpacity style={{flex:1}} onPress={() => {
    					this.props.navigation.navigate("DetailPhoto", { 
    						photoId: item.id
    					});
        			}}>
        				<PhotoListItemContainer>
			                <Image
			                  resizeMode="stretch"
			                  style={{ flex: 1, height: undefined, width: undefined }}
			                  source={{ uri: item.url }}
			                >
			                </Image>
			            </PhotoListItemContainer>
					</TouchableOpacity>
        		</View>
        	);		
		});

		return (
			<Container style={{flex: 1, backgroundColor: 'white'}}>
				<View style={{width: '100%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
					{
          				initLoading ?
          				<Text style={{color: 'white', marginTop: 0, marginBottom: 10}}>Total photos</Text>
          				:
          				<Text style={{color: 'white', marginTop: 0, marginBottom: 10}}>Total photos ({eventCount})</Text>
          			}
          		</View>
          		{
          			initLoading ?
          			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        				<Text style={{fontSize: 20}}>Loading...</Text>
        			</View>
        			:        		
        			(
        				eventCount == 0 ?
		        			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
		        				<Text style={{fontSize: 20}}>No Photos</Text>
		        			</View>
		          			:
			          		<Content>
			          			{
				          			eventList
			            		}
			            		
			          		</Content>
			          )
          		}
          		{
          			isCamera && 
          			<Camera
          				closeModal={()=>{
          					this.setState({
          						isCamera: false
          					});
          				}}
          			/>
          		}
		    </Container>
		);
	}
}


var styles = StyleSheet.create({
	listItem: {
		borderWidth: 1,
		borderColor: '#ededee',
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		height: 160
	}
});


export default connect(
  (state) => ({
    events: state.event.events,
    initLoading: state.event.initLoading
  }),
  (dispatch) => ({
    eventActions: bindActionCreators(eventActions, dispatch)
  })
)(PhotoList);