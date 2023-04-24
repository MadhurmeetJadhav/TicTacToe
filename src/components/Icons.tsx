import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import type {PropsWithChildren} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';

type IconProps = PropsWithChildren<{
  name: string;
}>;

const Icons = ({name}: IconProps) => {
    switch (name) {
      case 'Circle':
        return <Icon name='circle-thin' size={38} color='#F7CD2E'/>
        break;
    
      case 'Check':
        return <Icon name='check' size={38} color='#38CC77'/>
        break;
    
      default:
        return <Icon name='square' size={38} color='#51515182'/>

    }
};

export default Icons;

const styles = StyleSheet.create({});
