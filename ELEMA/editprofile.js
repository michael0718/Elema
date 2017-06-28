"use strict"
import React, { Component } from 'react';
import{
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	TextInput,
	Button,
	TouchableOpacity,
	ScrollView
} from 'react-native';

import {Actions, ActionConst} from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TagInput from 'react-native-tag-input';
import RNFetchBlob from 'react-native-fetch-blob'
import Icon from 'react-native-vector-icons/Ionicons';

// const background = require("./icons/back.jpg")
// const lockIcon = require("./icons/lock.png")
// const personIcon = require("./icons/person.png")

export default class Register extends Component {
	constructor(props) {
    super(props);
    this.state = {
    		username: user.username,
			phone: "",
			gender: "",
      		password: "",
			password_confirmation: "",
			errors: [],
    };
    this.getuser.bind(this);

  }

getuser(){
	console.log("hello");
	var path = url + '/u/' + user.username
	RNFetchBlob.fetch('GET', path)
                .then((res) => {
                    let json = res.json();
                    this.setState({
                        genderPlaceHolder:json.gender,
						phonePlaceHolder:json.phone
                    });
                    console.log(this.state.phone);
                    console.log(this.state.gender);

                })
}


edit() {
    console.log(this.state.phone);
    console.log(this.state.gender);
    console.log(this.state.password);
    console.log(this.state.password_confirmation);
    console.log(url);
    return fetch(url + '/setUserProfile/' + user.username , {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone: this.state.phone,
            gender: this.state.gender,
            password: this.state.password,
            confirmPassword: this.state.password_confirmation
        })
    })
	.then((response) => response.json())
	.then((responseJson) => {
        if (responseJson.error) {
            return alert(responseJson.error);
        }
        console.log(responseJson)
        if (responseJson.success) {
            this.setState({signed: true});
            return alert("Edited successfully");
        } else {
            this.setState({error: responseJson})
        }
    }).catch((error) => {
        console.error(error);
    });
}


	confirmPassword(val) {
		console.log(this.state.password + " | " + val)
		console.log(this.state.confirmed)
		if (this.state.password != val) {
			return false
		} else {
			return true
		}
	}

	componentWillMount() {
		Actions.refresh({
			rightTitle: 'Save',
			onRight: () => this.edit()
		});
		this.getuser();
	}

	render() {
		return (
				<KeyboardAwareScrollView style={styles.container}>
				<TouchableOpacity onPress={(e) => {
                        Actions.profPhoto();
                    }}
                style={[styles.row,{justifyContent: 'space-between'}]}>
                    <View style={{flexDirection:"row", padding:0, margin:0, justifyContent:"center", alignItems:"center"}}>
                    <Icon name="ios-image" size={20} style={styles.icon}/>
                    <Text>Profile Photo</Text>
                    </View>
                    <Image source={{uri:user.uri}} defaultSource={require("./icons/profile.png")} style={styles.photo} />
                </TouchableOpacity>
				<Text style={[styles.header,{marginTop:10}]}>ACCOUNT INFO</Text>
                <View style={[styles.row,{flexDirection:"row",justifyContent: 'space-between'}]}>
                    <View style={{flexDirection:"row", padding:0, margin:0, justifyContent:"center", alignItems:"center"}}>
                        <Icon name="ios-call" size={20} style={styles.icon}/>
                        <Text>Phone</Text>
                    </View>
					<TextInput
						keyboardType='phone-pad'
						onChangeText={(val) => this.setState({phone: val})}
						placeholder={this.state.phonePlaceHolder}
						style={styles.input}
					/>
                </View>
				<View style={[styles.row,{flexDirection:"row",justifyContent: 'space-between'}, styles.borderTop]}>
                    <View style={{flexDirection:"row", padding:0, margin:0, justifyContent:"center", alignItems:"center"}}>
                        <Icon name="ios-man" size={20} style={styles.icon}/>
						<Icon name="ios-woman" size={20} style={styles.icon}/>
                        <Text>Gender</Text>
                    </View>
					<TextInput
						onChangeText={(val) => this.setState({gender: val})}
						placeholder={this.state.genderPlaceHolder}
						style={styles.input}
					/>
                </View>
				<Text style={[styles.header,{marginTop:10}]}>SECURITY</Text>
                <View style={[styles.row,{flexDirection:"row",justifyContent: 'space-between'}]}>
                    <View style={{flexDirection:"row", padding:0, margin:0, justifyContent:"center", alignItems:"center"}}>
                        <Icon name="ios-lock" size={20} style={styles.icon}/>
                        <Text>Password</Text>
                    </View>
					<TextInput
						selectTextOnFocus
						onChangeText={(val) => this.setState({password: val})}
						placeholder="Password"
						style={styles.input}
						secureTextEntry={true}
					/>
                </View>
				<View style={[styles.row,{flexDirection:"row",justifyContent: 'space-between'}]}>
					<View style={{flexDirection:"row", padding:0, margin:0, justifyContent:"center", alignItems:"center"}}>
						<Icon name="ios-lock" size={20} style={styles.icon}/>
						<Text>Confirm Password</Text>
					</View>
					<TextInput
						selectTextOnFocus
						ref="confirm"
						placeholder="Confirm"
						onChangeText={(val) => {this.setState({password_confirmation: val, confirmed: this.confirmPassword(val)})}}
						style={styles.input}
						secureTextEntry={true}
					/>
				</View>

				</KeyboardAwareScrollView>
			);
	}
}

