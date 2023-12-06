<template>
  <div class="container-fluid">

    <div class="panel panel-default">
      <!--            <div class="panel-heading">Panel Heading</div>-->
      <div class="panel-body">
        <div class="row">

          <div class="col-md-3" style="display: inherit;column-gap: 7px;">

            <div class="form-group">
              <input type="date" class="form-control" id="fromSt">
            </div>
            <button class="btn btn-primary" onclick="prevBtn('-')">Prev</button>
            <button class="btn btn-primary" onclick="prevBtn('+')">Next</button>
          </div>
<!--          <div class="col-md-1">-->
<!--            <button class="btn btn-primary" onclick="getFlight();">Next</button>-->
<!--          </div>-->

        </div>
      </div>
    </div>


  </div>
  <div class="container-fluid">
    <div class="table_div">
      <table class="table table-bordered animate__animated animate__fadeIn" id="flight">
        <thead>
        <tr>
          <th colspan="1" class="text-center sticky-col first-col">...</th>
          <th colspan="60" class="text-center">01.01.2023 00:00</th>
          <th colspan="60" class="text-center">01.01.2023 01:00</th>
          <th colspan="60" class="text-center">01.01.2023 02:00</th>
          <th colspan="60" class="text-center">01.01.2023 03:00</th>
          <th colspan="60" class="text-center">01.01.2023 04:00</th>
          <th colspan="60" class="text-center">01.01.2023 05:00</th>
          <th colspan="60" class="text-center">01.01.2023 06:00</th>
          <th colspan="60" class="text-center">01.01.2023 07:00</th>
          <th colspan="60" class="text-center">01.01.2023 08:00</th>
          <th colspan="60" class="text-center">01.01.2023 09:00</th>
          <th colspan="60" class="text-center">01.01.2023 10:00</th>
          <th colspan="60" class="text-center">01.01.2023 11:00</th>
          <th colspan="60" class="text-center">01.01.2023 12:00</th>
          <th colspan="60" class="text-center">01.01.2023 13:00</th>
          <th colspan="60" class="text-center">01.01.2023 14:00</th>
          <th colspan="60" class="text-center">01.01.2023 15:00</th>
          <th colspan="60" class="text-center">01.01.2023 16:00</th>
          <th colspan="60" class="text-center">01.01.2023 17:00</th>
          <th colspan="60" class="text-center">01.01.2023 18:00</th>
          <th colspan="60" class="text-center">01.01.2023 19:00</th>
          <th colspan="60" class="text-center">01.01.2023 20:00</th>
          <th colspan="60" class="text-center">01.01.2023 21:00</th>
          <th colspan="60" class="text-center">01.01.2023 22:00</th>
          <th colspan="60" class="text-center">01.01.2023 23:00</th>

        </tr>
        <tr>
          <th colspan="1" class="sticky-col first-col">...</th>
          <th colspan="15">00:00</th>
          <th colspan="15">00:15</th>
          <th colspan="15">00:30</th>
          <th colspan="15">00:45</th>
          <th colspan="15">01:00</th>
          <th colspan="15">01:15</th>
          <th colspan="15">01:30</th>
          <th colspan="15">01:45</th>

          <th colspan="15">02:00</th>
          <th colspan="15">02:15</th>
          <th colspan="15">02:30</th>
          <th colspan="15">02:45</th>

          <th colspan="15">03:00</th>
          <th colspan="15">03:15</th>
          <th colspan="15">03:30</th>
          <th colspan="15">03:45</th>

          <th colspan="15">04:00</th>
          <th colspan="15">04:15</th>
          <th colspan="15">04:30</th>
          <th colspan="15">04:45</th>

          <th colspan="15">05:00</th>
          <th colspan="15">05:15</th>
          <th colspan="15">05:30</th>
          <th colspan="15">05:45</th>

          <th colspan="15">06:00</th>
          <th colspan="15">06:15</th>
          <th colspan="15">06:30</th>
          <th colspan="15">06:45</th>

          <th colspan="15">07:00</th>
          <th colspan="15">07:15</th>
          <th colspan="15">07:30</th>
          <th colspan="15">07:45</th>

          <th colspan="15">08:00</th>
          <th colspan="15">08:15</th>
          <th colspan="15">08:30</th>
          <th colspan="15">08:45</th>

          <th colspan="15">09:00</th>
          <th colspan="15">09:15</th>
          <th colspan="15">09:30</th>
          <th colspan="15">09:45</th>
          <th colspan="15">10:00</th>
          <th colspan="15">10:15</th>
          <th colspan="15">10:30</th>
          <th colspan="15">10:45</th>
          <th colspan="15">11:00</th>
          <th colspan="15">11:15</th>
          <th colspan="15">11:30</th>
          <th colspan="15">11:45</th>
          <th colspan="15">12:00</th>
          <th colspan="15">12:15</th>
          <th colspan="15">12:30</th>
          <th colspan="15">12:45</th>
          <th colspan="15">13:00</th>
          <th colspan="15">13:15</th>
          <th colspan="15">13:30</th>
          <th colspan="15">13:45</th>
          <th colspan="15">14:00</th>
          <th colspan="15">14:15</th>
          <th colspan="15">14:30</th>
          <th colspan="15">14:45</th>

          <th colspan="15">15:00</th>
          <th colspan="15">15:15</th>
          <th colspan="15">15:30</th>
          <th colspan="15">15:45</th>

          <th colspan="15">16:00</th>
          <th colspan="15">16:15</th>
          <th colspan="15">16:30</th>
          <th colspan="15">16:45</th>

          <th colspan="15">17:00</th>
          <th colspan="15">17:15</th>
          <th colspan="15">17:30</th>
          <th colspan="15">17:45</th>

          <th colspan="15">18:00</th>
          <th colspan="15">18:15</th>
          <th colspan="15">18:30</th>
          <th colspan="15">18:45</th>

          <th colspan="15">19:00</th>
          <th colspan="15">19:15</th>
          <th colspan="15">19:30</th>
          <th colspan="15">19:45</th>

          <th colspan="15">20:00</th>
          <th colspan="15">20:15</th>
          <th colspan="15">20:30</th>
          <th colspan="15">20:45</th>

          <th colspan="15">21:00</th>
          <th colspan="15">21:15</th>
          <th colspan="15">21:30</th>
          <th colspan="15">21:45</th>

          <th colspan="15">22:00</th>
          <th colspan="15">22:15</th>
          <th colspan="15">22:30</th>
          <th colspan="15">22:45</th>

          <th colspan="15">23:00</th>
          <th colspan="15">23:15</th>
          <th colspan="15">23:30</th>
          <th colspan="15">23:45</th>


        </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    let Script = document.createElement("script");
    Script.setAttribute("src", "assets/js/main.js");
    document.head.appendChild(Script);
  }
};
</script>

