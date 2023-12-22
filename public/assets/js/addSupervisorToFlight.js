let todayHour;
let todayMinute;
$("#document").ready(function () {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var minute = d.getMinutes();
    var hour = d.getHours();
    var c = new Date(year + 1, month - 1, day, hour, minute);
    $("#fromSt").val(c.toDateInputValue());
    var today = new Date();
    // console.log(today.getHours()+":"+today.getMinutes())
    todayHour = today.getHours();
    todayMinute = today.getMinutes();
    getshiftlist();
    getSupervisorlist();
    getShiftPlanList();


})
let a_shift;
let b_shift;
let c_shift;
function prevBtn(p) {
    let date1 = document.getElementById('fromSt').value;
    let date = new Date(date1);
    var date2;
    var year = date.getFullYear().toString();

    Date.prototype.minusDays = function (days) {
        var date = new Date(date1);
        date.setDate(date.getDate() - days);
        return date;
    }
    var date3;
    if (p == '+') {
        date2 = date.minusDays(-1).getDate();
        date3 = date.minusDays(-1);
    } else if (p == '-') {
        date2 = date.minusDays(1).getDate();
        date3 = date.minusDays(1);
    }
    var datetime = ((date3.getDate().toString().length) != 1) ? date3.getDate() : '0' + date3.getDate();
    var twoDigitMonth = (parseInt(date3.getMonth() + 1).toString().length != 1) ? (date3.getMonth() + 1) : '0' + (date3.getMonth() + 1);
    $('#fromSt').val(date3.getFullYear().toString() + "-" + twoDigitMonth + "-" + datetime);
    var inputDate = $("#fromSt").val();
    getFlight();

}

Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);

});

function getFlight() {
    getShiftPlanList();
    swal({
        title: "Please wait!",
        text: "Page is loading",
        imageUrl: '/assets/loading.gif',
        showConfirmButton: false
    });
    var checked = []
    let status1, status2, status3, islocal;

    if ($('#t2').is(':checked')) {
        islocal = true
    } else if ($('#t1').is(':checked')) {
        islocal = false

    }
    // console.log(islocal);

    $("input[name='options[]']:checked").each(function () {
        checked.push(parseInt($(this).val()));
    });
    // console.log(checked);
    let eq_start, eq_end;
    // console.log(array.data)
    let flightsDiv = '';
    let letiv = '';
    let td = '';
    let date = $("#fromSt").val();
    $.ajax({
        url: 'https://apifm.asg.az/api/flight/getflightlist',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",

        data: JSON.stringify(
            {
                "st_from": date,
                "end_to": date,
                "status": checked,
                "isLocal": islocal,
                service_id: 2
            }
        ),
        success: function (result) {
            //console.log(result);
            let status, status2, route;
            let color = "#00c853"
            $("#flight tbody tr").remove();
            $.each(result, function (i, item) {
                let td = '';
                let img = "";
                for (let a = 1; a < 1440; a++) {

                    td += `<td  id="${'a' + item.row + '_' + a}" style="background:transparent" ></td>`;


                }

                $(`<tr class="animate__animated animate__fadeInLeft">`).html(`<td class="sticky-col first-col">${item.row}</td><${td}`).appendTo(`#flight tbody`)
                $(`<tr style='height:5px!important;box-shadow:inset -5px 3px 6px 1px #efefef'>`).html(`<td  colspan='1440'></td>`).appendTo(`#flight tbody`)

                $.each(item.data, function (i, item2) {
                    if (item2.hasService === true) {
                        img = "<img  style='width: 18px;' src='/assets/image/icons-08-01.png'/>";
                    } else {
                        img = "";
                    }
                    if (item2.status === 1) {
                        status = "/assets/takeoff.png"
                        color = "#00c853"
                        status2 = "";
                        route = item2.route
                    } else {
                        status = "/assets/landing.png";
                        color = "rgb(89 100 124 / 93%)";
                        status2 = "";
                        route = item2.route
                    }
                    if (item2.status === 2) {
                        status = "/assets/landing.png"
                        status2 = `<img width="17px"  src="/assets/takeoff.png">`
                        color = "#039be5"
                        route = "";
                    }
                    //console.log(item2.scT_OFB);
                    //if(item2.scT_OFB ==!"" && item2.scT_ONB==!"") {
                    let start = item2.scT_OFB;
                    //console.log(start);

                    start = start.toString();
                    let start1 = start.substring(0, 2);

                    let start2 = start.substring(3, 5);
                    eq_start = parseInt(start1) * 60 + parseInt(start2) + 1

                    let end = item2.scT_ONB;
                    end = end.toString();
                    let end1 = end.substring(0, 2);
                    let end2 = end.substring(3, 5);
                    eq_end = parseInt(end1) * 60 + parseInt(end2);
                    // todayLine = todayHour * 60 + todayMinute
                    //console.log(todayLine)
                    // console.log("start1 "+start1,"start2 "+start2)
                    //console.log("end1 "+end1,"end2 "+end2)


                    let diffCols = eq_end - eq_start + 1;
                    for (t = eq_start; t < eq_end; t++) {

                        // $(`#${item.park +'_' + t}`).css({"background":"#9eef72","border": "2px dotted green"})


                        $(`#${'a' + item.row + '_' + t}`).remove();
                    }


                    // $(`#${'a'+item.row + '_' + todayLine}`).css("background", "red");
                    $(`#${'a' + item.row + '_' + (t-diffCols)}`).addClass("tool").attr({
                        "colspan": diffCols,
                        "colspanId": item2.id,

                        "onclick": "modalOpenSupervisor(this);",
                    }).css({"background": `${color}`}).html(`<span class="custom info">
     <img src="/assets/icon.png" alt="Information" height="48" width="48" data-pin-nopin="true">
   <p> Type: ${item2.aC_type}</p>

  <p>  Route: ${item2.route}</p>
  <p>  Id: ${item2.id}</p>
  <p> ON Board: ${item2.scT_OFB.substring(0, 5)}</p>
   <p> Off Board : ${item2.scT_ONB.substring(0, 5)}</p>
  </span><div style="margin-left: 0"></div><div>${img} ${item2.flt} ${route} </div>`);

                    // }
                    // $(`#${item.park+(eq_start+30)}`).html(`<div> <img style="width: 17px" src="images/landing.png">${item2.FlightLand} </div>`)
                });

            })
            swal.close()

        },
        failure: function (jqXHR, textStatus, errorThrown) {
            alert("error"); // Display error message
        }
    });
}
let select_shift;
a = 0;
let time1, time2;

