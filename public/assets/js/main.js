let todayHour;let todayMinute;
$("#document").ready(function () {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var minute = d.getMinutes();
    var hour = d.getHours();
    var c = new Date(year, month-1, day, hour, minute);



    $("#fromSt").val(new Date().toDateInputValue());
    var today = new Date();
    console.log(today.getHours()+":"+today.getMinutes())
    todayHour=today.getHours();
    todayMinute=today.getMinutes();
})
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
    }
    else if (p == '-') {
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
    swal({
        title: "Please wait!",
        //text: "Page is loading",
        imageUrl: 'public/assets/loading.gif',
        showConfirmButton: false
    });
    let eq_start,eq_end;
    // console.log(array.data)
    let flightsDiv = '';
    let    letiv='';
    let td ='';
    let date=$("#fromSt").val();
    $.ajax({
        url: 'https://apiazal.asg.az/api/flight/getflightlist',
        type: 'GET',
        dataType: 'json',
        data: {

            st_from:date,
            end_to: date
        },
        success: function (result) {
            //console.log(result);
            let  status;
            let color="#9ccd7e"
            $("#flight tbody tr").remove();
            $.each(result, function (i, item) {
                let td ='';
                for (let a = 1; a <1440 ; a++) {

                    td+=`<td  id="${'a'+item.row + '_' + a}" style="background:transparent" ></td>`;


                }

                $(`<tr class="animate__animated animate__fadeInLeft">`).html(`<td class="sticky-col first-col">${item.row}</td><${td}`).appendTo(`#flight tbody`)
                $(`<tr style='height:5px!important;box-shadow:inset -5px 3px 6px 1px #efefef'>`).html(`<td  colspan='1440'></td>`).appendTo(`#flight tbody`)

                $.each(item.data, function (i, item2) {
                   if(item2.status === 1){
                       status="public/assets/takeoff.png"
                       color="#9ccd7e"
                   }else{
                       status="public/assets/landing.png";
                       color="#c0d0ff";
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


                    let diffCols = eq_end - eq_start;
                    for (t = eq_start; t <= eq_end; t++) {

                        // $(`#${item.park +'_' + t}`).css({"background":"#9eef72","border": "2px dotted green"})


                        $(`#${'a'+item.row + '_' + t}`).remove();
                    }


                    // $(`#${'a'+item.row + '_' + todayLine}`).css("background", "red");
                    $(`#${'a'+item.row + '_' + t}`).addClass("tool").attr("colspan", diffCols).css({"background": `${color}` }).html(`<span class="custom info">
     <img src="public/assets/icon.png" alt="Information" height="48" width="48" data-pin-nopin="true">
   <p> Type: ${item2.aC_type}</p>

  <p>  Route: ${item2.route}</p>
  <p>  Id: ${item2.id}</p> 
  <p> Block Off : ${item2.scT_OFB.substring(0,5)}</p>
   <p> Block on: ${item2.scT_ONB.substring(0,5)}</p>
  </span><div style="margin-left: 0"><img style="width: 17px;margin-right: 5px;" src="public/assets/warning.png"></div><div><img style="width: 17px" src="${status}"> ${item2.flt} ${item2.route} </div>`);

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