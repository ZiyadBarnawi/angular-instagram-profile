// custom-lara.preset.ts
import { definePreset } from '@primeng/themes';
import Lara from '@primeng/themes/lara';

export const CustomLaraPreset = definePreset(Lara, {
  semantic: {
    // 1. Override the primary color palette
    primary: {
      50: '{emerald.50}',
      100: '{emerald.100}',
      200: '{emerald.200}',
      300: '{emerald.300}',
      400: '{emerald.400}',
      500: '{emerald.500}',
      600: '{emerald.600}',
      700: '{emerald.700}',
      800: '{emerald.800}',
      900: '{emerald.900}',
      950: '{emerald.950}',
    },
  },
});
