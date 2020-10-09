import {StyleSheet} from "react-native";

const root = StyleSheet.create({
    root: {
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16
    }
});

const text = StyleSheet.create({
    default: {
        fontSize: 18,
        fontWeight: 'normal'
    },
    bold: {
        fontWeight: 'bold'
    }
});

export default {
    ...root,
    text
}
