import React, { createRef, memo, useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { getRef, setRef } from '../../Helper/GlobalRef';
import { Colors } from '../../Themes';
import { NoteProps } from './Interface';

const CartNote: React.FC<NoteProps> = ({ id }) => {
  const [isOnEdit, setIsOnEdit] = useState(false);
  const inputRef = createRef<TextInput>();
  const [text, onChangeText] = React.useState('');

  useEffect(() => {
    const refs = getRef;
    const refName = `checkoutItems_${id}`;
    let checkedoutItem = {};
    if (refs[refName]?.id) {
      checkedoutItem = { ...refs[refName] };
    }
    setRef(refName, { ...checkedoutItem, note: text });
  }, [id, text]);

  const onClick = () => {
    inputRef?.current?.focus();
    setIsOnEdit(true);
  };

  const blurInput = () => {
    inputRef?.current?.blur();
    setIsOnEdit(false);
  };

  const onChange = (val: string) => {
    if (val.length <= 120) {
      onChangeText(val);
      setIsOnEdit(!!val);
    }
  };

  return (
    <TouchableOpacity style={styles.noteWrapper} onPress={onClick}>
      {isOnEdit || text ? (
        isOnEdit ? (
          <View>
            <Text style={styles.noteTitle}>Catatan untuk Barang Ini</Text>
            <TextInput
              style={styles.noteInput}
              multiline={true}
              onChangeText={onChange}
              value={text}
              ref={inputRef}
              onBlur={blurInput}
              maxLength={120}
            />
            <Text style={styles.noteLimit}>{text?.length}/120</Text>
          </View>
        ) : (
          <View style={styles.noteTextWrapper}>
            <View>
              <Text numberOfLines={1} style={styles.noteText}>
                {text}
              </Text>
            </View>
            <Text style={styles.noteEditText}>Ubah</Text>
          </View>
        )
      ) : (
        <Text style={[styles.textEditNotes]}>Tulis Catatan</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteWrapper: { paddingTop: 14 },
  noteTitle: { fontSize: 10, color: Colors.prussianBlue, paddingBottom: 2 },
  noteInput: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.prussianBlue,
    fontSize: 12,
    color: Colors.black,
    paddingBottom: 4,
    maxWidth: 100,
  },
  noteLimit: { textAlign: 'right', fontSize: 10, color: Colors.prussianBlue },
  noteTextWrapper: {
    flexDirection: 'row',
    alignItems: 'baseline',
    maxWidth: '90%',
  },
  noteText: { fontSize: 12, color: Colors.black, flexShrink: 1 },
  noteEditText: { fontSize: 10, color: Colors.prussianBlue, paddingLeft: 6 },
  textEditNotes: { fontSize: 12, color: Colors.prussianBlue },
});

export default memo(CartNote);
