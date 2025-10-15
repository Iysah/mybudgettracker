
import { Dimensions, ImageStyle, Platform, StyleSheet, TextStyle, ViewStyle } from 'react-native';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

/**
 * Guideline sizes are based on standard ~iPhone 11 (375 x 812)
 */
const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

export const DEVICE = {
    WIDTH: DEVICE_WIDTH,
    HEIGHT: DEVICE_HEIGHT,
    IS_SMALL_DEVICE: DEVICE_WIDTH < 360,
    IS_TABLET: Math.max(DEVICE_WIDTH, DEVICE_HEIGHT) >= 768,
};

/* Responsive scale helpers */
export const scale = (size: number) => (DEVICE_WIDTH / BASE_WIDTH) * size;
export const verticalScale = (size: number) => (DEVICE_HEIGHT / BASE_HEIGHT) * size;
export const moderateScale = (size: number, factor = 0.5) =>
    size + (scale(size) - size) * factor;

/* Design tokens */
export const COLORS = {
    BACKGROUND: '#F7F8FA',
    SURFACE: '#FFFFFF',
    PRIMARY: '#2D9CDB',
    PRIMARY_DARK: '#257FB0',
    ACCENT: '#F2994A',
    SUCCESS: '#27AE60',
    DANGER: '#EB5757',
    TEXT_PRIMARY: '#0B1B2B',
    TEXT_SECONDARY: '#7B8794',
    MUTED: '#A7B0BE',
    BORDER: '#E6E9EE',
    SHADOW: 'rgba(11,27,43,0.08)',
} as const;

export const SPACING = {
    XSM: moderateScale(4),
    SM: moderateScale(8),
    MD: moderateScale(16),
    LG: moderateScale(24),
    XL: moderateScale(32),
    XXL: moderateScale(48),
} as const;


type Style = {
    container: ViewStyle;
    screenPadding: ViewStyle;
    row: ViewStyle;
    center: ViewStyle;
    spaceBetween: ViewStyle;
    card: ViewStyle;
    input: ViewStyle;
    inputText: TextStyle;
    buttonPrimary: ViewStyle;
    buttonText: TextStyle;
    avatar: ViewStyle;
    separator: ViewStyle;
    shadow: ViewStyle;
    fullWidthImage: ImageStyle;
    toast: ViewStyle;
};

/* Centralized styles (use StyleSheet.create) */
export const globalStyles = StyleSheet.create<Style>({
    container: {
        flex: 1,
    },

    screenPadding: {
        paddingHorizontal: SPACING.MD,
        paddingTop: Platform.OS === 'android' ? SPACING.SM : SPACING.MD,
        paddingBottom: SPACING.LG,
        backgroundColor: COLORS.BACKGROUND,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    card: {
        backgroundColor: COLORS.SURFACE,
        borderRadius: moderateScale(12),
        padding: SPACING.MD,
        borderWidth: 1,
        borderColor: COLORS.BORDER,
    },

    input: {
        height: moderateScale(44),
        borderRadius: moderateScale(8),
        borderWidth: 1,
        borderColor: COLORS.BORDER,
        paddingHorizontal: SPACING.SM,
        backgroundColor: COLORS.SURFACE,
        justifyContent: 'center',
    },

    inputText: {
        // ...TYPOGRAPHY.body,
        color: COLORS.TEXT_PRIMARY,
    },

    buttonPrimary: {
        height: moderateScale(48),
        borderRadius: moderateScale(10),
        backgroundColor: COLORS.PRIMARY,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.LG,
    },

    buttonText: {
        // ...TYPOGRAPHY.subtitle,
        color: COLORS.SURFACE,
        fontWeight: '700',
    },

    avatar: {
        width: moderateScale(40),
        height: moderateScale(40),
        borderRadius: moderateScale(20),
        overflow: 'hidden',
        backgroundColor: COLORS.BORDER,
    },

    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: COLORS.BORDER,
        marginVertical: SPACING.SM,
    },

    shadow: {
        ...Platform.select({
            ios: {
                shadowColor: COLORS.SHADOW,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.12,
                shadowRadius: 10,
            },
            android: {
                elevation: 4,
            },
        }),
    },

    fullWidthImage: {
        width: DEVICE.WIDTH,
        height: Math.round(DEVICE.WIDTH * 0.5),
        resizeMode: 'cover',
    },

    toast: {
        position: 'absolute',
        left: SPACING.MD,
        right: SPACING.MD,
        bottom: SPACING.LG,
        backgroundColor: COLORS.TEXT_PRIMARY,
        padding: SPACING.MD,
        borderRadius: moderateScale(8),
        alignItems: 'center',
    },
});