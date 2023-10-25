import type { TextStyle, ColorValue } from 'react-native';
import { BaseScrollView, DataProvider } from 'recyclerlistview';
import type { ScrollViewDefaultProps } from 'recyclerlistview/dist/reactnative/core/scrollcomponent/BaseScrollView';

export interface RecyclerProps {
  width: number;
  height: number;
  canChangeSize?: boolean;
  rowRenderer: (
    type: string | number,
    data: any,
    index: number,
    extendedState?: object | undefined
  ) => JSX.Element;
  renderFooter?: () => JSX.Element;
  externalScrollView?: {
    new (props: ScrollViewDefaultProps): BaseScrollView;
  };
  forceNonDeterministicRendering?: boolean;
  horizontal?: boolean;
  onScroll?: (event: any) => void;
  activityColor?: ColorValue | undefined;
  activitySize?: number | 'small' | 'large' | undefined;
  emptyText: string;
  emptyTextStyle: TextStyle;
  scrollViewProps?: object;
  onEndReached?: any;
  onItemLayout?: any;
}

export interface RecyclerState {
  list: DataProvider;
  dataList: {
    type: string | number;
    item: any;
  }[];
  loading: boolean;
}

export interface DimProps {
  width: number;
  height: number;
}
