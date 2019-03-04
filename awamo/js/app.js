var rows = [];
var id = 0;

var table = {
  nextId: 0,
  addRow:function(row){
    row.id = this.nextId;
    var rowStr = "<tr id='xrow"+row.id+"' >";
    rowStr = rowStr +  "<td>"+row.num1+"</td>";
    rowStr = rowStr +  "<td>"+row.num2+"</td>";
    rowStr = rowStr +  "<td>"+row.resp+"</td>";
    rowStr = rowStr +  "<td>"+row.expec+"</td>";
    rowStr = rowStr +  "<td>"+row.passed+"</td>";
    rowStr = rowStr +  "<td style='color:red;'><span style='cursor:pointer;'  onclick='remove("+row.id+");'>x</span></td>";
    rowStr = rowStr +  "</tr>";

    this.nextId = this.nextId + 1;
    $("#"+this.id).append(rowStr);;
  },
  removeRow:function(id){
    $("#xrow"+id).hide();
  },
  init:function(id){
    $("#"+id).html(""); //empty the table
    this.nextId = 0; //reset next id
    this.id = id;
  },
  id:""
}

function remove(id){
  table.removeRow(id);
}


$(document).ready(function(){

  table.init("data_body");

  // posting to the restful api
  $('#nums_form').submit(function (evt) {
    evt.preventDefault();

    // getting values entered by user
    let num1 = parseInt($('input[name=num1]').val());
    let num2 = parseInt($('input[name=num2]').val());
    let opn = $( "#operand option:selected" )[0].getAttribute("value");

    let userData = {
      'opd1': num1,
      'opd2': num2,
      'opn': opn
    };

    //console.log(typeof userData);

    // process the form
    // $.ajax({
    //     type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
    //     url: 'backend/mock-backend.js', // the url where we want to POST
    //     data: userData, // our data object
    //     dataType: 'json', // what type of data do we expect back from the server
    //     encode: true,
    //     processData: false,
    //     contentType: 'application/json'
    // }).done(function(data) {
    //   console.log(data);
    // }).fail(function(data){
    //   // show any errors from the server
    //   console.log('Something went wrong on the server');
    //   console.log(data);
    // });


    var postConfig = {
      data: JSON.stringify(userData)
    };
    //calculate expected
    var exp = GetExpected(postConfig);
    //success call back for rest api
    postConfig.success = function(data) {
      var newRow = {
        num1: num1,
        num2: num2,
        resp: data,
        expec: exp,
        passed: ((exp === data)?"Yes":"No")
      };
      table.addRow(newRow);
    };
    //post data to rest api
    $.ajax(postConfig);

  });
});
