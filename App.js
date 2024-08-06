/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Alert,
  Image,
} from 'react-native';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';

const App = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  const onClick = async () => {
    console.log('Payment clicked');
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'lookzsee',
      paymentIntentClientSecret:
        'pi_3PklhAP2mPmgJDEF1Aewg60f_secret_LiGtyhpMatWb7laCpfi011HOA',
    });
    if (initResponse.error) {
      console.log('Payment sheet error:', initResponse.error);
      Alert.alert('Something went wrong');
      return;
    }
    // await presentPaymentSheet();
    const {error} = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error: ${error.message}`);
    } else {
      Alert.alert('Success! Your payment is confirmed.');
    }
    // await onCreateOrder;
  };

  return (
    <StripeProvider
      publishableKey="pk_test_51PkfKHP2mPmgJDEFbhxZCDzD1dP75rSwE9reLIXPndfqbFnQwN0M1JSEwMBo7oelaXHOsnd5jIxkjM06qQeDiql200NTDV4YdF"
      merchantDisplayName="">
      <SafeAreaView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('./src/assets/tweeter.png')}
          style={{height: 50, width: 50}}
        />
        <Text>tweeter</Text>
        <TouchableOpacity
          onPress={onClick}
          style={{
            backgroundColor: 'blue',
            padding: 20,
            borderRadius: 10,
            marginTop: 20,
          }}>
          <Text style={{color: '#fff'}}>Bay</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </StripeProvider>
  );
};

export default App;
