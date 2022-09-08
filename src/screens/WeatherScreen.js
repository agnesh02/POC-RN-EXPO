import React, { useEffect, useState } from "react";
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, View, FlatList, Image, ScrollView } from "react-native"
import OpenWeatherMap from "../../api/OpenWeatherMap";

const WeatherScreen = function () {

    const [basicData, setBasicData] = useState([])
    const [mainData, setMainData] = useState([])
    const [windData, setWindData] = useState([])

    const getCurrentWeatherData = async function () {
        const response = await OpenWeatherMap.get("?q=Kochi&APPID=b6ce0b3456949601e391e5a558343936&units=metric")
        const fetchedData = response.data

        setBasicData(fetchedData.weather[0])
        setMainData(fetchedData.main)
        setWindData(fetchedData.wind)
    }
    useEffect(()=>{getCurrentWeatherData()},[])

    const data = [
        { id: 1, name: "Clear sky", image: "http://openweathermap.org/img/wn/01d@2x.png", date: "07/09" },
        { id: 2, name: "Few clouds", image: "http://openweathermap.org/img/wn/02d@2x.png", date: "08/09" },
        { id: 3, name: "Scattered clouds", image: "http://openweathermap.org/img/wn/03d@2x.png", date: "09/09" },
        { id: 4, name: "Broken cloud", image: "http://openweathermap.org/img/wn/04d@2x.png", date: "10/09" },
        { id: 5, name: "Shower rain", image: "http://openweathermap.org/img/wn/10d@2x.png", date: "11/09" },
    ]

    return (
        <View style={styling.rootContainer}>

            <View style={styling.searchContainer}> 
                <View style={styling.inputContainer}>
                    <TextInput autoCapitalize="none" autoCorrect={false} placeholder="Enter a city" style={styling.input} />
                </View>
                <TouchableOpacity style={styling.GoButton} onPress={() => { }}>
                    <Text style={styling.GoButtonText}>Go</Text>
                </TouchableOpacity>
            </View>

            <View style={styling.mainCardContainer}>

                <View style={styling.cardInfoHeader}>
                    <Image style={styling.image2} source={{ uri: "http://openweathermap.org/img/wn/"+`${basicData.icon}`+"@2x.png" }} />
                    <Text style={styling.name}>{basicData.main}</Text>
                    <Text style={{alignSelf: "center", fontSize: 15}}>{basicData.description}</Text>
                </View>
                
                <View style={styling.cardMain}>
                    <View style={styling.cardInfo}>
                        <Image source={require("../../assets/hot.png")} style={{width: 40, height: 40}}/>
                        <Text style={{fontSize: 25, marginLeft: 20, marginTop: 5}}> {`${Math.round(mainData.temp)}`}°C </Text>
                    </View>
                    <View style={styling.cardInfo}>
                        <Text style={{fontSize: 16, marginTop: 5}} >Feels Like: {`${Math.round(mainData.feels_like)}`}°C  </Text>
                        <Text style={{fontSize: 16, marginLeft: 80, marginTop: 5}} >Wind: {windData.speed} m/s</Text>
                    </View>
                    <View style={styling.cardInfo}>
                        <Text style={{fontSize: 16, marginTop: 5, color: "red"}}>Max Temp : {`${Math.round(mainData.temp_max)}`}°C </Text>
                        <Text style={{fontSize: 16, marginLeft: 50, marginTop: 5, color: "blue"}}>Min Temp : {`${Math.round(mainData.temp_min)}`}°C </Text>
                    </View>
                    <View style={styling.cardInfo}>
                        <Text style={{fontSize: 16, marginTop: 10, color: "#5ea5d4"}}>Humidity : 87%</Text>
                    </View>
                </View>

            </View>

            <View style={styling.parentContainer}>
                <View style={styling.container}>
                    <FlatList
                        horizontal={true}
                        style={styling.contentList}
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
            
        </View>

    )

}

const styling = StyleSheet.create({
    rootContainer: {
        backgroundColor: "#fffafa",
        flex: 1,
    },
    searchContainer: {
        marginTop: 30,
        flexDirection: "row",
        flex:0.1,
    },
    inputContainer: {
        marginLeft: 8,
		width: '75%',
	},
	input: {
        borderWidth: 1,
        borderColor: "black",
		backgroundColor: 'white',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 10,
		marginTop: 5,
	},
    GoButton: {
        height: 35,
        width: 60,
        marginLeft: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: "blue",
        alignSelf: "center"
    },
    GoButtonText: {
        color: "white",
        fontSize: 15,
    },
    cardInfoHeader: {
        borderWidth: 2,
        borderColor: "red",
        marginTop: 10,
        flex: 0.4,
        alignSelf: "center",
        padding: 10
    },
    mainCardContainer: {
        flex: 0.58,
        alignItems: "center",
    },
    cardMain: {
        flex: 0.48,
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
        backgroundColor: "white",
        padding: 10,
        borderRadius: 30,
        marginVertical: 20,
        borderWidth: 2,
        borderColor: "#9900ff"
    },
    cardInfo: {
        flexDirection: "row",
        alignSelf: "center",
        justifyContent: "center"
    },
    parentContainer: {
        flex: 0.37,
        justifyContent: "flex-end"
    },
    container: {
        flex: 1,
        backgroundColor: "#ebf0f7",
        marginBottom: 10
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
    image2: {
        width: 60,
        height: 60,
        borderRadius: 45,
        borderWidth: 2,
        borderColor: "#ebf0f7",
        alignSelf: "center"
    },
    card: {
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
        marginVertical: 20,
        backgroundColor: "white",
        padding: 10,
        flexDirection: "row",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#b1202f"
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