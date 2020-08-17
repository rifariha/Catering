import React from 'react'
import { View, Text } from 'react-native'
import NumberFormat from 'react-number-format'

const priceformat = ({value}) => {
    return (
      <NumberFormat 
        value={value} 
        displayType={'text'} 
        thousandSeparator={true} 
        prefix={'Rp.'} 
        renderText={formattedValue =>
            <Text style={{fontSize:18,fontWeight:'500',marginHorizontal:10}}>{formattedValue}</Text>
        }/>
    )
}

export default priceformat


