<template lang="pug">
q-layout(view="hHh lpR fFf")
  q-header.bg-primary.text-white(elevated)
    q-toolbar
      q-toolbar-title
        | Super Chess Drills

      q-tabs(align="left")
        q-route-tab(to="/", label="Welcome")
        q-route-tab(to="/edit", label="Edit")
        q-route-tab(to="/train", label="Train")
        q-route-tab(to="/settings", label="Settings")

  q-page-container
    router-view
</template>