// const styles = StyleSheet.create({
//
// 	container: {
// 		flex: 1,
// 		backgroundColor:"#000",
// 	},
// 	background: {
// 		// width: null,
// 		// height: null
// 	},
// 	wrapper: {
// 		marginTop:70,
// 		paddingHorizontal: 15,
// 	},
// 	inputWrap: {
// 		flexDirection: "column",
// 		marginVertical: 10,
// 		backgroundColor: "transparent"
// 	},
// 	input: {
// 		borderWidth:1,
// 		flex: 1,
// 		width: Dimensions.get("window").width - 40,
// 		height:50,
// 		marginBottom:10,
// 		paddingHorizontal: 10,
// 		backgroundColor: '#FFF'
// 	},
// 	inputWrong: {
// 		borderWidth:2,
// 		borderColor:"#F44336",
// 		flex: 1,
// 		width: Dimensions.get("window").width - 40,
// 		height:50,
// 		marginBottom:10,
// 		paddingHorizontal: 10,
// 		backgroundColor: '#FFCDD2'
// 	},
// 	inputCorrect: {
// 		borderWidth:2,
// 		borderColor:"#4CAF50",
// 		flex: 1,
// 		width: Dimensions.get("window").width - 40,
// 		height:50,
// 		marginBottom:10,
// 		paddingHorizontal: 10,
// 		backgroundColor: '#C8E6C9'
// 	},
// 	error:{
// 		fontSize:12,
// 		color:"#fff",
// 		marginTop:-10,
// 	},
// 	iconWrap: {
// 		paddingHorizontal: 7,
// 		alignItems: "center",
// 		justifyContent: "center",
// 		backgroundColor: "#d73352"
// 	},
// 	icon: {
// 		width: 20,
// 		height: 20,
// 	},
// 	button: {
// 		backgroundColor: "#d73352",
// 		paddingVertical: 15,
// 		marginVertical: 15,
// 		alignItems: "center",
// 		justifyContent: "center"
// 	},
// 	buttonText: {
// 		color: "#FFF",
// 		fontSize: 18
// 	},
// 	forgotPasswordText: {
// 		color: "#FFF",
// 		backgroundColor: "transparent",
// 		textAlign: "center"
// 	},
//     formContainer: {
//         // flex: 1,
//         height: Dimensions.get('window').width -50,
//         marginTop:65,
//
//     },
//     tagsWrapper: {
//         // flex:1,
//         height:250,
//         backgroundColor: "#FFF",
//         padding:10,
//         paddingRight:15,
//         paddingLeft:15,
//         borderBottomWidth:0.5,
//         borderTopWidth:0.5,
//         borderColor:"#ccc",
//         justifyContent:"center",
//         alignItems:"center"
//         // justifyContent: 'space-between',
//     },
//     tag: {
//       borderWidth:0.5,
//       borderColor:"#0084B4",
//       padding:10,
//       margin:0,
//       minWidth:30,
//       maxHeight:30,
//       borderRadius: 50
//     },
//     tagText: {
//         textAlign: 'center',
//         color: "#0084B4",
//         fontSize:16,
//     },
//     text: {
//         textAlign: 'center'
//     }
// }
// );

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop:75,
        backgroundColor:"#eee",

    },
    row: {
        alignItems:"center",
        flexDirection:"row",
        // paddingVertical:8,
        // paddingHorizontal:10,
        padding:10,
        margin:0,
        // borderBottomWidth:0.5,
        // borderTopWidth:0.5,
        borderColor:"#ccc",
        backgroundColor:"#fff",
        width:Dimensions.get("window").width
    },
    photo: {
        // position:"relative",
        // right:5,
        // top:5,
        width:60,
        height:60,
        borderRadius:30,
    },
    icon: {
        marginRight:10
    },
    header: {
        marginHorizontal:10,
        marginVertical:5,
        fontSize:10,
        color:"#aaa"
    },
    borderTop: {
        borderTopWidth:1,
        borderColor:"#eee"
    },
	input:{
		textAlign:"right",
				// borderWidth:1,
				flex: 1,
				// width: Dimensions.get("window").width - 40,
				height:20,
				fontSize:15,
				// marginBottom:10,
				// paddingHorizontal: 10,
				backgroundColor: '#FFF'
	}
});
