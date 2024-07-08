import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Button, Input } from '@rneui/themed';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from 'expo-router';
import { RootState, AppDispatch } from '../../../store/redux/store';
import { signOut, fetchProfile, updateProfile } from '../../../store/redux/auth';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const session = useSelector((state: RootState) => state.authentication.session);
  const profile = useSelector((state: RootState) => state.authentication.profile);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Profile',
    });
  }, [navigation]);

  useEffect(() => {
    if (session) {
      dispatch(fetchProfile(session.user.id))
        .unwrap()
        .then((profile) => {
          if (profile) {
            setFirstName(profile.firstName);
            setLastName(profile.lastName);
            setEmail(profile.email);
            setGender(profile.gender);
          }
        })
        .catch((error) => Alert.alert(error.message))
        .finally(() => setLoading(false));
    }
  }, [session, dispatch]);

  const handleUpdateProfile = () => {
    setLoading(true);
    dispatch(updateProfile({ firstName, lastName, email, gender }))
      .unwrap()
      .then(() => Alert.alert('Success', 'Profile updated successfully'))
      .catch((error) => Alert.alert(error.message))
      .finally(() => setLoading(false));
  };

  const handleSignOut = () => {
    dispatch(signOut())
      .unwrap()
      .then(() => Alert.alert('Signed out successfully'))
      .catch((error) => Alert.alert(error.message));
  };

  return (
    <View style={styles.container}>
      <View style={styles.verticallySpaced}>
        <Input label="First Name" value={firstName} onChangeText={setFirstName} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Last Name" value={lastName} onChangeText={setLastName} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Email" value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Gender" value={gender} onChangeText={setGender} />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? 'Loading ...' : 'Update'}
          onPress={handleUpdateProfile}
          disabled={loading}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={handleSignOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
});