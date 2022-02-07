import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Image, Linking, TextInput, Button, FlatList } from "react-native";

const width = Dimensions.get("window").width;

export default function App() {
  const [results, setResults] = useState([]);
  const [term, setTerm] = useState("");
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState(false);

  const getResults = async () => {
    try {
      if (term !== "") {
        setKeyword(term);
        const response = await fetch("https://api.spoonacular.com/recipes/search?apiKey=87c45c38a7b84805a9edf84e112c9f0d&query=" + term);

        const json = await response.json();

        // sets the array of results returned by the API
        setResults(json.results);
        setSearch(true);
      } else {
        setSearch(false);
        getClear;
      }
    } catch (error) {
      console.error(error);
    }
  };

  function DisplayResultInfo() {
    if (results.length > 0) {
      return (
        <View>
          <Text style={{ fontSize: 17, color: "#780032", marginTop: 10 }}>{results.length} results has been found</Text>
        </View>
      );
    } else {
      return <View></View>;
    }
  }

  function DisplayRecipes() {
    if (search) {
      if (results.length === 0) {
        return (
          <View style={styles.resultBox}>
            <Text style={styles.noData}>There is no data </Text>
            <Text style={styles.noData}>with keyword '{keyword}'</Text>
          </View>
        );
      } else {
        return (
          <FlatList
            data={results}
            renderItem={({ item, index }) => (
              <View style={styles.resultBox} key={item.id}>
                <Text style={styles.title}>
                  {index + 1}.{item.title}
                </Text>
                <Image source={{ uri: `https://spoonacular.com/recipeImages/${item.image}` }} style={styles.image} />
                <Text style={styles.readyInMin}>Ready In Minutes : {item.readyInMinutes} min</Text>
                <Text style={styles.servings}>( Servings : {item.servings} )</Text>

                <Button style={{ fontSize: 20 }} onPress={() => Linking.openURL(`${item.sourceUrl}`)} title='View the Recipe' />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        );
      }
    } else {
      return <View></View>;
    }
  }

  const getClear = async () => {
    setSearch(false);
    setTerm("");
    setResults([]);
    getResults;
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Image source={{ uri: `https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F23%2F2020%2F01%2F02%2Fcooking.jpg` }} style={styles.mainImage} />
        <Text style={styles.headingTitle}>Recipe Finder</Text>
        <TextInput style={styles.keyword} placeholder='Enter the keyword' value={term} onChangeText={(term) => setTerm(term)} />
        <View style={styles.buttons}>
          <Button onPress={getResults} title='Search' />
          <Button onPress={getClear} title='Clear' />
        </View>
        <DisplayResultInfo />
      </View>
      <View style={styles.contents}>
        <DisplayRecipes />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#C8E3F6",
    paddingTop: 65,
    paddingBottom: 75
  },
  headingTitle: {
    fontSize: 35,
    fontWeight: "500"
  },
  contents: {
    flex: 3,
    backgroundColor: "#e8eaf0"
  },
  resultBox: {
    width: width,
    alignItems: "center",
    backgroundColor: "#e8eaf0",
    padding: 25
  },
  title: {
    alignItems: "center",
    fontSize: 23,
    fontWeight: "bold"
  },
  readyInMin: {
    marginTop: 10,
    fontSize: 20
  },
  servings: {
    margin: 10,
    fontSize: 18
  },
  image: {
    marginTop: 30,
    alignItems: "center",
    width: width * 0.4,
    height: width * 0.4
  },
  mainImage: {
    width: width * 0.2,
    height: width * 0.1
  },

  noData: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 27
  },
  keyword: {
    height: 40,
    marginBottom: 10,
    fontSize: 20
  },
  buttons: {
    justifyContent: "space-between",
    flexDirection: "row"
  }
});
