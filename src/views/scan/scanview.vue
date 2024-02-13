<template>
  <!-- <div> -->
    <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
    <!-- <h2>The decoded value in QR/barcode is</h2>
    <h2>{{ decodedText }}</h2> -->
  <!-- </div> -->
</template>

<script>
import { StreamBarcodeReader } from 'vue-barcode-reader'

export default {
  components: {
    StreamBarcodeReader
  },
  data () {
    return {
      decodedText: ''
    }
  },

  methods: {
    onLoaded () {
      console.log('loaded')
    },

    onDecode (text) {
      this.decodedText = text
    }
  }
}
</script>

<style scoped>
a {
  color: #42b983;
}

.information {
  margin-top: 100px;
}
</style>
