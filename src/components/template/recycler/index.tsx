import { ActivityIndicator, Text, View } from 'react-native';
import React, { Component } from 'react';
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from 'recyclerlistview';
import styles from './styles';

import type { DimProps, RecyclerProps, RecyclerState } from './props';

class Recycler extends Component<RecyclerProps, RecyclerState> {
  layoutProvider: LayoutProvider;
  state: RecyclerState;
  scrollViewRef: any;

  constructor(props: any) {
    super(props);

    //state
    this.state = {
      list: new DataProvider((r1, r2) => r1 !== r2), // Use 'r1 !== r2' for comparison
      dataList: [],
      loading: true,
    };

    //ref
    this.layoutProvider = new LayoutProvider(
      (i) => {
        return this.state.list.getDataForIndex(i).type;
      },
      (_type, dim: DimProps) => {
        (dim.width = this.props.width), (dim.height = this.props.height);
      }
    );
  }

  // load Data using ref
  loadDataFromApi = (data: any) => {
    this.setState({ loading: true });
    this.state.dataList.splice(0, this.state.dataList.length);
    if (data.length !== 0) {
      for (let i in data) {
        this.state.dataList.push({
          type: 'NORMAL',
          item: data[i],
        });
        if (parseInt(i, 10) === data.length - 1) {
          this.setState({
            list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
              this.state.dataList
            ),
          });
          this.setState({ loading: false });
        }
      }
    } else {
      this.setState({ loading: false });
    }
  };

  // load moreData using ref
  loadMoreData = (data: any) => {
    this.setState({ loading: true });
    if (data.length !== 0) {
      for (let i in data) {
        this.state.dataList.push({
          type: 'NORMAL',
          item: data[i],
        });
        if (parseInt(i, 10) === data.length - 1) {
          this.setState({
            list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
              this.state.dataList
            ),
          });
          this.setState({ loading: false });
        }
      }
    } else {
      this.setState({ loading: false });
    }
  };

  addItem = (item: any) => {
    this.setState({ loading: true });
    this.state.dataList.push({
      type: 'NORMAL',
      item: item,
    });
    this.setState({
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
        this.state.dataList
      ),
    });
    this.setState({ loading: false });
  };

  //delte item using ref
  SpliceData(index: number) {
    const oldData = Object.assign([], this.state.dataList);
    oldData.splice(index, 1);

    this.setState({
      dataList: oldData,
    });
    this.setState({
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
        this.state.dataList
      ),
    });
  }

  //delte group of items using ref
  sliceData(start: number, end: number) {
    const oldData = Object.assign([], this.state.dataList);
    oldData.slice(start, end);

    this.setState({
      dataList: oldData,
    });
    this.setState({
      list: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
        this.state.dataList
      ),
    });
  }

  scrollToEnd() {
    if (this.scrollViewRef) {
      setTimeout(() => {
        this.scrollViewRef?._scrollComponent?._scrollViewRef.scrollToEnd({
          animated: true,
        });
      }, 500);
    }
  }

  render() {
    const { dataList, list, loading } = this.state;
    return (
      <View style={styles.container}>
        {loading === false ? (
          <>
            {dataList.length !== 0 ? (
              <RecyclerListView
                style={styles.container}
                dataProvider={list}
                canChangeSize={this.props?.canChangeSize}
                rowRenderer={this.props?.rowRenderer}
                renderFooter={this.props?.renderFooter}
                externalScrollView={this.props?.externalScrollView}
                layoutProvider={this.layoutProvider}
                forceNonDeterministicRendering={
                  this.props?.forceNonDeterministicRendering ?? true
                }
                ref={(ref) => {
                  this.scrollViewRef = ref;
                }}
                scrollViewProps={this.props?.scrollViewProps}
                isHorizontal={this.props?.horizontal}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                extendedState={{ state: dataList }}
                onScroll={this.props?.onScroll}
                onEndReached={this.props?.onEndReached}
                onItemLayout={this.props?.onItemLayout}
              />
            ) : (
              <View style={styles.EmptyTextView}>
                <Text style={[this.props.emptyTextStyle]}>
                  {this.props.emptyText}
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.activityContainer}>
            <ActivityIndicator
              color={this.props.activityColor}
              size={this.props.activitySize ?? 'large'}
            />
          </View>
        )}
      </View>
    );
  }
}

export default Recycler;
