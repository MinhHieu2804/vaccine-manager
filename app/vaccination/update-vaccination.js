$(document).ready(function() {

    // show html form when 'update vaccination' button was clicked
    $(document).on('click', '.update-vaccination-button', function() {
        // get vaccination id
        var id = $(this).attr('data-id');
        // read one record based on given vaccination id
        $.getJSON("http://localhost/New%20folder%20(2)/vaccine-manager/api/roles/admin/vaccination/read_one_vaccination.php?id=" + id, function(data) {

            // values will be used to fill out our form
            var cccd = data.cccd;
            var vaccine_id = data.vaccine_id;
            var health_center_id = data.health_center_id;
            var date = data.date;
            var vaccinate_no = data.vaccinate_no;
            var note = data.note;

            // load list of vaccines
            $.getJSON("http://localhost/New%20folder%20(2)/vaccine-manager/api/roles/admin/vaccine/read.php", function(vaccine) {
                $.getJSON("http://localhost/New%20folder%20(2)/vaccine-manager/api/roles/admin/health_center/read.php", function(center) {


                    // build 'vaccines option' html
                    // loop through returned list of data
                    var vaccines_options_html = `<select name='vaccine_id' class='form-control'>`;

                    $.each(vaccine.records, function(key, val) {
                        // pre-select option is vaccine id is the same
                        if (val.id == vaccine_id) { vaccines_options_html += `<option value='` + val.id + `' selected>` + val.name + `</option>`; } else { vaccines_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`; }
                    });
                    vaccines_options_html += `</select>`;

                    var centers_options_html = `<select name='health_center_id' class='form-control'>`;

                    $.each(center.records, function(key, val) {
                        // pre-select option is center id is the same
                        if (val.id == health_center_id) { centers_options_html += `<option value='` + val.id + `' selected>` + val.name + `</option>`; } else { centers_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`; }
                    });
                    centers_options_html += `</select>`;

                    // store 'update vaccination' html to this variable
                    var update_vaccination_html = `
                        <div id='read-vaccinations' class='btn btn-primary pull-right m-b-15px read-vaccinations-button'>
                            <span class='glyphicon glyphicon-list'></span> Read Vaccinations
                        </div>
                        <!-- build 'update vaccination' html form -->
                        <!-- we used the 'required' html5 property to prevent empty fields -->
                        <form id='update-vaccination-form' action='#' method='post' border='0'>
                            <table class='table table-hover table-responsive table-bordered'>
                        
                                <!-- name field -->
                                <tr>
                                    <td>CCCD</td>
                                    <td><input value=\"` + cccd + `\" type='text' name='cccd' class='form-control' required /></td>
                                </tr>

                                <!-- vaccines 'select' field -->
                                <tr>
                                    <td>Vaccine</td>
                                    <td>` + vaccines_options_html + `</td>
                                </tr>
                        
                                <!-- price field -->
                                <tr>
                                    <td>Cơ sở y tế</td>
                                    <td>` + centers_options_html + `</td>
                                </tr>

                                <tr>
                                    <td>Lần tiêm</td>
                                    <td><input value=\"` + vaccinate_no + `\" type='number' min='1' name='vaccinate_no' class='form-control' required /></td>
                                </tr>

                                <tr>
                                    <td>Ngày tiêm</td>
                                    <td><input value=\"` + date + `\" type='date' name='date' class='form-control' required /></td>
                                </tr>

                                <!-- description field -->
                                <tr>
                                    <td>Ghi chú</td>
                                    <td><textarea name='note' class='form-control'>` + note + `</textarea></td>
                                </tr>
                        
                                <tr>
                        
                                    <!-- hidden 'vaccination id' to identify which record to delete -->
                                    <td><input value=\"` + id + `\" name='id' type='hidden' /></td>
                        
                                    <!-- button to submit form -->
                                    <td>
                                        <button type='submit' class='btn btn-info'>
                                            <span class='glyphicon glyphicon-edit'></span> Update Vaccination
                                        </button>
                                    </td>
                        
                                </tr>
                        
                            </table>
                        </form>`;
                    // inject to 'page-content' of our app
                    $("#page-content").html(update_vaccination_html);

                    // chage page title
                    changePageTitle("Update Vaccination");
                });
            });
        });
    });

    // will run if 'create vaccination' form was submitted
    $(document).on('submit', '#update-vaccination-form', function() {

        // get form data
        var form_data = JSON.stringify($(this).serializeObject());
        // submit form data to api
        $.ajax({
            url: "http://localhost/New%20folder%20(2)/vaccine-manager/api/roles/admin/vaccination/update_vaccination.php",
            type: "POST",
            contentType: 'application/json',
            data: form_data,
            success: function(result) {
                // vaccination was created, go back to vaccinations list
                showVaccinations();
            },
            error: function(xhr, resp, text) {
                // show error to console
                console.log(xhr, resp, text);
            }
        });

        return false;
    });
});