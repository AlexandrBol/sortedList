import React from 'react';
import {SafeAreaView} from 'react-native';

import List from './components/List';

console.disableYellowBox = true;

const App: () => React$Node = () => {
    return (
        <SafeAreaView>
            <List/>
        </SafeAreaView>

    );
};

export default App;
