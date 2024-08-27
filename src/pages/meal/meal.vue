<template>
  <div class="container-fluid">
    <div class="panel-body">
      <div class="row">
        <div class="col-md-2" style="display: inherit; column-gap: 7px;">
          <div class="form-group">
            <input type="date" class="form-control" id="fromSt" v-model="selectedDate" @change="updateStartDate">
          </div>
          <button class="btn btn-primary" @click="changeDate('-')">Prev</button>
          <button class="btn btn-primary" @click="changeDate('+')">Next</button>
        </div>
        <div class="col-md-2">
          <div class="terminal" id="terminal">
            <label>
              <input type="checkbox" value="0" name="optionTerminal[]" id="noneterminal" checked
                     @change="getFlight"><span class="label-text">None</span>
            </label>
            <label>
              <input type="checkbox" value="1" name="optionTerminal[]" id="t1" checked @change="getFlight"><span
                class="label-text">T1</span>
            </label>
            <label>
              <input type="checkbox" value="2" name="optionTerminal[]" id="t2" checked @change="getFlight"><span
                class="label-text">T2</span>
            </label>
          </div>
        </div>


        <div class="col-md-2">
          <div class="terminal" id="isInternational">
            <label>
              <input type="checkbox" value="1" name="optionFlightType[]" id="domestic" checked @change="getFlight"><span
                class="label-text">Domestic</span>
            </label>
            <label>
              <input type="checkbox" value="0" name="optionFlightType[]" id="international" checked @change="getFlight"><span
                class="label-text">International</span>
            </label>
          </div>
        </div>


        <div class="col-md-1">
          <div class="terminal" id="isLocal">
            <fieldset style="display: inline-block">
              <input  class="small-radio" type="radio" name="action" id="t1" value="0" @change="getFlight"> <label
                for="track">UTC</label>
              <input  class="small-radio" type="radio" name="action" id="t2" value="1" checked @change="getFlight"> <label
                for="event">Local</label>
            </fieldset>
          </div>
        </div>




        <div class="col-md-2">
          <div class="terminal" id="status">
            <label>
              <input type="checkbox" value="0" name="options[]" id="dep" checked @change="getFlight"><span
                class="label-text">Arrival</span>
            </label>
            <label>
              <input type="checkbox" value="1" name="options[]" id="arr" checked @change="getFlight"><span
                class="label-text">DEP</span>
            </label>
            <label>
              <input type="checkbox" value="2" name="options[]" id="tra" checked @change="getFlight"><span
                class="label-text">Transit</span>
            </label>
          </div>
        </div>
        <div class="col-md-2">
          <div class="terminal" id="isNarrow">
            <label>
              <input type="checkbox" value="0" name="optionFlightType[]" id="narrow" checked @change="getFlight"><span
                class="label-text">Narrow</span>
            </label>
            <label>
              <input type="checkbox" value="1" name="optionFlightType[]" id="whide" checked @change="getFlight"><span
                class="label-text">Wide</span>
            </label>
          </div>
        </div>
        <div class="col-md-1">
          <div class="terminal" id="zoom">
            <label for="zoom">Zoom: </label>
            <input id="zoom-range" type="range" min="15" max="50" step="1" v-model="range"
                   @change="zoomChange">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import axios from 'axios'
import * as Module from 'https://bryntum.com/products/scheduler/build/scheduler.module.js'
import { Scheduler } from '@bryntum/scheduler'
import { onMounted, ref, onUnmounted } from 'vue'
import { useDisabled } from 'element-plus'
import star from '@element-plus/icons/lib/Star'

