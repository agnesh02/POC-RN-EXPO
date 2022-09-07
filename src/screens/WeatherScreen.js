import React, { useEffect } from "react";
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, View, FlatList, Image } from "react-native"
import OpenWeatherMap from "../../api/OpenWeatherMap";

const WeatherScreen = function () {

    const getResult = async function () {
        const response = await OpenWeatherMap.get("?q=London,uk&APPID=b6ce0b3456949601e391e5a558343936")
        console.log(response.data.main)
        console.log(response.data.wind)
    }
    //useEffect(()=>{getResult()},[])

    const data = [
        { id: 1, name: "Clear sky", image: "http://openweathermap.org/img/wn/01d@2x.png", date: "07/09" },
        { id: 2, name: "Few clouds", image: "http://openweathermap.org/img/wn/02d@2x.png", date: "08/09" },
        { id: 3, name: "Scattered clouds", image: "http://openweathermap.org/img/wn/03d@2x.png", date: "09/09" },
        { id: 4, name: "Broken cloud", image: "http://openweathermap.org/img/wn/04d@2x.png", date: "10/09" },
        { id: 5, name: "Shower rain", image: "http://openweathermap.org/img/wn/10d@2x.png", date: "11/09" },
    ]

    return (

        <View style={styling.parentContainer}>
            <View style={styling.container}>
            <FlatList
                horizontal={true}
                style={styling.contentList}
                columnWrapperStyle={styling.listContainer}
                data={data}
                keyExtractor={(item) => {
                    return item.id;
                }}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styling.card} onPress={() => { }}>
                            <Image style={styling.image} source={{ uri: item.image }} />
                            <View style={styling.cardContent}>
                                <Text style={styling.name}>{item.name}</Text>
                                <Text style={styling.feelsLike}>Feels Like : </Text>
                                <Text style={styling.feelsLikeTemp}>31°C</Text>
                                <Text style={styling.maxTemp}>Max Temp : 30°C</Text>
                                <Text style={styling.minTemp}>Min Temp : 28°C</Text>
                                <TouchableOpacity style={styling.followButton} onPress={() => { }}>
                                    <Text style={styling.followButtonText}>{item.date} 13:00hrs</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    )
                }} />
            </View>
        </View>
    )

}

const styling = StyleSheet.create({
    parentContainer: {
        flex: 1,
        // borderWidth: 3,
        // borderColor: "blue",
        justifyContent: "flex-end"
    },
    container: {
        flex: 0.33,
        // borderWidth: 3,
        // borderColor: "red",
        backgroundColor: "#ebf0f7",
        marginBottom: 50
    },
    contentList: {
        flex: 1
    },
    cardContent: {
        marginLeft: 5,
        marginTop: 10
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: "#ebf0f7"
    },

    card: {
        // borderWidth: 3,
        // borderColor: "red",
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,

        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        backgroundColor: "white",
        padding: 10,
        flexDirection: "row",
        borderRadius: 30,
        // width: 200
    },

    name: {
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "#3399ff",
        fontWeight: 'bold'
    },
    feelsLike: {
        fontSize: 14,
        marginLeft: 10,
        flex: 1,
        alignSelf: 'center',
        color: "purple"
    },
    feelsLikeTemp: {
        marginTop: -10,
        fontSize: 18,
        flex: 1,
        alignSelf: 'center',
        color: "violet"
    },
    maxTemp: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "red",
        marginLeft: -55,
        marginTop: 10
    },
    minTemp: {
        fontSize: 14,
        flex: 1,
        alignSelf: 'center',
        color: "blue",
        marginLeft: -55,
        marginTop: -5
    },
    followButton: {
        marginTop: 10,
        marginLeft: -55,
        height: 35,
        width: 100,
        // padding: 10,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "red",
        alignSelf: "center"
    },
    followButtonText: {
        color: "blue",
        fontSize: 12,
    },
});

export default WeatherScreen