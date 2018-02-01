import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
} from 'react-native';

export default class Repo extends Component {
	render(){
		return (
			<View style={styles.repo}> 
				<Image
					style={styles.repoImage}
					source={{uri: this.props.data.thumbnail}}
				/>
				<View style={styles.repoInfo}>
					<Text style={styles.repoTitle}>  {this.props.data.title} </Text>
					<Text style={styles.repoAuthor}> {this.props.data.author} </Text>
				</View> 
			</View>
		);
	}
}

const styles = StyleSheet.create({
	repo:{
		padding:20,
		backgroundColor: '#FFF',
		height:120,
		marginBottom:20,
		borderRadius:5,
		flexDirection: 'row',
		alignItems: 'center',
	},
	repoImage:{
		width: 50,
		height: 50,
		borderRadius: 25,
	},
	repoInfo:{
		marginLeft:20,
	},
	repoTitle:{
		fontWeight:'bold',
		color: '#333',
	},
	repoAuthor:{
		fontSize: 14,
	}
})