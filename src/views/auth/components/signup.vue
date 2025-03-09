<template>
  <div class="tw-h-full">
    <v-form class="tw-gap-10 tw-h-full tw-pt-[50px]">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field hide-details="auto" label="Full Name" type="text"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field hide-details="auto" label="Phone number" type="tel"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field hide-details="auto" label="Email address" type="tel"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field hide-details="auto" label="Business address" type="tel"></v-text-field>
          </v-col>
          <v-col>
            <v-select
              label="Select"
              hide-details="auto"
              :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field hide-details="auto" label="Phone number" type="tel"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field hide-details="auto" label="Pin" type="password"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field hide-details="auto" label="Confirm PIN" type="password"></v-text-field>
          </v-col>
        </v-row>
        <v-col cols="12" class="flex items-center">
          <v-checkbox
            hide-details="auto"
            color="#FA4A0C"
            :value="true"
            v-model="terms"
          ></v-checkbox>
          <p>
            I Agree to
            <RouterLink to="/" class="tw-text-[#FA4A0C]">Terms and Conditions</RouterLink>
          </p>
        </v-col>

        <v-btn class="!tw-h-[70px] !tw-rounded-full" color="#FA4A0C" block> Login</v-btn>
        <RouterLink to="/" class="tw-block tw-my-4 tw-text-center tw-text-[#FA4A0C]"
          >PIN Reset</RouterLink
        >
      </v-container>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const terms = ref(false)
</script>
