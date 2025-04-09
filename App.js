import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Button, I18nManager } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

I18nManager.forceRTL(true);

const تمارين = {
  الأحد: ["تمارين الصدر والذراعين: 4 مجموعات ضغط، 3 مجموعات Dips، 3 مجموعات ضغط ضيق"],
  الإثنين: ["تمارين الأرجل: سكوات، لانجز، قفز سكوات، جسر الحوض"],
  الثلاثاء: ["راحة أو تمارين خفيفة (تمطيط وكارديو خفيف)"],
  الأربعاء: ["تمارين الظهر والكتفين: سحب بالمنشفة، سوبرمان، رفع جانبي"],
  الخميس: ["تمارين البطن: بلانك، كرنش، رفع أرجل، دراجة"],
  الجمعة: ["راحة"],
  السبت: ["اختياري: مراجعة التمارين أو نشاط خفيف"]
};

const النظامالغذائي = {
  الأحد: ["فطور: بيض + خبز + موز", "غداء: أرز + دجاج + خضار", "عشاء: توست + زبدة فول + تمر"],
  الإثنين: ["فطور: شوفان بالحليب + تفاح", "غداء: مكرونة + لحم مفروم", "عشاء: بيض مسلوق + خبز"],
  الثلاثاء: ["فطور: لبن + تمر + مكسرات", "غداء: أرز + سمك مشوي", "عشاء: بطاطا مشوية + سلطة"],
  الأربعاء: ["فطور: بان كيك + عسل", "غداء: دجاج مشوي + بطاطا", "عشاء: زبادي + موز"],
  الخميس: ["فطور: ساندويتش تونة + خضار", "غداء: كبسة لحم + لبن", "عشاء: شوربة عدس + خبز"],
  الجمعة: ["فطور: فول + خبز + بيض", "غداء: أرز + دجاج + سلطة", "عشاء: بيض + توست + لبن"],
  السبت: ["فطور: زبادي + شوفان + تمر", "غداء: مكرونة + دجاج", "عشاء: سلطة تونة"]
};

const screenWidth = Dimensions.get("window").width;

export default function App() {
  const [اليوم, setاليوم] = useState("الأحد");
  const [تكرار, setتكرار] = useState(30);
  const data = {
    labels: Object.keys(تمارين),
    datasets: [{
      data: [30, 40, 20, 35, 25, 0, 0]
    }]
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>تطبيق زيادة الوزن</Text>

      <View style={styles.buttonContainer}>
        {Object.keys(تمارين).map(day => (
          <Button key={day} title={day} onPress={() => setاليوم(day)} />
        ))}
      </View>

      <Text style={styles.header}>تمارين يوم {اليوم}</Text>
      {تمارين[اليوم].map((t, i) => (
        <Text key={i} style={styles.item}>{t}</Text>
      ))}

      <Text style={styles.header}>النظام الغذائي</Text>
      {النظامالغذائي[اليوم].map((m, i) => (
        <Text key={i} style={styles.item}>{m}</Text>
      ))}

      <Text style={styles.header}>عدد التكرارات</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(تكرار)}
        onChangeText={text => setتكرار(parseInt(text) || 0)}
      />
      <Text style={styles.item}>السعرات التقريبية: {2500 + (تكرار * 2)} سعرة</Text>

      <Text style={styles.header}>التقدم الأسبوعي</Text>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  item: {
    fontSize: 16,
    marginVertical: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginTop: 8
  }
});