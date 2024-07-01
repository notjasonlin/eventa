import React, { useState } from 'react'
import { StyleSheet, View, AppState, Alert } from 'react-native'
import { supabase } from '../../lib/supabase'
import { Button, Input } from '@rneui/themed'
import { useDispatch } from "react-redux";
import { AppDispatch } from '../../store/redux/store'
import { signIn, signUp, signInWithPhone, verifyOtp } from "../../store/redux/auth"

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [isEmailSignIn, setIsEmailSignIn] = useState(true)
  const [otpSent, setOtpSent] = useState(false)
  const dispatch = useDispatch<AppDispatch>();

  async function signInWithEmail() {
    setLoading(true)
    dispatch(signIn({email, password})).then((result) => {
      setLoading(false)
      if (result.error) Alert.alert(result.error.message)
    })
  }

  async function signUpWithEmail() {
    setLoading(true)
    dispatch(signUp({email, password})).then((result) => {
      setLoading(false)
      if (result.error) Alert.alert(result.error.message)
    })
  }

  async function handleSignInWithPhone() {
    setLoading(true)
    dispatch(signInWithPhone({phone})).then((result) => {
      setLoading(false)
      if (result.error) {
        Alert.alert(result.error.message)
      } else {
        setOtpSent(true)
      }
    })
  }

  async function handleVerifyOtp() {
    setLoading(true)
    dispatch(verifyOtp({phone, otp})).then((result) => {
      setLoading(false)
      if (result.error) {
        Alert.alert(result.error.message)
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.switchContainer}>
        <Button
          title="Sign in with Email"
          onPress={() => setIsEmailSignIn(true)}
          disabled={isEmailSignIn}
        />
        <Button
          title="Sign in with Phone"
          onPress={() => setIsEmailSignIn(false)}
          disabled={!isEmailSignIn}
        />
      </View>

      {isEmailSignIn ? (
        <>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input
              label="Email"
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.verticallySpaced}>
            <Input
              label="Password"
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
            />
          </View>
          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button title="Sign in" disabled={loading} onPress={signInWithEmail} />
          </View>
          <View style={styles.verticallySpaced}>
            <Button title="Sign up" disabled={loading} onPress={signUpWithEmail} />
          </View>
        </>
      ) : (
        <>
          {otpSent ? (
            <>
              <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                  label="OTP"
                  leftIcon={{ type: 'font-awesome', name: 'key' }}
                  onChangeText={(text) => setOtp(text)}
                  value={otp}
                  placeholder="One-time password"
                  autoCapitalize={'none'}
                />
              </View>
              <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title="Verify OTP" disabled={loading} onPress={handleVerifyOtp} />
              </View>
            </>
          ) : (
            <>
              <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input
                  label="Phone"
                  leftIcon={{ type: 'font-awesome', name: 'phone' }}
                  onChangeText={(text) => setPhone(text)}
                  value={phone}
                  placeholder="Phone number"
                  autoCapitalize={'none'}
                />
              </View>
              <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button title="Send OTP" disabled={loading} onPress={handleSignInWithPhone} />
              </View>
            </>
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  switchContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
})
