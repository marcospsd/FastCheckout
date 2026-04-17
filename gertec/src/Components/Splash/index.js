import { useRef } from 'react';
import { StyleSheet } from 'react-native';
import SplashVideo from '../../../assets/splash-fastcheckout.json'
import { useEffect } from 'react';
import LottieView from 'lottie-react-native'

export const Splash = ({ onComplete }) => {
    const animation = useRef()
    const onPlaybackStatusUpdate = () => {
        onComplete(true)
    }

    useEffect(() => {
        animation.current.play()
    }, [])

    return (
        <LottieView
            loop={false}
            ref={animation}
            resizeMode='cover'
            onAnimationFinish={onPlaybackStatusUpdate}
            style={StyleSheet.absoluteFill}
            source={SplashVideo}
      />
    )
}