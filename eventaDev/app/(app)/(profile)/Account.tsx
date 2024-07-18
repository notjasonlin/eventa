import React, { useState, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Alert, Platform } from 'react-native';
import { Button, Input } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';
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
  const [dob, setDob] = useState<Date | null>(null);
  const [phone, setPhone] = useState('');
  const [id, setId] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

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
            setDob(profile.dob ? new Date(profile.dob) : null);
            setPhone(profile.phone ? profile.phone.toString() : '');
            setId(profile.id); // Set the ID for updating profile
          }
        })
        .catch((error) => Alert.alert(error.message))
        .finally(() => setLoading(false));
    }
  }, [session, dispatch]);

  const handleUpdateProfile = () => {
    setLoading(true);
    dispatch(updateProfile({ id, firstName, lastName, email, gender, dob: dob ? dob.toISOString() : null, phone: phone ? parseInt(phone) : null }))
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

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
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
      <View style={styles.verticallySpaced}>
        <Input label="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Select Date of Birth" onPress={showDatePickerModal} />
        {dob && <Input label="Date of Birth" value={dob.toDateString()} editable={false} />}
        {showDatePicker && (
          <DateTimePicker
            value={dob || new Date()}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
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
