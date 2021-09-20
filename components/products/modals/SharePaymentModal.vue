<template>
  <div>
    <v-card class="pa-6">
      <div class="pb-3">
        <h3 class="font-weight-bold">
          Share hosted payment page for Unicon Pro
        </h3>
      </div>
      <v-divider></v-divider>
      <div class="mt-3">
        <div>
          <span class="body-2 ibial_black--text">Link</span>
          <v-text-field
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
        <div class="mt-6">
          <span class="body-2 ibial_black--text">Embed</span>
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
      </div>
      <v-card-actions class="d-flex justify-end pt-3">
        <v-btn text color="primary">Edit Payment Page</v-btn>
        <v-btn text color="primary" @click="$router.push('/product/payment')">
          View Payment Page
          <v-icon right>mdi-arrow-top-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style>
.v-input__append-inner {
  margin-top: 0 !important;
  margin-right: -12px !important;
}
</style>
