import { View, Text, TouchableOpacity } from 'react-native';
import React, { type FC } from 'react';
import styles from './styles';

interface props {
  item: dataProps;
  index: number;
  updateSelection: (index: number) => void;
  deleteItem: (index: number) => void;
}

const SingleItem: FC<props> = ({
  item,
  index,
  updateSelection,
  deleteItem,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() => updateSelection(index)}
        onLongPress={() => deleteItem(index)}
      >
        <Text style={styles.textStyle}>{item?.id}</Text>
        <Text style={styles.textStyle}>{item?.name}</Text>
        <Text style={styles.textStyle}>{item?.age}</Text>
        <Text
          style={[
            styles.textStyle,
            { color: item?.isSelected ? 'green' : 'red' },
          ]}
        >
          {item?.isSelected ? '✓' : 'x'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleItem;
