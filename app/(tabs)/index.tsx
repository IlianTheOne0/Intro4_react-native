import { View, Text,  Modal,Button, StyleSheet, FlatList, Image, TouchableOpacity, Pressable, TouchableWithoutFeedback, TextInput, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage"

import * as Location from "expo-location"
import * as Haptics from "expo-haptics"

const quickActions =
[
  {
    id: 'act-1',
    title: 'Новий маршрут',
    subtitle: 'Заплануй 3 точки та протестуй нативну навігацію.',
    icon: 'navigate-outline',
    accent: '#fca311',
  },
  {
    id: 'act-2',
    title: 'Додати пакунок',
    subtitle: 'Створи мок-замовлення та відпрацюй роботу з формами.',
    icon: 'cube-outline',
    accent: '#00b4d8',
  },
  {
    id: 'act-3',
    title: 'Вібрація готова',
    subtitle: 'Підключи expo-haptics, щоб підтверджувати дії.',
    icon: 'cellular-outline',
    accent: '#9b5de5',
  },
];

const deliveries =
[
  {
    id: 'DEL-2104',
    customer: 'Іванна Л.',
    address: 'вул. Драгоманова, 21',
    eta: '12:45',
    status: 'У дорозі',
    progress: 0.64,
    note: 'Веземо набір для альтернативи + десерт.',
    color: '#22333b',
  },
  {
    id: 'DEL-2101',
    customer: 'Андрій П.',
    address: 'SmartHub офіс',
    eta: '13:05',
    status: 'Очікує на видачу',
    progress: 0.35,
    note: 'Замовлення чекає біля бару, потренуй push-нагадування.',
    color: '#1a535c',
  },
];

const timeline =
[
  {
    id: 'time-1',
    title: 'Перевір фургон',
    detail: 'Скануй QR з інвентаризацією перед стартом.',
    time: '11:45',
    finished: true,
  },
  {
    id: 'time-2',
    title: 'Забір зерна',
    detail: 'Змоделюй чек-ін у постачальника (локальний state).',
    time: '12:05',
    finished: true,
  },
  {
    id: 'time-3',
    title: 'Маршрут NextDrop',
    detail: 'Створи геоточки та потренуй роботу з картами.',
    time: '12:30',
    finished: false,
  },
  {
    id: 'time-4',
    title: 'Чек-лист видачі',
    detail: 'Заший підтвердження підпису клієнта (Gesture Handler).',
    time: '12:55',
    finished: false,
  },
];

const skillDrills =
[
  {
    id: 'drill-1',
    title: 'Push-пінги',
    desc: 'Створи мок-сервіс, який через setTimeout надсилає оновлення статусу.',
    chip: 'Notifications',
    chipColor: '#ff5c8d',
  },
  {
    id: 'drill-2',
    title: 'Геолокація',
    desc: 'Підключи expo-location та рендери індикатор точності на карті.',
    chip: 'Sensors',
    chipColor: '#ff9f1c',
  },
  {
    id: 'drill-3',
    title: 'Офлайн кеш',
    desc: 'Збережи останні доставки у AsyncStorage для швидкого старту.',
    chip: 'Storage',
    chipColor: '#2ec4b6',
  },
];

const LAST_ACTION_KEY="nextdrop:last-action"

export default function HomeScreen()
{
  const [locationLabel, setLocationLabel]= useState("Шукаємо позицію...")
  const [lastAction, setLastAction]= useState<string |null>(null)

  useEffect
  (
    ()=>
    {
      let isMounted=true;
      (
        async () =>
        {
          try
          {
            const saved= await AsyncStorage.getItem(LAST_ACTION_KEY);
            if(saved && isMounted) { setLastAction(saved); }
          }
          catch(error){ console.warn("Не вдалося зчитати оствнню дію", error); }
        }
      )()
      return()=> { isMounted=false; }
    },
    []
  )

  useEffect
  (
    ()=>
    {
      let isMounted= true;
      (
        async()=>
        {
          try
          {
            setLocationLabel("Запитуємо дозвіл...");

            const {status} = await Location.requestForegroundPermissionsAsync();

            if(status !== "granted") { if(isMounted) setLocationLabel("Доступ до гео відхилений"); return; }
            const fix = await  Location.getCurrentPositionAsync({});
            if(!isMounted) { return; }

            const {latitude, longitude, accuracy} = fix.coords;
            const accuracyLabel = typeof accuracy === "number" ? accuracy.toFixed(0): "?";
            setLocationLabel(`${latitude.toFixed(3)}, ${longitude.toFixed(3)} ${accuracyLabel}m`);
          }
          catch(error) { if(isMounted) setLocationLabel("Помилка визначення"); console.warn("Помилка геолокації", error); }
        }
      )();
      return() => { isMounted=false; }

  }, [])

  const handleQuickActionPress = async(title: string) =>
  {
    try
    {
      await Haptics.selectionAsync();
      await AsyncStorage.setItem(LAST_ACTION_KEY, title);
      setLastAction(title);
    }
    catch(error) { console.warn("Не вдалося зберегти дію", error); }
  }

  const handleStartingDrill = async(drillId: string) =>
  {
    try
    {
      throw new Error("Прототипна помилка запуску вправи");
    }
    catch(error) { console.warn("Не вдалося розпочати вправу", error); Alert.alert("Помилка", "Не вдалося розпочати вправу. Спробуйте пізніше"); }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.heroCard}>
          <View style={styles.heroTopRow}>
            <View style={styles.heroLeft}>
              <Text style={styles.heroLabel}>NextDrop кур'єр</Text>
              <Text style={styles.heroTitle}>Доставка кави на практиці</Text>
              <Text style={styles.heroSubtitle}>Використай цей укран для мок-тренувань та поступової збірки реального функціоналу додатка</Text>
          <View style={styles.heroStatsRow}>
            <View style={styles.statBubble}>
              <Text style={styles.statValue}>72</Text>
              <Text style={styles.statLabel}>Бали дня</Text>
            </View>
            <View style={styles.statBubble}>
              <Text style={styles.statValue}>4.9 ★</Text>
              <Text style={styles.statLabel}>Рейтинг маршрутів</Text>
            </View>
          </View>
          </View>
          <View style={styles.heroBage}>
            <Ionicons name="bicycle-outline" size={30} color="#fff"/>
            <Text style={styles.bageText}>Live</Text>
          </View >
          </View>
          <View style={styles.heroFooter}>
            <View style={styles.heroMeta}>
              <Text style={styles.heroMetaLabel}>Геоточність</Text>
              <Text style={styles.heroMetaValue}>{locationLabel}</Text>
            </View>
            <View style={styles.heroMeta}>
              <Text style={styles.heroMetaLabel}>Остання дія</Text>
              <Text style={styles.heroMetaValue}>{lastAction ?? "Ще не вибрано"}</Text>
            </View>
          </View>
        </View>

        <FlatList horizontal data={quickActions} keyExtractor={(item)=>item.id} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.actionRow}
          renderItem=
          {
            ({item}) =>
            (
              <Pressable style={[styles.actionCard, {borderColor:item.accent}]} onPress={()=>handleQuickActionPress(item.title)}>
                  <View style={[styles.actionIcon, {backgroundColor:item.accent}]}>
                    <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={18} color="#0f172a"/>
                  </View>
                  <Text style={styles.actionTitle}>{item.title}</Text>
                  <Text style={styles.actionSubtitle}>{item.subtitle}</Text>
              </Pressable>
            )
          }
        />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Активні доставки</Text>
          {
            deliveries.map
            (
              (delivery) =>
              (
                <View key={delivery.id} style={[styles.deliveryCard, {backgroundColor: delivery.color}]}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.deliveryId}>{delivery.id}</Text>
                    <Text style={styles.deliveryStatus}>{delivery.status}</Text>
                  </View>

                  <Text style={styles.deliveryCustomer}>{delivery.customer}</Text>
                  <Text style={styles.deliveryAddress}>{delivery.address}</Text>

                  <View style={styles.deliveryMeta}>
                    <View style={styles.metaGroup}>
                      <Ionicons name="time-outline" size={16} color="#fff"/>
                      <Text style={styles.metaText}>ETA: {delivery.eta}</Text>
                    </View>
                    <Text style={styles.metaText}>Прогрес: {(delivery.progress * 100).toFixed(0)}%</Text>
                  </View>

                  <View style={styles.progressTrack}>
                    <View style={[styles.progressFill, {width: `${(delivery.progress * 100).toFixed(0)}%`}]}/>
                  </View>

                  <Text style={styles.deliveryNote}>{delivery.note}</Text>
                </View>
              )
            )
          }
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Маршут дня</Text>

          <View style={styles.eventContainer}>
            {
              timeline.map
              (
                (event) =>
                (
                  <View key={event.id} style={styles.event}>
                    <View style={styles.eventIcon}>
                      {
                        event.finished ?
                        (<View style={[styles.timelineIcon, styles.timelineFinishedIcon]}></View>)
                        :
                        (<Ionicons style={styles.timelineIcon} name={"ellipse-outline"} size={20} color="#e3e3e3ff"/>)
                      }

                      <Ionicons name="remove" size={20} color="#e3e3e3ff" style={styles.eventLine}/>
                    </View>

                    <View style={styles.eventText}>
                      <Text style={styles.eventTitle}>{event.title}</Text>
                      <Text style={styles.eventDetail}>{event.detail}</Text>
                    </View>

                    <Text style={styles.eventTime}>{event.time}</Text>
                  </View>
                )
              )
            }
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Міні-тренування</Text>
          {
            skillDrills.map
            (
              (drill) =>
              (
                <View key={drill.id} style={styles.drillCard}>
                  <View style={[styles.drillChip, {backgroundColor: drill.chipColor}]}>
                    <Text style={styles.drillChipText}>{drill.chip}</Text>
                  </View>

                  <View style={styles.drillContent}>
                    <Text style={styles.drillTitle}>{drill.title}</Text>
                    <Text style={styles.drillDesc}>{drill.desc}</Text>
                  </View>

                  <TouchableOpacity style={styles.drillAction} onPress={() => handleStartingDrill(drill.id)}>
                    <Text style={styles.drillActionText}>Натисни, щоб розпочати прототип</Text>
                    <Ionicons name="arrow-forward-outline" size={20} color="#a8aeb6ff"/>
                  </TouchableOpacity>
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
      gap: 20
    },
    heroTopRow:
    {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 16
    },
    heroLeft:
    {
      flex: 1,
      gap: 10
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
    heroStatsRow:
    {
      flexDirection: "row",
      gap: 12
    },
    statBubble:
    {
      backgroundColor: "rgba(255,255,255,0.08)",
      padding: 12,
      borderRadius: 16,
      minWidth: 90
    },
    statValue:
    {
      color: "#fff",
      fontSize: 20,
      fontWeight: "600"
    },
    statLabel:
    {
      color: "#a5b4fc",
      fontSize: 12,
    },
    heroBage:
    {
      backgroundColor: "#1f2937",
      borderRadius: 18,
      height: 72,
      width: 72,
      alignItems: "center",
      justifyContent: "center",
      gap: 4
    },
    bageText:
    {
      color: "#fff",
      fontWeight: "600"
    },
    heroFooter:
    {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 16
    },
    heroMeta:
    {
      flex: 1,
      backgroundColor: "#1f2937",
      borderRadius: 16,
      padding: 12,
      gap: 4
    },
    heroMetaLabel:
    {
      color: "#93c5fd",
      fontSize: 12,
      letterSpacing: 1,
      textTransform: "uppercase",
    },
    heroMetaValue:
    {
        color: "#e0f2fe",
        fontWeight: "600"
    },
    actionRow:
    {
      gap: 12,
      paddingRight: 8
    },
    actionCard:
    {
      width: 240,
      padding: 16,
      borderRadius: 20,
      backgroundColor: "#fff",
      borderWidth: 2,
      gap: 8
    },
    actionIcon:
    {
      width: 36,
      height: 36,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center"
    },
    actionTitle:
    {
      fontSize: 16,
      fontWeight: "600",
      color: "#0f172a"
    },
    actionSubtitle:
    {
      fontSize: 13,
      color: "#475569"
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
    deliveryCard:
    {
      borderRadius: 20,
      padding: 18,
      marginBottom: 16,
      gap: 6
    },
    cardHeader:
    {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    deliveryId:
    {
      color: "#e0fbfc",
      fontWeight: "700",
      letterSpacing: 0.5
    },
    deliveryStatus:
    {
      color: "#fde68a",
      fontWeight: "600"
    },
    deliveryCustomer:
    {
      color: "#fff",
      fontSize: 20,
      fontWeight: "600"
    },
    deliveryAddress:
    {
      color: "#dbeafe"
    },
    deliveryMeta:
    {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 4
    },
    metaGroup:
    {
      flexDirection: "row",
      alignItems: "center",
      gap: 6
    },
    metaText:
    {
      color: "#d9e3f0",
      fontSize: 13
    },
    progressTrack:
    {
      height: 8,
      backgroundColor: "rgba(255,255,255,0.25)",
      borderRadius: 4,
      marginTop: 6,
      marginBottom: 6
    },
    progressFill:
    {
      height: "100%",
      backgroundColor: "#67e8f9",
      borderRadius: 4,
    },
    deliveryNote:
    {
      fontSize: 12,
      color: "#e0f2fe",
    },
    eventContainer:
    {
      gap: 16,
      width: "98.5%",
      alignSelf: "center",
      backgroundColor: "#fff",
      padding: 16,
      borderRadius: 16,
    },
    event:
    {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 12
    },
    eventIcon:
    {
      alignItems: "center",
      width: 24,
    },
    timelineIcon:
    {
      marginBottom: 4
    },
    timelineFinishedIcon:
    {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: "#517ef9ff"
    },
    eventLine:
    {
      flex: 1,
      width: 2,
      backgroundColor: "#e3e3e3ff"
    },
    eventText:
    {
      flex: 2,
      gap: 4
    },
    eventTitle:
    {
      fontSize: 16,
      fontWeight: "600",
      color: "#0f172a"
    },
    eventDetail:
    {
      fontSize: 13,
      color: "#64748b"
    },
    eventTime:
    {
      fontSize: 12,
      color: "#94a3b8"
    },
    drillCard:
    {
      backgroundColor: "#fff",
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      gap: 12
    },
    drillChip:
    {
      alignSelf: "flex-start",
      borderRadius: 12,
      paddingVertical: 4,
      paddingHorizontal: 12
    },
    drillChipText:
    {
      color: "#0f172a",
      fontSize: 12,
      fontWeight: "600"
    },
    drillContent:
    {
      gap: 4
    },
    drillTitle:
    {
      fontSize: 16,
      fontWeight: "600",
      color: "#0f172a"
    },
    drillDesc:
    {
      fontSize: 13,
      color: "#475569"
    },
    drillAction:
    {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 8,
    },
    drillActionText:
    {
      color: "#afb8c5ff",
      fontWeight: "600"
    }
  }
);