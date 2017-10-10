import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements'
import { emailChanged, passwordChanged, loginUser, signUpUser } from '../actions';
// import { Card, CardSection, Input, Button, Spinner } from './common';
// import { GoogleAuthButton } from './AuthButtons';

import FloatingLabelInput from './common/FloatingLabelInput';

const styles = {
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
  },
};

class Login extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text); // emailChanged -> action creator
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }
  onSignUpButtonPress() {
    Actions.signup();
  }


  // renderButtonLogin() {
  //   if (this.props.loading) {
  //     return <Spinner size="large" />;
  //   }
  //   return (
  //     <Button onPress={this.onButtonPress.bind(this)}>
  //       Login
  //     </Button>
  //   );
  // }
  // renderButtonSignUp() {
  //   if (this.props.loading) {
  //     return <Spinner size="large" />;
  //   }
  //   return (
  //     <Button onPress={this.onSignUpButtonPress.bind(this)}>
  //       SignUp
  //     </Button>
  //   );
  // }
  // renderButtonGoogleAuth() {
  //   return (
  //     <GoogleAuthButton onPress={this.onGoogleAuthButtonPress.bind(this)}>
  //       Google +
  //     </GoogleAuthButton>
  //   )
  // }
  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
      }}>
        <Text style={{
          fontSize: 20,
          margin: 10,
          fontFamily: 'Avenir',
          textAlign: 'center'
        }}>
          Welcome to Pixelite!
        </Text>
        <View style={{margin: 50}}>
          <View style={{margin: 7}}>
            <FloatingLabelInput
              autoCapitalize={'none'}
              label="Email"
              value={this.props.email}
              onChangeText={this.onEmailChange.bind(this)}
            />
            <FloatingLabelInput
              autoCapitalize={'none'}
              secureTextEntry
              label="Password"
              value={this.props.password}
              onChangeText={this.onPasswordChange.bind(this)}
            />
            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>
            <Button
              backgroundColor="#03A9F4"
              title="LOG IN"
              style={{ marginVertical: 20 }}
              onPress={this.onButtonPress.bind(this)}
            />
          </View>
          <Text style={{ fontSize: 20, textAlign: 'center', alignItems: 'center', marginBottom: 10 }}>OR</Text>
          <View style={{margin: 7}}>
            <Button
              backgroundColor="#03A9F4"
              title="SIGN UP"
              onPress={this.onSignUpButtonPress.bind(this)}
            />
          </View>
        </View>
      </View>
      // <Card>
      //   <CardSection>
      //     <Input
      //       autoCapitalize="none"
      //       label="Email"
      //       placeholder="email@gmail.com"
      //       onChangeText={this.onEmailChange.bind(this)} // this -> LoginFrom
      //       value={this.props.email}
      //     />
      //   </CardSection>
      //   <CardSection>
      //     <Input
      //       secureTextEntry
      //       label="Password"
      //       placeholder="password"
      //       onChangeText={this.onPasswordChange.bind(this)}
      //       value={this.props.password}
      //     />
      //   </CardSection>
      //
      //   <Text style={styles.errorTextStyle}>
      //     {this.props.error}
      //   </Text>
      //
      //   <CardSection>
      //     {this.renderButtonLogin()}
      //     {this.renderButtonSignUp()}
      //   </CardSection>
      //
      //   <CardSection>
      //     {this.renderButtonGoogleAuth()}
      //   </CardSection>
      //
      // </Card>
    );
  }
}

const mapStateToProps = ({ auth }) => { // auth = state.auth
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(Login);
