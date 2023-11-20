import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Success from './Success';
import Dashboard from './Dashboard';


const LoginScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showSecondEye, setShowSecondEye] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const [redirectToFromLoginDashboard, setRedirectToFromLoginDashboard] = useState(false);
  const eyeIconSource = showSecondEye
    ? require('../assets/eye3.png')
    : require('../assets/eye.png');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setShowSecondEye(!showSecondEye);
  };

  const handleRegister = async () => {
    const user = { email, password };
    const userJson = JSON.stringify(user);

    try {
      await AsyncStorage.setItem('user', userJson);
      console.log('User registered:', user);
      setRegistrationSuccess(true);

      setTimeout(() => {
        setRedirectToDashboard(true);
      }, 2000);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const storedUserJson = await AsyncStorage.getItem('user');
      const storedUser = JSON.parse(storedUserJson);
  
      console.log('Stored User:', storedUser);
      console.log('Input Email:', email);
  
      if (
        storedUser &&
        storedUser.email.toLowerCase() === email.toLowerCase() &&
        storedUser.password === password
      ) {
        console.log('Login successful.');
        setRedirectToFromLoginDashboard(true);
      } else {
        console.log('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error retrieving user from local storage:', error);
    }
  };
  
      if (redirectToFromLoginDashboard) {
      return <Dashboard />;
    }

  if (registrationSuccess) {
    if (redirectToDashboard) {
      return <Dashboard />;
    }

    return (
      <>
        <Success />
      </>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/LoginBack.png')}
      style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setIsLogin(true)}>
            <Text
              style={[styles.tab, isLogin && styles.activeTab]}>{`Login`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsLogin(false)}>
            <Text
              style={[
                styles.tab,
                !isLogin && styles.activeTab,
              ]}>{`Register`}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.heading}>{isLogin ? 'Login' : 'Register'}</Text>
        </View>
        {isLogin ? (
          <View style={styles.containerLogin}>
            <View style={styles.inputView}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#777777"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordInput}>
                <TextInput
                  style={styles.passwordInputText}
                  placeholder="Enter your password"
                  placeholderTextColor="#777777"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Image source={eyeIconSource} style={styles.eyeIcon} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => console.log('forgot')}>
                <Text style={styles.forgot}>Forgot password?</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btns}>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={styles.logbtn}>{'Login'}</Text>
              </TouchableOpacity>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '32%',
                    height: 0.9,
                    backgroundColor: '#777777',
                    opacity: 0.1,
                  }}></View>
                <Text style={styles.or}>Or login with </Text>
                <View
                  style={{
                    width: '32%',
                    height: 0.9,
                    backgroundColor: '#777777',
                    opacity: 0.1,
                  }}></View>
              </View>
              <View style={styles.logbtn2}>
                <TouchableOpacity style={styles.googleIcon}>
                  <Image source={require('../assets/google.png')} />
                  <Text>{`Google`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.containerRegister}>
            <View style={styles.inputView}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#777777"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordInput}>
                <TextInput
                  style={styles.passwordInputText}
                  placeholder="Enter your password"
                  placeholderTextColor="#777777"
                  secureTextEntry={!passwordVisible}
                  value={password}
                  onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                  <Image source={eyeIconSource} style={styles.eyeIcon} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => console.log('forgot')}>
                <Text style={[styles.forgot, {color: 'transparent'}]}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btns}>
              <TouchableOpacity onPress={handleRegister}>
                <Text style={styles.logbtn}>{'Register'}</Text>
              </TouchableOpacity>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    width: '32%',
                    height: 0.9,
                    backgroundColor: '#777777',
                    opacity: 0.1,
                  }}></View>
                <Text style={styles.or}>Or login with </Text>
                <View
                  style={{
                    width: '32%',
                    height: 0.9,
                    backgroundColor: '#777777',
                    opacity: 0.1,
                  }}></View>
              </View>
              <View style={styles.logbtn2}>
                <TouchableOpacity style={styles.googleIcon}>
                  <Image source={require('../assets/google.png')} />
                  <Text>{`Google`}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 16,
    display: 'flex',
    gap: 40,
  },
  containerLogin: {
    display: 'flex',
    gap: 40,
  },
  containerRegister: {
    display: 'flex',
    gap: 40,
  },
  backgroundImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    height: 43,
    alignItems: 'center',
    backgroundColor: '#181F30',
    borderRadius: 11.28,
    padding: 4,
    justifyContent: 'space-between',
  },
  tab: {
    height: 35,
    textAlignVertical: 'center',
    textAlign: 'center',
    color: '#C1C7CD',
    width: 168,
    fontFamily: 'SF-Pro-Text-Regular',
    borderRadius: 11.28,
  },
  heading: {
    fontSize: 30,
    fontFamily: 'SF-Pro-Text-Bold',
    color: 'white',
  },
  label: {
    color: '#A7AFB7',
    fontSize: 13.16,
  },
  inputView: {
    display: 'flex',
    gap: 11.26,
  },
  input: {
    backgroundColor: '#0A0D14',
    borderRadius: 11.28,
    height: 50,
    fontFamily: 'SF-Pro-Text-Regular',
    paddingHorizontal: 18.8,
    lineHeight: 15.71,
    color: 'white',
    position: 'relative',
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0D14',
    borderRadius: 11.28,
    height: 50,
    fontFamily: 'SF-Pro-Text-Regular',
    paddingHorizontal: 18.8,
    lineHeight: 15.71,
    color: '#777777',
  },
  passwordInputText: {
    flex: 1,
    color: 'white',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  forgot: {
    color: '#304BFF',
    fontSize: 13.16,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  logbtn: {
    backgroundColor: '#3249FF',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: 50,
    borderRadius: 15.04,
    color: 'white',
    fontSize: 16.92,
    width: '100%',
    fontFamily: 'SF-Pro-Text-Regular',
  },

  btns: {
    gap: 18.8,
  },
  or: {
    textAlign: 'center',
    color: '#777777',
    fontSize: 13.16,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  logbtn2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googlebtn: {},
  googleIcon: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    width: 162,
    borderRadius: 15.04,
    color: '#1B232A',
    fontSize: 16.92,
    backgroundColor: '#fff',
    fontFamily: 'SF-Pro-Text-Regular',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#111622',
    color: '#C1C7CD',
  },
  successImage: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;
