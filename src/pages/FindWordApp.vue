<template>
  <div>
    <h5>find word APP</h5>
    <span v-if="loading">loading</span>
    <q-btn
      @click="onSpeechClick"
      icon="mic"
      label="click to speech"
      :disable="!isAvailable"
    >
    </q-btn>
    <video
      style="width: 100%; display: block;"
      v-show="isLightVideoShowed"
      ref='light'
      :src="lightVideoSrc"
    >
    </video>
    <video
      style="width: 100%; display: block;"
      v-show="isAssholeVideoShowed"
      ref='asshole'
      :src="assholeVideoSrc"
    >
    </video>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
/* @ts-ignore */ // eslint-disable-line
import turnOnTheLightVideo from '../assets/videos/turn-on-the-light.mp4';
/* @ts-ignore */ // eslint-disable-line
import assholeVideo from '../assets/videos/asshole.mp4';

const asshole = 'придурок';
const turnOnTheLight = 'включи свет';

export default class FindWord extends Vue {
  isAvailable = false

  isLightVideoShowed = false;

  isAssholeVideoShowed = false;

  lightVideoSrc: string = turnOnTheLightVideo as string;

  assholeVideoSrc: string = assholeVideo as string;

  speech!: any; // eslint-disable-line

  words: string[] = [asshole, turnOnTheLight];

  terms: string[] = []

  loading = false

  onSpeechClick (evt: SpeechRecognitionEvent): void { // eslint-disable-line
    this.isLightVideoShowed = false;
    const lightRef = this.$refs.light;
    const assholeRef = this.$refs.asshole;

    if (!(lightRef as HTMLVideoElement).paused) {
      (lightRef as HTMLVideoElement).currentTime = 0;
      (lightRef as HTMLVideoElement).pause(); // eslint-disable-line
    }

    this.isAssholeVideoShowed = false;
    if (!(assholeRef as HTMLVideoElement).paused) {
      (assholeRef as HTMLVideoElement).currentTime = 0;
      (assholeRef as HTMLVideoElement).pause(); // eslint-disable-line
    }
    const options = {
      lang: 'ru-RU',
      prompt: false,
      showPopup: false,
    };
    this.loading = true;
    this.speech.startListening(this.onSuccess, this.onError, options); // eslint-disable-line
  }

  onSuccess(matches: string[]): void {
    console.log(this);
    this.loading = false;
    matches.forEach((match: string) => {
      const isAsshole = match.toLowerCase().includes(asshole);
      const isTurnOnTheLight = match.toLowerCase().includes(turnOnTheLight);
      const lightRef = this.$refs.light;
      const assholeRef = this.$refs.asshole;
      if (isTurnOnTheLight) {
        this.isLightVideoShowed = true;
        (lightRef as HTMLVideoElement).play(); // eslint-disable-line
      } else if (isAsshole) {
        this.isAssholeVideoShowed = true;
        (assholeRef as HTMLVideoElement).play(); // eslint-disable-line
      }
    });
    // alert(matches); // eslint-disable-line
  }

  onError(arg: any): void {
    console.log(this);
    this.loading = false;
    alert(`sppeeech error ${arg}`); // eslint-disable-line
  }

  isRecordingAvailableSuccess(): void {
    this.isAvailable = true;
    alert('success'); // eslint-disable-line
    this.speech.speechRecognition.requestPermission( // eslint-disable-line
      this.requestPermissionSuccess, this.requestPermissionError, // eslint-disable-line
    );
  }

  isRecordingAvailableError(): void {
    this.isAvailable = false;
    alert('error'); // eslint-disable-line
  }

  hasPermissionSuccess(): void {
    this.isAvailable = true;
    console.log(this);
    alert('perm succuess');
    this.speech.speechRecognition.requestPermission( // eslint-disable-line
      this.requestPermissionSuccess, this.requestPermissionError, // eslint-disable-line
    );
  }

  requestPermissionSuccess(): void {
    this.isAvailable = true;
    this.speech.isRecognitionAvailable( // eslint-disable-line
        this.isRecordingAvailableSuccess, // eslint-disable-line
        this.isRecordingAvailableError, // eslint-disable-line
    );
  }

  requestPermissionError(): void {
    this.isAvailable = false;
    alert('req perm error'); // esling-disable-line
  }

  hasPermissionError(): void {
    this.isAvailable = false;
  }

  mounted() {
    try {
      /* @ts-ignore */ // eslint-disable-line
      this.speech = window.plugins.speechRecognition; // eslint-disable-line

      this.speech.hasPermission( // eslint-disable-line
        this.hasPermissionSuccess, this.hasPermissionError) // eslint-disable-line

    } catch (e: any) { // eslint-disable-line
      alert(`mounted, ${e.message}`); // eslint-disable-line
    }
  }
}
</script>