let trtdId;
let colspan;
function modalOpenSupervisor(e) {
    $("#myModal").addClass("in");
    $("#myModal").fadeIn();
    colspan=$(e).attr("id")
    console.log("colspan "+ colspan)
    colspan=colspan.substring(colspan.indexOf('_')+1);
    console.log("colspan "+ colspan)
        if(colspan<481){
            select_shift=a_shift;
         }
    if(colspan>481 && colspan<1200){
        select_shift=b_shift;
    }
    if(colspan>1200 && colspan<1440 ){
        select_shift=c_shift;
    }
    console.log("select_shift "+select_shift);
    trtdId = $(e).attr("colspanId");
        if(select_shift === 1){
    $("#shift option[value='Növbə 1']").attr("selected","selected");
    console.log("Ff")
        }
    if(select_shift === 2){
        $("#shift option[value='Növbə 2']").attr("selected","selected");
    }
    if(select_shift === 3){
        $("#shift option[value='Növbə 3']").attr("selected","selected");
    }if(select_shift === 4){
        $("#shift option[value='Növbə 4']").attr("selected","selected");
    }
    getSupervisorlist();
}
function hide() {
    $("#myModal").fadeOut();
}
function getshiftlist() {

    $.ajax({
        url: 'https://apifm.asg.az/api/Employee/getshiftlist ',
        type: 'GET',
        dataType: 'json',
        success: function (result) {
            $("#shift option").remove();
            $("<option style='text-align:center;' id='0'>All shift</option>").appendTo("#shift");
            $.each(result, function (i, item) {
                $("<option style='text-align:center;' id='" + result[i].id + "' value='"+ result[i].description +"'>" + result[i].description + "</option>").appendTo("#shift");
            });
        },
        failure: function (jqXHR, textStatus, errorThrown) {
            alert("error"); // Display error message
        }
    });
}
function getSupervisorlist() {
    let shift_id = $("#shift option:selected").attr("id");
    $.ajax({
        url: 'https://apifm.asg.az/api/Employee/getemployeelist',
        type: 'GET',
        dataType: 'json',
        data: {
            shift_id: shift_id
        },
        success: function (result) {
            $("#supervisor tr").remove();
            $.each(result, function (i, item) {
                $("<tr style='text-align:center;' idSup='" + result[i].id + "' onclick='trSupervisor(this)'>").html("<td style='text-align: left;border: 1px solid #dddddd;padding:0 5px' >" + result[i].fullName + "</td>").appendTo("#supervisor tbody");

            });
        },
        failure: function (jqXHR, textStatus, errorThrown) {
            alert("error"); // Display error message
        }
    });
}
let employeeId;
function  trSupervisor(e){
    $("#supervisor tbody tr").css("background","white")
    $(e).css("background","#9ecd9e")
     employeeId = $(e).attr("idSup");
}
function saveSupervisorToFlight() {

    $.ajax({
        url: 'https://apifm.asg.az/api/employeeservice/add',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(
            {
                flightId: trtdId,
                serviceId: 2,
                employeeId: employeeId
            }
        ),
        success: function (result) {
            $("#" + trtdId).prepend("<img style='width: 18px;' src='/assets/image/icons-08-01.png'/>")
            swal({
                title: "Good job!",
                text: "Supervisor has been linked to flight",
                icon: "success",
                showConfirmButton: false,
                timer: 2000,
            });
            hide();

        },
        failure: function (jqXHR, textStatus, errorThrown) {
            alert("error"); // Display error message
        }
    });
}
function getShiftPlanList() {

    let date = $("#fromSt").val();
    $.ajax({
        url: 'https://apifm.asg.az/api/Employee/getshiftplanlist',
        type: 'GET',
        contentType: "application/json",
            dataType: 'json',
        data: {
            "st_from": date,
            "end_to": date

        },
        success: function (result) {
            $(result).each(function () {
            let a_reng='yasil';
          let  b_reng="blue";
           let c_reng="purple";
           a_shift=result[0].shift;
           b_shift=result[1].shift;
           c_shift=result[2].shift;
            if(result[0].shift==1) a_reng='red';
            else if(result[0].shift==2)a_reng='blue';
            else if(result[0].shift==3)a_reng='purple';
            else a_reng='green';

                if(result[1].shift==1) b_reng='red';
                else if(result[1].shift==2)b_reng='blue';
                else if(result[1].shift==3)b_reng='purple';
                else b_reng='green';


                if(result[2].shift==1) c_reng='red';
                else if(result[2].shift==2)c_reng='blue';
                else if(result[2].shift==3)c_reng='purple';
                else c_reng='green';

                $(".thclass.shift_a").css("background",a_reng);
                $(".thclass.shift_b").css("background",b_reng);
                $(".thclass.shift_c").css("background",c_reng);

        });
        },
        failure: function (jqXHR, textStatus, errorThrown) {
            alert("error"); // Display error message
        }
    });
}