<template>
  <div class="google-map">
    <div id="g-map"></div>
    <!-- <img class="location-icon" src="../../assets/imgs/location_icon.png" alt=""> -->
  <div class=" btn" @click="go_to_scan" >
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 92.307 76.562">
  <g id="Group_287" data-name="Group 287" transform="translate(-11123.564 -7489.459)">
    <g id="Group_286" data-name="Group 286">
      <g id="Group_283" data-name="Group 283">
        <path id="Path_468" data-name="Path 468" d="M11133.422,7521.176a2.457,2.457,0,0,1-2.456-2.456v-8.379a20.905,20.905,0,0,1,20.882-20.882h11.747a2.457,2.457,0,1,1,0,4.913h-11.747a15.987,15.987,0,0,0-15.969,15.969v8.379A2.456,2.456,0,0,1,11133.422,7521.176Z" fill="#fff"/>
      </g>
      <g id="Group_284" data-name="Group 284">
        <path id="Path_469" data-name="Path 469" d="M11186.646,7566.021h-7.316a2.457,2.457,0,0,1,0-4.914h7.316a15.986,15.986,0,0,0,15.968-15.968v-7.753c0-.159.007-.318.021-.475h-66.775c.013.157.02.316.02.475v7.753a15.987,15.987,0,0,0,15.969,15.968h11.747a2.457,2.457,0,0,1,0,4.914h-11.747a20.906,20.906,0,0,1-20.882-20.882v-7.753a.476.476,0,0,0-.475-.475h-4.47a2.457,2.457,0,1,1,0-4.913h87.393a2.457,2.457,0,1,1,0,4.913H11208a.476.476,0,0,0-.475.475v7.753A20.906,20.906,0,0,1,11186.646,7566.021Z" fill="#fff"/>
      </g>
      <g id="Group_285" data-name="Group 285">
        <path id="Path_470" data-name="Path 470" d="M11205.071,7521.176a2.456,2.456,0,0,1-2.457-2.456v-8.379a15.987,15.987,0,0,0-15.968-15.969h-7.316a2.457,2.457,0,1,1,0-4.913h7.316a20.906,20.906,0,0,1,20.882,20.882v8.379A2.457,2.457,0,0,1,11205.071,7521.176Z" fill="#fff"/>
      </g>
    </g>
  </g>
