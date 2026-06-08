import React from 'react'
import { View, StyleSheet } from 'react-native'
import Field from './Field'

export default (props: any) => {
    const rows = props.board.map((row: any, r: number) => {
        const columns = row.map((field: any, c: number) => {
            return <Field {...field} key={c} 
                onOpen={() => props.onOpenField(r, c)} 
                onSelect={(e: any) => props.onSelectField(r, c)} />
        })
        return <View key={r}
            style={{flexDirection: 'row'}}>{columns}</View>
    })
    return <View style={styles.container}>{rows}</View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEE',
    }
})