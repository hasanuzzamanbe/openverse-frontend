<template>
  <fieldset class="home-license-filter mt-16">
    <legend>
      {{ $t('hero.license-filter.label') }}
    </legend>
    <template v-for="(licenseType, index) in licenseTypes">
      <label :key="index" class="checkbox" :for="licenseType.code">
        <input
          :id="licenseType.code"
          type="checkbox"
          :checked="licenseType.checked"
          name="lt"
          :value="licenseType.code"
          @change="onFilterChanged(licenseType.code)"
        />
        {{ $t(licenseType.name) }}
      </label>
    </template>
  </fieldset>
</template>

<script>
import { TOGGLE_FILTER } from '~/constants/action-types'
import { FILTER } from '~/constants/store-modules'

export default {
  name: 'LicenseFilter',
  computed: {
    licenseTypes() {
      return this.filters.licenseTypes
    },
    filters() {
      return this.$store.state.filter.filters
    },
  },
  methods: {
    onFilterChanged(code) {
      this.$store.dispatch(`${FILTER}/${TOGGLE_FILTER}`, {
        code,
        filterType: 'licenseTypes',
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.home-license-filter {
  display: flex;
  justify-content: center;
  legend {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 0.5rem;
  }
}

.checkbox:not(:last-child) {
  margin-right: 1.5rem;
}
</style>
