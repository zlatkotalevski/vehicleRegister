$(document).ready(function() {
     var columnDefs = [
    {
    data: "id",
    title: "Id",
    type: "number"
    },
    {
    data: "ekmtCert",
    title: "EKMT Certificate"
    },
    {
    data: "regNumber",
    title: "Registration Number"
    },
    {
    data: "ekmtNumber",
    title: "EKMT COC Number"
    },
    {
    data: "make",
    title: "Make"
    },
    {
    data: "vin",
    title: "VIN"
    },
    {
   data: "engineType",
   title: "Engine type"
    },
        {
           data: "dateIssued",
           title: "Date Issued",
           type: "date",
//           targets: 1,
//                           render: $.fn.dataTable.render.moment( 'YYYY-MM-DD' )

           }
    ];

    var myTable;
    var url_ws_mock_get = 'http://localhost:8082/getVehicle';
    var url_ws_mock_add = 'http://localhost:8082/addVehicle';
    var url_ws_mock_delete = 'http://localhost:8082/deleteVehicle';
    var url_ws_mock_edit = 'http://localhost:8082/editVehicle';

  //  var url_ws_mock_ok = 'http://localhost:8082/getVehicle2';
    if (location.href.startsWith("file://")) {
        // local URL's are not allowed
        url_ws_mock_get = 'https://luca-vercelli.github.io/DataTable-AltEditor/example/03_ajax_objects/mock_svc_load.json';
        url_ws_mock_ok = 'https://luca-vercelli.github.io/DataTable-AltEditor/example/03_ajax_objects/mock_svc_ok.json';
    }

    myTable = $('#example').DataTable({
        "sPaginationType": "full_numbers",
        ajax: {
            url : url_ws_mock_get,
            // our data is an array of objects, in the root node instead of /data node, so we need 'dataSrc' parameter
            dataSrc : ''
        },
        columns: columnDefs,
        dom: 'Bfrtip',        // Needs button container
        select: 'single',
        responsive: true,
        altEditor: true,     // Enable altEditor
        buttons: [
            {
                text: 'Add',
                name: 'add'        // do not change name
            },
            {
                extend: 'selected', // Bind to Selected row
                text: 'Edit',
                name: 'edit'        // do not change name
            },
            {
                extend: 'selected', // Bind to Selected row
                text: 'Delete',
                name: 'delete'      // do not change name
            },
            {
                text: 'Refresh',
                name: 'refresh'      // do not change name
            },
            {
                             extend: 'pdfHtml5',
                             orientation: 'landscape',
                             pageSize: 'LEGAL',
                             name: 'pdf'
             },
             'copy', 'csv', 'excel', 'print'


        ],
        onAddRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be / with type='PUT'
                url: url_ws_mock_add,
                type: 'PUT',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onDeleteRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='DELETE'
                url: url_ws_mock_delete,
                type: 'DELETE',
                data: rowdata,
                success: success,
                error: error
            });
        },
        onEditRow: function(datatable, rowdata, success, error) {
            $.ajax({
                // a tipycal url would be /{id} with type='POST'
                url: url_ws_mock_edit,
                type: 'POST',
                data: rowdata,
                success: success,
                error: error
            });
        }
    });


});
//<!-- datarangeScript  -->

var minDate, maxDate;

// Custom filtering function which will search data in column four between two values
$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        var min = minDate.val();
        var max = maxDate.val();
        var date = new Date( data[7] );

        if (
            ( min === null && max === null ) ||
            ( min === null && date <= max ) ||
            ( min <= date   && max === null ) ||
            ( min <= date   && date <= max )
        ) {
            return true;
        }
        return false;
    }
);

$(document).ready(function() {
    // Create date inputs
    minDate = new DateTime($('#min'), {
        format: 'DD.MM.YYYY'
    });
    maxDate = new DateTime($('#max'), {
        format: 'DD.MM.YYYY'
    });

    // DataTables initialisation
    var table = $('#example').DataTable();

    // Refilter the table
    $('#min, #max').on('change', function () {
        table.draw();
    });
});

