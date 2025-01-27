import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../Constants';
import { AppInput, AppInputStyles, InputType } from './AppInput';
import Autocomplete from 'react-native-autocomplete-input';

const imageAdd = require('../../images/add.png');

export type Tag<T> = {
  title: string;
  value: T;
}

interface IProps<T> {
  defaultTags: Tag<T>[];
  tags: Tag<T>[];
  onTagsChanged?: (tags: Tag<T>[]) => void;
  onAddTag?: (tagName: string) => void;
  notEditable?: boolean;
  autocomplete?: (query: string) => Promise<string[]>;
  requireAutocompleteMatch?: string[];
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    width: undefined,
    marginRight: 10,
    marginBottom: 10
  },
  autocompleteContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});


export const TagInput = function <T>({ defaultTags, tags, autocomplete, onTagsChanged, onAddTag, notEditable, requireAutocompleteMatch }: IProps<T>) {
  const [newInput, setNewInput] = React.useState<string>("");
  const [autocompleteItems, setAutocompleteItems] = React.useState<string[]>([]);

  const getId = (tag: Tag<T>) => {
    return tag.title.toLowerCase();
  }

  const onChangeAutocomplete = (val: string) => {
    setNewInput(val);
    autocomplete?.(val).then(results =>
      setAutocompleteItems(results)
    ).catch(console.error);
  }

  const renderTag = (tag: Tag<T>, selected: boolean) => {
    return (
      <TouchableOpacity style={[styles.tag, { backgroundColor: selected ? Colors.BLUE : '#F5F5F5' }]}
        key={getId(tag)}
        onPress={() => {
          if (!!notEditable) {
            return;
          }
          if (selected) {
            onTagsChanged?.(tags.filter(existing => getId(existing) !== getId(tag)))
          } else {
            onTagsChanged?.([...tags, tag])
          }
        }}>
        <Text allowFontScaling={false} style={{ color: selected ? 'white' : '#757575' }}>{tag.title}</Text>
      </TouchableOpacity>
    )
  }

  const addTag = () => {
    if (newInput.length === 0) {
      return;
    }

    onAddTag?.(newInput);
    setNewInput("");
    setAutocompleteItems([]);
  }

  const newTags = tags.filter(tag => defaultTags.find(defaultTag => getId(defaultTag) === getId(tag)) == null);

  const renderAutocompleteItem = (val: string) => {
    return (
      <TouchableOpacity key={val} onPress={() => {
        setNewInput(val);
        setAutocompleteItems([]);
      }}>
        <Text allowFontScaling={false} style={{ padding: 10 }}>{val}</Text>
      </TouchableOpacity>
    )
  }

  const shouldDisableAddButton = !!requireAutocompleteMatch && !requireAutocompleteMatch.includes(newInput);

  const addButton = (
    <TouchableOpacity
      disabled={shouldDisableAddButton}

      style={{ width: 36, height: 36, marginLeft: 10 }} onPress={addTag}>
      <Image source={imageAdd} style={{ height: '100%', width: '100%', opacity: shouldDisableAddButton ? .5 : 1 }} />
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 10, flexWrap: 'wrap' }}>
        {defaultTags.map(tag => renderTag(tag, !!tags.find(existing => getId(existing) === getId(tag))))}
        {newTags.map(tag => renderTag(tag, true))}
      </View >
      {!notEditable &&
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {autocomplete != null ?
            <View style={styles.autocompleteContainer}>
              <Autocomplete
                autoCorrect={false}
                inputContainerStyle={AppInputStyles.wrapper}
                listContainerStyle={{ borderRadius: 10, maxHeight: 200 }}
                listStyle={{ borderRadius: 10, maxHeight: 200, }}
                style={{ maxHeight: 200 }}
                data={autocompleteItems.filter(item => item.length > 0 && item.toLowerCase().includes(newInput.toLowerCase()))}
                value={newInput}
                onChangeText={onChangeAutocomplete}
                containerStyle={{ flex: 1 }}
                flatListProps={{
                  keyExtractor: (_, idx) => `${idx}`,
                  style: { maxHeight: 250, overflow: 'scroll', borderRadius: 10 },
                  renderItem: ({ item: val }) => (
                    renderAutocompleteItem(val)
                  ),
                }}
                renderItem={({ item }) => renderAutocompleteItem(item)}
              />
              {addButton}
            </View>
            :
            <AppInput type={InputType.TEXT} onChange={setNewInput} value={newInput} wrapperStyle={{ flex: 1 }} />
          }

          {autocomplete == null && addButton}
        </View>
      }
    </View>
  );
}