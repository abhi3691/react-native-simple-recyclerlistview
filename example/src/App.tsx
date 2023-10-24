import * as React from 'react';

import { StyleSheet, Dimensions, SafeAreaView, Alert } from 'react-native';
import {
  DataProvider,
  SimpleRecycler,
} from 'react-native-simple-recyclerlistview';
import SingleItem from './SingleItem';
import { Data } from './Data';

const dimensions = Dimensions.get('window');
export default function App() {
  const recyclerRef = React.useRef<SimpleRecycler>(null);

  React.useLayoutEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    recyclerRef.current?.loadDataFromApi(Data);
  };

  const updateSelection = React.useCallback((index: number) => {
    const dataList = recyclerRef?.current?.state.dataList;
    const oldData: any = Object.assign([], dataList);
    oldData[index].item.isSelected = !oldData[index].item.isSelected;
    recyclerRef?.current?.setState({
      dataList: oldData,
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
        recyclerRef?.current?.state.dataList
      ),
    });
  }, []);

  const deleteItem = React.useCallback((index: number) => {
    Alert.alert('Delete', 'Do you want to Delete ', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          recyclerRef?.current?.SpliceData(index);
        },
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SimpleRecycler
        emptyText="No Data Found"
        height={dimensions.height}
        width={dimensions.width}
        rowRenderer={(_type, data, index, _extendedState) => {
          return (
            <SingleItem
              item={data?.item}
              index={index}
              updateSelection={updateSelection}
              deleteItem={deleteItem}
            />
          );
        }}
        ref={recyclerRef}
        emptyTextStyle={{
          fontSize: 12,
          color: 'gray',
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d2d2d2',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
