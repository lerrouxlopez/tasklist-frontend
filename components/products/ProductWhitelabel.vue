<template>
  <div class="mt-8">
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="10">
        <div><h3>White-Label</h3></div>
        <div class="body-2">
          <span class="dark_gray--text">
            Set a new name, logo, and look for Omnicon.
          </span>
          <a href="#" class="primary--text" @click="viewDemo">
            View the demo here.
          </a>
        </div>
        <div class="mt-6">
          <div class="pb-2">
            <span class="body-2 ibial_black--text">Product Name</span>
            <span>
              <v-tooltip top color="ibial_black">
                <template #activator="{ on, attrs }">
                  <v-icon small color="medium_gray" v-bind="attrs" v-on="on">
                    mdi-alert-circle
                  </v-icon>
                </template>
                <span class="caption">Lorem ipsum something</span>
              </v-tooltip>
            </span>
          </div>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="pname"
                placeholder="Enter a new name for this product"
                dense
                outlined
                hide-details
                class="body-2 pb-3"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div class="mt-6">
          <span class="body-2 ibial_black--text">Product Logo</span>
          <div class="mt-3 product_logo">
            <div class="d-flex justify-center mt-4">
              <v-img
                :src="imagePreview"
                max-width="40"
                max-height="80"
                contain
                class=""
              />
            </div>
            <input
              ref="imageInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="updatePreview"
            />
            <v-icon class="float-right" @click="$refs.imageInput.click()">
              mdi-pencil
            </v-icon>
          </div>
        </div>
        <div class="mt-6">
          <v-checkbox v-model="showLogo">
            <span slot="label" class="ibial_black--text caption">
              Show the logo on the product header instead of the product name.
            </span>
          </v-checkbox>
        </div>
        <div class="mt-3">
          <span class="body-2 font-weight-bold ibial_black--text">
            Color Scheme
          </span>
        </div>
        <div class="mt-3">
          <v-radio-group v-model="colorGroup">
            <v-row>
              <v-col
                v-for="scheme in colorSchemes"
                :key="scheme.id"
                cols="3"
                class="pa-6"
              >
                <div>
                  <img :src="`/colorscheme/${scheme.schemename}.png`" />
                </div>
                <span>
                  <v-radio
                    :value="scheme.schemename"
                    class="mt-3"
                    @click="selectScheme()"
                  >
                    <span slot="label" class="ibial_black--text body-2">
                      {{ scheme.schemename }}
                    </span>
                  </v-radio>
                </span>
              </v-col>
            </v-row>
          </v-radio-group>
        </div>
        <div class="mt-3">
          <div>
            <v-btn text color="primary" @click="showAdvance = !showAdvance">
              <span>{{ showAdvance ? 'Hide ' : 'Show ' }}</span> &nbsp;advanced
              options
            </v-btn>
          </div>
        </div>
        <div v-if="showAdvance" class="pt-3 pl-6">
          <div class="body-2 font-weight-bold">Custom Color Scheme</div>
          <v-row class="mt-3">
            <v-col v-for="(item, i) in customColors" :key="i" cols="4">
              <span class="body-2 ibial_black--text">{{ item.name }}</span>
              <span v-if="item.name === 'Base Color'">
                <v-tooltip top color="ibial_black">
                  <template #activator="{ on, attrs }">
                    <v-icon small color="medium_gray" v-bind="attrs" v-on="on">
                      mdi-alert-circle
                    </v-icon>
                  </template>
                  <span class="caption"
                    >The main accent color of your product</span
                  >
                </v-tooltip>
              </span>
              <div class="pa-1 pl-3 mt-2 custom_color--input">
                <input
                  v-model="customColor[i]"
                  type="color"
                  class="color_input pa-0"
                  @click="changeColorGroup()"
                />
                <span class="ibial_black--text body-2 text-uppercase pl-2">
                  {{ customColor[i] }}
                </span>
              </div>
            </v-col>
          </v-row>
        </div>
        <div class="mt-6 pl-3 pb-3">
          <v-btn rounded outlined color="primary" @click="viewDemo">
            View Demo
          </v-btn>
          <v-btn text rounded color="primary" @click="changetoDefault()"
            >Reset to default</v-btn
          >
        </div>
        <div class="mt-8 pl-3">
          <h3 class="ibial_black--text">Domain Settings</h3>
          <span class="body-2 dark_gray--text">
            Create a CNAME record on your DNS Provider that points to this
            product's default domain: {{ customDomain }}
          </span>
        </div>
        <div class="mt-8 pl-3">
          <span class="body-2 ibial_black--text">Custom Domain</span>
          <v-row>
            <v-col cols="6" class="mt-2">
              <v-text-field
                v-model="customDomain"
                dense
                outlined
                placeholder="app.resellerdomain.com"
              ></v-text-field>
            </v-col>
          </v-row>
        </div>
        <div class="mt-8 pl-3">
          <v-btn rounded color="primary" elevation="0" @click="saveSettings()"
            >Save</v-btn
          >
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pname: this.$route.params.id,
      showLogo: false,
      imagePreview: '/img/product_default_logo.png',
      showAdvance: false,
      customColor: [
        '#4DB7A1',
        '#FFFFFF',
        '#596366',
        '#F8F8F8',
        '#A0A8B0',
        '#4DB7A1',
        '#FCFCFC',
        '#596366',
        '#596366',
        '#F2F2F2',
        '#131416',
      ],
      defaultColor: [
        '#4DB7A1',
        '#FFFFFF',
        '#596366',
        '#F8F8F8',
        '#A0A8B0',
        '#4DB7A1',
        '#FCFCFC',
        '#596366',
        '#596366',
        '#F2F2F2',
        '#131416',
      ],
      colors: [
        {
          id: 1,
          color: 'Default',
        },
        {
          id: 2,
          color: 'Blue',
        },
        {
          id: 3,
          color: 'Green',
        },
        {
          id: 4,
          color: 'Dark Red',
        },
        {
          id: 5,
          color: 'Halloween',
        },
        {
          id: 6,
          color: 'Hello Yellow',
        },
        {
          id: 7,
          color: 'Dark Blue',
        },
        {
          id: 8,
          color: 'Purple',
        },
      ],
      customColors: [
        {
          name: 'Base Color',
          color: '#4DB7A1',
        },
        {
          name: 'Header BG',
          color: '#FFFFFF',
        },
        {
          name: 'Header Text Color',
          color: '#596366',
        },
        {
          name: 'Sidebar BG',
          color: '#F8F8F8',
        },
        {
          name: 'Icon',
          color: '#A0A8B0',
        },
        {
          name: 'Active Icon',
          color: '#4DB7A1',
        },
        {
          name: 'Panel BG',
          color: '#FCFCFC',
        },
        {
          name: 'Panel Text Color',
          color: '#596366',
        },
        {
          name: 'Panel Link Color',
          color: '#131416',
        },
        {
          name: 'Panel Active Item BG',
          color: '#F2F2F2',
        },
        {
          name: 'Panel Active Item Text',
          color: '#131416',
        },
      ],
      defaultColors: [
        {
          name: 'Base Color',
          color: '#4DB7A1',
        },
        {
          name: 'Header BG',
          color: '#FFFFFF',
        },
        {
          name: 'Header Text Color',
          color: '#596366',
        },
        {
          name: 'Sidebar BG',
          color: '#F8F8F8',
        },
        {
          name: 'Icon',
          color: '#A0A8B0',
        },
        {
          name: 'Active Icon',
          color: '#4DB7A1',
        },
        {
          name: 'Panel BG',
          color: '#FCFCFC',
        },
        {
          name: 'Panel Text Color',
          color: '#596366',
        },
        {
          name: 'Panel Link Color',
          color: '#131416',
        },
        {
          name: 'Panel Active Item BG',
          color: '#F2F2F2',
        },
        {
          name: 'Panel Active Item Text',
          color: '#131416',
        },
      ],
      WLSettings: [],
      customDomain: '',
      schemeID: '',
      colorGroup: 'Default',
      colorScheme: [],
      colorSchemes: [],
      chosenFile: '',
    }
  },
  mounted() {
    this.getColorSchemes()
    this.getSettings()
  },
  methods: {
    saveSettings() {
      console.log('==========Settings==========')
      console.log('id', this.schemeID)
      console.log('productname', this.pname)
      console.log('productlogo', this.imagePreview)
      console.log('showproductlogo', this.showLogo)
      console.log('colorscheme', this.colorGroup)
      console.log('customdomain', this.customDomain)
      console.log('basecolor', this.customColor[0])
      console.log('headerbg', this.customColor[1])
      console.log('headertextcolor', this.customColor[2])
      console.log('sidebarbg', this.customColor[3])
      console.log('iconcolor', this.customColor[4])
      console.log('activeiconcolor', this.customColor[5])
      console.log('panelbg', this.customColor[6])
      console.log('paneltxtcolor', this.customColor[7])
      console.log('panellinkcolor', this.customColor[8])
      console.log('panelactiveitembg', this.customColor[9])
      console.log('panelactiveitemtextcolor', this.customColor[10])
      console.log('==========Settings==========')
      /* try {
        const param = {
          schemename: this.colorGroup,
        }
        const response = await this.$settingRepository.GetColorScheme(param)
        this.colorScheme = response.colorscheme
        console.log('ColorScheme: ', response.colorscheme)
      } catch (err) {
        console.log(err)
      } */
    },
    async uploadFile(file) {
      try {
        const param = {
          file,
          user_id: this.$auth.user.id,
        }
        const response = await this.$fileRepository.uploadFile(param)
        const filepath = response.path + response.file
        return filepath
      } catch (err) {
        console.log(err)
      }
    },
    changeColorGroup() {
      this.colorGroup = 'Custom'
      console.log('Color group: ', this.colorGroup)
    },
    changetoDefault() {
      this.customColors = this.defaultColors
      this.customColor = this.defaultColor
      this.colorGroup = 'Default'
    },
    async getColorSchemes() {
      try {
        const response = await this.$settingRepository.GetColorSchemes()
        this.colorSchemes = response.colorscheme
        console.log('ColorSchemes: ', response.colorscheme)
      } catch (err) {
        console.log(err)
      }
    },
    getSettings() {
      try {
        const getData = async () => {
          const response = await this.getWhitelabelSettings()
          return response
        }
        getData().then((response) => {
          this.WLSettings = response.settings[0]
          if (this.WLSettings.showproductlogo === 'yes') {
            this.showLogo = true
          } else {
            this.showLogo = false
          }
          if (this.WLSettings.productlogo === '') {
            this.imagePreview = '/img/product_default_logo.png'
          } else {
            this.imagePreview = this.WLSettings.productlogo
          }
          this.colorGroup = this.WLSettings.colorscheme
          this.customDomain = this.WLSettings.customdomain
          this.schemeID = this.WLSettings.id
          this.getColorScheme()
        })
      } catch (err) {
        console.log(err)
      }
    },
    async getColorScheme() {
      try {
        const param = {
          schemename: this.colorGroup,
        }
        const response = await this.$settingRepository.GetColorScheme(param)
        this.colorScheme = response.colorscheme
        console.log('ColorScheme: ', response.colorscheme)
      } catch (err) {
        console.log(err)
      }
    },
    async getWhitelabelSettings() {
      try {
        const param = {
          productid: this.$route.query.productid,
          transactionid: this.$route.query.transactionid,
          resellerid: this.$auth.user.id,
          productname: this.pname,
        }
        const response = await this.$settingRepository.GetWhitelabelSetting(
          param
        )
        return response
      } catch (err) {
        console.log(err)
      }
    },
    updatePreview(e) {
      const files = e.target.files
      if (files.length === 0) {
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        this.imagePreview = e.target.result
      }
      reader.readAsDataURL(files[0])
    },
    viewDemo() {
      const routeData = this.$router.resolve({
        path: '/demo',
        query: {
          pname: this.pname,
          image: this.imagePreview,
          logo: this.showLogo,
          baseColor: this.customColor[0],
          headerBG: this.customColor[1],
          headerText: this.customColor[2],
          sidebarBG: this.customColor[3],
          icon: this.customColor[4],
          iconActive: this.customColor[5],
          panelBG: this.customColor[6],
          panelText: this.customColor[7],
          panelLink: this.customColor[8],
          panelActiveItemBG: this.customColor[9],
          panelActiveItemText: this.customColor[10],
        },
      })
      window.open(routeData.href, '_blank')
    },
    selectScheme() {
      try {
        const getData = async () => {
          const scheme = await this.getDemoData()
          return scheme
        }
        getData().then((scheme) => {
          this.customColor[0] = scheme[0].basecolor
          this.customColor[1] = scheme[0].headerbg
          this.customColor[2] = scheme[0].headertextcolor
          this.customColor[3] = scheme[0].sidebarbg
          this.customColor[4] = scheme[0].iconcolor
          this.customColor[5] = scheme[0].activeiconcolor
          this.customColor[6] = scheme[0].panelbg
          this.customColor[7] = scheme[0].paneltxtcolor
          this.customColor[8] = scheme[0].panellinkcolor
          this.customColor[9] = scheme[0].panelactiveitembg
          this.customColor[10] = scheme[0].panelactiveitemtextcolor
        })
      } catch (err) {
        console.log(err)
      }
    },
    async getDemoData() {
      console.log(this.colorGroup)
      try {
        const param = {
          schemename: this.colorGroup,
        }
        const response = await this.$settingRepository.GetColorScheme(param)
        return response.colorscheme
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
}
.product_logo {
  width: 100px;
  height: 100px;
  border: 1px dashed #dfdfe1;
  border-radius: 4px;
}
.color_input {
  width: 24px;
  height: 24px;
  border: 1px solid #dfdfe1;
}
.custom_color--input {
  border: 1px solid #dfdfe1;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