</svg>
    <h5 style="padding-left: 10px;">Scan QR Code</h5></div>
    <div class="location" @click="onLocation">
      <img src="../../assets/imgs/location.png" alt="">
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
let gMapContext
let gMapTimer
let marker
let myMarker
let infoWindow
export default {
  props: {
    apikey: {
      type: String,
      default: 'AIzaSyBE5ogjK9204mDhL4Q7-ImpSPUKGvlfF9I'
    },
    latLng: {
      type: Array,
      default: () => {
        return []
      }
    },
    locationList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    ...mapState(['lang']),
    i18n () {
      return this.$t('map')
    }
  },
  data () {
    return {
      gMapContext: null,
      times: 0,
      latitude: 51.5285578,
      longitude: -0.2420233,
      centerChange: false
    }
  },
  watch: {
    latLng (val, oldVal) {
      if (val && val.length === 2) {
        this.latitude = val[0]
        this.longitude = val[1]
        if (gMapContext && !this.centerChange) {
          const center = { lat: this.latitude, lng: this.longitude }
          gMapContext.setZoom(16)
          gMapContext.setCenter(center)
        }
      }
    },
    locationList (val) {
      const list = []
      if (val.length) {
        val.map((item, index) => {
          list.push([{ lat: Number(item.latitude), lng: Number(item.longitude) }, item])
        })
        this.setMarker(list)
      } else {
        console.log(window.marker)
        if (window.marker) {
          marker.setMap(null)
        }
        this.$toast(this.i18n.result_msg)
      }
    }
  },
  methods: {

    go_to_scan () {
      this.$router.push('./scan')
    },
    initMap () {
      if (document.getElementById('g-map')) {
        this.times = 0
        console.log('gmapcontext')
        // The location of Uluru
        const center = { lat: this.latitude, lng: this.longitude }
        // The map, centered at Uluru
        gMapContext = new google.maps.Map(document.getElementById('g-map'), {
          zoom: 12,
          center: center,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          clickableIcons: false
        })
        // console.log('center', center)
        gMapContext.setCenter(center)
        infoWindow = new google.maps.InfoWindow()
        gMapContext.addListener('click', (event) => {
          console.log('google map tap', event.latLng.lat(), event.latLng.lng())
          // this.onMap(event)
          this.$emit('onmap')
        })
        gMapContext.addListener('center_changed', () => {
          this.onCenterChange()
          // console.log('center_changed')
        })
        gMapContext.addListener('zoom_changed', () => {
          this.onRegionChange()
          // console.log('zoom_changed')
        })
        this.onLocation()
      } else {
        this.times++
        console.log('gmaptimeout')
        gMapTimer = setTimeout(this.initMap, 500 * this.times)
      }
    },
    onCenterChange (e) {
      if (!gMapContext) {
        return
      }
      this.centerChange = true
      // console.log([gMapContext.getCenter().lat(), gMapContext.getCenter().lng()])
      this.$emit('center', [gMapContext.getCenter().lat(), gMapContext.getCenter().lng()])
      this.$emit('setItem', null)
      setTimeout(() => {
        this.centerChange = false
      }, 100)
    },
    onRegionChange (e) {
      if (!gMapContext) {
        return
      }
      console.log(gMapContext.getZoom())
      // const zoomLevel = (gMapContext.getZoom() / 2 - 2).toFixed(0)
      const zoomLevel = 1
      this.$emit('zoom', zoomLevel > 4 ? zoomLevel : 1)
    },
    onLocation () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
            // console.log(pos)
            gMapContext.setCenter(pos)
            this.setMarker(pos)
            this.latitude = position.coords.latitude
            this.longitude = position.coords.longitude
            this.$emit('center', [position.coords.latitude, position.coords.longitude])
            // this.$emit('center', [22.631123, 113.820622])
          },
          (err) => {
            console.log(err)
            this.$emit('center', this.latLng)
            this.$confirm({
              title: this.i18n.msg_title,
              content: 'The Geolocation service failed, Kindly turn on your location',
              showCancel: false
            }).then(() => {})
          }
        )
      } else {
        this.$toast(this.i18n.no_support)
      }
    },
    setMarker (pos) {
      if (!gMapContext) {
        return
      }
      const image = {
        url: 'https://firebasestorage.googleapis.com/v0/b/boost-uae.appspot.com/o/marker101.png?alt=media&token=e3e91a97-71c8-4257-965a-d88d081efc26',
        scaledSize: new google.maps.Size(50, 56),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(50, 56)
      }
      const image1 = {
        url: 'https://firebasestorage.googleapis.com/v0/b/boost-uae.appspot.com/o/offline.png?alt=media&token=570e7f80-c036-4a4a-a3ea-ec2fd314ff55',
        scaledSize: new google.maps.Size(50, 56),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(50, 56)
      }
      const image2 = {
        url: 'https://firebasestorage.googleapis.com/v0/b/boost-uae.appspot.com/o/my_location.png?alt=media&token=aaf8fb36-9476-48f7-a471-77d0376e3a83',
        scaledSize: new google.maps.Size(50, 56),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(50, 56)
      }

      if (Array.isArray(pos)) {
        pos.forEach(([position, item], i) => {
          const markers = new google.maps.Marker({
            position,
            map: gMapContext,
            icon: item.batteryNum > 0 ? image : image1
            // zIndex: i + 1
          })
          // Add a click listener for each marker, and set up the info window.
          markers.addListener('click', () => {
            // console.log('点击标记了', markers.getTitle())
            this.$emit('setItem', item)
          })
        })
      } else {
        myMarker = new google.maps.Marker({
          position: pos,
          map: gMapContext,
          icon: image2
        })
      }
    },
    importMap () {
      if (!gMapContext && !window.google) {
        console.log('gmap import')
        let language = 'en'
        if (this.lang !== 'en-US') {
          language = 'zh-CN'
        }
        this.createScript(`https://maps.googleapis.com/maps/api/js?key=${this.apikey}&callback=initMap&language=${language}`)
      } else {
        console.log('gmap init')
        this.initMap()
      }
    },
    createScript (src) {
      let oscript = window.document.createElement('script')
      oscript.id = `g-map-script-${this.lang}`
      oscript.src = src
      oscript.onerror = error => {
        console.log('google map load fail', error)
      }
      let head = window.document.head || window.document.getElementsByTagName('head')[0] || window.document.documentElement
      head.insertBefore(oscript, head.firstChild)
    }
  },
  created () {
    window.initMap = this.initMap
    this.latitude = this.latLng[0]
    this.longitude = this.latLng[1]
  },
  mounted () {
    console.log('google map mounted')
    this.importMap()
  },
  beforeDestroy () {
    console.log('google map destroyed')
    if (gMapContext) {
      gMapContext = null
    }
    if (gMapTimer) {
      clearTimeout(gMapTimer)
    }
  }
}
</script>
<style lang="less" scoped>
#g-map{
  height: 100%;
  width: 100%;
}
.location {
  position: absolute;
  width: 50px;
  height: 50px;
  bottom: 200px;
  left: 10%;
  img {
    width: 100px;
    height: 100px;
  }
}
.location-icon {
  position: absolute;
  width: 36px;
  height: 58px;
  bottom: 50%;
  left: calc(50% - 18px);
}
.btn {
    position: fixed;
    left: 48px;
    right: 48px;
    bottom: 48px;
    button {
      width: 100%;
      border: 1px;
      border-radius: 15px;
      padding: 0;
      margin: 0;
    }
  }
</style>
