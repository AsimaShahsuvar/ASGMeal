
<template>
  <div class="container-fluid">

    <div class="panel panel-default">
      <!--            <div class="panel-heading">Panel Heading</div>-->
      <div class="panel-body">
        <div class="row">
          <div class="col-md-2">
            <div class="form-group">
              <input type="date" class="form-control" id="fromSt">
            </div>
          </div>
          <div class="col-md-1">
            <button class="btn btn-primary" onclick="getFlight();">Search</button>
          </div>
        </div>
      </div>
    </div>


  </div>
  <div class="container-fluid">
    <div class="table_div">
      <table class="table table-bordered animate__animated animate__fadeIn" id="flight">
        <thead>

        <tr class="allThClass">
          <th colspan="1" class="sticky-col first-col">...</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">00:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">00:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">00:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">00:45</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">01:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">01:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">01:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">01:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">02:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">02:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">02:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">02:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">03:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">03:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">03:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">03:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">04:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">04:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">04:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">04:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">05:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">05:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">05:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">05:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">06:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">06:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">06:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">06:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">07:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">07:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">07:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">07:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">08:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">08:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">08:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">08:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">09:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">09:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">09:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">09:45</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">10:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">10:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">10:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">10:45</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">11:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">11:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">11:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">11:45</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">12:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">12:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">12:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">12:45</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">13:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">13:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">13:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">13:45</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">14:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">14:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">14:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">14:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">15:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">15:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">15:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">15:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">16:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">16:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">16:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">16:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">17:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">17:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">17:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">17:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass" >18:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass" >18:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass" >18:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass" >18:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">19:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">19:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">19:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">19:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">20:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">20:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">20:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">20:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">21:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">21:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">21:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">21:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">22:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">22:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">22:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">22:45</th>

          <th colspan="15" onclick="thClick(this)" class="thclass">23:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">23:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">23:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">23:45</th>


        </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  </div>
</template>

<script >

export default {

  mounted() {
    let Script = document.createElement("script");
    Script.setAttribute("src", "/assets/js/dispatcher.js");
    document.head.appendChild(Script);
  }
};
</script>

<style scoped>

</style>