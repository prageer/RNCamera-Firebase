import React, { Component } from 'react';

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
  Grid,
  Item
} from "native-base";

import ReactNative from 'react-native';
const {  
	View,
	StyleSheet,
	TouchableOpacity,
	Image
} = ReactNative;

import {
	PhotoListItemContainer,
	CommentItemContainer
} from '../../components';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as eventActions from '../../modules/event';
import DeviceInfo from 'react-native-device-info';


import {
	Comment
} from '../../components';
import firebaseApp from '../../utils/firebase';

/**
 * DetailPhoto component
 */
class DetailPhoto extends Component {

	static navigationOptions = ({ navigation }) => ({
	    header: (
	      <Header style={{backgroundColor: 'black'}}>
	        <Left style={{flex: 1}}>
	          <Button transparent onPress={() => navigation.goBack()}>
	            <Icon name="arrow-back" />
	          </Button>
	        </Left>
	        <Body style={{alignItems: 'center'}}>
	        	<Title>Comments</Title>
	        </Body>
	        <Right>
	        	<Icon name="text" style={{color: 'white'}} onPress={()=>{
	        		navigation.state.params.goAddComment();
	        	}} />
	        </Right>
	      </Header>
	    )
  	});

  	constructor(props) {
  		super(props);

  		this.state = {
  			isCommentModal: false
  		}
  	}

  	componentWillMount() {
  		this.props.navigation.setParams({
            goAddComment: this.goAddComment.bind(this)
        });
  	}

  	goAddComment() {
  		this.setState({
  			isCommentModal: true
  		});
  	}

  	getByValue2(arr, value) {
		let result  = arr.filter(function(o){return o.id == value;} );
	  	return result? result[0] : null;
	}

  	addComment(commentText) {
  		const now = new Date();
  		const timestamp = now.getTime();
  		const {photoId} = this.props.navigation.state.params;
  		let record_item = commentText;
  		
  		/*  		
  		const commentsRef1 = firebaseApp.database().ref(DeviceInfo.getUniqueID()+'/'+photoId+'/');
    	commentsRef1.set( {
    		'url': 'https://2.bp.blogspot.com/-5gy5ef2RFzY/WdcmlywTuEI/AAAAAAAAQHk/TdOTww9y3TMjTk1lpaqW1qkAFBgNi96zQCLcBGAs/s400/colourfull-baby-drawing-walls-with-color.jpg',
    		'id': photoId
    	} );
		*/
		
  		const commentsRef = firebaseApp.database().ref(DeviceInfo.getUniqueID()+'/'+photoId+'/comments/'+timestamp+'/');
    	commentsRef.set( record_item );

    	this.setState({
  			isCommentModal: false
  		});
  	}

  	/**
   	 * Render DetailPhoto
   	 * @return {jsxresult} result in jsx format
   	*/
	render() {
		const {isCommentModal} = this.state;

		const {photoId} = this.props.navigation.state.params;		
  		const {events} = this.props;

  		const event = this.getByValue2(events, photoId); 
  		const comments = event.comments;
  		const photoUrl = event.url;

		if(!photoUrl)
			return null;

		const commentData = comments;

	
		return (
			<Container style={{backgroundColor:'white'}}>
				<View style={{width: '100%', backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}}>
          			<Text style={{color: 'white', marginTop: 0, marginBottom: 10}}>Total comments ({commentData.length})</Text>
          		</View>
	        	<Grid>
		        	<View style={{flex: 1, flexDirection: 'column'}}>
		        		<View style={{flex:0.4}}>
		        			<PhotoListItemContainer>
				                <Image
				                  resizeMode="stretch"
				                  style={{ flex: 1, height: undefined, width: undefined }}
				                  source={{ uri: photoUrl }}
				                >
				                </Image>
				            </PhotoListItemContainer>
		        		</View>
		        		
		        		<View style={{flex:0.6}}>
		        			<Content style={{flex: 1}}>
		        			{
			        			commentData.map((item, index)=>{
			        				return(
						        		<View style={{margin:20}} key={index}>
						        			<CommentItemContainer
						        				comment={item}
						        			>
						        				{
						        					/*
						        					<View style={{flex:0.2, alignItems: 'flex-end', justifyContent: 'center'}}>
								        				<Icon name='ios-trash' style={{fontSize: 30}} onPress={()=>{alert('');}} />
								        			</View>
								        			*/
								        		}
								        	</CommentItemContainer>
								        </View>
								    );
							    })
					    	}
					    	</Content>
		        		</View>
		        	</View>
		        </Grid>
		        
		        {
		        	isCommentModal && 
		        	<Comment
		        		closeCommentModal={()=>{
		        			this.setState({
		        				isCommentModal: false
		        			});
		        		}}
		        		addComment={(commentText)=>{this.addComment(commentText);}} 
		        	/>
		        }
		    </Container>
		);
	}
}

export default connect(
  (state) => ({
    events: state.event.events
  }),
  (dispatch) => ({
    eventActions: bindActionCreators(eventActions, dispatch)
  })
)(DetailPhoto);