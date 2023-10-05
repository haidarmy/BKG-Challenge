import {FONT_FAMILY} from '@constants';
import {TextTypeMap} from '@types';

export const fontFamily: TextTypeMap<string> = {
  title_x: FONT_FAMILY.bold,
  title_1: FONT_FAMILY.bold,
  title_2: FONT_FAMILY.semiBold,
  title_3: FONT_FAMILY.semiBold,
  regular_1: FONT_FAMILY.medium,
  regular_2: FONT_FAMILY.semiBold,
  regular_3: FONT_FAMILY.medium,
  small: FONT_FAMILY.medium,
  tiny: FONT_FAMILY.medium,
};

export const fontSize: TextTypeMap<number> = {
  title_x: 64,
  title_1: 32,
  title_2: 24,
  title_3: 18,
  regular_1: 16,
  regular_2: 16,
  regular_3: 14,
  small: 13,
  tiny: 12,
};