Object.assign(window, Module)
export default {
  setup () {
    const today = new Date()
    const selectedDate = ref('')
    const range = ref(32)
    const scheduler = new Scheduler({
      appendTo: 'app',
      startDate: today,
      selectedDate,
      endDate: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      rowHeight: range.value,
      columns: [{ text: '', field: 'name', width: 50 }],
      timeAxis: {
        unit: 'minute',
        increment: 5,
        resolutionUnit: 'minute',
        resolutionIncrement: 5,
      },
      viewPreset: {
        base: 'hourAndDay',
        timeResolution: {
          unit: 'minute',
          increment: 5,
        },
        headers: [
          {
            unit: 'hour',
            dateFormat: 'HH:mm'
          }
        ]
      },
      resources: [],
      events: [],
      features: {
        scheduleMenu: false,
        cellMenu: false,
        eventMenu: false,
        eventResize: false,
        eventDragCreate: false,
        eventEdit: false,
        eventTooltip: ({ eventRecord }) => new Promise(resolve => {
          setTimeout(() => {
            const endDate = new Date(eventRecord.endDate.getTime() + 4 * 60 * 60 * 1000)
            const startDate = new Date(eventRecord.startDate.getTime() + 4 * 60 * 60 * 1000)

            resolve
            (`
<div style="font-family: Arial, sans-serif; font-size: 14px;">
    <span style="font-weight: bold; color: green;">${eventRecord.name}</span>
    <span style="font-weight: bold; color: black;"> R :</span>
    <span style="font-weight: bold; color: green;">${eventRecord.outb_route}</span>
    <br/>
    <table style="border-collapse: collapse; width: 100%; margin-top: 10px;">
        <tr>
            <td style="font-weight: bold; color: black;">AC:</td>
            <td style="font-weight: bold; color: blue;">
                ${eventRecord.aC_type} / ${eventRecord.aC_reg},
                <span style="color: black">B</span>: ${eventRecord.body},
                <span style="color: black">C</span>: ${eventRecord.cap}
            </td>
        </tr>
        <tr>
            <td style="font-weight: bold; color: black;">OFB:</td>
            <td style="font-weight: bold; color: blue;">
                ${endDate.toISOString().split('T')[1].substring(0, 5)}
            </td>
        </tr>
        <tr>
            <td style="font-weight: bold; color: black;">Term:</td>
            <td style="font-weight: bold; color: blue;">
                ${eventRecord.outb_term}
            </td>
        </tr>
        <tr>
            <td colspan="2" style="padding-top: 10px;">
                <table style="border-collapse: collapse; width: 100%; border: 1px solid black;">
                    <tr>
                        <td style="font-weight: bold; color: black; text-align: center; border: 1px solid black;">J</td>
                        <td style="font-weight: bold; color: black; text-align: center; border: 1px solid black;">C</td>
                        <td style="font-weight: bold; color: black; text-align: center; border: 1px solid black;">W</td>
                        <td style="font-weight: bold; color: black; text-align: center; border: 1px solid black;">Y</td>
                        <td style="font-weight: bold; color: black; text-align: center; border: 1px solid black;">Total</td>
                    </tr>
                    <tr>
                        <td style="text-align: center; font-weight: bold; color: blue; border: 1px solid black;">${eventRecord.j}</td>
                        <td style="text-align: center; font-weight: bold; color: blue; border: 1px solid black;">${eventRecord.c}</td>
                        <td style="text-align: center; font-weight: bold; color: blue; border: 1px solid black;">${eventRecord.w}</td>
                        <td style="text-align: center; font-weight: bold; color: blue; border: 1px solid black;">${eventRecord.y}</td>
                        <td style="text-align: center; font-weight: bold; color: blue; border: 1px solid black;">${eventRecord.totalmeal}</td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</div>
    `)
          }, 200)
        }),
        eventDrag: {
          constrainDragToResource: true,
          constrainDragToTimeSlot: true
        }
      },
      barMargin: 5,
    })

    const getFlight = async () => {
      const isNarrow = document.getElementById('narrow').checked
      const isWhide = document.getElementById('whide').checked
      const isTra = document.getElementById('tra').checked
      const data = {
        st_from: new Date(scheduler.startDate.getTime() + 4 * 60 * 60 * 1000).toISOString().split('T')[0],
        end_to: new Date(scheduler.endDate.getTime() + 4 * 60 * 60 * 1000).toISOString().split('T')[0],
        terminal: Array.from(document.querySelectorAll('#terminal input:checked')).map(el => parseInt(el.value)),
        isLocal: document.querySelector('#isLocal input[name="action"]:checked').value === '1',
        isInternational: Array.from(document.querySelectorAll('#isInternational input:checked')).map(el => parseInt(el.value)),
        service_id: 0,
        partofday: 0,
        status: Array.from(document.querySelectorAll('#status input:checked')).map(el => parseInt(el.value)),
      }
      try {
        const response = await axios.post('https://apifm.asg.az/api/flight/getmeallist', data)
        console.log(response)
        const flightData = response.data
        const resources = flightData.map(flight => ({
          id: flight.park.toString(),
          name: flight.park.toString(),
        }))
        const events = []
        flightData.forEach(flight => {
          flight.data.forEach(x => {
            const startDate = new Date(x.schedule_start)
            const endDate = new Date(x.schedule_end)
            let style = ''
            if (x.out_flt.startsWith('J2')) {
              style = 'background-color: #007BB3; color: white;border: 1px solid black;  border-radius: 8px; text-align: center;'
            } else {
              style = 'background-color: green; color: white;border: 1px solid black;  border-radius: 8px; text-align: center;'
            }
            const icon = x.totalmeal != 0 ? '🍕 ' : ''
            const newEvent = {
              resourceId: flight.park.toString(),
              startDate,
              endDate,
              name: icon + ' ' + x.out_flt,
              totalmeal: x.totalmeal,
              w: x.w,
              c: x.c,
              y: x.y,
              j: x.j,
              cap: x.cap,
              aC_type: x.ac_type,
              aC_reg: x.ac_reg,
              body: x.body,
              outb_term: x.outb_term,
              outb_route: x.outb_route,
              style
            }
            if (isNarrow && x.body === 'N') {
              events.push(newEvent)
              console.log(3)
            }
            if (isWhide && x.body === 'W') {
              events.push(newEvent)
              console.log(4)
            }
          })
        })

        scheduler.resources = resources
        scheduler.events = events
      } catch (error) {
        console.error('API Error:', error)
      }
    }

    const zoomChange = () => {
      scheduler.rowHeight = parseInt(range.value)
      document.querySelectorAll('.b-sch-event .b-sch-event-content').forEach(element => {
        element.style.fontSize = `${range.value / 3}px`
      })
    }

    const updateStartDate = (event) => {
      const selectedDateValue = new Date(event.target.value)
      selectedDateValue.setHours(0, 0, 0, 0)
      scheduler.startDate = selectedDateValue
      scheduler.endDate = new Date(selectedDateValue.getTime() + 24 * 60 * 60 * 1000)
      getFlight()
    }

    const changeDate = (direction) => {
      const date = new Date(selectedDate.value)
      console.log(date + 'hal hazirdaki vaxt')
      if (direction === '-') {
        date.setDate(date.getDate() - 1)
        console.log(date)
      } else if (direction === '+') {
        date.setDate(date.getDate() + 1)
        console.log(date)
      }
      selectedDate.value = date.toISOString().split('T')[0]
      date.setHours(0, 0, 0, 0)
      scheduler.startDate = date
      scheduler.endDate = new Date(date.getTime() + 24 * 60 * 60 * 1000)
      getFlight()
    }

    onMounted(() => {
      selectedDate.value = new Date(today.getTime() + 4 * 60 * 60 * 1000).toISOString().split('T')[0]
      updateStartDate({ target: { value: new Date(today.getTime() + 4 * 60 * 60 * 1000).toISOString().split('T')[0] } })
    })

    return {
      scheduler,
      getFlight,
      updateStartDate,
      changeDate,
      selectedDate,
      zoomChange,
      range
    }
  }
}
</script>
<style lang="scss">
@import '@/pages/meal/meal';



