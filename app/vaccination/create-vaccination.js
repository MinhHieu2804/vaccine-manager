$(document).ready(function() {

    // show html form when 'create vaccination' button was clicked
    $(document).on('click', '.create-vaccination-button', function() {
        // load list of vaccines
        $.getJSON("http://localhost/New%20folder%20(2)/vaccine-manager/api/roles/admin/vaccine/read.php", function(data) {
            $.getJSON("http://localhost/New%20folder%20(2)/vaccine-manager/api/roles/admin/health_center/read.php", function(data2) {
                // build vaccines option html
                // loop through returned list of data
                var centers_options_html = `<select name='health_center_id' class='form-control'>`;
                $.each(data2.records, function(key, val2) {
                    centers_options_html += `<option value='` + val2.id + `'>` + val2.name + `</option>`;
                });
                centers_options_html += `</select>`;
                // build vaccines option html
                // loop through returned list of data
                var vaccines_options_html = `<select name='vaccine_id' class='form-control'>`;
                $.each(data.records, function(key, val) {
                    vaccines_options_html += `<option value='` + val.id + `'>` + val.name + `</option>`;
                });
                vaccines_options_html += `</select>`;
                // we have our html form here where vaccination information will be entered
                // we used the 'required' html5 property to prevent empty fields
                var create_vaccination_html = `<!-- 'read vaccinations' button to show list of vaccinations -->
                    <div id='read-vaccinations' class='btn btn-primary pull-right m-b-15px read-vaccinations-button'>
                        <span class='glyphicon glyphicon-list'></span> Read Vaccinations
                    </div>
                    <!-- 'create vaccination' html form -->
                    <form id='create-vaccination-form' action='#' method='post' border='0'>
                        <table class='table table-hover table-responsive table-bordered'>
                    
                            <!-- name field -->
                            <tr>
                                <td>CCCD</td>
                                <td><input type='text' name='cccd' class='form-control' required /></td>
                            </tr>
                    
                            <!-- vaccines 'select' field -->
                            <tr>
                                <td>Vaccine</td>
                                <td>` + vaccines_options_html + `</td>
                            </tr>
                    
                            <!-- centers 'select' field -->
                            <tr>
                                <td>Cơ sở y tế</td>
                                <td>` + centers_options_html + `</td>
                            </tr>
                    
                    
                            <!-- price field -->
                            <tr>
                                <td>Lần tiêm</td>
                                <td><input type='number' min='1' name='vaccinate_no' class='form-control' required /></td>
                            </tr>
                    
                            <!-- date field -->
                            <tr>
                                <td>Ngày tiêm</td>
                                <td><input type='date' name='date' class='form-control' required /></td>
                            </tr>
                    
                            <tr>
                                <td>Ghi chú</td>
                                <td><textarea name='note' class='form-control' ></textarea></td>
                            </tr>
                    
                    
                            <!-- button to submit form -->
                            <tr>
                                <td></td>
                                <td>
                                    <button type='submit' class='btn btn-primary'>
                                        <span class='glyphicon glyphicon-plus'></span> Create Vaccination
                                    </button>
                                </td>
                            </tr>
                    
                        </table>
                    </form>`;


                // inject html to 'page-content' of our app
                $("#page-content").html(create_vaccination_html);

                // chage page title
                changePageTitle("Create Vaccination");

            });
        });
    });

    // will run if create vaccination form was submitted
    $(document).on('submit', '#create-vaccination-form', function() {
        // get form data
        var form_data = JSON.stringify($(this).serializeObject());
        // submit form data to api
        $.ajax({
            url: "http://localhost/New%20folder%20(2)/vaccine-manager/api/roles/admin/vaccination/create_vaccination.php",
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