import { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

import { Colors, FontSize, Spacing, Radius } from '../../src/constants/design';
import { useBookRegistration } from '../../src/hooks/useBookRegistration';

export default function ScanScreen() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const { fetchByIsbn, isLoading } = useBookRegistration();
  const processingRef = useRef(false);

  async function handleBarcodeScanned({ data }: { data: string }) {
    if (processingRef.current) return;
    processingRef.current = true;
    setScanned(true);

    const book = await fetchByIsbn(data);
    if (book) {
      router.replace('/add/register');
    } else {
      Alert.alert(
        '書籍が見つかりませんでした',
        'バーコードを読み取りましたが、書籍情報を取得できませんでした。\nタイトルで検索してみてください。',
        [
          { text: '検索する', onPress: () => router.replace('/add/search') },
          {
            text: 'もう一度スキャン',
            onPress: () => {
              setScanned(false);
              processingRef.current = false;
            },
          },
        ]
      );
    }
  }

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>カメラへのアクセスが必要です</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>カメラを許可する</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8'] }}
      />

      {/* オーバーレイ */}
      <View style={styles.overlay}>
        <View style={styles.topMask} />
        <View style={styles.middleRow}>
          <View style={styles.sideMask} />
          <View style={styles.scanWindow}>
            <View style={[styles.corner, styles.cornerTL]} />
            <View style={[styles.corner, styles.cornerTR]} />
            <View style={[styles.corner, styles.cornerBL]} />
            <View style={[styles.corner, styles.cornerBR]} />
          </View>
          <View style={styles.sideMask} />
        </View>
        <View style={styles.bottomMask}>
          <Text style={styles.hint}>本の裏側のバーコードに向けてください</Text>
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={Colors.white} />
          <Text style={styles.loadingText}>書籍情報を取得中...</Text>
        </View>
      )}
    </View>
  );
}

const WINDOW_SIZE = 260;
const CORNER_SIZE = 24;
const CORNER_WIDTH = 3;
const MASK_COLOR = 'rgba(0,0,0,0.55)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    color: Colors.white,
    fontSize: FontSize.body,
    textAlign: 'center',
    marginBottom: Spacing.s6,
    paddingHorizontal: Spacing.s8,
  },
  button: {
    backgroundColor: Colors.sage500,
    borderRadius: Radius.button,
    paddingHorizontal: Spacing.s8,
    paddingVertical: Spacing.s4,
    minHeight: 44,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: FontSize.body,
    fontWeight: '600',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    flexDirection: 'column',
  },
  topMask: {
    flex: 1,
    backgroundColor: MASK_COLOR,
  },
  middleRow: {
    flexDirection: 'row',
    height: WINDOW_SIZE,
  },
  sideMask: {
    flex: 1,
    backgroundColor: MASK_COLOR,
  },
  scanWindow: {
    width: WINDOW_SIZE,
    height: WINDOW_SIZE,
  },
  bottomMask: {
    flex: 1,
    backgroundColor: MASK_COLOR,
    alignItems: 'center',
    paddingTop: Spacing.s6,
  },
  hint: {
    color: Colors.white,
    fontSize: FontSize.bodySmall,
    opacity: 0.8,
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: Colors.white,
  },
  cornerTL: {
    top: 0,
    left: 0,
    borderTopWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
  },
  cornerTR: {
    top: 0,
    right: 0,
    borderTopWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
  },
  cornerBL: {
    bottom: 0,
    left: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderLeftWidth: CORNER_WIDTH,
  },
  cornerBR: {
    bottom: 0,
    right: 0,
    borderBottomWidth: CORNER_WIDTH,
    borderRightWidth: CORNER_WIDTH,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.s4,
  },
  loadingText: {
    color: Colors.white,
    fontSize: FontSize.body,
  },
});
