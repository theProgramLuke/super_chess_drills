<script lang="ts" setup>
/**
 * window.versions was exposed from {@link module:preload}
 */
const versions = Object.entries(window.versions).sort(([key1], [key2]) =>
  key1.localeCompare(key2),
);
</script>

<template lang="pug" src="/@/components/template/ElectronVersions.pug" />

<style scoped lang="sass" src="/@/components/style/ElectronVersions.sass" />
