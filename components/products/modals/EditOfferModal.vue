<template>
  <div>
    <v-card class="pa-6">
      <div class="d-flex justify-space-between">
        <h3 class="pt-1">Edit Offer</h3>
        <v-btn
          icon
          @click="
            $emit('editOffer', false)
            $emit('showOffer', false)
            e1 = 1
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
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1" class="pt-0">
            <!-- <div>
              <span class="body-2 ibial_black--text">Product</span>
              <v-select
                disabled
                solo
                flat
                outlined
                dense
                placeholder="Unicon"
                hide-details
                class="body-2 pt-2 pb-3"
              >
                <template #append>
                  <v-icon class="mr-3">mdi-chevron-down</v-icon>
                </template>
              </v-select>
            </div> -->
            <div>
              <span class="body-2 ibial_black--text">Offer Title</span>
              <v-text-field
                v-model="offerName"
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
                    v-model="offerPrice"
                    dense
                    outlined
                    hide-details
                    class="body-2"
                  >
                    <!--<template #prepend-inner>
                      <v-icon small class="pt-1">mdi-currency-usd</v-icon>
                    </template>-->
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
              <v-radio-group
                v-model="offerPaymentType"
                row
                mandatory
                class="mt-1"
              >
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
            <div v-if="offerPaymentType == 'recurring'">
              <span class="body-2 ibial_black--text">Billing Frequency</span>
              <v-select
                v-model="offerFreq"
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
                v-model="offerStatus"
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
              <v-btn
                text
                rounded
                class="mx-3"
                @click="
                  $emit('editOffer', false)
                  $emit('showOffer', false)
                  e1 = 1
                "
              >
                Close
              </v-btn>
              <v-btn
                color="primary"
                outlined
                rounded
                @click="
                  editOffer()
                  getGlobalSettings()
                "
              >
                Save Changes
              </v-btn>
              <v-btn
                class="mx-3"
                color="primary"
                elevation="0"
                rounded
                @click="
                  e1 = 2
                  getGlobalSettings()
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
                        outlined
                        dense
                        hide-details
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>
              </div>
            </div>
            <div class="d-flex justify-space-between pt-12">
              <div>
                <v-btn outlined rounded color="primary" @click="e1 = 1">
                  Previous
                </v-btn>
              </div>
              <div>
                <v-btn color="primary" outlined rounded @click="editSettings">
                  Save Changes
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
            </div>
          </v-stepper-content>

          <v-stepper-content step="3" class="pt-0">
            <div class="d-flex justify-left pb-3">
              <span class="medium_gray--text body-2 text-center">
                Files in this offer:
              </span>
            </div>
            <!-- add file list here -->
            <div
              v-for="offerFile in offerFiles"
              :key="offerFile.id"
              class="d-flex justify-left pb-3"
            >
              <v-btn
                small
                icon
                @click="
                  deleteFile(offerFile.id, offerFile.link)
                  offerFiles.splice(offerFile, 1)
                "
              >
                <v-icon small>mdi-close-outline</v-icon>
              </v-btn>
              <a
                :href="offerFile.link"
                class="medium_gray--text body-2 text-center"
              >
                &nbsp;{{ offerFile.filetype }}
              </a>
              <!-- <a @onclick="deleteFile(offerFile.link)">
                <v-icon small> mdi-close-outline</v-icon>
              </a> -->
            </div>
            <div class="d-flex justify-center pb-3">
              <span class="medium_gray--text body-2 text-center">
                -------------------------------------------------------------------
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
                  loopStypes(offerID)
                  $emit('editOffer', false)
                  $emit('showOffer', false)
                  e1 = 1
                "
              >
                Save and Close
              </v-btn>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-card>
  </div>
</template>

<script>
export default {
  props: { offerID: { type: Number } },
  data() {
    return {
      e1: 1,
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
      offer: [],
      offerName: 'Loading...',
      offerPrice: 'Loading...',
      offerPaymentType: 'Loading...',
      offerFreq: 'Loading...',
      offerStatus: 'Loading...',
      extraSettings: [],
      offerFiles: [],
      currency: '$',
      inputSettingsOptionName: [],
      inputSettingsCustomField: [],
      inputSettingsStatus: [],
      globalSettings: [],
      loading: 'Loading...',
      chosenFile: [],
      outsidelink: [],
    }
  },
  mounted() {
    // console.log('edit offerID: ', this.offerID)
    this.getOffer(this.offerID)
    this.getOfferSettings(this.offerID)
    this.getOfferFiles(this.offerID)
  },
  methods: {
    async getOffer(offerID) {
      try {
        const param = {
          offerid: offerID,
        }
        const response = await this.$offerRepository.GetSingleOffer(param)
        // this.offers = this.offers.offers
        this.offer = response.offer[0]
        this.offerName = this.offer.offertitle
        this.offerPrice = this.offer.price
        this.offerPaymentType = this.offer.paymenttype
        this.offerFreq = this.offer.recurringfrequency
        this.offerStatus = this.offer.status
        console.log('Offer: ', this.offer[0])
        this.load = false
      } catch (error) {
        console.log(error)
      }
    },
    async getOfferSettings(offerID) {
      try {
        const param = {
          offerid: offerID,
        }
        const response = await this.$settingRepository.GetSettings(param)
        this.extraSettings = response.settings
        this.load = false
      } catch (error) {
        console.log(error)
      }
    },
    async getOfferFiles(offerID) {
      try {
        const param = {
          offerid: offerID,
        }
        const response = await this.$fileRepository.GetFiles(param)
        this.offerFiles = response.files
        this.load = false
      } catch (error) {
        console.log(error)
      }
    },
    async editOffer() {
      try {
        const param = {
          offertitle: this.offerName,
          price: this.offerPrice,
          status: this.offerStatus,
          paymenttype: this.offerPaymentType,
          recurringfrequency: this.offerFreq,
        }
        const response = await this.$offerRepository.EditOffer(
          param,
          this.offerID
        )
        console.log('Offer Saved! Response: ', response)
      } catch (err) {
        console.log(err)
      }
    },
    async editSettings() {
      try {
        await this.$settingRepository.DeleteSetting(this.offerID)
        this.globalSettings.forEach((value, index) => {
          const param = {
            offerid: this.offerID,
            optionname: this.inputSettingsOptionName[index],
            customfield: this.inputSettingsCustomField[index],
            status: this.inputSettingsStatus[index],
          }
          this.$settingRepository.AddSetting(param)
        })
        console.log('Settings Saved! ')
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
    async deleteFile(fileid, filename) {
      // console.log('fileid: ', fileid)
      // console.log('filename: ', filename)
      try {
        const param = {
          filepath: filename,
        }
        await this.$fileRepository.DeleteFile(param, fileid)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
