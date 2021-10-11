import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";

export default function App() {
  const [word, onChangeWord] = React.useState("");
  const [wordsList, setWordsList] = React.useState([]);

  const addWord = () => {
    if (word.trim().length > 0) {
      setWordsList([
        ...wordsList,
        {
          word: word.trim(),
          vogCons: vowelConsonant(word.trim()),
          num: wordsList.length + 1,
        },
      ]);
      onChangeWord("");
    }
  };

  const vowelConsonant = (value) => {
    let countVowel = 0;
    let countConsonant = 0;
    const vowels = ["a", "A", "e", "E", "i", "I", "o", "O", "u", "U"];
    for (i = 0; i < value.length; i++) {
      if (value[i] != " ") {
        if (vowels.includes(value[i])) {
          countVowel++;
        } else {
          countConsonant++;
        }
      }
    }
    return countVowel + "v " + countConsonant + "c";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputButton}>
        <TextInput
          style={styles.input}
          onChangeText={(value) => onChangeWord(value)}
          value={word}
          placeholder="Enter a word or phrase"
        />
        <Button
          style={styles.button}
          onPress={addWord}
          title="Add"
          color="#841584"
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={wordsList}
          renderItem={({ item }) => renderItem(item)}
          keyExtractor={(item) => item.num.toString()}
        />
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const renderItem = (props) => (
  <View style={{ flexDirection: "row" }}>
    <Text>#{props.num}. </Text>
    <Text> {props.word} </Text>
    <Text> {props.vogCons} </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 100,
  },
  input: {
    flexDirection: "column",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {},
  inputButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  scrollView: {
    padding: 20,
  },
});
