<template>
  <div>
    <h5>find word WEB</h5>
    <q-btn
      @click="onSpeechButtonClick"
      icon="mic"
      label="click to speech"
    >
    </q-btn>
    <video
      v-show="isLightVideoShowed"
      ref='light'
      :src="lightVideoSrc"
    >
    </video>
    <video
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
  isLightVideoShowed = false;

  isAssholeVideoShowed = false;

  lightVideoSrc: string = turnOnTheLightVideo as string;

  assholeVideoSrc: string = assholeVideo as string;

  speech!: SpeechRecognition; // eslint-disable-line

  words: string[] = [asshole, turnOnTheLight];

  onSpeechButtonClick(): void {
    // alert(this.speech);
    try {
      this.speech.stop();
      this.speech.start();
    } catch (e: any) { // eslint-disable-line
      alert(e.message); // eslint-disable-line
    }
  }

  onSpeechResult(evt: SpeechRecognitionEvent): void { // eslint-disable-line
    alert('start result'); // eslint-disable-line
    try {
      console.log(evt);
      const result = evt.results[0][0].transcript.toLowerCase();
      const isTurnOnTheLight = result.includes(turnOnTheLight);
      const isAsshole = result.includes(asshole);
      const lightRef = this.$refs.light;
      const assholeRef = this.$refs.asshole;
      console.log(lightRef, result);
      alert(result); // eslint-disable-line
      if (isTurnOnTheLight) {
        alert(result); // eslint-disable-line
        this.isLightVideoShowed = true;
        (lightRef as HTMLVideoElement).play(); // eslint-disable-line
      } else if (isAsshole) {
        this.isAssholeVideoShowed = true;
        (assholeRef as HTMLVideoElement).play(); // eslint-disable-line
      }
    } catch (e: any) {
      alert(`mounted, ${e.message}`); // eslint-disable-line
    }
  }

  onSpeechEnd(evt: SpeechRecognitionEvent): void { // eslint-disable-line
    this.speech.stop();
  }

  mounted() {
    console.log('hello123');
    try {
      // const SpeechConstructor = window.webkitSpeechRecognition;
      /* @ts-ignore */ // eslint-disable-line
      this.speech = new window.webkitSpeechRecognition(); // eslint-disable-line
      this.speech.interimResults = true;
      this.speech.lang = 'ru-Ru';
      this.speech.onresult = this.onSpeechResult // eslint-disable-line
    } catch (e: any) { // eslint-disable-line
      alert(`mounted, ${e.message}`); // eslint-disable-line
    }
  }
}
</script>
