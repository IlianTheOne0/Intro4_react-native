import { View, Text,  Modal,Button, StyleSheet, FlatList, Image, TouchableOpacity, Pressable, TouchableWithoutFeedback, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const storageShelves = [
  {
    id: 'shelf-a',
    label: 'Полиця А',
    items: [
      { name: 'Еспресо бленд', qty: 16, status: 'ok' },
      { name: 'Фільтр бленд', qty: 8, status: 'low' },
    ],
  },
  {
    id: 'shelf-b',
    label: 'Полиця B',
    items: [
      { name: 'Крафт-пакети', qty: 44, status: 'ok' },
      { name: 'Термо-бокси', qty: 5, status: 'critical' },
    ],
  },
];

const checkins = [
  {
    id: 'chk-1',
    title: 'Скан тікета від постачальника',
    detail: 'Зчитати QR і створити нову вхідну поставку у локальному state.',
    icon: 'scan-outline',
  },
  {
    id: 'chk-2',
    title: 'Контроль температури',
    detail: 'Змоделювати підключення сенсора і показати діапазон на графіку.',
    icon: 'thermometer-outline',
  },
  {
    id: 'chk-3',
    title: 'Фото стану складу',
    detail: 'Зробити прев\'ю з expo-image та дозволити залишати нотатку.',
    icon: 'camera-outline',
  },
];

const automationIdeas = [
  'Напиши функцію автопереобліку, що синхронізується при стабільному Wi-Fi.',
  'Зроби push-нагадування у разі status === critical.',
  'Додай режим сортування та пошуку, щоб тренувати роботу з FlatList.',
];

export default function ProfileScreen()
{
	return (
	<SafeAreaView style={styles.safe}>
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={styles.heroCard}>
				<Text style={styles.heroLabel}>NextDrop depot</Text>
				<Text style={styles.heroTitle}>Симулятор складу</Text>
				<Text style={styles.heroSubtitle}>Відпрацьовуй прийом і зберігання відправлень: від швидких сканів до розумної автоматизації.</Text>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Полички та статуси</Text>
				{
					storageShelves.map
					(
						(shelf) =>
						(
							<View key={shelf.id} style={styles.shelfCard}>
								<View style={styles.shelfHeader}>
									<Text style={styles.shelfLabel}>{shelf.label}</Text>
									<Ionicons name="cube-outline" size={20} color="#6b7280"/>
								</View>

								{
									shelf.items.map
									(
										(item, index) =>
										(
											<View key={index} style={styles.itemRow}>
												<Text style={styles.itemName}>{item.name}</Text>

												<View style={styles.itemDetails}>
													<Text style={styles.itemQty}>{item.qty} шт.</Text>

													<View style={[styles.itemStatus, item.status === 'ok' ? styles.statusOk : item.status === 'low' ? styles.statusLow : styles.statusCritical]}>
														<Text style={styles.itemStatusText}>{item.status.toUpperCase()}</Text>
													</View>
												</View>
											</View>
										)
									)
								}
							</View>
						)
					)
				}
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Чек-ін сценарії</Text>

				{
					checkins.map
					(
						(checkin) =>
						(
							<View key={checkin.id} style={styles.checkinCard}>
								<View style={styles.checkinIconContainer}>
									<Ionicons name={checkin.icon} size={20} color="#1d2a3a"/>
								</View>
								
								<View style={styles.checkinTextContainer}>
									<Text style={styles.checkingTitle}>{checkin.title}</Text>
									<Text style={styles.checkinDetail}>{checkin.detail}</Text>
								</View>
							</View>
						)
					)
				}
			</View>
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
      backgroundColor: "#f6f8fb",
    },
    scrollContainer:
    {
      padding: 20,
      paddingBottom: 32,
      gap: 24
    },
    heroCard:
    {
		backgroundColor: "#111827",
		borderRadius: 24,
		padding: 24,
		gap: 20,
	},
	heroLabel:
    {
      color: "#93c5fd",
      fontSize: 14,
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    heroTitle:
    {
      color: "#fff",
      fontSize: 28,
      fontWeight: "700",
      lineHeight: 32
    },
    heroSubtitle:
    {
      color: "#e5e7eb",
      fontSize:15,
    },
	section:
    {
      gap: 14
    },
    sectionTitle:
    {
      fontSize: 20,
      fontWeight: "700",
      color: "#0f172a"
    },
	shelfCard:
	{
	  backgroundColor: "#fff",
	  borderRadius: 16,
	  padding: 16,
	  gap: 12,
	},
	shelfHeader:
	{
	  flexDirection: "row",
	  justifyContent: "space-between",
	  alignItems: "center",
	},
	shelfLabel:
	{
	  fontSize: 18,
	  fontWeight: "600",
	  color: "#1e293b",
	},
	itemRow:
	{
	  flexDirection: "row",
	  justifyContent: "space-between",
	  alignItems: "center",
	  paddingVertical: 8,
	},
	itemName:
	{
	  fontSize: 16,
	},
	itemDetails:
	{
	  flexDirection: "row",
	  alignItems: "center",
	  gap: 12,
	},
	itemQty:
	{
	  fontSize: 16,
	  fontWeight: "600",
	},
	itemStatus:
	{
	  paddingVertical: 6,
	  paddingHorizontal: 10,
	  borderRadius: 12,
	},
	itemStatusText:
	{
	  fontSize: 12,
	  fontWeight: "700",
	},
	statusOk:
	{
	  backgroundColor: "#d1fae5",
	},
	statusLow:
	{
	  backgroundColor: "#fef3c7",
	},
	statusCritical:
	{
	  backgroundColor: "#fee2e2",
	},
	checkinCard:
	{
	  flexDirection: "row",
	  alignItems: "center",
	  backgroundColor: "#fff",
	  borderRadius: 16,
	  paddingHorizontal: 16,
	  paddingVertical: 12,
	  gap: 16,
	},
	checkinIconContainer:
	{
	  width: 40,
	  height: 40,
	  borderRadius: 12,
	  backgroundColor: "#e0f1fb",
	  justifyContent: "center",
	  alignItems: "center",
	},
	checkinTextContainer:
	{
	  width: "85%",
	  gap: 4,
	},
	checkingTitle:
	{
	  fontSize: 16,
	  fontWeight: "600",
	},
	checkinDetail:
	{
	  fontSize: 14,
	  color: "#475569",
	},
  }
);