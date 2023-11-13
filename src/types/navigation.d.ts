namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
}

type RootStackParamList = Record<string, object | undefined>;
