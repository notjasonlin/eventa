// components/EventFormStyles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#000',
  },
  input: {
    height: 40,
    borderColor: 'black',
    fontWeight: 'bold',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    color: '#000',
  },
  dropdown: {
    height: 40,
    borderColor: 'black',  // Set border color to black
    borderWidth: 1,
    marginBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  dropdownText: {
    color: 'black',  // Set dropdown text color to black
    fontSize: 16,
    fontWeight: 'bold',  // Make the text bold
  },
  dropdownPlaceholder: {
    color: '#aaa',
    fontSize: 16,
  },
  dropdownOptions: {
    width: '90%',
    marginLeft: '5%',
  },
  dropdownView: {
    height: 40,
    justifyContent: 'center',
  },
  datePicker: {
    width: '100%',
    marginBottom: 20,
  },
  timeText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',  // Make the text bold
  },
  createButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
