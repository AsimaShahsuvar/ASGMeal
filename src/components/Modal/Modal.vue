<template>
    <div v-if="visible" class="modal-overlay" @click="close">
      <div class="modal-content" @click.stop>
        <h2>Flight Details</h2>
        <p><strong>Flight No:</strong> {{ flight.flight }}</p>
        <p><strong>Route:</strong> {{ flight.route }}</p>
        <p><strong>LT:</strong> {{ flight.lt }}</p>
        <p><strong>ETD:</strong> {{ flight.etd }}</p>
        <p><strong>ETA:</strong> {{ flight.eta }}</p>
        <p><strong>Bort No:</strong> {{ flight.bort }}</p>
        <p><strong>Parking:</strong> {{ flight.parking }}</p>
        <p><strong>Superviser:</strong> {{ flight.superviser }}</p>
        <p><strong>Notes:</strong> {{ flight.notes }}</p>
        <button @click="close">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Modal",
    props: {
      visible: Boolean,
      flight: Object
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
  }
  
  button {
    margin-top: 20px;
  }
  </style>
  