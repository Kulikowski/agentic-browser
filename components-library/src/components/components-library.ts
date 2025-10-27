import { Button } from './Button';
import { Text } from './Text';
import { Image } from './Image';
import { Stack } from './Stack';

export const gLibrary = {
  name: 'g-library',
  elements: [
    {
      tagName: 'g-button',
      component: Button,
      propMapping: {
        label: 'label',
      },
      eventMapping: {
        press: 'onPress',
      },
    },
    {
      tagName: 'g-text',
      component: Text,
      propMapping: {
        content: 'content',
      },
      eventMapping: {},
    },
        {
      tagName: 'g-stack',
      component: Stack,
      propMapping: {
        direction: 'direction',
        spacing: 'spacing',
        align: 'align',
        justify: 'justify',
      },
      eventMapping: {},
    },
    {
      tagName: 'g-image',
      component: Image,
      propMapping: {
        src: 'src',
        alt: 'alt',
        width: 'width',
        height: 'height',
      },
      eventMapping: {},
    },
  ],
};