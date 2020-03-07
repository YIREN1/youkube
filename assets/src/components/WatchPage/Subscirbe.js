import React, { useState, useEffect } from 'react';
import axios from 'axios';
const videoAxios = axios.create();

videoAxios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
});

function Subscirbe(props) {
  const userTo = props.userTo;
  const [state, setState] = useState({
    isSubscribed: false,
    subscriberCount: 0,
  });

  const onSubscribe = () => {
    let subscribePayload = {
      userTo: userTo,
    };

    if (state.isSubscribed) {
      //when we are already subscribed
      videoAxios
        .post('/subscription/unSubscribe', subscribePayload)
        .then(response => {
          if (response.data.success) {
            setState({
              subscriberCount: state.subscriberCount - 1,
              isSubscribed: !state.isSubscribed,
            });
          } else {
            alert('Failed to unsubscribe');
          }
        });
    } else {
      // when we are not subscribed yet

      videoAxios
        .post('/subscription/subscribe', subscribePayload)
        .then(response => {
          if (response.data.success) {
            setState({
              subscriberCount: state.subscriberCount + 1,
              isSubscribed: !state.isSubscribed,
            });
          } else {
            alert('Failed to subscribe');
          }
        });
    }
  };

  useEffect(() => {
    videoAxios
      .get('/subscription/getSubscriberCount', { params: { userTo } })
      .then(response => {
        if (response.data.success) {
          setState(state => ({
            ...state,
            subscriberCount: response.data.subscriberCount,
          }));
        } else {
          alert('Failed to get subscriber Number');
        }
      });

    videoAxios
      .get('/subscription/isSubscribed', { params: { userTo } })
      .then(response => {
        if (response.data.success) {
          setState(state => ({
            ...state,
            isSubscribed: response.data.isSubscribed,
          }));
        } else {
          alert('Failed to get Subscribed Information');
        }
      });
  }, [userTo]);
  return (
    <div>
      <button
        onClick={onSubscribe}
        style={{
          backgroundColor: `${state.isSubscribed ? '#AAAAAA' : '#CC0000'}`,
          borderRadius: '4px',
          color: 'white',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase',
        }}
      >
        {state.subscriberCount}{' '}
        {state.isSubscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  );
}

export default Subscirbe;
