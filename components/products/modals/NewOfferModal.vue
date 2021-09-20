<template>
  <div>
    <v-card class="pa-6">
      <div
        :class="e1 != 4 ? 'd-flex justify-space-between' : 'd-flex justify-end'"
      >
        <div v-if="e1 != 4" class="pt-1 size-18 font-weight-bold">
          New Offer
        </div>
        <v-btn
          icon
          @click="
            e1 = 1
            $emit('newOffer', false)
          "
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-stepper v-model="e1" class="elevation-0">
        <v-stepper-header v-if="e1 != 4" class="elevation-0">
          <v-stepper-step
            :complete="e1 > 1"
            step="1"
            class="body-2 font-weight-bold"
          >
            General
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :complete="e1 > 2"
            step="2"
            class="body-2 font-weight-bold"
          >
            Customize
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step
            :complete="e1 > 3"
            step="3"
            class="body-2 font-weight-bold"
          >
            Extras
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="4" class="body-2 font-weight-bold">
            Done
          </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" class="pt-0">
            <div>
              <span class="body-2 ibial_black--text">Product</span>
              <v-select
                v-model="productname"
                solo
                flat
                outlined
                dense
                hide-details
                :items="productnameitems"
                class="body-2 pt-2 pb-3"
              >
                <template #append>
                  <v-icon class="mr-3">mdi-chevron-down</v-icon>
                </template>
              </v-select>
            </div>
            <div>
              <span class="body-2 ibial_black--text">Offer Title</span>
              <v-text-field
                v-model="offertitle"
                placeholder="e.g. Product Basic Package"
                dense
                outlined
                hide-details
                class="body-2 pb-3"
              ></v-text-field>
            </div>
            <div class="pb-3">
              <span class="body-2 ibial_black--text">Price</span>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="price"
                    type="number"
                    dense
                    outlined
                    hide-details
                    class="body-2"
                  >
                    <template #prepend-inner>
                      <v-icon small class="pt-1">mdi-currency-usd</v-icon>
                    </template>
                  </v-text-field>
                  <span class="text-muted caption">
                    Currency is set to US Dollar (USD)
                  </span>
                  <span class="primary--text caption pl-2">Change</span>
                </v-col>
              </v-row>
            </div>
            <div>
              <span class="body-2 ibial_black--text">Payment Type</span>
              <v-radio-group v-model="type" row mandatory class="mt-1">
                <v-radio class="body-2" value="onetime">
                  <template #label>
                    <div class="body-2 ibial_black--text">One-time payment</div>
                  </template>
                </v-radio>
                <v-radio class="body-2" value="recurring">
                  <template #label>
                    <div class="body-2 ibial_black--text">Recurring</div>
                  </template>
                </v-radio>
              </v-radio-group>
            </div>
            <div v-if="type == 'recurring'">
              <span class="body-2 ibial_black--text">Billing Frequency</span>
              <v-select
                v-model="freq"
                solo
                flat
                outlined
                dense
                :items="frequency"
                hide-details
                class="body-2 pt-2 pb-3"
              >
                <template #append>
                  <v-icon class="mr-3">mdi-chevron-down</v-icon>
                </template>
              </v-select>
            </div>
            <div>
              <span class="body-2 ibial_black--text">Status</span>
              <v-select
                v-model="stat"
                solo
                flat
                outlined
                dense
                :items="status"
                hide-details
                class="body-2 pt-2 pb-3"
              >
                <template #append>
                  <v-icon class="mr-3">mdi-chevron-down</v-icon>
                </template>
              </v-select>
            </div>
            <div class="d-flex justify-end pt-3">
              <v-btn text outlined rounded @click="$emit('newOffer', false)">
                Cancel
              </v-btn>
              <v-btn
                class="mx-3"
                color="primary"
                elevation="0"
                rounded
                @click="
                  e1 = 2
                  getGlobalSettings()
                  test1()
                "
              >
                Next
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="2" class="pt-0">
            <div class="d-flex justify-center pb-3">
              <span class="medium_gray--text body-2">
                Choose which features to enable or remove for this product
                offer.
              </span>
            </div>
            <div class="d-flex justify-center pb-3">{{ loading }}</div>
            <div
              v-for="(globalSetting, index) in globalSettings"
              :key="globalSetting.id"
            >
              <input
                v-model="inputSettingsOptionName[index]"
                type="hidden"
                name="customfield"
                class="form-control"
              />
              <input
                v-model="inputSettingsCustomField[index]"
                type="hidden"
                name="customfield"
                class="form-control"
              />
              <input
                v-model="inputSettingsStatus[index]"
                type="hidden"
                name="customfield"
                class="form-control"
              />
              <div
                v-if="globalSetting.customfield == null"
                class="d-flex justify-space-between py-2"
              >
                <div class="d-flex align-center body-2 ibial_black--text">
                  {{ globalSetting.optionname }}
                </div>
                <template v-if="globalSetting.status == 'Active'">
                  <v-switch
                    v-model="inputSettingsStatus[index]"
                    input-value="true"
                    color="primary"
                    class="mt-0"
                    hide-details
                  ></v-switch>
                </template>
                <template v-else>
                  <v-switch
                    v-model="inputSettingsStatus[index]"
                    color="primary"
                    class="mt-0"
                    hide-details
                  ></v-switch>
                </template>
              </div>
              <div v-else class="d-flex justify-space-between py-2">
                <div class="d-flex align-center body-2 ibial_black--text">
                  {{ globalSetting.optionname }}
                </div>
                <div>
                  <v-row>
                    <v-col cols="6"></v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="inputSettingsCustomField[index]"
                        type="number"
                        outlined
                        dense
                        value="5"
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </div>
            <div class="d-flex justify-space-between pt-12">
              <v-btn text outlined rounded color="primary" @click="e1 = 1">
                Previous
              </v-btn>
              <v-btn
                class="mx-3"
                color="primary"
                elevation="0"
                rounded
                @click="e1 = 3"
              >
                Next
              </v-btn>
            </div>
          </v-stepper-content>

          <v-stepper-content step="3" class="pt-0">
            <div class="d-flex justify-center pb-3">
              <span class="medium_gray--text body-2 text-center">
                To make your offer stand out, consider adding perks like a free
                tutorial, an ebook, or access to exclusive content.
              </span>
            </div>
            <div v-for="(item, i) in stype" :key="i">
              <div>{{ i + 1 }}.</div>
              <div class="pl-6">
                <span class="body-2 ibial_black--text">Select Type</span>
                <v-select
                  v-model="stype[i]"
                  solo
                  flat
                  outlined
                  dense
                  item-text="title"
                  :items="select_type"
                  hide-details
                  class="body-2 pt-2 pb-3"
                >
                  <template slot="item" slot-scope="{ item }">
                    <div class="pt-3">
                      <div class="body-2 ibial_black--text">
                        {{ item.title }}
                      </div>
                      <div class="caption medium_gray--text">
                        {{ item.subtitle }}
                      </div>
                    </div>
                  </template>
                  <template #append>
                    <v-icon class="mr-3">mdi-chevron-down</v-icon>
                  </template>
                </v-select>
              </div>
              <div v-if="stype[i] != 'Link to an unlisted video'" class="pl-6">
                <div class="body-2 ibial_black--text">Upload file:</div>
                <div class="caption medium_gray--text">
                  Supported formats: PDF. Max file size: xyzMB
                </div>
                <v-file-input
                  v-model="chosenFile[i]"
                  label="Choose file"
                  :disabled="outsidelink[i] != null && outsidelink[i] != ''"
                ></v-file-input>
              </div>
              <div class="pl-6">
                <span class="body-2 ibial_black--text">
                  {{
                    stype[i] != 'Link to an unlisted video'
                      ? 'Or paste a download/access link:'
                      : 'Link'
                  }}
                </span>
                <v-text-field
                  v-model="outsidelink[i]"
                  :placeholder="
                    stype[i] != 'Link to an unlisted video'
                      ? 'Link here'
                      : 'example: https://www.youtube.com/watch?v=something'
                  "
                  dense
                  outlined
                  hide-details
                  class="body-2 pb-3"
                  :disabled="chosenFile[i] != null"
                ></v-text-field>
              </div>
              <div class="d-flex justify-end">
                <v-btn
                  text
                  color="red"
                  class="body-2"
                  @click="stype.splice(i, 1)"
                >
                  Delete
                </v-btn>
              </div>
            </div>
            <div>
              <v-btn
                text
                color="primary"
                class="text-capitalize body-2"
                @click="stype.push('Link to an unlisted video')"
              >
                <v-icon left>mdi-plus</v-icon>
                Add Extra
              </v-btn>
            </div>

            <div class="d-flex justify-space-between pt-12">
              <v-btn text outlined rounded color="primary" @click="e1 = 2">
                Previous
              </v-btn>
              <v-btn
                class="mx-3"
                color="primary"
                elevation="0"
                rounded
                @click="
                  e1 = 4
                  createOffer()
                "
              >
                Create Offer
              </v-btn>
            </div>
          </v-stepper-content>
          <v-stepper-content step="4" class="pt-0">
            <div class="d-flex justify-center pb-3">
              <span class="text-center text-h6">
                Your new product offer
                <span class="font-weight-bold">
                  Unicon 2nd Anniversary Bundle
                </span>
                has been created!
              </span>
            </div>
            <div class="d-flex justify-center">
              <span class="body-2 dark_gray--text">
                You can also edit the hosted payment page
                <span class="primary--text">here.</span>
              </span>
            </div>
            <div class="mt-8">
              <span class="body-2 ibial_black--text">
                Link to the hosted payment page:
              </span>
              <v-text-field
                v-model="offerURL"
                value="http://website.com/urlsomething"
                outlined
                dense
                hide-details
              >
                <template slot="append">
                  <v-btn
                    class="caption px-7"
                    color="primary"
                    x-large
                    elevation="0"
                    depressed
                    tile
                  >
                    Copy Link
                  </v-btn>
                </template>
              </v-text-field>
            </div>
            <div class="my-6">
              <span class="body-2 ibial_black--text">Embed code:</span>
              <v-text-field
                value="<iframe src='http://www.something.com'></iframe>"
                outlined
                dense
                hint="Copy the code and paste it into your website."
                persistent-hint
              >
                <template slot="append">
                  <v-btn
                    class="caption"
                    color="primary"
                    x-large
                    elevation="0"
                    depressed
                    tile
                  >
                    Copy Code
                  </v-btn>
                </template>
              </v-text-field>
            </div>
            <div class="d-flex justify-end">
              <v-btn
                text
                color="primary"
                @click="$router.push('/product/payment')"
              >
                View Payment Page
                <v-icon right>mdi-arrow-top-right</v-icon>
              </v-btn>
              <v-btn text color="primary" @click="$emit('newOffer', false)"
                >DOne</v-btn
              >
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      e1: 1,
      productname: this.$route.params.id,
      productnameitems: [this.$route.params.id],
      offertitle: '',
      price: '',
      status: ['Active', 'Inactive'],
      frequency: ['Monthly', 'Yearly'],
      freq: 'Monthly',
      stat: 'Active',
      type: 'onetime',
      stype: ['Link to an unlisted video'],
      select_type: [
        {
          title: 'Link to an unlisted video',
          subtitle: 'Tutorials, webinar replay, exclusive content',
        },
        {
          title: 'eBook',
          subtitle: 'Guides, other PDF files',
        },
        {
          title: 'Software',
          subtitle: 'Plugins, extensions',
        },
        {
          title: 'Other digital item',
          subtitle: 'Hi-res files, printable merch, Wordpress themes',
        },
      ],
      globalSettings: [],
      load: true,
      loading: 'Loading...',
      inputSettingsOptionName: [],
      inputSettingsCustomField: [],
      inputSettingsStatus: [],
      chosenFile: [],
      outsidelink: [],
      offerURL: 'Loading...',
    }
  },
  methods: {
    test1() {
      console.log(process.env.appURL)
    },
    createOffer() {
      try {
        const getData = async () => {
          const offerid = await this.creategeneralSetting()
          return offerid
        }
        getData().then((offerid) => {
          this.loopGlobalSettings(offerid)
          this.loopStypes(offerid)
          this.getPageSettingID(offerid)
        })
      } catch (err) {
        console.log(err)
      }
    },
    async creategeneralSetting() {
      console.log('Creating General Setting')
      try {
        const param = {
          resellerid: this.$auth.user.id,
          productid: this.$route.query.productid,
          transactionid: this.$route.query.transactionid,
          offertitle: this.offertitle,
          price: this.price,
          status: this.stat,
          paymenttype: this.type,
          recurringfrequency: this.freq,
        }
        const response = await this.$offerRepository.AddOffer(param)
        return response.offer.id
      } catch (err) {
        console.log(err)
      }
    },
    loopGlobalSettings(offerid) {
      console.log('Creating Global Setting')
      this.globalSettings.forEach((value, index) => {
        this.createcustomSettings(index, offerid)
      })
    },
    async createcustomSettings(index, offerid) {
      try {
        const param = {
          offerid,
          optionname: this.inputSettingsOptionName[index],
          customfield: this.inputSettingsCustomField[index],
          status: this.inputSettingsStatus[index],
        }
        await this.$settingRepository.AddSetting(param)
      } catch (err) {
        console.log(err)
      }
    },
    loopStypes(offerid) {
      console.log('Creating File Uploads')
      this.stype.forEach((value, index) => {
        console.log('stype: ', value)
        if (this.chosenFile[index] == null) {
          this.createExtraSettings(index, offerid, this.outsidelink[index])
        } else {
          const getFilePath = async () => {
            const filepath = await this.uploadFile(this.chosenFile[index])
            return filepath
          }
          getFilePath().then((filepath) => {
            this.createExtraSettings(index, offerid, filepath)
          })
        }
      })
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
    async createExtraSettings(index, offerid, filepath) {
      console.log('XtrSet sType: ', this.stype[index])
      console.log('XtrSet offerid: ', offerid)
      console.log('XtrSet filepath: ', filepath)
      try {
        const param = {
          offerid,
          filetype: this.stype[index],
          link: filepath,
        }
        await this.$settingRepository.AddFileRecord(param)
      } catch (err) {
        console.log(err)
      }
    },
    getPageSettingID(offerid) {
      try {
        const idparam = {
          resellerid: this.$auth.user.id,
        }
        const getPageSettings = async () => {
          const pagesetting = await this.$settingRepository.GetPaymentPageSettings(
            idparam
          )
          return pagesetting
        }
        getPageSettings().then((pagesetting) => {
          this.createCustomURLs(offerid, pagesetting.pagesettings[0].id)
        })
      } catch (err) {
        console.log(err)
      }
    },
    async createCustomURLs(offerid, pagesettingid) {
      // assemble custom URL
      const customURL =
        process.env.appURL +
        '/products/payment?offer=' +
        offerid +
        '&product=' +
        this.$route.query.productid +
        '&reseller=' +
        this.$auth.user.id
      this.offerURL = customURL
      console.log('pagesettingid: ', pagesettingid)
      console.log('offerid: ', offerid)
      console.log('url: ', customURL)
      try {
        const param = {
          pagesettingid,
          offerid,
          url: customURL,
          status: 'active',
        }
        const response = await this.$settingRepository.AddPaymentURL(param)
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
    async getGlobalSettings() {
      this.loading = 'Loading...'
      try {
        const param = {
          productid: this.$route.query.productid,
        }
        const response = await this.$settingRepository.GetGlobalSettings(param)
        console.log('Global Settings: ', response)
        this.globalSettings = response.settings
        this.globalSettings.forEach((value, index) => {
          this.inputSettingsOptionName[index] = value.optionname
          this.inputSettingsCustomField[index] = value.customfield
          this.inputSettingsStatus[index] = value.status
        })
        this.loading = ' '
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
