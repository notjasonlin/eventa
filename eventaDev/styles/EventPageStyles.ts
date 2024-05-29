import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeTab: {
    borderBottomColor: '#000',
  },
  inactiveTab: {
    borderBottomColor: 'gray',
  },
  activeTabText: {
    color: '#000',
  },
  inactiveTabText: {
    color: 'gray',
  },
  noEventsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  noEventsText: {
    fontSize: 18,
    color: '#000',
  },
  createButton: {
    marginTop: 30,
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#000',
    borderRadius: 5,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
