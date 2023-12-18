let todayHour;let todayMinute;
$("#document").ready(function () {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var minute = d.getMinutes();
    var hour = d.getHours();
    var c = new Date(year, month, day, hour, minute);


    $("#fromSt").val(c.toDateInputValue());
    var today = new Date();
    // console.log(today.getHours()+":"+today.getMinutes())
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
    var checked = []
    let status1,status2,status3,islocal;

    console.log(islocal);
    if ($('#t2').is(':checked')) {
        islocal = true
    }
    else if ($('#t1').is(':checked')) {
        islocal = false

    }
    // console.log(islocal);

    $("input[name='options[]']:checked").each(function ()
    {
        checked.push(parseInt($(this).val()));
    });
    // console.log(checked);
    let eq_start,eq_end;
    // console.log(array.data)
    let flightsDiv = '';
    let    letiv='';
    let td ='';
    let date=$("#fromSt").val();
    $.ajax({
        url: 'https://apifm.asg.az/api/flight/getcleanerlist',
        type: 'POST',
        dataType: 'json',
        contentType: "application/json",

        data: JSON.stringify(
            {
                "st_from": date,
                "end_to": date,
                "status": checked,
                "isLocal": islocal
            }
        ),
        success: function (result) {
            //console.log(result);
            let  status,status2,route;
            let color="#78e933c9"
            $("#flight tbody tr").remove();
            let count = 0;
            $.each(result, function (i, item) {
                let td ='';
                count++;
                for (let a = 1; a <1440 ; a++) {

                    td+=`<td  id="${'a'+count + '_' + a}" style="background:transparent" ></td>`;


                }

                $(`<tr class="animate__animated animate__fadeInLeft">`).html(`<td class="sticky-col first-col" style="text-align: left">${i+1}. ${item.fullName}</td><${td}`).appendTo(`#flight tbody`)
                $(`<tr style='height:5px!important;box-shadow:inset -5px 3px 6px 1px #efefef'>`).html(`<td  colspan='1440'></td>`).appendTo(`#flight tbody`)

                $.each(item.data, function (i, item2) {
                    if(item2.status === 1){
                        status="/assets/takeoff.png"
                        color="#78e933c9"
                        status2="";
                        route = item2.route
                    }else{
                        status="/assets/landing.png";
                        color="#c0d0ff";
                        status2="";
                        route = item2.route
                    } if(item2.status === 2){
                        status="/assets/landing.png"
                        status2 = `<img width="17px"  src="/assets/takeoff.png">`
                        color="#a5f2ff"
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


                    let diffCols = eq_end - eq_start+1;
                    for (t = eq_start; t < eq_end; t++) {

                        // $(`#${item.park +'_' + t}`).css({"background":"#9eef72","border": "2px dotted green"})


                        $(`#${'a'+count + '_' + t}`).remove();
                    }


                    // $(`#${'a'+item.row + '_' + todayLine}`).css("background", "red");
                    $(`#${'a'+count + '_' + t}`).addClass("tool").attr("colspan", diffCols).css({"background": `${color}` }).html(`<span class="custom info">
     <img src="/assets/icon.png" alt="Information" height="48" width="48" data-pin-nopin="true">
   <p> Type: ${item2.aC_type}</p>

  <p>  Route: ${item2.route}</p>
  <p> Block on: ${item2.scT_OFB.substring(0,5)}</p>
   <p> Block Off : ${item2.scT_ONB.substring(0,5)}</p>
  </span><div style="margin-left: 0"></div><div> ${item2.flt} ${route} </div>`);

                    // }
                    // $(`#${item.park+(eq_start+30)}`).html(`<div> <img style="width: 17px" src="images/landing.png">${item2.FlightLand} </div>`)
                });

            })

        },
        failure: function (jqXHR, textStatus, errorThrown) {
            alert("error"); // Display error message
        }
    });
}
a=0;  let time1 ,time2;
function thClick(e){

    $(e).css("background-color","rgb(255, 0, 0)");

    $(".allThClass th").each(function (){
        if($(this).css("background-color")==="rgb(255, 0, 0)"){
            a=a+1;
            if(a===1){
                time1=$(e).text();
                console.log("test");
            }
            if(a===2){
                time2=$(e).text();
                console.log("test2");
                return false;
            }
        }
        if(a>2){
            $(".allThClass th").css("background-color","rgb(0 58 112)");
            a=0;
            time1="";
            time2="";

        }



    })

    console.log(a,time1,time2);
}

function downloadExcelFile() {
    var checked = []
    if (time1 != '' && time2 != '') {


        // Your data to send to the API
        const yourData = { /* Your data object */};
        let status1, status2, status3, islocal;
        // swal({
        //     title: "Please wait!",
        //     //text: "Page is loading",
        //     imageUrl: '/assets/loading.gif',
        //     showConfirmButton: false
        // });

        console.log(islocal);
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

        // API endpoint URL
        const apiUrl = 'https://apiazal.asg.az/api/flight/exportexcellist';

        // Your request payload
        const requestData = {
            "st_from": date + 'T' + time1,
            "end_to": date + 'T' + time2,
            "status": checked,
            "isLocal": islocal
        };

        // Make a POST request to the API
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.blob();
            })
            .then(blob => {
                // Create a download link
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute('download', 'example.xlsx');

                // Append the link to the body
                document.body.appendChild(link);

                // Simulate a click on the link to trigger the download
                link.click();

                // Remove the link from the body
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while processing your request. Please try again.');
            });
    }
}
