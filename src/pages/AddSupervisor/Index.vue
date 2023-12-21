<template>

  <div class="container-fluid">

    <div class="panel panel-default">
      <!--            <div class="panel-heading">Panel Heading</div>-->
      <div class="panel-body">
        <div class="row">

          <div class="col-md-3" style="display: inherit;column-gap: 7px;">

            <div class="form-group">
              <input type="date" class="form-control" id="fromSt" onchange="getFlight();">
            </div>
            <button class="btn btn-primary" onclick="prevBtn('-')">Prev</button>
            <button class="btn btn-primary" onclick="prevBtn('+')">Next</button>
          </div>
          <div class="col-md-2">

            <div class="terminal">
              <label>
                <input type="checkbox" value="0" name="options[]" id="dep" checked="true" onchange="getFlight();"><span
                  class="label-text">Arrival</span>
              </label>
              <label>
                <input type="checkbox" value="1" name="options[]" id="arr" checked="true" onchange="getFlight();"><span
                  class="label-text">DEP</span>
              </label>
              <label>
                <input type="checkbox" value="2" name="options[]" id="tra" checked="true" onchange="getFlight();"><span
                  class="label-text">Tranzit</span>
              </label>

            </div>
          </div>

          <div class="col-md-2">
            <div class="terminal">
              <fieldset style="display: inline-block">

                <input type="radio" name="action" id="t1" value="0" onchange="getFlight(); "/> <label for="track">
                UTC</label>
                <input type="radio" name="action" id="t2" value="1" checked onchange="getFlight();"/> <label
                  for="event"> Local</label>

              </fieldset>

            </div>
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

          <th colspan="15" onclick="thClick(this)" class="thclass">18:00</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">18:15</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">18:30</th>
          <th colspan="15" onclick="thClick(this)" class="thclass">18:45</th>

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

  <div class="modal" id="myModal" role="dialog">
    <div class="modal-dialog">

      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Add supervisor</h4>
          <button type="button" class="close" onclick="hide()">&times;</button>

        </div>
        <div class="modal-body">
          <div class="container-fluid">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="shift" class="form-label">Shift</label>
                    <select class="form-select" id="shift" onchange="getSupervisorlist();">

                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="supervisor" class="form-label ">Supervisor</label>
                    <select class="form-select" id="supervisor" >

                    </select>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" onclick="saveSupervisorToFlight()">Save</button>
          <button type="button" class="btn btn-primary" onclick="hide()">Close</button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>


export default {
  mounted() {
    let Script = document.createElement("script");
    Script.setAttribute("src", "/assets/js/addSupervisorToFlight.js");
    document.head.appendChild(Script);


  }
};
</script>

<style>
.close {
  float: right;
  border: none;
  font-size: 21px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  filter: alpha(opacity=20);
  opacity: .2;
}

.modal-title {
  font-size: 21px;
}

.modal.in {
  background-color: rgba(0, 0, 0, 58%); /* Adjust the opacity as needed */
}

.modal-content {
  -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
  box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
}
</style>