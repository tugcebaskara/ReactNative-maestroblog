import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  RefreshControl,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

// import { Container } from './styles';
import BlogServices from "../../services/BlogServices";
import Colors from "../../helpers/Colors";
import { shadow } from "../../helpers/Shadow";
import BlogContext from "../../context/BlogContext";

const blogServices = new BlogServices();

const Home = ({ navigation }) => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  const { setBlogContent } = useContext(BlogContext);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const nameControl = (item) => {
    return (
      <Text style={styles.tagText}>
        {item?.length < 400 ? item : item?.substr(0, 400) + "..."}
      </Text>
    );
  };

  const fetchBlogs = async () => {
    try {
      const response = await blogServices.getBlogList(page);
      console.log("response", response);
      console.log("data", response.result);
      setBlogs([...blogs, ...response.result]);
      setPage(page + 1);
    } catch (error) {
      console.log("error", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setBlogs([]);
    setPage(1);
    fetchBlogs();
    setRefreshing(false);
  };

  const onClick = (item) => {
    setBlogContent(item);
    navigation.navigate("Detail");
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={onClick.bind(this, item)}>
        <View style={{ width: "100%", alignItems: "center" }}>
          <View key={index.toString()} style={styles.card}>
            <View style={styles.ImageView}>
              <Image
                style={styles.ImageViewImage}
                source={{
                  uri: item?.banner,
                }}
              />
            </View>
            <View style={{ width: "100%", marginTop: wp("3%") }}>
              <Text style={styles.title}>{item?.title} </Text>
              <Text style={styles.subTitle}>{nameControl(item?.summary)}</Text>
              <Text style={styles.subTitle}>
                <Text
                  style={{
                    fontSize: wp("3%"),
                    color: Colors.black,
                    marginBottom: wp("1%"),
                    fontWeight: "bold",
                  }}
                >
                  Total Reading Time :
                </Text>{" "}
                {Math.abs(item?.totalReadingTime)} minutes
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
      <FlatList
        style={{ marginTop: "4%" }}
        numColumns={1}
        data={blogs}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={fetchBlogs}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  mainHeader: {
    height: Platform.OS === "ios" ? wp("22%") : wp("14%"),
    width: wp("100&"),
    justifyContent: "flex-end",
    alignItems: "center",
  },
  mainText: {
    marginBottom: wp("2%"),
    fontSize: wp("4.2%"),
    color: Colors.primary,
    fontWeight: "600",
  },
  title: {
    fontSize: wp("3%"),
    color: Colors.primary,
    marginBottom: wp("1%"),
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: wp("3%"),

    color: Colors.dark_gray,
  },
  ImageView: {
    width: wp("85%"),
    height: wp("80%") / 2,
    marginTop: wp("2%"),
  },
  ImageViewImage: {
    width: "100%",
    height: "100%",
    borderBottomRightRadius: wp("6%"),
    borderBottomLeftRadius: wp("6%"),
    borderTopRightRadius: wp("6%"),
    borderTopLeftRadius: wp("6%"),
  },
  card: {
    flex: 1,
    marginBottom: wp("4%"),
    backgroundColor: Colors.light_gray_text,
    width: wp("90%"),
    borderRadius: wp("6%"),
    padding: wp("3%"),
    paddingTop: 0,
    alignItems: "center",
    ...shadow.dark,
  },
  headerContent: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    flex: 0.5,
    backgroundColor: "white",
    justifyContent: "center",
    padding: 2,
    //alignItems:'center'
  },
  headerButton: {
    borderWidth: 0.1,
    borderColor: "#C4C4C4",
    width: 179,
    height: 36,
    shadowColor: "grey",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0.4, height: 0.4 },
    shadowRadius: 3,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 1,
  },
  headerTitle: {
    // color: Colors.secondry_text_color,
    fontSize: 14,
    fontWeight: "normal",
  },
});
