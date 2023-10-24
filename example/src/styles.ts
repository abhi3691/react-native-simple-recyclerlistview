import { Dimensions, StyleSheet } from 'react-native';
const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: dimensions.height / 8,
    width: dimensions.width,
    paddingHorizontal: dimensions.width / 20,
  },
  box: {
    flex: 1,
    backgroundColor: '#fff',
    elevation: 10,
    marginBottom: dimensions.height / 30,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
  },
});
export default styles;
