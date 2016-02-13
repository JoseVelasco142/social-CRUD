/**
 * Created by root on 29/01/16.
 */
var DBNODE = DBNODE || {};

DBNODE.prototype = {
    selectDb: function(db){
        window.location.href = 'http://localhost:3000/dbSwitch?db='+db;
    },
    actions: function (action, table, id) {
        var data = null;
        var db = location.pathname;
        switch (action) {
            case "show":
                location.href = "http://localhost:3000" + db + "?v=" + table + "&k=" + id + "&a=" + action;
                break;
            case "edit":
                visor = $('#viewerOne');
                visor.find(':input').prop('disabled', false);
                visor.find(':input').css('background', 'lightcyan');
                $("[action = 'edit']").toggleClass('hidden');
                $("[action = 'update']").toggleClass('hidden');
                break;
            case "update":
                switch (table) {
                    case "alumnos":
                        data = {
                            nombre: $('#name').val(),
                            apellidos: $('#apelidos').val(),
                            email: $('#email').val(),
                            asignaturas: $('#asignaturas').val()
                        };
                        break;
                    case "profesores":
                        data = {
                            nombre: $('#name').val(),
                            apellidos: $('#apelidos').val(),
                            email: $('#email').val(),
                            asignatura: $('#asignatura').val()
                        };
                        break;
                    case "asignaturas":
                        data = {
                            nombre: $('#name').val(),
                            descripcion: $('#descripcion').val(),
                            profesor: $('#profesor').val()
                        };
                        break;
                }
                data["v"] = table;
                data["k"] = id;
                data["a"] = action;
                $.ajax({
                    url: 'http://localhost:3000' + db,
                    type: 'PUT',
                    data: data
                }).done(function (response) {
                    if (response)
                        if (alert("Actualizado correctamente")) {
                            window.location.reload();
                        }
                });
                break;
            case "add":
                location.href = "http://localhost:3000" + db + "?v=" + table + "&k=" + id + "&a=" + action;
                break;
            case "addOne":
                data = null;
                switch (table) {
                    case "alumnos":
                        data = {
                            nombre: $('#name').val(),
                            apellidos: $('#apelidos').val(),
                            email: $('#email').val(),
                            asignaturas: $('#asignaturas').val()
                        };
                        break;
                    case "profesores":
                        data = {
                            nombre: $('#name').val(),
                            apellidos: $('#apelidos').val(),
                            email: $('#email').val(),
                            asignatura: $('#asignatura').val()
                        };
                        break;
                    case "asignaturas":
                        data = {
                            nombre: $('#name').val(),
                            descripcion: $('#descripcion').val(),
                            profesor: $('#profesor').val()
                        };
                        break;
                }
                data["v"] = table;
                var cnt = 0;
                for (var d in data) {
                    if (data[d] == "") {
                        cnt++;
                    }
                }
                if (cnt == 0) {
                    $.ajax({
                        url: 'http://localhost:3000' + db,
                        type: 'POST',
                        data: data
                    }).done(function (response) {
                        if (response != '1') {
                            location.href = "http://localhost:3000" + db + "?v=" + table + "&k=" + response + "&a=show";
                        }
                        else
                            alert("Alquien ya esta usando ese email")
                    });
                }
                else {
                    alert("Rellena todos los campos");
                }
                break;
            case "delete":
                if (window.confirm("¿Estas seguro?")) {
                    $.ajax({
                        url: "http://localhost:3000" + db + "?v=" + table + "&k=" + id + "&a=" + action,
                        type: 'DELETE'
                    }).done(function (data) {
                        if(!alert(data + " eliminado correctamente"))
                            location.href = "http://localhost:3000" + db + "?v=" + table;
                    });
                }
                break;
            case "search":
                var words = $('#searchBox').val();
                if (words != "") {
                    location.href = "http://localhost:3000" + db + "?v=" + table + "&k=" + words + "&a=" + action;
                } else {
                    alert("Debes de escribir algo")
                }
                break;
        }
    }
};

$(document).ready(function () {
    if (location.pathname == "/sqlite" || "/mongo") {
        setTimeout(function () {
            $('#dataViewer').mixItUp({
                animation: {
                    effects: 'scale translateY(-600px) translateZ(-600px) rotateX(-180deg)',
                    duration: 1000,
                    easing: 'cubic-bezier(0.175, 0.90, 0.32, 1.05)'
                },
                load: {
                    page: 1
                },
                control: {
                    enable: true,
                    toggleFilterButtons: true,
                    activeClass: 'on'
                },
                pagination: {
                    limit: 6,
                    generatePagers: true,
                    loop: true,
                    pagerClass: 'btn btn-default'
                }
            });
        }, 1250);
    }
    $('.dbType').click(function(){
       DBNODE.prototype.selectDb($(this).attr('about'));
    });
    $('.action').click(function () {
        DBNODE.prototype.actions($(this).attr('action'), $(this).attr('about'), $(this).attr('accesskey'));
    });
});