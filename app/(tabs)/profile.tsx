import { View, Text,  Modal,Button, StyleSheet, FlatList, Image, TouchableOpacity, Pressable, TouchableWithoutFeedback, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const streaks = [
  { id: 'streak-1', label: 'Дні поспіль у сервісі', value: 12 },
  { id: 'streak-2', label: 'Бездоганних доставок', value: 48 },
  { id: 'streak-3', label: 'Фідбеків 5★', value: 31 },
];

const achievements = [
  {
    id: 'ach-1',
    title: 'Courier Sensei',
    note: '3 складні маршрути поспіль без затримок. Додай перевірку в коді і збирай бейдж.',
    color: '#fbbf24',
  },
  {
    id: 'ach-2',
    title: 'Нічний пік',
    note: 'Симуляція нічної зміни з push-алертами. Придумай три стани для відпочинку.',
    color: '#60a5fa',
  },
  {
    id: 'ach-3',
    title: 'Zero Waste',
    note: 'Відмічай пакунки, які повернулися, і запускай автоматичну рециркуляцію.',
    color: '#34d399',
  },
];

const learningFeed = [
  {
    id: 'feed-1',
    time: '10:12',
    text: 'Пройшов тренування “Live-route трекер”. Додай тепер real-time кольори статусів.',
  },
  {
    id: 'feed-2',
    time: '09:05',
    text: 'Перевірив 4 складські чек-листи. Варто впровадити вибір партії через QR.',
  },
  {
    id: 'feed-3',
    time: 'Вчора',
    text: 'Оновлено персональний ETA-алгоритм. Порівняй з версією з Explore.',
  },
];

export default function ProfileScreen()
{
  	return (
	<SafeAreaView style={styles.safe}>
		<ScrollView contentContainerStyle={styles.container}>
		<View style={styles.hero}>
			<View style={styles.badge}>
				<Ionicons name="person-outline" size={30} color="#fff"/>
			</View>
		</View>
		<View style={styles.heroText}>
			<Text style={styles.heroTitle}>NextDrop Pilot</Text>
			<Text style={styles.heroSubtitle}>Трекни прогрез і заплануй наступні апдейти</Text>
		</View>

		<FlatList
			horizontal
			data={streaks} keyExtractor={(item)=>item.id}
			showsHorizontalScrollIndicator={false} ItemSeparatorComponent={() => <View style={{width: 12}}/>} contentContainerStyle={styles.streakRow} scrollEnabled={true}
			renderItem=
			{
				({item}) =>
				(
				<View>
					<Text style={styles.streakValue}>{item.value}</Text>
					<Text style={styles.streakLabel}>{item.label}</Text>
				</View>
				)
			}
		/>
		</ScrollView>
	</SafeAreaView>
  	);
}

const styles = StyleSheet.create
(
  {
    safe:
    {
		flex: 1,
		backgroundColor: "#ffffffff",
    },
    container:
    {
		padding: 20,
		paddingBottom: 32,
		gap: 24
    },
    hero:
    {
		backgroundColor: "#111827",
		borderRadius: 24,
		padding: 20,
		gap: 16,
		flexDirection: "row",
		alignItems: "center"
	},
	badge:
    {
		width: 64,
		height: 64,
		borderRadius: 20,
		backgroundColor: "#1f2937",
		alignItems: "center",
		justifyContent: "center"
    },
	heroText:
	{
		flex: 1,
		gap: 4
	},
	heroTitle:
	{
		color: "#4e4e4eff",
		fontSize: 22,
		fontWeight: "700"
	},
	heroSubtitle:
	{
		color: "#747474ff",
	},
	streakRow:
	{
		gap: 12
	},
	sreakCard:
	{
		backgroundColor: "#ffffffff",
		padding: 16,
		borderRadius: 18,
		width: 100,
		gap: 6
	},
	streakValue:
	{
		fontSize: 20,
		fontWeight: "700",
		color: "#0f172a"
	},
	streakLabel:
	{
		fontSize: 16,
		fontWeight: "500",
		color: "#475569",
	}
  }
);