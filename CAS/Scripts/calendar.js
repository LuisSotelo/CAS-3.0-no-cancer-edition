$(document).ready(function ()
{
    var date_input = $('input[name="date"]'); //our date input has the name "date"
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    date_input.datepicker({
        format: 'mm/dd/yyyy',
        container: container,
        todayHighlight: true,
        autoclose: true,
    });

    var date = new Date()
    var d = date.getDate(),
    m = date.getMonth(),
    y = date.getFullYear();
    $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek',
            defaultView: 'agendaWeek'
        },
    businessHours: [{
        dow: [1, 2, 3, 4, 5], // lunes a vienres
        start: '08:00', // 8am
        end: '15:00' // 3pm
        }],
    buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Dia',
        list:'Lista'
    },
    dayClick: function (date, jsEvent, view) {
        $('#btnAgregar').pro("disabled", false);
        $('#btnModificar').pro("disabled", true);
        $('#btnEliminar').pro("disabled", true);
        limpiarFormulario();
        $("#txtFecha").val(date.format());
        $("#ModalEventos").modal();
    },
    events:[{
        title: 'All Day Event',
        start: new Date(y, m, 1),
        backgroundColor: '#f56954', //red
        borderColor: '#f56954' //red
    },
    {
        title: 'Birthday Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false,
        backgroundColor: '#00a65a', //Success (green)
        borderColor: '#00a65a' //Success (green)
    },
    {
        title: 'Click for Google',
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: 'http://google.com/',
        backgroundColor: '#3c8dbc', //Primary (light-blue)
        borderColor: '#3c8dbc' //Primary (light-blue)
    }],
    eventClick: function (calEvent, jsEvent, view) {
        $('#btnAgregar').pro("disabled", true);
        $('#btnModificar').pro("disabled", false);
        $('#btnEliminar').pro("disabled", false);
    //H2
        $('#tituloEvento').html(calEvent.title);
    //MOSTRAR INFORMACION DEL EVENTO EN LOS INPUT
        $("#txtDescripcion").val(calEvent.descripcion);
        $("#txtID").val(calEvent.id);
        $("#txtTitulo").val(calEvent.title);
        $("#txtColor").val(calEvent.color);
        FechaHora = calEvent.start.i_.split("");
        $("#txtFecha").val(FechaHora[0]);
        $("#ModalEventos").modal();
    }, //Random default events
    editable: true,
    eventDrop: function (calEvent) {
        $('#txtID').val(calEvent.id);
        $('#txtTitulo').val(calEvent.title);
        $('#txtColor').val(calEvent.color);
        $('#txtDescripcion').val(calEvent.descripcion);
        var fechaHora = calEvent.start.format().split("T");
        $('#txtFecha').val(fechaHora[0]);
        $('#txtHora').val(fechaHora[1]);
    RecolectarDatosGUI();
    EnviarInformacion('modificar', NuevoEvento, true);
},
    droppable: true, // this allows things to be dropped onto the calendar !!!
    drop: function (date, allDay) { // this function is called when something is dropped
                    // retrieve the dropped element's stored Event Object
    var originalEventObject = $(this).data('eventObject')
    // we need to copy it, so that multiple events don't have a reference to the same object
    var copiedEventObject = $.extend({}, originalEventObject)
    // assign it the date that was reported
    copiedEventObject.start = date
    copiedEventObject.allDay = allDay
    copiedEventObject.backgroundColor = $(this).css('background-color')
    copiedEventObject.borderColor = $(this).css('border-color')
    // render the event on the calendar
    // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
    $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)
    // is the "remove after drop" checkbox checked?
    if ($('#drop-remove').is(':checked')) {
        // if so, remove the element from the "Draggable Events" list
        $(this).remove()
        }
           

    }
});
})

        var NuevoEvento;
        $('#btnAgregar').click(function () {
            RecolectarDatosGUI();
        EnviarInformacion('agregar', NuevoEvento);
    });
        $('#btnEliminar').click(function () {
            RecolectarDatosGUI();
        EnviarInformacion('Eliminar', NuevoEvento);
    });
        $('#btnModificar').click(function () {
            RecolectarDatosGUI();
        EnviarInformacion('Modificar', NuevoEvento);
    });
        function RecolectarDatosGUI() {
            NuevoEvento = {
                id: $('#txtID').val(),
                nombre: $('#txtTitulo').val(),
                inicio: $('#txtFecha').val() + " " + $('#txtHora').val(),
                color: $('#txtColor').val(),
                descripcion: $('#txtDescripcion').val(),
                textColor: "#FFFFFF",
                fin: $('#txtFecha').val() + " " + $('#txtHora').val()
            };
        }
        function EnviarInformacion(accion, objEvento, modal) {
            $.ajax({
                type: 'POST',
                url: '' + accion,
                data: objEvento,
                success: function (msg) {
                    if (msg) {
                        $('#Calendar').fullCalendar('refetchEvents');
                        if (!modal) {
                            $("#ModalEventos").modal('toggle');
                        }

                    }
                },
                error: function () {
                    alert("hay un error..")
                }

            });
        }
        $('.clockpicker').clockpicker();
        function limpiarFormulario() {
            $('#txtID').val('');
        $('#txtTitulo').val('');
        $('#txtColor').val('');
        $('#txtDescripcion').val('');
    }
    $('.clockpiker').clockpicker();
 