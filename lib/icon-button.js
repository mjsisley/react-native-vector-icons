import isEqual from 'lodash/isEqual';
import isString from 'lodash/isString';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

import React, {
  Component,
  PropTypes,
} from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from './react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
  },
  touchable: {
    overflow: 'hidden',
  },
  icon: {
//     marginRight: 10,
  },
  text: {
    fontWeight: '600',
    backgroundColor: 'transparent',
  },
});

const IOS7_BLUE = '#007AFF';

export default function createIconButtonComponent(Icon) {
  return class IconButton extends Component {
    static propTypes = {
      backgroundColor: PropTypes.string,
      borderRadius: PropTypes.number,
      color: PropTypes.string,
      size: PropTypes.number,
      labelPosition: PropTypes.string,
    };

    static defaultProps = {
      backgroundColor: IOS7_BLUE,
      borderRadius: 5,
      color: 'white',
      size: 20,
      labelPosition: 'right',
    };

    render() {
      let {
        style,
        iconStyle,
        children,
        ...props,
      } = this.props;

      let iconProps = pick(props, Object.keys(Text.propTypes), 'style', 'name', 'size', 'color', 'labelPosition');
      const touchableProps = pick(props, Object.keys(TouchableHighlight.propTypes));
      props = omit(
        props,
        Object.keys(iconProps),
        Object.keys(touchableProps),
        'iconStyle',
        'borderRadius',
        'backgroundColor'
      );
      iconProps.style = (this.props.iconStyle ? [styles.icon, this.props.iconStyle] : styles.icon);

      const colorStyle = pick(this.props, 'color');
      const blockStyle = pick(this.props, 'backgroundColor', 'borderRadius');

      const orientation = (this.props.labelPosition === "top" || this.props.labelPosition === "bottom") ?
                          'column' : 'row';

      if (isString(children)) {
        children = (<Text style={[styles.text, colorStyle]}>{children}</Text>);
      }

      return (
        <TouchableHighlight style={[styles.touchable, blockStyle]} {...touchableProps}>
          <View
            style={[styles.container, blockStyle, style, {flexDirection: orientation}]}
            {...props}
          >
            {(() => {if (this.props.labelPosition === "left" || this.props.labelPosition === "top"){return children;}})()}
            <Icon {...iconProps} />
            {(() => {if (this.props.labelPosition === "right" || this.props.labelPosition === "bottom"){return children;}})()}
          </View>
        </TouchableHighlight>
      );
    }
  };
}
