/* eslint-disable */
import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { Icon, Button } from 'react-native-elements'
import * as ActionsFunctions from '../actions';

import FloatingLabelInput from './common/FloatingLabelInput';

const styles = {
  errorTextStyle: {
    fontSize: 16,
    alignSelf: 'center',
    color: 'red',
  },
};

class SignUp extends React.Component {

  onEmailChange(text) {
    this.props.emailChanged(text); // emailChanged -> action creator
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onNameChange(text) {
    this.props.nameChanged(text);
  }

  onSignUpButtonPress() {
    const { email, password, name} = this.props;
    this.props.signUpUser({ email, password, name });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'white'
      }}>
      <View style={{ position: 'absolute', top: 25, left: 8, justifyContent: 'center', alignItems: 'flex-start', width: 30, height: 30, zIndex: 10 }}>
        <Icon
          type="simple-line-icon"
          name="arrow-left"
          color="#373535"
          size={24}
          onPress={() => Actions.pop()}
        />
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{
          fontSize: 20,
          margin: 10,
          fontFamily: 'Avenir',
          textAlign: 'center'
        }}>
          Sign Up
        </Text>
        <View style={{margin: 50}}>
          <View style={{margin: 7}}>
            <FloatingLabelInput
              label="Name"
              value={this.props.name}
              onChangeText={this.onNameChange.bind(this)}
            />
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
              title="SIGN UP"
              style={{ marginVertical: 20 }}
              onPress={this.onSignUpButtonPress.bind(this)}
            />
          </View>
        </View>
      </View>
    </View>
    );
  }
}

const mapStateToProps = ({ auth }) => { // auth = state.auth
  const { email, password, error, loading, name } = auth;
  return { email, password, error, loading, name };
};

export default connect(mapStateToProps, {
  ...ActionsFunctions
})(SignUp);
