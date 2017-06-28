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
	ScrollView,
	Item
} from 'react-native';
import Picker from 'react-native-picker';
import Icon from 'react-native-vector-icons/Ionicons';

import {Actions, ActionConst} from 'react-native-router-flux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class Register extends Component {
	constructor(props) {
    super(props);
    this.state = {
		selected: "mit",
		username: "",
		phone: "",
		email: "",
		password: "",
		password_confirmation: "",
		errors: [],
		confirmed: true,
    };
  }

	_createGender() {
        let data = ['Male', 'Female', 'Other'];
        return data;
    }
	_showGenderPicker() {
	        Picker.init({
	            pickerData: this._createGender(),
							pickerTitleText: 'Select your gender',
	            pickerToolBarFontSize: 16,
	            pickerFontSize: 16,
	            onPickerConfirm: (pickedValue, pickedIndex) => {
	                this.setState({gender: pickedValue[0], error:{gender:undefined}});
	            },
	            onPickerCancel: (pickedValue, pickedIndex) => {

	            },
	            // onPickerSelect: (pickedValue, pickedIndex) => {
				// 	console.log(pickedValue[0]);
				// 	this.setState({gender: pickedValue[0], error:{gender:undefined}});
	            // },
				pickerConfirmBtnText:"Confirm",
				pickerCancelBtnText:"Cancel"
	        });
	        Picker.show();
	    }


signup() {
    console.log(this.state.username);
    console.log(this.state.phone);
    console.log(this.state.email);
    console.log(this.state.gender);
    console.log(this.state.password);
    console.log(this.state.password_confirmation);
	if (!this.state.gender) {
		console.log("gender")
		return this.setState({error: {gender:{msg:"Gender is required"}}})
	}
    return fetch(url + '/signUp', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: this.state.username,
            phone: this.state.phone,
            email: this.state.email,
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
			this.login();
        } else {
            this.setState({error: responseJson})
        }
    }).catch((error) => {
        console.error(error);
    });
}

