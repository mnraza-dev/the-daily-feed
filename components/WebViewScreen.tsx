import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

type Props = {
    route: { params: { url: string } };
};

const WebViewScreen = ({ route }: Props) => {
    const { url } = route.params;

    return (
        <View style={styles.container}>
            <WebView source={{ uri: url }} style={{ flex: 1 }} />
        </View>
    );
};

export default WebViewScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
