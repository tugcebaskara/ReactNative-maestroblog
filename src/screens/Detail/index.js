import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import BlogContext from "../../context/BlogContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Colors from "../../helpers/Colors";
import { WebView } from "react-native-webview";
// import { Container } from './styles';

const Detail = () => {
  const { blogContent } = useContext(BlogContext);
  console.log("blogContent", blogContent);
  const [webViewHeight, setWebViewHeight] = useState(0);

  const updateWebViewHeight = (event) => {
    const { height } = event.nativeEvent;
    setWebViewHeight(height);
  };

  const injectedJavaScript = `
    window.ReactNativeWebView.postMessage(JSON.stringify({height: document.body.scrollHeight}));
  `;

  return (
    <View
      style={{
        flex: 1,
        top:15,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Image
              source={{ uri: blogContent?.banner }}
              style={styles.imageStyle}
            />
            <View style={styles.description}>
              <Text style={styles.title}>{blogContent?.title} </Text>
              <Text style={styles.subTitle}>{blogContent?.summary}</Text>
            </View>
          </View>
          <View style={styles.interlayerContition}>
            <Text
              style={{
                paddingHorizontal: wp("4.5%"),
                fontWeight: "bold",
                color: "black",
                fontSize: 14,
              }}
            >
              Details
            </Text>
          </View>
          <View style={styles.announcementDesc}>
            <Text style={styles.subTitle}>{blogContent?.metaDescription}</Text>
          </View>
        </View>
        <View
          style={{
            width: wp("100%"),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WebView
            scrollEnabled={false}
            style={{ width: wp("96%"), height: wp("100%") }}
            source={{ html: blogContent.content }}
            onLoadProgress={(e) => updateWebViewHeight(e)}
            injectedJavaScript={injectedJavaScript}
            javaScriptEnabled={true}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonView: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "flex-start",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    borderTopColor: Colors.light_gray,
    borderTopWidth: 1,
    height: Platform.OS === "ios" ? wp("15.5%") : wp("15.5%"),
  },
  headerView: {
    flexDirection: "column",
    backgroundColor: "white",
  },
  interlayerContition: {
    backgroundColor: "#F4F4F4",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  announcementDesc: {
    padding: wp("2.5%"),
    backgroundColor: "white",
  },
  imageStyle: {
    width: wp("100%"),
    height: wp("100%") / 2,
    borderRadius: wp("6%"),
  },
  fontStyle: {
    fontSize: 10,
    paddingTop: 5,
  },
  footerView: {
    flexDirection: "row",
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 0.4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 6,
    borderTopColor: Colors.light_gray,
    borderTopWidth: 1,
    height: Platform.OS === "ios" ? wp("15.5%") : wp("15.5%"),
  },
  title: {
    fontSize: wp("3.5%"),
    color: Colors.primary,
    marginBottom: wp("1%"),
    fontWeight: "bold",
    width: "100%",
  },
  subTitle: {
    fontSize: wp("3%"),

    color: Colors.dark_gray,
  },
  description: {
    width: wp("100%"),
    paddingHorizontal: wp("3"),
    paddingVertical: wp("3%"),
  },
});
