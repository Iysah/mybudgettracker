## Code Organization Rules

- One component per file
- Export components as named exports
- Group imports: React → third-party → local (separated by blank lines)
- Use absolute imports with path aliases (@components, @utils, etc.)
- Maximum file length: 500 lines (refactor if exceeded)

## Naming Conventions

- Components: PascalCase (e.g., UserProfile.tsx)
- Hooks: camelCase with 'use' prefix (e.g., useAuth.ts)
- Constants: UPPER_SNAKE_CASE (e.g., API_BASE_URL)
- Functions: camelCase (e.g., fetchUserData)
- Types/Interfaces: PascalCase with descriptive names (e.g., UserProfileProps)

## Styling Approach

- Use StyleSheet.create() for all styles (never inline styles in JSX)
- Define styles at the bottom of component files
- Use a design system with consistent spacing, colors, typography
- Implement responsive design using dimensions and scale functions
- Consider react-native-unistyles or tamagui for advanced theming

## Navigation Performance

- Implement lazy loading for screens
- Use useFocusEffect instead of useEffect for screen-specific logic
- Avoid heavy computations during transitions
- Consider enableScreens from react-native-screens (usually enabled by default)

## Performance Optimization
- Minimize **re-renders**:
- Use `React.memo` for pure components.
- Use stable keys in FlatList/SectionList.
- Avoid anonymous functions inside render.
- Optimize **lists and rendering**:
- Use `FlatList` with `getItemLayout`, `initialNumToRender`, and `removeClippedSubviews`.
- Avoid large inline arrays or objects.
    **Image optimization**:
- Use proper sizing, caching (`react-native-fast-image`).
- Avoid unnecessary reloading of images.

## Animation Performance

- Use `react-native-reanimated` and `react-native-gesture-handler` for 60 FPS smooth animations.
- Run animations on UI thread (not JS thread)
- Avoid animating layout properties (use transform instead)
- Use useAnimatedStyle and useSharedValue

## Recommended Dependencies
### Core:

zustand (state management)
@tanstack/react-query (data fetching)
react-navigation (navigation)
react-native-reanimated (animations)

### Performance:

react-native-fast-image
react-native-flash-list
@shopify/flash-list