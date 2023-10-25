# react-native-simple-recyclerlistview

[![npm version](https://img.shields.io/npm/v/react-native-simple-recyclerlistview.svg)](https://www.npmjs.com/package/react-native-simple-recyclerlistview)
[![appveyor](https://ci.appveyor.com/api/projects/status/foon3b5reptapqgo/branch/main?svg=true)](https://ci.appveyor.com/project/abhi3691/react-native-simple-recyclerlistview)
[![License](https://img.shields.io/badge/License-Apache%202.0-brightgreen.svg)](https://opensource.org/licenses/Apache-2.0)

If this project has helped you out, please support us with a star :star2:.

This is a high performance listview for React Native and Web with support for complex layouts. JS only with no native dependencies, inspired by both RecyclerView on Android
and UICollectionView on iOS.

`npm install --save react-native-simple-recyclerlistview`

- **[Overview and features](#overview-and-features)**
- **[Why?](#why)**
- **[Demo](#demo)**
- **[Props](#props)**
- **[Typescript](#typescript)**
- **[Guides](#guides)**
- **[License](#license)**
- **[Contact us](#contact-us)**

Note: Documentation will be upgraded soon, for now check code comments for clarity and exploring features. This component is actively tested with React Native Web as well.

## Overview and features

RecyclerListView uses "cell recycling" to reuse views that are no longer visible to render items instead of creating new view objects. Creation of objects
is very expensive and comes with a memory overhead which means as you scroll through the list the memory footprint keeps going up. Releasing invisible items off
memory is another technique but that leads to creation of even more objects and lot of garbage collections. Recycling is the best way to render infinite lists
that does not compromise performance or memory efficiency.

Apart from all performance benefits RecyclerListView comes with great features out of the box:

- Cross Platform, works on Web
- Supports staggered grid layouts
- Supports variable height items even if dimensions cannot be predetermined (prop - `forceNonDeterministicRendering`)
- Instant layout switching like going from GridView to ListView and vice versa
- End reach detections
- Horizontal Mode
- Viewability Events
- Initial render offset/index support
- Footer support
- Reflow support on container size change with first visible item preservation
- Scroll position preservation
- Window scrolling support for web
- (New) ItemAnimator interface added, customize to your will how RLV handles layout changes. Allows you to modify animations that move cells. You can do things like smoothly move an item to a new position when height of one of the cells has changed.
- (New) Stable Id support, ability to associate a stable id with an item. Will enable beautiful add/remove animations and optimize re-renders when DataProvider is updated.
- (New) Sticky recycler items that stick to either the top or bottom.

## Why?

RecyclerListView was built with performance in mind which means no blanks while quick scrolls or frame drops.
RecyclerListView encourages you to have deterministic heights for items you need to render. This does not mean that you need to have all items of same height and stuff, all you need
is a way to look at the data and compute height upfront so that RecyclerListView can compute layout in one pass rather than waiting for the draw to happen.
You can still do all sorts of GridViews and ListViews with different types of items which are all recycled in optimal ways. Type based recycling is very easy
to do and comes out of the box.

In case you cannot determine heights of items in advance just set `forceNonDeterministicRendering` prop to true on RecyclerListView. Now, it will treat given dimensions as estimates and let items resize. Try to give good estimates to improve experience.

## Demo

**Production Flipkart Grocery Demo Video (or try the app):** https://youtu.be/6YqEqP3MmoU  
**Infinite Loading/View Change (Expo):** https://snack.expo.io/@naqvitalha/rlv-demo  
**Mixed ViewTypes:** https://snack.expo.io/B1GYad52b  
**extendedState,stableIDs and ItemAnimator (Expo):** https://snack.expo.io/@arunreddy10/19bb8e  
**Sample project:** https://github.com/naqvitalha/travelMate  
**Web Sample (Using RNW):** https://codesandbox.io/s/k54j2zx977, https://jolly-engelbart-8ff0d0.netlify.com/  
**Context Preservation Sample:** https://github.com/naqvitalha/recyclerlistview-context-preservation-demo

**Other Video:** https://www.youtube.com/watch?v=Tnv4HMmPgMc

[![Watch Video](https://img.youtube.com/vi/Tnv4HMmPgMc/0.jpg)](https://www.youtube.com/watch?v=Tnv4HMmPgMc)

## Props
Here's the updated README table with the additional props:

## Props

| Prop                          | Required | Params Type                                       | Description                                                                                                           |
| ----------------------------- | -------- | ------------------------------------------------- | ----------------------------------------------------- |
| width                         | Yes      | number                                           | The width of the RecyclerListView. |
| height                        | Yes      | number                                           | The height of the RecyclerListView. |
| canChangeSize                 | No       | boolean                                          | Specify if the size of list items can change. |
| rowRenderer                   | Yes      | (type: string \| number, data: any, index: number, extendedState?: object \| undefined) => JSX.Element | Method that returns a React component to be rendered. You get the type, data, index, and extendedState in the callback. |
| renderFooter                  | No       | () => JSX.Element                                  | Method to render a footer for the list. Useful for showing a loader while doing incremental loads. |
| externalScrollView            | No       | { new (props: ScrollViewDefaultProps): BaseScrollView } | Use this to pass your own implementation of BaseScrollView. |
| forceNonDeterministicRendering | No       | boolean                                          | If enabled, dimensions provided in the layout provider will not be strictly enforced. Use this if item dimensions cannot be accurately determined. |
| horizontal                    | No       | boolean                                          | If true, the list will operate horizontally rather than vertically. |
| onScroll                      | No       | (event: any) => void                             | Callback function executed when the user scrolls. |
| activityColor                 | No       | ColorValue \| undefined                          | The color for the loading activity indicator. |
| activitySize                  | No       | number | 'small' | 'large' | undefined | The size of the loading activity indicator. |
| emptyText                     | Yes      | string                                           | Text to display when the list is empty. |
| emptyTextStyle                | Yes      | TextStyle                                        | Style for the empty text. |
| scrollViewProps               | No       | object                                           | Additional props to be passed to the inner/external scrollview. |
| onEndReached                  | No       | any                                              | Callback function executed when the end of the view is reached. |
| onItemLayout                  | No       | any                                              | A callback function that is executed when an item of the RecyclerListView (at an index) has been layout. This can also be used as a proxy to itemsRendered kind of callbacks. |


For full feature set have a look at prop definitions of [RecyclerListView](https://github.com/Flipkart/recyclerlistview/blob/21049cc89ad606ec9fe8ea045dc73732ff29eac9/src/core/RecyclerListView.tsx#L540-L634)
(bottom of the file). All `ScrollView` features like `RefreshControl` also work out of the box.

### applyWindowCorrection usage

`applyWindowCorrection` is used to alter the visible window bounds of the RecyclerListView dynamically. The windowCorrection of RecyclerListView along with the current scroll offset are exposed to the user. The `windowCorrection` object consists of 3 numeric values:

- `windowShift` - Direct replacement of `distanceFromWindow` parameter. Window shift is the offset value by which the RecyclerListView as a whole is displaced within the StickyContainer, use this param to specify how far away the first list item is from window top. This value corrects the scroll offsets for StickyObjects as well as RecyclerListView.
- `startCorrection` - startCorrection is used to specify the shift in the top visible window bound, with which user can receive the correct Sticky header instance even when an external factor like CoordinatorLayout toolbar.
- `endCorrection` - endCorrection is used to specify the shift in the bottom visible window bound, with which user can receive correct Sticky Footer instance when an external factor like bottom app bar is changing the visible view bound.

As seen in the example below

![Alt Text](/docs/images/getWindowCorrection_demo.gif)

## Typescript

Typescript works out of the box. The only execption is with the inherited Scrollview props. In order for Typescript to work with inherited Scrollview props, you must place said inherited Scrollview props within the scrollViewProps prop.

```javascript
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
  const recyclerRef = React.useRef < SimpleRecycler > null;

  React.useEffect(() => {
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
        rowRenderer={(type, data, index, extendedState) => {
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
```

## Guides

<!-- - **[Sample Code](https://github.com/Flipkart/recyclerlistview/tree/master/docs/guides/samplecode)**
- **[Performance](https://github.com/Flipkart/recyclerlistview/tree/master/docs/guides/performance)**
- **[Sticky Guide](https://github.com/Flipkart/recyclerlistview/tree/master/docs/guides/sticky)**
- **Web Support:** Works with React Native Web out of the box. For use with ReactJS start importing from `recyclerlistview/web` e.g., `import { RecyclerListView } from "recyclerlistview/web"`. Use aliases if you want to preserve import path. Only platform specific code is part of the build so, no unnecessary code will ship with your app.
- **Polyfills Needed:** `requestAnimationFrame`, `ResizeObserver` -->

## License

<!-- **[Apache v2.0](https://github.com/Flipkart/recyclerlistview/blob/master/LICENSE.md)** -->

## Contact Us

<!--
Please open issues for any bugs that you encounter. You can reach out to me on twitter [@naqvitalha](https://www.twitter.com/naqvitalha) or, write to cross-platform@flipkart.com for any questions that
you might have. -->