login() {
	fetch(url + '/logIn', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({email: this.state.email, password: this.state.password})
	}).then((response) => response.json()).then((res) => {
		console.log(res);
		if (res.error) return alert(res.error);
		global.storage.save({
			key: 'user', rawData: res, expires: 7776000000 // 3 months
		}).then(() => {
			global.user = res;
			//Actions.bubbleTag();
			Actions.pPhoto();
		});
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

	render() {
		return (
			<ScrollView style={[styles.background, styles.container]} >
				<KeyboardAwareScrollView style={styles.wrapper}>
					<View style={styles.inputWrap}>
						<View style={[styles.row,{flexDirection:"row",justifyContent: 'space-between'}, this.state.error && this.state.error.username?{backgroundColor:'#FFCDD2'}:null]}>
						 <View style={{flexDirection:"row", padding:0, margin:0, justifyContent:"center", alignItems:"center"}}>
							 <Icon name="ios-person-add" size={20} style={styles.icon}/>
							 <Text>Username</Text>
						 </View>
						<TextInput
							onChangeText={(val) => this.setState({username: val})}
							autoCapitalize='none'
							autoCorrect={false}
							placeholder="Required"
							style={styles.input}
						/>
						</View>
						{this.state.error && this.state.error.username?<Text style={styles.error}>{this.state.error.username.msg}</Text>:null}
						<View style={[styles.row,{flexDirection:"row",justifyContent: 'space-between'}, styles.borderTop, this.state.error && this.state.error.phone?{backgroundColor:'#FFCDD2'}:null]}>
							<View style={{flexDirection:"row", padding:0, margin:0, justifyContent:"center", alignItems:"center"}}>
								<Icon name="ios-call" size={20} style={styles.icon}/>
								<Text>Phone</Text>
							</View>
							<TextInput
								keyboardType='phone-pad'
								onChangeText={(val) => this.setState({phone: val})}
								placeholder="Required"
								style={styles.input}
							/>
						</View>
						{this.state.error && this.state.error.phone?<Text style={styles.error}>{this.state.error.phone.msg}</Text>:null}
						<View style={[styles.row,{flexDirection:"row",justifyContent: 'space-between'}, styles.borderTop, this.state.error && this.state.error.email?{backgroundColor:'#FFCDD2'}:null]}>
						 <View style={{flexDirection:"row", padding:0, margin:0, justifyContent:"center", alignItems:"center"}}>
							 <Icon name="ios-mail" size={20} style={styles.icon}/>
							 <Text>Email</Text>
						 </View>
						<TextInput
							keyboardType='email-address'
							autoCapitalize='none'
							autoCorrect={false}
							onChangeText={(val) => this.setState({email: val})}
							style={this.state.error && this.state.error.email?styles.inputWrong:styles.input} placeholder="Required"
						/>

						</View>
						{this.state.error && this.state.error.email?<Text style={styles.error}>{this.state.error.email.msg}</Text>:null}
						<TouchableOpacity style={[styles.row,{flexDirection:"row",justifyContent: 'space-between'}, styles.borderTop, this.state.error && this.state.error.gender?{backgroundColor:'#FFCDD2'}:null]}
						onPress={this._showGenderPicker.bind(this)}>
							<View style={{flexDirection:"row", padding:0, margin:0, justifyContent:"center", alignItems:"center"}}>
							 	<Icon name="ios-man" size={20} style={styles.icon}/>
							 	<Icon name="ios-woman" size={20} style={styles.icon}/>
								<Text>Gender</Text>
							</View>
							<Text style={this.state.error && this.state.error.gender?styles.inputWrong:(this.state.gender?styles.input:[styles.input, {color:"#ccc"}])} placeholder="Gender">
							 	{this.state.gender?this.state.gender:"Select"}
							</Text>
						</TouchableOpacity>
						{this.state.error && this.state.error.gender
							? <Text style={styles.error}>{this.state.error.gender.msg}</Text>
							: null}
						<View style={[styles.row,{flexDirection:"row",justifyContent: 'space-between'}, styles.borderTop, this.state.error && this.state.error.password?{backgroundColor:'#FFCDD2'}:null]}>
	 						<View style={{flexDirection:"row", padding:0, margin:0, justifyContent:"center", alignItems:"center"}}>
	 							<Icon name="ios-lock" size={20} style={styles.icon}/>
								<Text>Password</Text>
	 						</View>
							<TextInput
								selectTextOnFocus
								onChangeText={(val) => this.setState({password: val})}
								style={this.state.error && this.state.error.password?styles.inputWrong:styles.input} placeholder="At least 6 characters"
								secureTextEntry={true}/>
						</View>
							{this.state.error && this.state.error.password?<Text style={styles.error}>{this.state.error.password.msg}</Text>:null}

						<View style={[styles.row,{flexDirection:"row",justifyContent: 'space-between'}, styles.borderTop, this.state.error && this.state.error.confirmPassword?{backgroundColor:'#FFCDD2'}:null]}>
	  					<View style={{flexDirection:"row", padding:0, margin:0, justifyContent:"center", alignItems:"center"}}>
						<Icon name="ios-lock" size={20} style={styles.icon}/>
							<Text>Confirm Password</Text>
	  					</View>
						<TextInput
							selectTextOnFocus
							ref="confirm"
							placeholder="Should match above"
							onChangeText={(val) => {this.setState({password_confirmation: val, confirmed: this.confirmPassword(val)})}}
							style={(this.state.error && this.state.error.confirmPassword) || !this.state.confirmed ? styles.inputWrong:styles.input}
							secureTextEntry={true}
						/>
					</View>
					{this.state.error && this.state.error.confirmPassword?<Text style={styles.error}>{this.state.error.confirmPassword.msg}</Text>:null}
					</View>
					<TouchableOpacity activeOpacity={.5} onPress={this.signup.bind(this)}>
						<View style={styles.button}>
						<Text style={styles.buttonText}>Sign Up</Text>
						</View>
					</TouchableOpacity>
				</KeyboardAwareScrollView>
			</ScrollView>);
	}
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		paddingTop:75,
		backgroundColor:"#eee",
	},
	inputWrap: {
		flexDirection: "column",
		marginVertical: 10,
		backgroundColor: "transparent"
	},
	error:{
		fontSize:12,
		color:"#A00",
		paddingVertical:3,
		paddingHorizontal:10,
		backgroundColor:"#FFCDD2",
		textAlign: "right",

	},
	iconWrap: {
		paddingHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#d73352"
	},
	icon: {
		width: 20,
		height: 20,
	},
	button: {
        backgroundColor: "#ef6e00",
        paddingVertical: 10,
        marginHorizontal: 20,
        marginVertical:20,
        width: (Dimensions.get("window").width - 40),
        alignItems: "center",
        justifyContent: "center",
        borderRadius:3
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16
    },
	forgotPasswordText: {
		color: "#FFF",
		backgroundColor: "transparent",
		textAlign: "center"
	},
	row: {
		alignItems:"center",
		flexDirection:"row",
		padding:10,
		paddingVertical:20,
		margin:0,
		borderColor:"#ccc",
		backgroundColor:"#fff",
		width:Dimensions.get("window").width
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
		borderColor:"#f4f4f4"
	},
	input: {
	    textAlign: "right",
	    flex: 1,
	    height: 20,
	    fontSize: 15,
	},
	inputWrong: {
		marginLeft:10,
		backgroundColor: '#FFCDD2',
		textAlign: "right",
	    flex: 1,
	    height: 20,
	    fontSize: 15,
	},
	inputCorrect: {
		backgroundColor: '#C8E6C9',
		marginLeft:10,
		textAlign: "right",
		flex: 1,
		height: 20,
		fontSize: 15,
	},
});
