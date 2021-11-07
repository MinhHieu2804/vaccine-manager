$(document).ready(function() {

    // handle 'read one' button click
    $(document).on('click', '.read-one-vaccination-button', function() {
        // get vaccination id
        var id = $(this).attr('data-id');
        // read vaccination record based on given ID
        $.getJSON("http://localhost/rest_api_auth/api/roles/admin/vaccination/read_one_vaccination.php?id=" + id, function(data) {
            $.getJSON("http://localhost/rest_api_auth/api/roles/admin/vaccine/read_one.php?id=" + data.vaccine_id, function(data1) {
                $.getJSON("http://localhost/rest_api_auth/api/roles/admin/health_center/read_one.php?id=" + data.health_center_id, function(data2) {
                    //do stuff with 'data' and 'data2'

                    // start html
                    var read_one_vaccination_html = `
                    <!-- when clicked, it will show the vaccination's list -->
                    <div id='read-vaccinations' class='btn btn-primary pull-right m-b-15px read-vaccinations-button'>
                        <span class='glyphicon glyphicon-list'></span> Read Vaccinations
                    </div>
                    <!-- vaccination data will be shown in this table -->
                    <table class='table table-bordered table-hover'>
                    
                        <!-- vaccination name -->
                        <tr>
                            <td class='w-30-pct'>CCCD</td>
                            <td class='w-70-pct'>` + data.cccd + `</td>
                        </tr>
                    
                        <!-- vaccination price -->
                        <tr>
                            <td>Vaccine</td>
                            <td>` + data1.name + `</td>
                        </tr>

                        <!-- vaccination price -->
                        <tr>
                            <td>Cơ sở y tế</td>
                            <td>` + data2.name + `</td>
                        </tr>

                        <!-- vaccination price -->
                        <tr>
                            <td>Lần tiêm</td>
                            <td>` + data.vaccinate_no + `</td>
                        </tr>

                        <!-- vaccination price -->
                        <tr>
                            <td>Ngày tiêm</td>
                            <td>` + data.date + `</td>
                        </tr>
                    
                        <!-- vaccination description -->
                        <tr>
                            <td>Ghi chú</td>
                            <td>` + data.note + `</td>
                        </tr>
                    
                        
                    
                    </table>`;
                    // inject html to 'page-content' of our app
                    $("#page-content").html(read_one_vaccination_html);

                    // chage page title
                    changePageTitle("Read Vaccination");
                });
            });
        });
    });

});