.terminal {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  font-size: 12px;
}

.small-radio {
  transform: scale(0.8);
  width: 8px;
  height: 8px;
}

#zoom-range {
  margin-top: 10px;
}

.b-sch-event .b-sch-event-content {
  font-size: 11px;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: inline-block;
  letter-spacing: -0.5px;
  font-weight: bold
}

#isNarrow {
  display: flex;
  justify-content: flex-start;
}

#timeFilter {
  width: 100%;
  border: 2px solid #007BB3;
  border-radius: 8px
}

@media (min-width: 1612px) {
  .terminal {
    display: flex;
    justify-content: flex-end;
    align-content: center;
  }
  #zoom-range {
    margin-top: 10px;
    width: 200px;
  }
}

@media (min-width: 1538px) and (max-width: 1612px) {
  .terminal {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    font-size: 11px;
  }
  #zoom-range {
    margin-top: 10px;
    width: 100px;
  }
}

@media (min-width: 1323px) and (max-width: 1538px) {
  .terminal {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    font-size: 8px;
  }
  #zoom-range {
    margin-top: 10px;
    width: 75px;
  }
  .btn {
    --bs-btn-font-size: 10px;
  }
  .form-control {
    font-size: 9px;
  }
  .form-select {
    font-size: 9px;
  }
}

@media (min-width: 1252px) and (max-width: 1323px) {
  .terminal {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    font-size: 7px;
  }
  #zoom-range {
    margin-top: 10px;
    width: 60px;
  }
  .btn {
    --bs-btn-font-size: 7px;
  }
  .form-control {
    font-size: 6px;
  }
  .form-select {
    font-size: 6px;
  }
}

@media (min-width: 992px) and (max-width: 1252px) {
  .terminal {
    display: flex;
    justify-content: flex-end;
    align-content: center;
    font-size: 5px;
  }
  #zoom-range {
    margin-top: 10px;
    width: 45px;
  }
  .btn {
    --bs-btn-font-size: 6px;
  }
  .form-control {
    font-size: 5px;
  }
  .form-select {
    font-size: 5px;
  }
}

@media (min-width: 500px) and (max-width: 991px) {
  .container-fluid {
    display: none;
  }
}


</style>