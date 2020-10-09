import {Audio} from 'expo-av';
import musicIntro from '@assets/sound/to-the-moon.mp3';
import musicEverytime from '@assets/sound/everytime.mp3';
import musicStickwitu from '@assets/sound/stickwitu.mp3';
import musicDynamite from '@assets/sound/dynamite.mp3';
import musicUnbelievable from '@assets/sound/unbelievable.mp3';
import musicBecauseOfYou from '@assets/sound/because-of-you.mp3';


class SoundManager {

    static musicList = {
        intro: musicUnbelievable,
        everytime: musicEverytime,
        stickWithU: musicStickwitu,
        becauseOfYou: musicBecauseOfYou,
        happy: musicDynamite,
        credit: musicIntro
    };
    static audioState = {
        init: false,
        isPlaying: false,
        playbackInstance: null,
        currentPlaying: 'intro',
        volume: 1.0,
        isBuffering: false
    };
    static musicConfig = {
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true
    };

    static onPlaybackStatusUpdate = (status) => {
        this.audioState.isBuffering = status.isBuffering;
    }
    static loadAudio = async () => {
        console.log(`loadAudio : ${this.audioState.currentPlaying}`);
        try {
            let {currentPlaying, isPlaying, volume} = this.audioState;
            if (isPlaying && this.audioState.playbackInstance) {
                console.log('unloadAsync');
                await this.audioState.playbackInstance.stopAsync();
                await this.audioState.playbackInstance.unloadAsync();
                this.audioState.playbackInstance = null;
            }
            this.audioState.playbackInstance = new Audio.Sound();
            const status = {
                shouldPlay: isPlaying,
                volume
            };
            this.audioState.playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
            await this.audioState.playbackInstance.loadAsync(this.musicList[currentPlaying], status, false)
            await this.audioState.playbackInstance.playAsync();
            await this.audioState.playbackInstance.setIsLoopingAsync(true);
            this.audioState.isPlaying = true;
        } catch (error) {
            // An error occurred!
            console.log(`Error playMusic : ${error.message}`);
        }
    }

    static init = () => {
        if (!this.audioState.init) {
            (async () => {
                try {
                    await Audio.setAudioModeAsync(this.musicConfig);
                    this.audioState.init = true;
                    await this.loadAudio();
                } catch (error) {
                    // An error occurred!
                    console.log(`Error playMusic : ${error.message}`);
                }
            })();
        }
    }

    // PRIVATE //

    /**
     * Private Function to Play music by require path
     * @param path
     * @private
     */
    static _playMusic(path = null) {
        if(this.audioState.init){
            this.init();
        }
        if (!path || path.length <= 0) {
            return;
        }
        console.log(`Music : ${path}`);
        if(path === this.audioState.currentPlaying){
            return;
        }
        this.audioState.currentPlaying = path;
        (async () => {
            try {
                await this.loadAudio();
            } catch (error) {
                // An error occurred!
                console.log(`Error playMusic : ${error.message}`);
            }
        })();
    }

    /**
     * Stop Music
     * @private
     */
    static _stopMusic() {
        (async () => {
            try {
                const { isPlaying, playbackInstance } = this.audioState;
                if(playbackInstance && isPlaying){
                    await playbackInstance.stopAsync();
                }
            } catch (error) {
                // An error occurred!
                console.log(`Error stopMusic : ${error.message}`);
            }
        })();
    }


    // PUBLIC //
    /**
     * Play Into Music
     */
    static playKey(key = 'intro') {
        this._playMusic(key);
    }

    /**
     * Play Random Scene Music
     */
    static playRandom() {
        const rand = ['everytime','stickWithU', 'becauseOfYou'];
        const randomKey = rand[Math.floor(Math.random() * rand.length)];
        this._playMusic(randomKey);
    }

    /**
     * Stop All Music
     */
    static stopAll() {
        this._stopMusic();
    }
}

export default SoundManager;

